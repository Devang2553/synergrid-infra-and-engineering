/* The header turns solid once you scroll, and inverts over night sections. */
export function headerTone() {
  const bar = document.getElementById("bar");
  if (!bar) return;
  bar.classList.toggle("is-solid", window.scrollY > 24);
  const y = bar.getBoundingClientRect().bottom + 2;
  const stack = document.elementsFromPoint ? document.elementsFromPoint(window.innerWidth / 2, y) : [];
  let dark = false;
  for (let i = 0; i < stack.length; i++) {
    if (bar.contains(stack[i])) continue;
    const n = stack[i].closest(".night, .asm.is-night, .phero__art");
    if (n && !n.classList.contains("phero__art")) dark = true;
    break;
  }
  bar.classList.toggle("is-dark", dark);
}

if (typeof window !== "undefined") window.addEventListener("scroll", headerTone, { passive: true });
