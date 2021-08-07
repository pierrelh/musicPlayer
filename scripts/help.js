class Help {
	constructor() {
		this.Element	= document.getElementById("Help");
		this.Cross		= document.getElementById("CrossHelp");

		// Handle click on CrossAccount button of Account section
		this.Cross.addEventListener("click", evt => this.Toggle());
	}

	Toggle() {
		if (this.Element.classList.contains("appear")) {
			backgroundHide();
			this.Element.classList.remove("appear");		
		}else {
			backgroundAppear();
			this.Element.classList.add("appear");
		}
	}
}

var help = new Help();