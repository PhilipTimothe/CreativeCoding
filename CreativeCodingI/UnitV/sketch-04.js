const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const tweakPane = require("tweakpane");

const settings = {
  dimensions: [1080, 1080],
  // animate sketch
  animate: true,
};

// add tweak pane params here...
const params = {
  columns: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  frame: 0,
  animate: true,
  lineCap: "butt",
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    // add frame value here.. search api docs for detailed info
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // create 4 columns and 3 rows
    const columns = params.columns;
    const rows = params.rows;
    const numCells = columns * rows;

    // set grid parameters for width and height
    const gridWidth = width * 0.8;
    const gridHeight = height * 0.8;
    const cellWidth = gridWidth / columns;
    const cellHeight = gridHeight / rows;
    const marginX = (width - gridWidth) * 0.5;
    const marginY = (height - gridHeight) * 0.5;

    // create a for loop to go over each cell of the grid
    for (let i = 0; i < numCells; i++) {
      //  use the remainder operator to find the grid cells in the x axis
      const column = i % columns;
      // to find the columns on the y axis we can use divsion. Flooring the result will return the nearest integer, hence maintaing the columns number/accuracy
      const row = Math.floor(i / columns);

      // We can find each cell with the privided information a such
      const x = column * cellWidth;
      const y = row * cellHeight;

      // create a line smaller than the cell in each cell
      const lineWidth = cellWidth * 0.8;
      const lineHeight = cellHeight * 0.8;

      const f = params.animate ? frame : params.frame;

      // implement noise code
      // const noise = random.noise2D(x + frame * 10, y, params.freq); // add frame here and multiply it by 10 to increase animation speed
      const noise = random.noise3D(x, y, f * 10, params.freq); // add frame here and multiply it by 10 to increase animation speed
      const rotationAngle = noise * Math.PI * params.amp;
      // const scale = ((noise + 1) / 2) * 30;
      const scale = math.mapRange(
        noise,
        -1,
        1,
        params.scaleMin,
        params.scaleMax
      );

      // start drawing here...
      context.save();
      context.translate(x, y);

      // to get drawing to the center of the page add translates
      // translate from the top left of the cell and the center
      context.translate(marginX, marginY);
      context.translate(cellWidth * 0.5, cellHeight * 0.5);
      context.rotate(rotationAngle);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(lineWidth * -0.5, 0);
      context.lineTo(lineWidth * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new tweakPane.Pane();

  // add UI components
  let folder;

  folder = pane.addFolder({ title: "Grid" });
  folder.addInput(params, "lineCap", {
    options: { butt: "butt", round: "round", square: "square" },
  });
  folder.addInput(params, "columns", { min: 2, max: 50, step: 1 });
  folder.addInput(params, "rows", { min: 2, max: 50, step: 1 });
  folder.addInput(params, "scaleMin", { min: 1, max: 100 });
  folder.addInput(params, "scaleMax", { min: 1, max: 100 });

  folder = pane.addFolder({ title: "Noise" });
  folder.addInput(params, "freq", { min: -0.01, max: 0.01 });
  folder.addInput(params, "amp", { min: 0, max: 1 });
  folder.addInput(params, "animate");
  folder.addInput(params, "frame", { min: 0, max: 999 });
};

createPane();
canvasSketch(sketch, settings);

// npm install canvas-sketch-util --save
// npm i tweakpane
