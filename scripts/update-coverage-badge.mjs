import { readFileSync, writeFileSync } from "node:fs";

const summaryPath = "coverage/coverage-summary.json";
const outputPath = "coverage-badge.svg";

const summary = JSON.parse(readFileSync(summaryPath, "utf8"));
const pct = Number(summary.total.lines.pct).toFixed(0);

function getColor(value) {
  if (value >= 100) return "#16a34a";
  if (value >= 90) return "#84cc16";
  if (value >= 80) return "#eab308";
  if (value >= 70) return "#f97316";
  return "#ef4444";
}

const label = "coverage";
const message = `${pct}%`;

const labelWidth = 66;
const valueWidth = Math.max(46, message.length * 9 + 12);
const totalWidth = labelWidth + valueWidth;
const color = getColor(Number(pct));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" role="img" aria-label="${label}: ${message}">
  <title>${label}: ${message}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${labelWidth}" height="20" fill="#555"/>
    <rect x="${labelWidth}" width="${valueWidth}" height="20" fill="${color}"/>
    <rect width="${totalWidth}" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">
    <text x="${Math.floor(labelWidth / 2)}" y="15" fill="#010101" fill-opacity=".3">${label}</text>
    <text x="${Math.floor(labelWidth / 2)}" y="14">${label}</text>
    <text x="${labelWidth + Math.floor(valueWidth / 2)}" y="15" fill="#010101" fill-opacity=".3">${message}</text>
    <text x="${labelWidth + Math.floor(valueWidth / 2)}" y="14">${message}</text>
  </g>
</svg>
`;

writeFileSync(outputPath, svg);
console.log(`Updated ${outputPath} with ${message}.`);
