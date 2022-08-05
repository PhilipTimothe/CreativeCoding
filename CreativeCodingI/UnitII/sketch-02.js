const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1080, 1080 ]
};

const degreeToRadiant = (degrees) => {
  return degrees / 180 * Math.PI
}

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
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
      // const slice = degreeToRadiant(360 / num)
      const slice = math.degToRad(360 / num)

      const angle = slice * i

      x = centerX + radius * Math.sin(angle);
      y = centerY + radius * Math.cos(angle)

      context.save(); // always start with save and end with restore in order to not allow translate and rotate methods to influence or alter initial variables
      context.translate(x, y);
      // context.rotate(0.3); // context.rotate(0.3); the 0.3 is in radiants. But it is easier to work with degrees. To get 45 degrees we divide the angle by 180 * Math.PI
      context.rotate(-angle); // arrow function created for cleaner code
      // context.scale(randomRange(0.5, 4), 1) // to get a range on scale we can use (3 -1) + 1, but for cleaner code we create a function that will take the two values and create randomness
      context.scale(random.range(0.5, 3), 1)

      context.beginPath();
      // context.rect(-w * 0.5, -h * 0.5, w, h);
      context.rect(-w * 0.5,random.range(0, -h * 0.5), w, h);
      context.fill();
      context.restore();

      // create another block of context.save() and context.restore()
      context.save()
      context.translate(centerX, centerY)
      context.rotate(-angle)

      context.lineWidth = random.range(2, 10)

      context.beginPath()
      // context.arc(0,0, radius, slice * -0.3, slice * 0.3)
      context.arc(0,0, radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 5))
      context.stroke()

      context.restore()
    }


     
  };
};

canvasSketch(sketch, settings);
  
