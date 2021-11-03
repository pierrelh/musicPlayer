class Layout {
	constructor(data) {
		this.Element = document.createElement('li');
		this.Element.classList.add('layout')
		this.IElement = document.createElement('i');
		this.IElement.classList.add(data.class, 'bi');
		this.Element.append(this.IElement);
		this.Element.addEventListener('click', data.event, false);
		return this.Element;
	}
}

const _playingLayout = new class {
	constructor() {
		this.Element	= document.createElement('li');
		this.Element.id	= 'PlayedMusic';
		this.Element.classList.add('playing');
	}

	Change(parent) {
		this.Element.remove();
		parent.insertBefore(this.Element, parent.children[0]);
	}
}