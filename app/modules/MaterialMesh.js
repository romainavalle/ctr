const THREE = require('THREE')
var glslify = require('glslify')

class MaterialMesh {
  material = null
  up = 0
  left = 0
  tanCoef = 100
  tanSpeed = 5
  isBeatChanging = false
  direction = new THREE.Vector2(this.up, this.left)
  beatDetected = 0

  constructor() {
    this.init()
  }

  init() {
    var texture = new THREE.TextureLoader().load('images/content/img1.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    var displacement = new THREE.TextureLoader().load('images/content/disp4.jpg');
    displacement.wrapS = THREE.RepeatWrapping;
    displacement.wrapT = THREE.RepeatWrapping;

    texture.repeat.set(1, 1);
    let direction = new THREE.Vector2(0, 0)
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { type: "f", value: 1.0 },
        color: { type: "c", value: new THREE.Color(0x038edd) },
        water: { type: "t", value: texture },
        displacement: { type: "t", value: displacement },
        tanCoef: { type: "f", value: this.tanCoef },
        tanSpeed: { type: "f", value: this.tanSpeed },
        direction: { type: "vec2", value: this.direction },
        resolution:{ type: "vec2", value: new THREE.Vector2(window.innerWidth,window.innerHeight) },
        beat: { type: 'f', value: 0 },
        allowTan: { type: 'f', value: 0 },
        stepCurve: { type: 'f', value: 0 },
        signCurve: { type: 'f', value: 1 }
      },
      vertexShader: glslify('./shaders/meshVertex.glsl'),
      fragmentShader: glslify('./shaders/meshFragment.glsl'),
      depthTest: false,
      depthWrite: false,
      transparent: true,
      visible: false
    })

    TweenMax.to(this, 10, { up: .3, yoyo: true, repeat: -1, ease: Quad.easeInOut })
    TweenMax.to(this, 7, { left: .3, yoyo: true, repeat: -1, ease: Quad.easeInOut })
    TweenMax.to(this, 8, { tanCoef: 200, yoyo: true, repeat: -1, ease: Quad.easeInOut })
    TweenMax.to(this, 5, { tanSpeed: 10, yoyo: true, repeat: -1, ease: Quad.easeInOut })
  }

  render(beatDetected, time) {
    let t = time
    if(beatDetected===20)this.material.visible = true
    if (beatDetected < 20) {
      t = 0
    }
    this.material.uniforms['beat'].value = beatDetected
    if (t != 0) {
      if (beatDetected % 10 === 0) this.material.uniforms['color'].value = new THREE.Color(Math.random() * 0xffffff)
      if (beatDetected % 20 === 0) this.material.uniforms['signCurve'].value = -1 * this.material.uniforms['signCurve'].value
      this.direction.x = this.left
      this.direction.y = this.up
      if (beatDetected != this.beatDetected) {
        this.beatDetected = beatDetected
        this.material.uniforms['stepCurve'].value = Math.random()
        this.material.uniforms['allowTan'].value = THREE.Math.randInt(0, 12)
        //this.material.uniforms['allowTan'].value = 9
      }
      this.material.uniforms['direction'].value = this.direction
      this.material.uniforms['tanCoef'].value = this.tanCoef
      this.material.uniforms['tanSpeed'].value = this.tanSpeed
      this.material.uniforms['time'].value = time % 10

    }

  }
}

export default MaterialMesh;
