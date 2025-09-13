// Map a letter (or any string) to a deterministic hex color, never black
export function letterToHex(letter: string, saturation: number = 65, lightness: number = 55): string {
  if (!letter) return '#373737'; // fallback, evita nero
  const ch = letter[0].toLowerCase();
  let hue: number;

  if (ch >= 'a' && ch <= 'z') {
    const index = ch.charCodeAt(0) - 97; // 0..25
    hue = Math.round((index / 26) * 360);
  } else {
    // fallback for non-letters
    hue = letter.charCodeAt(0) % 360;
  }

  const minLightness = 0;
  const L = Math.max(lightness, minLightness);

  return hslToHex(hue, saturation, L);
}

function hslToHex(h: number, s: number, l: number): string {
  const H = h / 360;
  const S = s / 100;
  const L = l / 100;

  const q = L < 0.5 ? L * (1 + S) : L + S - L * S;
  const p = 2 * L - q;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const r = Math.round(hue2rgb(p, q, H + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, H) * 255);
  const b = Math.round(hue2rgb(p, q, H - 1 / 3) * 255);

  const toHex = (v: number) => v.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
