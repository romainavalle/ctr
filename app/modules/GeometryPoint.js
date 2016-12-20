const THREE = require('THREE')


class GeometryPoint {
  geometry = null
  radius = 2000
  particles = 100000

  constructor() {
    this.init()
  }

  init() {
    this.geometry = new THREE.BufferGeometry();
    var positions = new Float32Array(this.particles * 3);
    var colors = new Float32Array(this.particles * 3);
    var sizes = new Float32Array(this.particles);
    var color = new THREE.Color();
    for (var i = 0, i3 = 0; i < this.particles; i++, i3 += 3) {
      positions[i3 + 0] = (Math.random() * 2 - 1) * this.radius;
      positions[i3 + 1] = (Math.random() * 2 - 1) * this.radius;
      positions[i3 + 2] = -500;
      color.setHSL(i / this.particles, 1.0, 0.5);
      colors[i3 + 0] = ( Math.round(Math.random()*10))/255;
      colors[i3 + 1] = (135 + Math.round(Math.random()*10))/255;
      colors[i3 + 2] = (215 + Math.round(Math.random()*10))/255;
      sizes[i] = 5;
    }

    this.geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    this.geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
  }

  render(beatDetected, time) {
    var sizes = this.geometry.attributes.size.array;
    for (var i = 0; i < this.particles; i++) {
      sizes[i] = 10 * (1 + Math.sin(0.1 * i + time));
    }
    this.geometry.attributes.size.needsUpdate = true;
  }


}

export default GeometryPoint;
