const fs = require("fs");
const svg2img = require("svg2img");
const cards = require("./cards");
const GIFEncoder = require("gifencoder");
const pngFileStream = require("png-file-stream");

const width = 1000;
const height = 1400;

(async () => {
  for (let card in cards) {
    createPng(getSvg(card, 0.1), "A");
    createPng(getSvg(card, 0.15), "B");
    createPng(getSvg(card, 0.2), "C");
    createPng(getSvg(card, 0.25), "D");
    createPng(getSvg(card, 0.3), "E");
    createPng(getSvg(card, 0.35), "F");
    createPng(getSvg(card, 0.4), "G");
    createPng(getSvg(card, 0.45), "H");
    createPng(getSvg(card, 0.5), "I");
    createPng(getSvg(card, 0.45), "J");
    createPng(getSvg(card, 0.4), "K");
    createPng(getSvg(card, 0.35), "L");
    createPng(getSvg(card, 0.3), "M");
    createPng(getSvg(card, 0.25), "N");
    createPng(getSvg(card, 0.2), "O");
    createPng(getSvg(card, 0.15), "P");
    createPng(getSvg(card, 0.1), "Q");
    await createGif(card);
    fs.readdirSync("./cards").forEach((file) => {
      fs.unlinkSync(`./cards/${file}`);
    });
  }
})();

function getSvg(card, opacity) {
  return `
    <svg width="1000" height="1400" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" rx="20" ry="20" width="1000" height="1400" style="fill: rgb(208, 247, 185)"/>
      <text font-size="60" font-family="Silkscreen" x="80" y="140" fill="rgb(2,78,29)">
          NUMBER
        </text>
      <text font-size="120" font-family="monogram" x="80" y="220" fill="rgb(2,78,29)">
        ${card}
        </text>
      <text font-size="500" font-family="monogram" x="500" y="750" fill="rgb(2,78,29)" text-anchor="middle">
        0x${Number(card).toString(16).padStart(2, 0).toUpperCase()}
        </text>
      <text font-size="500" font-family="monogram" x="510" y="760" fill="rgba(2,78,29, ${opacity})" text-anchor="middle">
        0x${Number(card).toString(16).padStart(2, 0).toUpperCase()}
        </text>
      <text font-size="60" font-family="Silkscreen" x="920" y="1200" fill="rgb(2,78,29)" text-anchor="end">
        RARITY: ${cards[card].class}
        </text>
      <text font-size="120" font-family="monogram" x="920" y="1280" fill="rgb(2,78,29)" text-anchor="end">
        ${cards[card].stars}
        </text>
    </svg> 
  `;
}

async function createPng(svgString, name) {
  svg2img(svgString, function (error, buffer) {
    if (error) return console.log(error);
    fs.writeFileSync(`./cards/${name}.png`, buffer);
  });
}

async function createGif(name) {
  return new Promise((resolve) => {
    const encoder = new GIFEncoder(width, height);
    const stream = pngFileStream("cards/**.png")
      .pipe(encoder.createWriteStream({ repeat: 0, delay: 100, quality: 10 }))
      .pipe(fs.createWriteStream("./gif/" + name + ".gif"));

    stream.on("finish", () => {
      resolve();
    });
  });
}
