import SignalService from '../services/SignalService'
import ResizeHelper from '../helpers/ResizeHelper'
import BrowserHelper from '../helpers/BrowserHelper'

class MouseService {

  posX = 0
  posY = 0
  tempPosX = 0
  tempPosY = 0
  percX = 0
  percY = 0

  constructor() {
    this.onMouseMove = this.onMouseMove.bind(this)
    this.checkMouseMove = this.checkMouseMove.bind(this)
    this.handleOrientation = this.handleOrientation.bind(this)
    this.checkOrientation = this.checkOrientation.bind(this)
    this.init()
  }

  init() {
    if(BrowserHelper.isTouch()){
      window.addEventListener("deviceorientation", this.handleOrientation, true);
      this.checkOrientation()
    }else{
      document.addEventListener('mousemove',this.onMouseMove)
      this.checkMouseMove()
    }

  }

  handleOrientation(e){

    this.posX = Math.round(( e.gamma  ) )
    this.posY =  Math.round(( e.beta  ) )
  }

  onMouseMove(e){
    this.posX = e.pageX
    this.posY = e.pageY
  }

  checkMouseMove(){
    requestAnimationFrame(this.checkMouseMove)
    if(this.posX !== this.tempPosX || this.posY !== this.tempPosY){
      this.tempPosX = this.posX
      this.tempPosY = this.posY
      this.percX = this.posX / ResizeHelper.width()
      this.percY = this.posY / ResizeHelper.height()
      SignalService.MOUSE_MOVED.dispatch()
    }
  }

  checkOrientation(){
    requestAnimationFrame(this.checkOrientation)
    if(this.posX !== this.tempPosX || this.posY !== this.tempPosY){
      this.tempPosX = this.posX
      this.tempPosY = this.posY
      this.percX = (this.posX) / 20
      this.percY = (this.posY) / 20
      SignalService.MOUSE_MOVED.dispatch()
    }
  }





}

export default new MouseService();
