let sunRadius = 100;
let blockSize = 10;
let blocks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // Initialize the array of blocks
  for (let i = 0; i < 360; i += 5) {
    let x = width / 2 + cos(i) * sunRadius;
    let y = height / 2 + sin(i) * sunRadius;
    blocks.push(createBlock(x, y, i));
  }
}

function draw() {
  clear();

  // Display and update each block
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].display();
    blocks[i].toggle(i); // Pass the index to toggle function
    blocks[i].sizeChange();
  }
}

// Block object
function createBlock(x, y, angle) {
  return {
    x: x,
    y: y,
    size: blockSize,
    bright: 255,
    active: false,
    sizeChangeFactor: 0.5,
    angle: angle,

    display: function() {
      fill(255, 165, 0, this.bright);
      noStroke();
      rectMode(CENTER);
      rect(this.x, this.y, this.size, this.size);
    },

    toggle: function(index) {
      // Activate blocks based on their position in the circle
      let activationProbability = map(index, 0, blocks.length, 0.2, 0.8);
      if (random() < activationProbability) {
        this.active = true;
      }
      this.bright = this.active ? 255 : 0;
    },

    sizeChange: function() {
      // Gradually change the size of the block towards the center
      let distanceToCenter = dist(this.x, this.y, width / 2, height / 2);
      let maxSize = blockSize + (distanceToCenter / sunRadius) * blockSize;
      this.size += random(-this.sizeChangeFactor, this.sizeChangeFactor);
      this.size = constrain(this.size, blockSize - 2, maxSize);
    },
  };
}
