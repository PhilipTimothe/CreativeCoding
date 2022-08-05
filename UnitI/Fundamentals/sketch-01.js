const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080], // dimensions if preparing for instagram (example)
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;

    const w = width * 0.1;
    const h = height * 0.1;
    const gap = width * 0.03;
    let initialX = width * 0.17;
    let initialY = height * 0.17;

    const offset = width * 0.02;

    let x;
    let y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = initialX + (w + gap) * i;
        y = initialY + (h + gap) * j;
        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();

        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(x + offset / 2, y + offset / 2, w - offset, h - offset);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
