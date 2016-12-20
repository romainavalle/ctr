import SignalService from './SignalService'
import BrowserHelper from '../helpers/BrowserHelper'
import debounce from 'lodash.debounce'
import Hammer from 'Hammerjs'

class ScrollService {

  isScrolling_bool = false
  deltaY = 0
  sign = 0

  constructor() {
    this.handleScroll = this.handleScroll.bind(this)
    this.handleHammer = this.handleHammer.bind(this)
    this.toogleScrollingBool = this.toogleScrollingBool.bind(this)
    this.debounced = debounce(this.toogleScrollingBool, 2000, { maxWheight: 2500 })
    this.init()
  }

  init() {
    if (BrowserHelper.isTouch()) {
      this.hammer = new Hammer(document.getElementById('container'))
      this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
      this.hammer.on('swipeup swipedown', this.handleHammer)
    } else {
      var wheelEvt = "onwheel" in document.createElement("div") ? "wheel" : //     Modern browsers support "wheel"
          document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
          "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox
      window.addEventListener(wheelEvt, this.handleScroll, false);
    }
  }

  handleHammer(e) {
    if(this.isScrolling_bool)return
    switch (e.type) {
      case 'swipeup':
        SignalService.MOUSE_WHEEL.dispatch(1)
        break
      case 'swipedown':
        SignalService.MOUSE_WHEEL.dispatch(-1)
        break
    }
    this.isScrolling_bool = true
    this.debounced()
  }

  handleScroll(e) {
    let deltaY = e.deltaY || -e.wheelDelta
    if (deltaY === 0) return
    let sign = deltaY > 0 ? 1 : -1
    if (!this.isScrolling_bool || sign !== this.sign) {
      this.deltaY = deltaY
      this.sign = sign
      this.isScrolling_bool = true
      SignalService.MOUSE_WHEEL.dispatch(deltaY)
      this.debounced()
    }
  }

  toogleScrollingBool() {
    this.isScrolling_bool = false
  }

}

export default new ScrollService();
