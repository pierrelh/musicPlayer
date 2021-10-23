// const ElementData = {
//     ElementType,
//     ID,
//     ClassList,
//     InnerHTML,
//     Value,
//     BackgroundIMG,
//     SRC,
//     Type,
//     Placeholder,
//     EventType,
//     Listener,
//     Children
// };

class Element {
	constructor(data) {
		if (!data.ElementType)        
			delete this;
		this.Element = document.createElement(data.ElementType);
		if (data.ID)
			this.Element.id = data.ID;
		if (data.ClassList)
			this.Element.classList = data.ClassList;
		if (data.InnerHTML)
			this.Element.innerHTML = data.InnerHTML;
		if (data.Value)
			this.Element.value = data.Value;
		if (data.SRC)
			this.Element.src = data.SRC;
		if (data.BackgroundIMG)
			this.Element.style.backgroundImage = 'url("' + data.BackgroundIMG + '")';
		if (data.Type)
			this.Element.setAttribute('type', data.Type);
		if (data.Placeholder)
			this.Element.setAttribute('placeholder', data.Placeholder);
		if (data.EventType && data.Listener)
			this.Element.addEventListener(data.EventType, data.Listener, false);
		if (data.Children)
			for (let index = 0; index < data.Children.length; index++)
				this.Element.append(data.Children[index]);

		return this.Element;
	}
}