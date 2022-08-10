const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1080, 1080 ],
  // adding animate allows for animation of the sketch in 60fps
  animate: true,
};

// to animate manually call browser window function requestAnimationFrame() such as below
// const animate = () => { 
//   console.log('domestika');
//   requestAnimationFrame(animate);
// }
// animate()

const sketch = ({ context, width, height }) => { // the three parameters are available globally.  So we can copy and paste them from the return to the parameters in const sketch
  const agents = []
  
  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width)
    const y = random.range(0, height)

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
    
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(random.range(-1, 1), random.range(1, 1));
    this.radius = random.range(4, 12);
  }

  // keeps objects in the bounds of the sketch dimensions
  bounce(width, height) {
    if (this.position.x <= 0 || this.position.x >= width) this.velocity.x *= -1
    if (this.position.y <= 0 || this.position.y >= height) this.velocity.y *= -1
  }

  // adds the velocity to the method
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  draw(context) {
    context.save();
    context.translate(this.position.x, this.position.y);

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}