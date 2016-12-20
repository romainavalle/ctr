const THREE = require('THREE')
var glslify = require('glslify')

class MaterialMeshBasic {
  material = null

  constructor() {
    this.init()
  }

  init() {
    var texture = new THREE.TextureLoader().load('images/content/img1.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    var disp0 = new THREE.TextureLoader().load('images/content/disp0.jpg');
    disp0.wrapS = THREE.RepeatWrapping;
    disp0.wrapT = THREE.RepeatWrapping;
    disp0.repeat.set(1, 1);
    var disp1 = new THREE.TextureLoader().load('images/content/disp1.jpg');
    disp1.wrapS = THREE.RepeatWrapping;
    disp1.wrapT = THREE.RepeatWrapping;
    disp1.repeat.set(1, 1);
    var disp2 = new THREE.TextureLoader().load('images/content/disp2.jpg');
    disp2.wrapS = THREE.RepeatWrapping;
    disp2.wrapT = THREE.RepeatWrapping;
    disp2.repeat.set(1, 1);
    var disp3 = new THREE.TextureLoader().load('images/content/disp3.jpg');
    disp3.wrapS = THREE.RepeatWrapping;
    disp3.wrapT = THREE.RepeatWrapping;
    disp3.repeat.set(1, 1);
    var disp4 = new THREE.TextureLoader().load('images/content/disp4.jpg');
    disp4.wrapS = THREE.RepeatWrapping;
    disp4.wrapT = THREE.RepeatWrapping;
    disp4.repeat.set(1, 1);
    let direction = new THREE.Vector2(0, 0)
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        water: { type: "t", value: texture },
        disp0: { type: "t", value: disp0 },
        disp1: { type: "t", value: disp1 },
        disp2: { type: "t", value: disp2 },
        disp3: { type: "t", value: disp3 },
        disp4: { type: "t", value: disp4 },
        time: { type: "f", value: 0 },
        dispId: { type: "f", value: 4 }
      },
      vertexShader: glslify('./shaders/meshVertex.glsl'),
      fragmentShader: glslify('./shaders/waterFragment.glsl'),
      depthTest: false,
      depthWrite: false,
      transparent: true
    })
  }

  render(beatDetected, time) {
    if(beatDetected>20 && beatDetected%10 == 0)this.material.uniforms['dispId'].value = THREE.Math.randInt(0, 4)
    this.material.uniforms['time'].value = time
  }
}

export default MaterialMeshBasic;
