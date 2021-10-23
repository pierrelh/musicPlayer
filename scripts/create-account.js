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
			PasswordTwo	: document.getElementById('NewAccountPasswordTwo')
		};

		this.Elements.Cross.addEventListener('click', evt => this.Hide(), false);
		this.Elements.BTN.addEventListener('click', evt => this.CreateAccount(evt), false);
	}

	CreateAccount(e) {
		e.preventDefault();

		if (this.Elements.Email.value == '' || this.Elements.PasswordOne.value == '' || this.Elements.PasswordTwo.value == '')
			return _info.SetTitle('Veuillez remplir tous les champs', 'red');
		else if (this.Elements.PasswordOne.value != this.Elements.PasswordTwo.value)
			return _info.SetTitle('Les 2 mots de passes ne correspondent pas', 'red');

		$.ajax({
			url: server + this.URL,
			type: 'POST',
			data: {
				'user_login': this.Elements.Email.value,
				'user_password': this.Elements.PasswordOne.value
			},
			success: function (response) {
				if (response != 'true')
					return _info.SetTitle('Une erreur s\'est produite lors de la création du compte', 'red');
				return _info.SetTitle('Votre compte à bien été créé', 'green');
			}
		});
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