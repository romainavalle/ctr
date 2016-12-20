const dat = require('dat')

const datgui = new dat.GUI({ autoPlace: false })
datgui.enabled = false;
const domElement = datgui.domElement
// domElement.style.display = 'none'

setTimeout(()=>{
	let doms = document.querySelectorAll('.slider')
	for(let dom of doms){
		dom.addEventListener('mousedown',(e)=>{
			// e.stopImmediatePropagation()
			e.stopPropagation()
		},false)
	}
},200)

const keyboard = require('mnf/utils/keyboard')
keyboard.onDown.add((key)=>{
	if(key == 71 && keyboard.special.altKey == true){
		if(domElement.style.display == 'none'){
			domElement.style.display = ''
		} else {
			domElement.style.display = 'none'
		}
	}
})

module.exports = datgui
