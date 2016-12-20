import SignalService from '../services/SignalService'
class BrowserHelper {

  detectFlag = false

  constructor() {

  }

  detectWebGLContext() {
    let ok = false
    let canvas = document.createElement("canvas");
    let gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (gl && gl instanceof WebGLRenderingContext) {
      return true
    } else {
      return false
    }
  }

  detectIE() {
    return (navigator.appVersion.indexOf("MSIE 10") !== -1)
  }

  detectKonami() {
    let keys_array = [],
      k = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    window.addEventListener('keydown', (e, key) => {
      keys_array.push(e.which)
      if (keys_array.toString().indexOf(k) >= 0) {
        keys_array = [];
        SignalService.KONAMI_DETECTED.dispatch()
      }
    }, false)
  }


  isTouch() {
    return 'ontouchstart' in window;
  }

  isFlex() {
    let documentStyle = document.documentElement.style,
      isFlex = false
    if (('flexWrap' in documentStyle) || ('WebkitFlexWrap' in documentStyle) || ('msFlexWrap' in documentStyle)) {
      isFlex = true
    }
    return isFlex
  }
}

export default new BrowserHelper()
