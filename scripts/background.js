const _background = new class {
	constructor() {
		this.Element	= document.getElementById('Background');
		this.IsVisible	= false;
	}

	Toggle() {
		if (this.IsVisible)
			this.Hide();
		else
			this.Show();
	}

	Hide() {
		if (this.Element.classList.contains('background-appear'))
			this.Element.classList.remove('background-appear');
		this.IsVisible = false;
	}

	Show() {
		if (!this.Element.classList.contains('background-appear'))
			this.Element.classList.add('background-appear');
		this.IsVisible = true;
	}
}