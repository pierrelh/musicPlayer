class Help {
	constructor() {
		this.Element	= document.getElementById("Help");
		this.Cross		= document.getElementById("CrossHelp");

		// Handle click on CrossAccount button of Account section
		this.Cross.addEventListener("click", evt => this.Toggle());
	}

	Toggle() {
		if (this.Element.classList.contains("appear")) {
			background.Hide();
			this.Element.classList.remove("appear");
		} else {
			background.Show();
			this.Element.classList.add("appear");
		}
	}
}

const help = new Help();