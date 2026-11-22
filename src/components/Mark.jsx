/* The Synergrid Infra LLP logo (client artwork, public/logo-full*.webp).
   tone="light" for pale backgrounds, "dark" for night backgrounds, and
   "auto" renders both so CSS can swap them when the header inverts. */
const W = 480, H = 174;

export function Brand({ tone = "light" }) {
  const img = (t) => (
    <img
      key={t}
      className={tone === "auto" ? "mark__img mark__img--" + t : "mark__img"}
      src={t === "dark" ? "/logo-full-dark.webp" : "/logo-full.webp"}
      width={W}
      height={H}
      alt={t === "light" || tone !== "auto" ? "Synergrid Infra LLP" : ""}
      aria-hidden={tone === "auto" && t === "dark" ? "true" : undefined}
      decoding="async"
    />
  );
  return tone === "auto" ? <>{img("light")}{img("dark")}</> : img(tone);
}
