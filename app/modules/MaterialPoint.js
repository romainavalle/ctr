const THREE = require('THREE')
var glslify = require('glslify')

class MaterialPoint {
  material = null

  beatDetected = 0

  constructor() {
    this.init()
  }

  init() {
    let uniforms = {
      color: { value: new THREE.Color(0xffffff) },
      time: { value: 0},
      beat: { value: 0},
      texture: { value: new THREE.TextureLoader().load("images/content/spark1.png") }
    };
    this.material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: glslify('./shaders/pointVertex.glsl'),
      fragmentShader: glslify('./shaders/pointFragment.glsl'),
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true
    });
  }

  render(beatDetected, time) {
    this.material.uniforms['beat'].value =beatDetected
    this.material.uniforms['time'].value =time
  }
}

export default MaterialPoint;
