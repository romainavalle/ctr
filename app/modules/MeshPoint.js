const THREE = require('THREE')

import Geometry from './GeometryPoint'
import Material from './MaterialPoint'
import SignalService from '../services/SignalService'

class MeshPoint {

  mesh = null
  time = 0
  beatDetected = 0

  constructor(el) {
    this.init()
  }

  init() {
    this.setMesh()
  }

  setMesh() {
    this.material = new Material()
    this.geometry = new Geometry()
    this.mesh = new THREE.Points(this.geometry.geometry, this.material.material);
    this.mesh.position.z = -200
  }

  doBeat() {
    this.beatDetected++
  }

  render(dt) {
    this.time += dt
    this.material.render(this.beatDetected, this.time)
    this.geometry.render(this.beatDetected, this.time)
    this.mesh.rotation.z = 0.01 * this.time ;

  }
}

export default MeshPoint;
