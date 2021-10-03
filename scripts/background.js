class Background {
	constructor() {
		this.Element = document.getElementById("Background");
	}

	// Hide the assets Background
	Hide() {
		if (this.Element.classList.contains("background-appear")) {
			this.Element.classList.remove("background-appear");
		}
	}

	// Show the assets Background
	Show() {
		if (!this.Element.classList.contains("background-appear")) {
			this.Element.classList.add("background-appear");
		}

	}
}

const background = new Background()