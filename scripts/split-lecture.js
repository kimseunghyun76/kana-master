const fs = require('fs');

const dataContent = fs.readFileSync('js/data/lecture-data.js', 'utf8');

// Use regex to extract the object
const objStart = dataContent.indexOf('var LECTURE_DATA = {');
const objEnd = dataContent.lastIndexOf('};');

if (objStart === -1 || objEnd === -1) {
  console.error("Could not find LECTURE_DATA");
  process.exit(1);
}

const objStr = dataContent.slice(objStart + 'var LECTURE_DATA = '.length, objEnd + 1);

let LECTURE_DATA;
try {
  LECTURE_DATA = eval('(' + objStr + ')');
} catch (e) {
  console.error("Eval failed", e);
  process.exit(1);
}

fs.mkdirSync('js/data/lecture-data-v2', { recursive: true });

// Create an index loader file
let loaderContent = `// Automatically loads all lecture chunks\nwindow.LECTURE_DATA = {};\n`;
let scriptTags = ``;

for (const key of Object.keys(LECTURE_DATA)) {
  if (key !== 'wlevel_1' && key !== 'wlevel_2') {
    const fileContent = `window.LECTURE_DATA = window.LECTURE_DATA || {};\nwindow.LECTURE_DATA.${key} = ${JSON.stringify(LECTURE_DATA[key], null, 2)};\n`;
    fs.writeFileSync(`js/data/lecture-data-v2/${key}.js`, fileContent, 'utf8');
    console.log(`Wrote ${key}.js`);
  }
  loaderContent += `document.write('<script src="js/data/lecture-data-v2/${key}.js"></script>');\\n`;
  scriptTags += `<script src="js/data/lecture-data-v2/${key}.js"></script>\\n`;
}

fs.writeFileSync('js/data/lecture-data-v2/index.js', loaderContent, 'utf8');
console.log("Writing complete.");
console.log("Add the following to app.html and index.html:");
console.log(`<script src="js/data/lecture-data-v2/index.js"></script>`);
