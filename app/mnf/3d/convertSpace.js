const THREE = require("THREE")

const stage3d = require('mnf/core/stage3d')
const stage = require('mnf/core/stage')
const vector = new THREE.Vector3()

module.exports.worldToScreen = (x,y,z)=> {
	vector.set(x,y,z)
	vector.project( stage3d.camera )
	let hw = stage3d.renderer.domElement.width * .5
	let hh = stage3d.renderer.domElement.height * .5
	vector.x = ( vector.x * hw ) + hw;
	vector.y = - ( vector.y * hh ) + hh;
	vector.z = 0
	vector.multiplyScalar(1/stage.pixelRatio)
	return vector
}

module.exports.screenToWorld = ( x = 0, y = 0, z=0 )=> {
	vector.set(
		(x / stage.width) * 2 - 1,
		1 - (y / stage.height) * 2,
		0.5
	)

	vector.unproject( stage3d.camera )
	vector.sub( stage3d.camera.position ).normalize()

	vector.multiplyScalar( ( z - stage3d.camera.position.z) / vector.z )
	vector.add( stage3d.camera.position )
	vector.multiplyScalar( .5 )
	return vector
}
