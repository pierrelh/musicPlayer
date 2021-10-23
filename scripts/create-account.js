const _createAccount = new class {
	constructor() {
		this.ClassName	= 'appear';
		this.IsVisible	= false;
		this.URL		= '/functions/users/createAccount.php'
		this.Elements	= {
			Main		: document.getElementById('CreateAccount'),
			Cross		: document.getElementById('CrossCreateAccount'),
			BTN			: document.getElementById('CreateAccountButton'),
			Email		: document.getElementById('NewAccountEmail'),
			PasswordOne	: document.getElementById('NewAccountPasswordOne'),
			PasswordTwo	: document.getElementById('NewAccountPasswordTwo'),
			ErrorMSG	: document.getElementById('errorMsgCreateAccount')
		};

		this.Elements.Cross.addEventListener('click', evt => this.Hide(), false);
		this.Elements.BTN.addEventListener('click', evt => this.CreateAccount(evt), false);
	}

	CreateAccount(e) {
		e.preventDefault();

		if (this.Elements.Email.value == '' || this.Elements.PasswordOne.value == '' || this.Elements.PasswordTwo.value == '') {
			// Check if all the fiels have been sets
			this.Elements.ErrorMSG.innerHTML = 'Veuillez remplir tous les champs';
			this.Elements.ErrorMSG.style.display = 'block';
			return;
		} else if (this.Elements.PasswordOne.value != this.Elements.PasswordTwo.value) {
			// Check if the 2 password match
			this.Elements.ErrorMSG.innerHTML = 'Les 2 mots de passes ne correspondent pas';
			this.Elements.ErrorMSG.style.display = 'block';
			return;
		} else {
			const self = this;
			// Create the new account
			$.ajax({
				url: server + this.URL,
				type: 'POST',
				data: {
					'user_login': this.Elements.Email.value,
					'user_password': this.Elements.PasswordOne.value
				},
				success: function (response) {
					if (response == 'true') {
						self.Elements.ErrorMSG.style.color = 'green';
						self.Elements.ErrorMSG.innerHTML = 'Votre compte à bien été créé';
						self.Elements.ErrorMSG.style.display = 'block';
					} else {
						self.Elements.ErrorMSG.style.color = 'red';
						self.Elements.ErrorMSG.innerHTML = 'Une erreur s\'est produite lors de la création du compte';
						self.Elements.ErrorMSG.style.display = 'block';
					}
				}
			});
		}
	}

	Toggle() {
		if (this.IsVisible)
			this.Hide();
		else
			this.Show();
	}

	Hide() {
		_background.Hide();
		this.Elements.Main.classList.remove(this.ClassName);
		this.IsVisible = false;
	}

	Show() {
		_background.Show();
		this.Elements.Main.classList.add(this.ClassName);
		this.IsVisible = true;
	}
}