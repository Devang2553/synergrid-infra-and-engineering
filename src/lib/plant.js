/* SYNERGRID Assembly: the 3D plant.
 A low-poly axonometric model of an industrial plant that assembles itself
 in six stages as progress p goes from 0 to 1:
   foundations · PEB steel · MEP · power · testing · energise
 Every piece is placed deterministically from p, so scrolling backwards
 takes the plant apart again. Uses three.js 0.128. */
import * as T from "three";

var STAGES = {
  found: [0.02, 0.17],
  steel: [0.15, 0.38],
  mep: [0.38, 0.56],
  power: [0.56, 0.73],
  test: [0.73, 0.86],
  live: [0.86, 0.97]
};
var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
var lerp = function (a, b, t) { return a + (b - a) * t; };
var outCubic = function (t) { return 1 - Math.pow(1 - t, 3); };
var outBack = function (t) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };

export function createPlant(canvas, opts) {
  opts = opts || {};
  var small = !!opts.small;
  var renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));
  renderer.outputEncoding = T.sRGBEncoding;
  renderer.shadowMap.enabled = !small;
  renderer.shadowMap.type = T.PCFSoftShadowMap;

  var DAY = new T.Color("#E9ECEF"), NIGHT = new T.Color("#070D18");
  var scene = new T.Scene();
  scene.background = DAY.clone();

  var cam = new T.OrthographicCamera(-1, 1, 1, -1, -200, 400);
  var target = new T.Vector3(4, 3, 0);

  /* ---------------- light ---------------- */
  var hemi = new T.HemisphereLight(0xffffff, 0xb7c0cc, 0.95);
  scene.add(hemi);
  var sun = new T.DirectionalLight(0xffffff, 0.85);
  sun.position.set(-18, 34, 22);
  sun.castShadow = !small;
  sun.shadow.mapSize.set(2048, 2048);
  var sc = sun.shadow.camera; sc.left = -40; sc.right = 40; sc.top = 40; sc.bottom = -40; sc.near = 1; sc.far = 120;
  sun.shadow.bias = -0.0008;
  scene.add(sun);
  var warm = new T.PointLight(0xffb43c, 0, 46, 1.6);
  warm.position.set(0, 5.5, 0);
  scene.add(warm);
  var yardGlow = new T.PointLight(0xffb43c, 0, 26, 2);
  yardGlow.position.set(19, 4, -1);
  scene.add(yardGlow);

  /* ---------------- materials ---------------- */
  function std(hex, o) { var m = new T.MeshStandardMaterial(Object.assign({ color: hex, roughness: 0.82, metalness: 0.06 }, o || {})); return m; }
  var M = {
    ground: std("#DCE1E7", { roughness: 1 }),
    concrete: std("#C6CCD4"),
    footing: std("#B3BAC4"),
    steel: std("#1E3A8A", { roughness: 0.55, metalness: 0.25 }),
    purlin: std("#3557A8", { roughness: 0.6, metalness: 0.2 }),
    clad: std("#EEF1F4", { roughness: 0.7 }),
    roof: std("#D7DDE5", { roughness: 0.6, metalness: 0.15 }),
    duct: std("#A9B4C2", { roughness: 0.45, metalness: 0.4 }),
    chw: std("#2D5BD0", { roughness: 0.4, metalness: 0.2 }),
    fire: std("#C2412D", { roughness: 0.5 }),
    tray: std("#7E8BA0", { roughness: 0.5, metalness: 0.4 }),
    cable: std("#1B2333", { roughness: 0.7 }),
    tank: std("#4A5870", { roughness: 0.5, metalness: 0.3 }),
    panel: std("#DDE2E9", { roughness: 0.55, metalness: 0.15 }),
    gravel: std("#C9CED6", { roughness: 1 }),
    ahu: std("#C3CAD4", { roughness: 0.5, metalness: 0.3 }),
    glass: new T.MeshStandardMaterial({ color: "#9FB0C8", emissive: new T.Color("#FFB43C"), emissiveIntensity: 0, roughness: 0.2, metalness: 0.3 }),
    live: new T.MeshBasicMaterial({ color: "#FFC24D" }),
    scan: new T.MeshBasicMaterial({ color: "#F2A51A", transparent: true, opacity: 0.0, depthWrite: false, side: T.DoubleSide })
  };
  var EDGE = new T.LineBasicMaterial({ color: "#0B1A33", transparent: true, opacity: 0.42 });
  var WIRE = new T.LineBasicMaterial({ color: "#1E3A8A", transparent: true, opacity: 0.9 });

  var root = new T.Group();
  scene.add(root);
  var pieces = [];

  function box(w, h, d, mat, x, y, z, parent, edges) {
    var g = new T.BoxGeometry(w, h, d);
    var m = new T.Mesh(g, mat);
    m.position.set(x, y, z);
    m.castShadow = true; m.receiveShadow = true;
    if (edges !== false) { var e = new T.LineSegments(new T.EdgesGeometry(g, 30), EDGE); m.add(e); }
    (parent || root).add(m);
    return m;
  }
  function cyl(r, len, mat, axis, x, y, z, parent, seg) {
    var g = new T.CylinderGeometry(r, r, len, seg || 12);
    if (axis === "x") g.rotateZ(Math.PI / 2);
    if (axis === "z") g.rotateX(Math.PI / 2);
    var m = new T.Mesh(g, mat); m.position.set(x, y, z); m.castShadow = true;
    (parent || root).add(m);
    return m;
  }
  // base-anchored box for "grow" pieces: geometry runs from y=0 up to y=h
  function baseBox(w, h, d, mat, x, y, z, parent) {
    var g = new T.BoxGeometry(w, h, d); g.translate(0, h / 2, 0);
    var m = new T.Mesh(g, mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true;
    m.add(new T.LineSegments(new T.EdgesGeometry(g, 30), EDGE));
    (parent || root).add(m);
    return m;
  }
  /* register a piece: mode = drop | rise | x | z | grow | pop | draw | fade */
  function piece(obj, win, mode, amt, i, n, span) {
    i = i || 0; n = n || 1; span = span == null ? 0.45 : span;
    var A = win[0], B = win[1], len = B - A;
    var a = n > 1 ? A + len * (1 - span) * (i / (n - 1)) : A;
    var b = n > 1 ? a + len * span : B;
    obj.userData.to = obj.position.clone();
    obj.userData.s = obj.scale.clone();
    pieces.push({ o: obj, a: a, b: b, mode: mode, amt: amt == null ? 12 : amt });
    return obj;
  }

  /* ================= STAGE 1 · SITE & FOUNDATIONS ================= */
  var ground = new T.Mesh(new T.PlaneGeometry(140, 140), M.ground);
  ground.rotation.x = -Math.PI / 2; ground.position.y = -0.01; ground.receiveShadow = true;
  scene.add(ground);
  var grid = new T.GridHelper(120, 60, 0xA9B4C2, 0xC9D0D9);
  grid.position.y = 0.005; grid.material.transparent = true; grid.material.opacity = 0.55;
  scene.add(grid);

  var L = 24, W = 12, EAVE = 7, RIDGE = 9.4, BAYS = 8, BAY = L / BAYS;
  var slab = box(L + 2, 0.5, W + 2, M.concrete, 0, 0.25, 0);
  piece(slab, STAGES.found, "rise", 3);
  var pads = [];
  for (var i = 0; i <= BAYS; i++) {
    [-W / 2, W / 2].forEach(function (z) { pads.push(box(1.3, 0.35, 1.3, M.footing, -L / 2 + i * BAY, 0.68, z)); });
  }
  pads.forEach(function (p, k) { piece(p, [0.07, 0.17], "pop", 0, k, pads.length, 0.35); });

  /* ================= STAGE 2 · PEB STEEL ================= */
  var frames = [];
  for (var f = 0; f <= BAYS; f++) {
    var fx = -L / 2 + f * BAY;
    var fr = new T.Group(); root.add(fr);
    box(0.32, EAVE, 0.55, M.steel, fx, 0.85 + EAVE / 2, -W / 2, fr);
    box(0.32, EAVE, 0.55, M.steel, fx, 0.85 + EAVE / 2, W / 2, fr);
    var rl = Math.hypot(W / 2, RIDGE - EAVE);
    var ang = Math.atan2(RIDGE - EAVE, W / 2);
    var r1 = box(0.32, 0.5, rl, M.steel, fx, 0.85 + (EAVE + RIDGE) / 2, -W / 4, fr); r1.rotation.x = ang;
    var r2 = box(0.32, 0.5, rl, M.steel, fx, 0.85 + (EAVE + RIDGE) / 2, W / 4, fr); r2.rotation.x = -ang;
    frames.push(fr);
  }
  frames.forEach(function (fr, k) { piece(fr, [0.15, 0.29], "drop", 16, k, frames.length, 0.4); });
  // purlins along the roof and girts on the back wall
  var purl = [];
  for (var q = 1; q <= 4; q++) {
    var t = q / 5;
    purl.push(box(L, 0.18, 0.18, M.purlin, 0, 0.85 + lerp(EAVE, RIDGE, t) + 0.3, lerp(-W / 2, 0, t)));
    purl.push(box(L, 0.18, 0.18, M.purlin, 0, 0.85 + lerp(EAVE, RIDGE, t) + 0.3, lerp(W / 2, 0, t)));
  }
  [2.6, 5.2].forEach(function (y) { purl.push(box(L, 0.16, 0.16, M.purlin, 0, 0.85 + y, -W / 2 - 0.3)); });
  purl.forEach(function (p, k) { piece(p, [0.25, 0.33], "x", -34, k, purl.length, 0.5); });
  // crane gantry inside
  var gant = new T.Group(); root.add(gant);
  box(L - 1, 0.35, 0.35, M.steel, 0, 0.85 + 5.6, -W / 2 + 1.2, gant);
  box(L - 1, 0.35, 0.35, M.steel, 0, 0.85 + 5.6, W / 2 - 1.2, gant);
  box(0.6, 0.6, W - 2, M.steel, 5, 0.85 + 6, 0, gant);
  piece(gant, [0.29, 0.34], "z", 18);
  // cladding: back wall full, front wall a low dado (cutaway), one gable end
  var clad = [];
  for (var b = 0; b < BAYS; b++) {
    clad.push(baseBox(BAY - 0.06, EAVE - 0.1, 0.12, M.clad, -L / 2 + BAY / 2 + b * BAY, 0.85, -W / 2 - 0.45));
    clad.push(baseBox(BAY - 0.06, 1.6, 0.12, M.clad, -L / 2 + BAY / 2 + b * BAY, 0.85, W / 2 + 0.45));
  }
  clad.forEach(function (c, k) { piece(c, [0.31, 0.38], "grow", 0, k, clad.length, 0.4); });
  var gs = new T.Shape();
  gs.moveTo(-W / 2, 0); gs.lineTo(W / 2, 0); gs.lineTo(W / 2, EAVE); gs.lineTo(0, RIDGE); gs.lineTo(-W / 2, EAVE); gs.lineTo(-W / 2, 0);
  var gg = new T.ExtrudeGeometry(gs, { depth: 0.12, bevelEnabled: false });
  var gable = new T.Mesh(gg, M.clad); gable.rotation.y = Math.PI / 2; gable.position.set(-L / 2 - 0.45, 0.85, 0);
  gable.castShadow = true; gable.receiveShadow = true; gable.add(new T.LineSegments(new T.EdgesGeometry(gg, 30), EDGE)); root.add(gable);
  piece(gable, [0.33, 0.38], "grow", 0);
  // roof sheets on the back slope only, so the services stay visible
  var roofs = [];
  var rlen = Math.hypot(W / 2, RIDGE - EAVE), rang = Math.atan2(RIDGE - EAVE, W / 2);
  for (var rb = 0; rb < BAYS; rb++) {
    var rs = box(BAY - 0.05, 0.1, rlen + 0.4, M.roof, -L / 2 + BAY / 2 + rb * BAY, 0.85 + (EAVE + RIDGE) / 2 + 0.55, -W / 4 - 0.2);
    rs.rotation.x = rang; roofs.push(rs);
  }
  roofs.forEach(function (r, k) { piece(r, [0.33, 0.39], "drop", 10, k, roofs.length, 0.4); });
  // clerestory glazing on the back wall: lights up at energise
  var glass = [];
  for (var gw = 0; gw < BAYS; gw++) glass.push(box(BAY - 0.7, 1.0, 0.05, M.glass, -L / 2 + BAY / 2 + gw * BAY, 0.85 + 5.9, -W / 2 - 0.37, null, false));
  glass.forEach(function (g, k) { piece(g, [0.34, 0.39], "pop", 0, k, glass.length, 0.5); });

  /* ================= STAGE 3 · MEP ================= */
  var Y0 = 0.85;
  var duct = new T.Group(); root.add(duct);
  box(L - 2, 0.9, 1.3, M.duct, 0, Y0 + 6.3, -2.6, duct);
  for (var dd = 0; dd < 5; dd++) box(0.7, 1.4, 0.7, M.duct, -8 + dd * 4, Y0 + 5.3, -2.6, duct);
  piece(duct, [0.38, 0.46], "x", 36);
  var chw1 = cyl(0.2, L - 2, M.chw, "x", 0, Y0 + 5.0, -4.3); piece(chw1, [0.41, 0.49], "x", -36);
  var chw2 = cyl(0.2, L - 2, M.chw, "x", 0, Y0 + 5.0, -3.75); piece(chw2, [0.42, 0.5], "x", -36);
  var fire = new T.Group(); root.add(fire);
  cyl(0.13, L - 2, M.fire, "x", 0, Y0 + 7.15, 1.6, fire);
  for (var s = 0; s < 10; s++) cyl(0.05, 0.6, M.fire, "y", -10 + s * 2.2, Y0 + 6.85, 1.6, fire, 6);
  piece(fire, [0.44, 0.52], "x", 36);
  var tray = new T.Group(); root.add(tray);
  box(L - 2, 0.1, 0.7, M.tray, 0, Y0 + 5.7, 3.1, tray);
  [-0.2, 0, 0.2].forEach(function (dz) { box(L - 2, 0.1, 0.1, M.cable, 0, Y0 + 5.8, 3.1 + dz, tray, false); });
  piece(tray, [0.46, 0.54], "x", -36);
  var ahu = new T.Group(); root.add(ahu);
  box(3.4, 1.5, 2.2, M.ahu, 6, 0, 0, ahu);
  cyl(0.55, 0.2, M.duct, "y", 5.2, 0.85, 0, ahu);
  cyl(0.55, 0.2, M.duct, "y", 6.9, 0.85, 0, ahu);
  ahu.position.set(0, Y0 + RIDGE - 0.6, -2.8);
  piece(ahu, [0.5, 0.56], "drop", 12);

  /* ================= STAGE 4 · POWER ================= */
  var YX = 19, YZ = -1;
  var pad = box(12, 0.3, 11, M.gravel, YX, 0.15, YZ); piece(pad, [0.56, 0.62], "rise", 2);
  var tx = new T.Group(); root.add(tx);
  box(3.2, 2.6, 2.3, M.tank, 0, 1.3 + 0.3, 0, tx);
  for (var fn = 0; fn < 7; fn++) box(0.08, 1.9, 0.9, M.tank, -1.4 + fn * 0.46, 1.4 + 0.3, 1.65, tx, false);
  cyl(0.42, 2.4, M.tank, "x", -0.3, 3.4 + 0.3, -0.7, tx);
  var bush = [];
  [-0.8, 0, 0.8].forEach(function (bx) { bush.push(cyl(0.14, 1.3, M.panel, "y", bx, 3.5 + 0.3, 0.3, tx, 8)); });
  tx.position.set(YX - 1, 0, YZ);
  piece(tx, [0.58, 0.65], "rise", 5);
  // switchyard gantry
  var yard = new T.Group(); root.add(yard);
  [-3, 3].forEach(function (gz) { baseBox(0.35, 6.5, 0.35, M.steel, 0, 0.3, gz, yard); });
  box(0.35, 0.35, 6.4, M.steel, 0, 6.8, 0, yard);
  yard.position.set(YX + 4, 0, YZ);
  piece(yard, [0.6, 0.66], "grow", 0);
  // transmission tower (wire lattice)
  var TW = new T.Vector3(31, 0, -12);
  var tower = new T.Group(); root.add(tower);
  (function () {
    var H = 20, pts = [];
    function lv(y) { var w = lerp(3.2, 0.6, Math.pow(y / H, 0.8)); return w; }
    var levels = [0, 3, 6, 9, 12, 15, 18, 20];
    for (var k = 0; k < levels.length - 1; k++) {
      var y1 = levels[k], y2 = levels[k + 1], a = lv(y1), c = lv(y2);
      var c1 = [[-a, -a], [a, -a], [a, a], [-a, a]], c2 = [[-c, -c], [c, -c], [c, c], [-c, c]];
      for (var m = 0; m < 4; m++) {
        var n2 = (m + 1) % 4;
        pts.push(c1[m][0], y1, c1[m][1], c2[m][0], y2, c2[m][1]);
        pts.push(c1[m][0], y1, c1[m][1], c2[n2][0], y2, c2[n2][1]);
        pts.push(c1[n2][0], y1, c1[n2][1], c2[m][0], y2, c2[m][1]);
        pts.push(c2[m][0], y2, c2[m][1], c2[n2][0], y2, c2[n2][1]);
      }
    }
    [13, 16.5].forEach(function (y) { var s2 = y === 13 ? 4.6 : 3.6; pts.push(-s2, y, 0, s2, y, 0); pts.push(-s2, y, 0, -0.8, y + 1, 0); pts.push(s2, y, 0, 0.8, y + 1, 0); });
    var g = new T.BufferGeometry(); g.setAttribute("position", new T.Float32BufferAttribute(pts, 3));
    var lines = new T.LineSegments(g, WIRE); tower.add(lines);
  })();
  tower.position.copy(TW);
  piece(tower, [0.56, 0.64], "grow", 0);
  // the power path: tower arm -> yard gantry -> transformer -> cable route -> LT panels in the plant
  var path = new T.CatmullRomCurve3([
    new T.Vector3(TW.x - 4.6, 13, TW.z),
    new T.Vector3(YX + 10, 8.5, YZ - 6),
    new T.Vector3(YX + 4, 6.8, YZ),
    new T.Vector3(YX + 1, 4.2, YZ + 0.3),
    new T.Vector3(YX - 1, 4.0, YZ + 0.3),
    new T.Vector3(YX - 3.2, 0.5, YZ + 3.5),
    new T.Vector3(L / 2 + 1, 0.45, 3.5),
    new T.Vector3(L / 2 - 1.4, 0.95, 3.5),
    new T.Vector3(L / 2 - 2, 1.1, -4)
  ], false, "catmullrom", 0.2);
  var tube = new T.Mesh(new T.TubeGeometry(path, 240, 0.09, 6, false), M.cable);
  root.add(tube);
  var tubeCount = tube.geometry.index.count;
  pieces.push({ o: tube, a: 0.62, b: 0.72, mode: "draw", count: tubeCount });
  // LT panels against the back wall at the yard end
  var panels = [];
  for (var pn = 0; pn < 5; pn++) panels.push(baseBox(0.9, 2.3, 0.8, M.panel, L / 2 - 1.5, Y0, -4.6 + pn * 1.0));
  panels.forEach(function (p, k) { piece(p, [0.64, 0.71], "grow", 0, k, panels.length, 0.5); });
  // lightning protection on the ridge
  var lps = [];
  for (var lp = 0; lp < 5; lp++) lps.push(cyl(0.05, 1.6, M.steel, "y", -10 + lp * 5, Y0 + RIDGE + 1.0, 0, null, 6));
  lps.forEach(function (p, k) { piece(p, [0.66, 0.72], "pop", 0, k, lps.length, 0.5); });

  /* ================= STAGE 5 · TESTING ================= */
  function tickTexture() {
    var c = document.createElement("canvas"); c.width = c.height = 128;
    var x = c.getContext("2d");
    x.fillStyle = "#0B1A33"; x.beginPath(); x.arc(64, 64, 58, 0, Math.PI * 2); x.fill();
    x.strokeStyle = "#F2A51A"; x.lineWidth = 9; x.beginPath(); x.arc(64, 64, 50, 0, Math.PI * 2); x.stroke();
    x.lineCap = "round"; x.lineJoin = "round"; x.lineWidth = 12;
    x.beginPath(); x.moveTo(38, 66); x.lineTo(56, 84); x.lineTo(90, 46); x.stroke();
    var t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; return t;
  }
  var tickMat = new T.SpriteMaterial({ map: tickTexture(), depthTest: false, transparent: true });
  var ticks = [
    [YX - 1, 5.2, YZ], [YX + 4, 8.2, YZ], [L / 2 - 1.5, 4.2, -2.6], [YX - 3.2, 1.8, YZ + 3.5], [-10, Y0 + RIDGE + 2.6, 0], [YX + 5, 1.5, YZ + 4.5], [0, Y0 + 7.8, 1.6]
  ].map(function (p, k) {
    var s2 = new T.Sprite(tickMat); s2.position.set(p[0], p[1], p[2]); s2.scale.set(1.6, 1.6, 1); s2.renderOrder = 10; root.add(s2);
    return piece(s2, [0.75, 0.84], "pop", 0, k, 7, 0.4);
  });
  var scan = new T.Mesh(new T.PlaneGeometry(0.6, 16), M.scan);
  scan.rotation.y = Math.PI / 2; root.add(scan);
  // earth pits at the yard corners
  [[YX - 5, YZ - 4.5], [YX + 5, YZ - 4.5], [YX + 5, YZ + 4.5], [YX - 5, YZ + 4.5]].forEach(function (e, k) {
    piece(cyl(0.35, 0.25, M.footing, "y", e[0], 0.42, e[1], null, 10), [0.72, 0.78], "pop", 0, k, 4, 0.5);
  });

  /* ================= STAGE 6 · ENERGISE ================= */
  var pulses = [];
  var pulseGeo = new T.SphereGeometry(0.26, 10, 10);
  for (var pu = 0; pu < (small ? 10 : 16); pu++) { var sp = new T.Mesh(pulseGeo, M.live); sp.visible = false; root.add(sp); pulses.push(sp); }
  var conductors = [];
  [[-4.6, 13], [4.6, 13], [-3.6, 16.5]].forEach(function (arm, k) {
    var c = new T.QuadraticBezierCurve3(new T.Vector3(TW.x + arm[0], arm[1], TW.z), new T.Vector3(lerp(TW.x, YX + 4, 0.5), arm[1] - 4.5, lerp(TW.z, YZ, 0.5)), new T.Vector3(YX + 4, 6.8, YZ - 2 + k * 2));
    var g = new T.BufferGeometry().setFromPoints(c.getPoints(40));
    var ln = new T.Line(g, new T.LineBasicMaterial({ color: "#1E3A8A" })); root.add(ln); conductors.push(ln);
    pieces.push({ o: ln, a: 0.62, b: 0.7, mode: "draw", count: 41 });
  });

  /* ---------------- blueprint ghost of the finished plant ---------------- */
  var GHOST = new T.LineBasicMaterial({ color: "#1E3A8A", transparent: true, opacity: 0.22, depthWrite: false });
  var ghost = new T.Group(); scene.add(ghost);
  function buildGhost() {
    root.updateMatrixWorld(true);
    root.traverse(function (o) {
      if (!o.isMesh || o === tube || !o.visible) return;
      var e = new T.LineSegments(new T.EdgesGeometry(o.geometry, 30), GHOST);
      e.matrixAutoUpdate = false; e.matrix.copy(o.matrixWorld); ghost.add(e);
    });
    tower.updateMatrixWorld(true);
    tower.children.forEach(function (c) { var l = new T.LineSegments(c.geometry, GHOST); l.matrixAutoUpdate = false; l.matrix.copy(c.matrixWorld); ghost.add(l); });
  }

  /* ---------------- apply progress ---------------- */
  var P = 0, E = 0;
  function apply(p) {
    P = p;
    for (var k = 0; k < pieces.length; k++) {
      var it = pieces[k], o = it.o, t = clamp((p - it.a) / Math.max(it.b - it.a, 1e-4), 0, 1), e = outCubic(t);
      o.visible = t > 0;
      var to = o.userData.to, s = o.userData.s;
      switch (it.mode) {
        case "drop": o.position.y = to.y + it.amt * (1 - e); break;
        case "rise": o.position.y = to.y - it.amt * (1 - e); break;
        case "x": o.position.x = to.x + it.amt * (1 - e); break;
        case "z": o.position.z = to.z + it.amt * (1 - e); break;
        case "grow": o.scale.set(s.x, Math.max(1e-3, e) * s.y, s.z); break;
        case "pop": var b2 = Math.max(1e-3, outBack(t)); o.scale.set(s.x * b2, s.y * b2, s.z * b2); break;
        case "draw": o.geometry.setDrawRange(0, Math.floor(it.count * e)); break;
      }
    }
    // test sweep: a thin amber plane passes over the whole plant
    var st = clamp((p - 0.74) / 0.1, 0, 1);
    scan.visible = st > 0 && st < 1;
    scan.position.set(lerp(-16, 36, st), 7, 0);
    M.scan.opacity = Math.sin(st * Math.PI) * 0.35;
    // energise: day falls to night, glazing and pulses light up
    E = clamp((p - STAGES.live[0]) / (STAGES.live[1] - STAGES.live[0]), 0, 1);
    var ee = E * E * (3 - 2 * E);
    scene.background.copy(DAY).lerp(NIGHT, ee);
    ground.material.color.set("#DCE1E7").lerp(new T.Color("#0E1626"), ee);
    grid.material.opacity = lerp(0.55, 0.22, ee);
    hemi.intensity = lerp(0.95, 0.28, ee);
    sun.intensity = lerp(0.85, 0.12, ee);
    warm.intensity = ee * 1.1;
    yardGlow.intensity = ee * 0.8;
    tickMat.opacity = 1 - ee * 0.75;
    M.glass.emissiveIntensity = ee * 1.3;
    hemi.color.set("#ffffff").lerp(new T.Color("#8FA6D6"), ee);
    EDGE.opacity = lerp(0.42, 0.25, ee);
    WIRE.color.set("#1E3A8A").lerp(new T.Color("#6F93D8"), ee);
    conductors.forEach(function (c) { c.material.color.set("#1E3A8A").lerp(new T.Color("#FFC24D"), ee); });
    GHOST.opacity = 0.26 * clamp(1 - p * 1.25, 0, 1);
    ghost.visible = GHOST.opacity > 0.005;
  }

  /* ---------------- camera ---------------- */
  var W0 = 0, H0 = 0, az = 0, px = 0, py = 0, tpx = 0, tpy = 0, clock = new T.Clock(), idle = true;
  function frame() {
    var aspect = W0 / Math.max(H0, 1);
    // fit the whole site (plant + yard + tower) and leave room for the copy
    var span = (opts.span || (small ? 50 : 56)) * (1 + 0.32 * clamp((P - 0.55) / 0.15, 0, 1));
    var viewH = Math.max(span / aspect, 30);
    var zoomIn = lerp(1.0, 0.9, clamp((P - 0.08) / 0.3, 0, 1));
    viewH *= zoomIn;
    var viewW = viewH * aspect;
    var off = opts.offsetX || 0, offY = opts.offsetY || 0; // shift the model so the copy has room
    cam.left = -viewW / 2 - off * viewW; cam.right = viewW / 2 - off * viewW;
    cam.top = viewH / 2 - offY * viewH; cam.bottom = -viewH / 2 - offY * viewH;
    cam.updateProjectionMatrix();
  }
  function place(time) {
    px += (tpx - px) * 0.06; py += (tpy - py) * 0.06;
    var base = 0.74 + P * 0.22 + Math.sin(time * 0.25) * (idle ? 0.025 : 0.01) + px * 0.06;
    var elev = 0.6 - P * 0.06 + py * 0.035;
    var d = 80;
    var k2 = clamp((P - 0.5) / 0.3, 0, 1);
    target.set(lerp(2, 13, k2), lerp(3, 5, k2), lerp(0, -5, k2));
    cam.position.set(target.x + Math.cos(base) * Math.cos(elev) * d, target.y + Math.sin(elev) * d, target.z + Math.sin(base) * Math.cos(elev) * d);
    cam.lookAt(target);
  }
  function pulsesAt(time) {
    var on = E > 0.25;
    for (var k = 0; k < pulses.length; k++) {
      var sp = pulses[k]; sp.visible = on;
      if (!on) continue;
      var u = ((time * 0.11) + k / pulses.length) % 1;
      path.getPointAt(u, sp.position);
      var s2 = 0.7 + 0.5 * Math.sin((u * 30) + time * 6);
      sp.scale.setScalar(s2 * clamp((E - 0.25) / 0.4, 0, 1));
    }
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    W0 = Math.max(1, r.width); H0 = Math.max(1, r.height);
    renderer.setSize(W0, H0, false);
    frame();
  }
  function render() {
    var time = clock.getElapsedTime();
    frame(); place(time); pulsesAt(time);
    renderer.render(scene, cam);
  }
  var running = false, raf = 0;
  function loop() { if (!running) return; render(); raf = requestAnimationFrame(loop); }

  apply(1); scan.visible = false; buildGhost();
  apply(0);
  resize();

  return {
    setProgress: function (p) { apply(clamp(p, 0, 1)); },
    pointer: function (x, y) { tpx = x; tpy = y; },
    setIdle: function (v) { idle = v; },
    setFrame: function (o) { Object.assign(opts, o); frame(); },
    get progress() { return P; },
    resize: resize,
    start: function () { if (!running) { running = true; loop(); } },
    stop: function () { running = false; cancelAnimationFrame(raf); },
    renderOnce: render,
    stages: STAGES,
    destroy: function () { running = false; cancelAnimationFrame(raf); renderer.dispose(); }
  };
}
