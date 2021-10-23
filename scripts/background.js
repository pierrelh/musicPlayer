const _background = new class {
	constructor() {
		this.Main		= document.getElementById('Background');
		this.IsVisible	= false;
		this.ClassName	= 'background-appear';
	}

	Toggle() {
		if (this.IsVisible)
			this.Hide();
		else
			this.Show();
	}

	Hide() {
		if (this.Main.classList.contains(this.ClassName))
			this.Main.classList.remove(this.ClassName);
		this.IsVisible = false;
	}

	Show() {
		if (!this.Main.classList.contains(this.ClassName))
			this.Main.classList.add(this.ClassName);
		this.IsVisible = true;
	}
}