import 'gsap';
import Manager3D from './modules/Manager3d'



class App {

  constructor() {
    this.el = document.getElementById('container')
    this.init()
  }

  setSignals() {

  }

  init() {

    this.manager3d = new Manager3D(this.el)

  }


}
window.app = new App()
