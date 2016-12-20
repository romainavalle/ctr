module.exports.indexOf = ( dom ) => {
	return Array.prototype.indexOf.call( dom.parentNode.children, dom )
}

const transformPrefix = (function(){
	const testEl = document.createElement('div');
	if(testEl.style.transform == null) {
		let vendors = ['Webkit', 'Moz', 'ms'];
		for(let vendor of vendors) {
			if(testEl.style[ vendors[vendor] + 'Transform' ] !== undefined) {
			return vendors[vendor] + 'Transform';
			}
		}
	}
	return 'transform';
})();

module.exports.getXInPage = ( dom ) => {
	let x = dom.offsetLeft
	while( dom = dom.parentNode ) {
		if( dom == document.body ) {
			break
		}
		x += dom.offsetLeft
	}
	return x
}

module.exports.transformPrefix = transformPrefix
