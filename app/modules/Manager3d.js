const THREE = require('THREE')

import Stats from 'stats-js'
import Stage3d from './Stage3d'
import Mesh from './Mesh'
import MeshPoint from './MeshPoint'
import Audio from './Audio'
import SignalService from '../services/SignalService'

class Manager3d {
  el = null
  stage3d = null
  mesh = null
  stats = null
  audio = null

  constructor(el) {
    this.el = el

    this.initBind()
    this.init()
  }

  initBind() {
    this.animate = this.animate.bind(this)
    this.onBeat = this.onBeat.bind(this)
  }

  init() {
    //
    this.count = 0
    this.clock = new THREE.Clock();
    this.stage3d = new Stage3d(this.el)
    this.meshBasic = new Mesh()
    this.meshBasic.setMeshBasic()
    this.mesh = new Mesh()
    this.mesh.setMeshAnimated()
    this.meshWire = new Mesh()
    this.meshWire.setMeshWire()
    this.points = new MeshPoint()
    this.stage3d.add(this.points.mesh)
    this.stage3d.add(this.meshBasic.mesh)
    this.stage3d.add(this.mesh.mesh)
    this.stage3d.add(this.meshWire.mesh)
    this.audio = new Audio()
    this.audio.start()
    this.meshBasic.mesh.position.z = 0
    this.mesh.mesh.position.z = 1
    this.meshWire.mesh.position.z = 2
    SignalService.AUDIO_ON_BEAT.add(this.onBeat)
    this.setStats()
    //
    this.animate()
  }

  setStats(){
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';
    this.el.appendChild(this.stats.domElement);
  }

  updateParticules(sectionId){
    this.mesh.updateParticules(sectionId)
  }

  onBeat(){
    this.mesh.doBeat()
    this.meshWire.doBeat()
    this.points.doBeat()
  }

  animate() {
    requestAnimationFrame(this.animate);
    let dt = this.clock.getDelta()
    this.meshBasic.render(dt)
    this.mesh.render(dt)
    this.meshWire.render(dt)
    this.points.render(dt)
    this.stage3d.render()
    this.stats.update()
    this.audio.update(dt)
  }
}

export default Manager3d;
