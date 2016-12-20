const THREE = require('three')

import ResizeHelper from '../helpers/ResizeHelper'
import SignalService from '../services/SignalService'
import PostProcess from './PostProcess'

//import ControlKit from 'ControlKit'


class Stage3d {
  el = null
  camera = null
  scene = null
  renderer = null
  usePostProcessing = false

  constructor(el) {
    this.el = el
    this.initBind()
    this.init()
  }

  initBind() {
    this.onWindowResize = this.onWindowResize.bind(this)
  }

  init() {
    this.camera = new THREE.PerspectiveCamera(45, ResizeHelper.width() / ResizeHelper.height(), 5, 10000);
    this.camera.position.z = 1500
    this.camera.position.y = 100
    this.scene = new THREE.Scene();
    //
      //
    this.renderer = new THREE.WebGLRenderer({ });
    this.renderer.setClearColor(0x111111, 1);
    this.renderer.setPixelRatio(1 /*window.devicePixelRatio*/ );
    this.renderer.setSize(ResizeHelper.width(), ResizeHelper.height());
    this.el.appendChild(this.renderer.domElement);

    SignalService.WINDOW_RESIZED.add(this.onWindowResize)
    if(window.isDev)window.controlKit = new ControlKit();
    //this.initPostProcessing()
  }

  initPostProcessing() {
    this.usePostProcessing = true
    this.postProcess = new PostProcess(this.renderer, this.scene, this.camera)
  }

  add(mesh) {
    this.scene.add(mesh);
  }

  onWindowResize() {
    this.camera.aspect = ResizeHelper.width() / ResizeHelper.height();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(ResizeHelper.width(), ResizeHelper.height());
    if (this.usePostProcessing) this.postProcess.doResize()
  }


  render() {
    if (this.usePostProcessing) {
      this.postProcess.update()
    } else {
      this.renderer.render(this.scene, this.camera)
    }
  }
}

export default Stage3d;
