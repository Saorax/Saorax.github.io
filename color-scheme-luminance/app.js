function hexToRgb(input) {
  const value = input.trim().toUpperCase();
  if (value.length !== 6 || /[^0-9A-F]/.test(value)) {
    throw new Error("Use exactly 6 hex digits, e.g. CF1F31");
  }
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

function rgbToHex(rgb) {
  return rgb
    .map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

function luminance(rgb) {
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function shadeFromNeutral(neutralHex, factor) {
  const [r, g, b] = hexToRgb(neutralHex).map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h /= 6;
    if (h < 0) h += 1;
  }

  const s = max === 0 ? 0 : delta / max;
  const v = Math.max(0, Math.min(1, max * factor));

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  const mod = i % 6;
  const rgbf =
    mod === 0 ? [v, t, p] :
    mod === 1 ? [q, v, p] :
    mod === 2 ? [p, v, t] :
    mod === 3 ? [p, q, v] :
    mod === 4 ? [t, p, v] : [v, p, q];

  const rgb = rgbf.map((x) => Math.round(x * 255));
  return { rgb, hex: rgbToHex(rgb) };
}

const shades = [
  { name: "VL", factor: 1.35 },
  { name: "Lt", factor: 1.18 },
  { name: "N", factor: 1.00 },
  { name: "Dk", factor: 0.78 },
  { name: "VD", factor: 0.62 },
];

const neutralEl = document.getElementById("neutral");
const neutralPickerEl = document.getElementById("neutralPicker");
const errorEl = document.getElementById("error");
const generateEl = document.getElementById("generate");
const tileGridEl = document.getElementById("tileGrid");

function textColorForBackground(rgb) {
  return luminance(rgb) >= 140 ? "#111111" : "#FFFFFF";
}

function render() {
  errorEl.textContent = "";

  try {
    const neutral = neutralEl.value.trim().toUpperCase();
    const neutralRgb = hexToRgb(neutral);
    const neutralLum = luminance(neutralRgb);
    neutralPickerEl.value = `#${rgbToHex(neutralRgb)}`;

    tileGridEl.innerHTML = "";
    for (const shade of shades) {
      const { rgb, hex } = shadeFromNeutral(neutral, shade.factor);
      const delta = luminance(rgb) - neutralLum;
      const deltaText = `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}`;

      const card = document.createElement("div");
      card.className = "tile-card";

      const tile = document.createElement("div");
      tile.className = "tile";
      tile.style.background = `#${hex}`;
      tile.style.color = textColorForBackground(rgb);
      tile.textContent = shade.name;
      card.appendChild(tile);

      const meta = document.createElement("div");
      meta.className = "tile-meta";
      meta.innerHTML = `
        <div>RGB: (${rgb[0]}, ${rgb[1]}, ${rgb[2]})</div>
        <div>HEX: ${hex}</div>
        <div>dL: ${deltaText}</div>
      `;
      card.appendChild(meta);
      tileGridEl.appendChild(card);
    }
  } catch (err) {
    tileGridEl.innerHTML = "";
    errorEl.textContent = err.message || "Invalid input";
  }
}

generateEl.addEventListener("click", render);
neutralEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") render();
});
neutralEl.addEventListener("input", () => {
  const value = neutralEl.value.trim().toUpperCase();
  if (value.length === 6 && !/[^0-9A-F]/.test(value)) {
    neutralPickerEl.value = `#${value}`;
  }
});
neutralPickerEl.addEventListener("input", () => {
  neutralEl.value = neutralPickerEl.value.replace("#", "").toUpperCase();
  render();
});

render();

