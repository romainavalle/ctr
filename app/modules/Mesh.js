const THREE = require('THREE')

import Geometry from './GeometryMesh'
import MaterialMesh from './MaterialMesh'
import MaterialMeshBasic from './MaterialMeshBasic'
import MaterialWire from './MaterialWire'
import SignalService from '../services/SignalService'

class Mesh {

  mesh = null
  time = 0
  beatDetected = 0

  constructor(el) {
  }

  setMeshAnimated(){
    this.material = new MaterialMesh()
    this.setMesh()

  }
  setMeshBasic(){
    this.material = new MaterialMeshBasic()
    this.setMesh()
  }
  setMeshWire(){
    this.material = new MaterialWire()
    this.setMesh()
  }
  setMesh() {
    this.mesh = new THREE.Mesh(new Geometry().geometry, this.material.material)
    this.mesh.rotation.z = -Math.PI / 4
  }

  doBeat() {
    this.beatDetected++
  }

  render(dt) {
    this.time += dt
    this.material.render(this.beatDetected,this.time)
  }
}

export default Mesh;
