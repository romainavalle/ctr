const THREE = require('THREE')
var glslify = require('glslify')

class MaterialWire {
  material = null
  tanCoef = 100
  tanSpeed = 5
  noise = .1
  beatDetected = 0

  constructor() {
    this.init()
  }

  init() {
    var texture = new THREE.TextureLoader().load('images/content/img.jpg')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(1, 1)

    let direction = new THREE.Vector2(0, 0)
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { type: "f", value: 1.0 },
        color: { type: "c", value: new THREE.Color(0x038edd) },
        tanCoef: { type: "f", value: this.tanCoef },
        tanSpeed: { type: "f", value: this.tanSpeed },
        noise: { type: "f", value: this.noise },
        allowTan: { type: 'f', value: 0 },
        beat: { type: 'f', value: 0 },
        signCurve: { type: 'f', value: 1 }
      },
      vertexShader: glslify('./shaders/wireVertex.glsl'),
      fragmentShader: glslify('./shaders/wireFragment.glsl'),
      depthTest: false,
      depthWrite: false,
      transparent: true,
      wireframe: true,
      blending: THREE.AdditiveBlending,
      visible:false
    })
    TweenMax.to(this, 8, { tanCoef: 200, yoyo: true, repeat: -1, ease: Quad.easeInOut })
    TweenMax.to(this, 5, { tanSpeed: 10, yoyo: true, repeat: -1, ease: Quad.easeInOut })
    TweenMax.to(this, 10, { noise: 1, yoyo: true, repeat: -1, ease: Quad.easeInOut })
  }

  render(beatDetected, time) {
    if(beatDetected===20)this.material.visible = true
    if (beatDetected % 10 === 0) this.material.uniforms['color'].value = new THREE.Color(Math.random() * 0xffffff)
    if (beatDetected % 20 === 0) this.material.uniforms['signCurve'].value = -1 * this.material.uniforms['signCurve'].value
      if (beatDetected != this.beatDetected) {
        this.beatDetected = beatDetected
        this.material.uniforms['allowTan'].value = THREE.Math.randInt(0, 5)
        //this.material.uniforms['allowTan'].value = 9
      }
    this.material.uniforms['tanCoef'].value = this.tanCoef
    this.material.uniforms['tanSpeed'].value = this.tanSpeed
    this.material.uniforms['noise'].value = this.noise
    this.material.uniforms['time'].value = time % 10
    this.material.uniforms['beat'].value = beatDetected

  }
}

export default MaterialWire;
