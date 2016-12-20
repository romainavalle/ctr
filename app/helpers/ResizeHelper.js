'use strict';
import memoize from 'lodash.memoize'
import debounce from 'lodash.debounce'
import SignalService from '../services/SignalService'

class ResizeHelper {

  constructor()  {
    this.onWindowResize = this.onWindowResize.bind(this)
    this.init()
  }

  init(){
    this.setDimension()
    window.addEventListener('resize',debounce(this.onWindowResize,100))
  }

  onWindowResize(){
    this.setDimension()
    SignalService.WINDOW_RESIZED.dispatch()
  }

  setDimension(){
    this.dimension = memoize(this._dimension)
  }

  clear() {
    this.dimension.cache = {};
  }

  _dimension() {

    var dimension = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    dimension.ratio = dimension.width / dimension.height;

    return dimension;
  }

  width() {
    return this.dimension().width;
  }

  height() {
    return this.dimension().height;
  }
}


export default new ResizeHelper();
