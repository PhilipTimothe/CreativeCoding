const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // create 4 columns and 3 rows
    const columns = 10;
    const rows = 10;
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

      // start drawing here...
      context.save();
      context.translate(x, y);

      // to get drawing to the center of the page add translates
      // translate from the top left of the cell and the center
      context.translate(marginX, marginY);
      context.translate(cellWidth * 0.5, cellHeight * 0.5);

      context.lineWidth = 4;

      context.beginPath();
      context.moveTo(lineWidth * -0.5, 0);
      context.lineTo(lineWidth * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
