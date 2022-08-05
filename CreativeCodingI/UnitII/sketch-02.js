const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const degreeToRadiant = (degrees) => {
  return degrees / 180 * Math.PI
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;

    const num = 12;
    const radius = width * 0.3

    for (let i = 0; i < num; i++) {
      const slice = degreeToRadiant(360 / num)
      const angle = slice * i

      x = centerX + radius * Math.sin(angle);
      y = centerY + radius * Math.cos(angle)

      context.save(); // always start with save and end with restore in order to not allow translate and rotate methods to influence or alter initial variables
      context.translate(x, y);
      // context.rotate(0.3); // context.rotate(0.3); the 0.3 is in radiants. But it is easier to work with degrees. To get 45 degrees we divide the angle by 180 * Math.PI
      context.rotate(-angle); // arrow function created for cleaner code
  
      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();
    }


     
  };
};

canvasSketch(sketch, settings);
  
