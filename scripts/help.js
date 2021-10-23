const _help = new class {
	constructor() {
		this.Element	= document.getElementById('Help');
		this.Cross		= document.getElementById('CrossHelp');
		this.IsVisible	= false;

		this.Cross.addEventListener('click', evt => this.Hide(), false);
	}

	Show() {
		_background.Show();
		this.Element.classList.add('appear');
		this.IsVisible = true;
	}

	Hide() {
		_background.Hide();
		this.Element.classList.remove('appear');
		this.IsVisible = false;
	}

	Toggle() {
		if (this.IsVisible)
			this.Hide();
		else
			this.Show();
	}
}