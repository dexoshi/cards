const fs = require("fs");
const svg2img = require("svg2img");
const cards = require("./cards");

for (let card in cards) {
  const svgString = `
    <svg width="500" height="700" xmlns="http://www.w3.org/2000/svg">
    <rect
    x="0"
    y="0"
    rx="20"
    ry="20"
    width="500"
    height="700"
    style="fill: rgb(208, 247, 185)"
    />
    <text
    font-size="30"
    font-family="Silkscreen"
    x="40"
    y="70"
    fill="rgb(2,78,29)"
    >
    NUMBER
    </text>
    <text
    font-size="60"
    font-family="monogram"
    x="40"
    y="110"
    fill="rgb(2,78,29)"
    >
    ${card}
    </text>
    <text
    font-size="280"
    font-family="monogram"
    x="250"
    y="400"
    fill="rgb(2,78,29)"
    text-anchor="middle"
    >
    0x${Number(card).toString(16).padStart(2, "0").toUpperCase()}
    </text>
    <text
    font-size="30"
    font-family="Silkscreen"
    x="460"
    y="600"
    fill="rgb(2,78,29)"
    text-anchor="end"
    >
    RARITY: ${cards[card].class}
    </text>
    <text
    font-size="60"
    font-family="monogram"
    x="460"
    y="640"
    fill="rgb(2,78,29)"
    text-anchor="end"
    >
    ${cards[card].stars}
    </text>
    </svg>
`;

  svg2img(svgString, function (error, buffer) {
    if (error) return console.log(error);
    fs.writeFileSync(`./cards/${card}.png`, buffer);
  });
}
