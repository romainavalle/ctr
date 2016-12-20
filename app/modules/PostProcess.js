
var three = require('three')
var WAGNER = require('@superguigui/wagner')
var TiltShiftPass = require('@superguigui/wagner/src/passes/tiltshift/tiltshiftPass')
var FXAAPass = require('@superguigui/wagner/src/passes/fxaa/FXAAPass')
var MultiBloomPass = require('@superguigui/wagner/src/passes/bloom/MultiPassBloomPass')

var PostProcess = function(renderer, scene, camera) {
  this.renderer = renderer
  this.scene = scene;
  this.camera = camera;
  this.init();
}
PostProcess.prototype = {
  init: function() {
    this.renderer.autoClearColor = true;

    this.composer = new WAGNER.Composer(this.renderer, { useRGBA: false});

    this.tiltOptions = {
      bluramount: .6,
      center: .9,
      stepSize: 0.003,
      activate: false
    }
    this.tiltShiftPass = new TiltShiftPass(this.tiltOptions)

    this.fxaaOptions = {
      activate: true
    }
    this.fxaaPass = new FXAAPass()

    this.bloomOptions = {
      blurAmount: 2,
      applyZoomBlur: false,
      zoomBlurStrength: .2,
      activate: true
    }
    this.bloomPass = new MultiBloomPass(this.bloomOptions)


    if(window.isDev)this.addControlKit()

  },
  addControlKit:function(){
    window.controlKit.addPanel()
      .addGroup({ label: 'tiltshift' })
      .addSubGroup()
      .addNumberInput(this.tiltOptions, 'bluramount', { step: .01, onChange: (e) => { this.tiltShiftPass.params.bluramount = e } })
      .addNumberInput(this.tiltOptions, 'center', { step: .01, onChange: (e) => { this.tiltShiftPass.params.center = e } })
      .addNumberInput(this.tiltOptions, 'stepSize', { step: .001, dp: 3, onChange: (e) => { this.tiltShiftPass.params.stepSize = e } })
      .addCheckbox(this.tiltOptions, 'activate')
      .addGroup({ label: 'fxaa' })
      .addSubGroup()
      .addCheckbox(this.fxaaOptions, 'activate')
      .addGroup({ label: 'bloom' })
      .addSubGroup()
      .addNumberInput(this.bloomOptions, 'blurAmount', { step: .01, onChange: (e) => { this.bloomPass.params.blurAmount = e } })
      .addNumberInput(this.bloomOptions, 'zoomBlurStrength', { step: .01, onChange: (e) => { this.bloomPass.params.zoomBlurStrength = e } })
      .addCheckbox(this.bloomOptions, 'applyZoomBlur')
      .addCheckbox(this.bloomOptions, 'activate')
  },
  doResize: function() {
    this.composer.setSize(this.renderer.domElement.width, this.renderer.domElement.height);
  },
  update: function() {
    this.composer.reset();
    this.composer.render(this.scene, this.camera);
    if (this.tiltOptions.activate) this.composer.pass(this.tiltShiftPass);
    if (this.fxaaOptions.activate) this.composer.pass(this.fxaaPass);
    if (this.bloomOptions.activate) this.composer.pass(this.bloomPass);
    this.composer.toScreen();
  }
}
module.exports = PostProcess;
