const fs = require("fs");
const svg2img = require("svg2img");
const cards = require("./cards");

for (let card in cards) {
  const svgString = `
    <svg width="1000" height="1400" xmlns="http://www.w3.org/2000/svg">
    <rect
    x="0"
    y="0"
    rx="20"
    ry="20"
    width="1000"
    height="1400"
    style="fill: rgb(208, 247, 185)"
    />
    <text
    font-size="60"
    font-family="Silkscreen"
    x="80"
    y="140"
    fill="rgb(2,78,29)"
    >
    NUMBER
    </text>
    <text
    font-size="120"
    font-family="monogram"
    x="80"
    y="220"
    fill="rgb(2,78,29)"
    >
    ${card}
    </text>
    <text
    font-size="500"
    font-family="monogram"
    x="500"
    y="750"
    fill="rgb(2,78,29)"
    text-anchor="middle"
    >
    0x${Number(card).toString(16).padStart(2, "0").toUpperCase()}
    </text>

    <text
    font-size="500"
    font-family="monogram"
    x="505"
    y="755"
    fill="rgba(2,78,29, 0.5)"
    text-anchor="middle"
    >
    0x${Number(card).toString(16).padStart(2, "0").toUpperCase()}
    </text>

    <text
    font-size="60"
    font-family="Silkscreen"
    x="920"
    y="1200"
    fill="rgb(2,78,29)"
    text-anchor="end"
    >
    RARITY: ${cards[card].class}
    </text>
    <text
    font-size="120"
    font-family="monogram"
    x="920"
    y="1280"
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
