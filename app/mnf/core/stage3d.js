//
// Wrapper for requestAnimationFrame, Resize & Update
// this.author : David Ronai / this.Makio64 / makiopolis.com
//

const Signals = require("mnf/events/Signals")
const stage = require("mnf/core/stage")
const THREE = require("THREE")
const BrowserHelper = require("helpers/browser/BrowserHelper").default;

//------------------------
class Stage3d{

	constructor(){
		this.camera 	= null
		this.scene 		= null
		this.renderer 	= null
		this.usePostProcessing 	= false
		this.passes 			= []
		this.isActivated 		= false
		this.infos 		= {}

		this.onBeforeRenderer = new Signals()

		let w = stage.width
		let h = stage.height

		this.camera = new THREE.PerspectiveCamera( 50, w / h, 1, 10000000 )
		this.scene = new THREE.Scene()

		this.resolution = new THREE.Vector2(1, h/w)
		const options = { alpha:false, antialias:!(stage.pixelRatio>1), preserveDrawingBuffer:false };
		BrowserHelper.init()
		if (BrowserHelper.isWebGL())
		{
			let error = 0
			try{
				_gl.clearStencil( 0 )
				error=_gl.getError()
			}catch(e){

			}
			if(error){
				options.stencil = false
			}
			this.renderer = new THREE.WebGLRenderer(options);
			this.renderer.setPixelRatio( stage.pixelRatio )
			if(BrowserHelper.detect.ie11){
				const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(100000,100000,1,1), new THREE.MeshBasicMaterial({color:0xFAFAFA}))
				mesh.position.z = 100
				// mesh.rotation.x = Math.PI/2
				this.scene.add(mesh)
			}
		}
		else
		{
			this.renderer = new THREE.CanvasRenderer(options);
		}

		this.renderer.domElement.className = 'three'
		this.renderer.setSize( w, h )
		this.renderer.setClearColor( 0xf8f8f8, 1 )
		this.renderer.clear();

		stage.onResize.add(this.resize)
	}

	activate = ()=>{
		this.render()
		stage.onUpdate.add(this.render)
	}

	initPostProcessing = ()=>{
		this.composer = new WAGNER.Composer( this.renderer, {useRGBA: false} )
		this.composer.setSize( this.renderer.domElement.width, this.renderer.domElement.height )
	}

	add = (obj)=>{
		this.scene.add(obj)
	}

	remove = (obj)=>{
		this.scene.remove(obj)
	}

	getObjectByName = ( name )=>{
		return this.scene.getObjectByName( name )
	}

	addPass = (pass)=>{
		this.passes.push(pass)
	}

	render = (dt)=> {

		if(this.control){
			this.control.update(dt)
		}

		this.onBeforeRenderer.dispatch()

		if(this.usePostProcessing){
			this.composer.reset()
			this.composer.render( this.scene, this.camera )
			for( let i = 0, n = this.passes.length-1; i < n; i++ ) {
				let pass = this.passes[ i ]
				this.composer.pass( pass )
			}
			this.composer.toScreen( this.passes[this.passes.length-1] )
		}
		else{
			this.renderer.render(this.scene, this.camera)
		}

		this.infos.drawCalls = this.renderer.info.render.calls
		this.infos.geometries = this.renderer.info.memory.geometries
		this.infos.vertices = this.renderer.info.render.vertices
		this.infos.faces = this.renderer.info.render.faces

	}

	resize = ()=>{
		this.camera.aspect = stage.width / stage.height
		this.camera.updateProjectionMatrix()
		this.renderer.setSize( stage.width, stage.height )
		this.renderer.setPixelRatio( stage.pixelRatio )
		this.resolution.set(1, stage.height/stage.width)
		this.render(0)
		if(this.composer){
			this.composer.setSize( this.renderer.domElement.width, this.renderer.domElement.height )
		}
	}
}

module.exports = new Stage3d()
