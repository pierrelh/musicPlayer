class CreateAccount {
	constructor() {
		this.Element = document.getElementById("CreateAccount")
		this.Cross = document.getElementById("CrossCreateAccount")
		this.CreataAccountBTN = document.getElementById("CreateAccountButton")
		this.Email = document.getElementById("NewAccountEmail")
		this.PasswordOne = document.getElementById("NewAccountPasswordOne")
		this.PasswordTwo = document.getElementById("NewAccountPasswordTwo")
		this.ErrorMSG = document.getElementById("errorMsgCreateAccount");

		// Handle click on CrossAccount button of Account section
		this.Cross.addEventListener("click", evt => this.Hide());

		// Handle click on CrossAccount button of Account section
		this.CreataAccountBTN.addEventListener("click", evt => this.CreateAccount(evt));
	}

	CreateAccount() {
		e.preventDefault();
	
		if (this.Email.value == "" || this.PasswordOne.value == "" || this.PasswordTwo.value == "") {
			// Check if all the fiels have been sets
			this.ErrorMSG.innerHTML = "Veuillez remplir tous les champs";
			this.ErrorMSG.style.display = "block";
			return;
		} else if (this.PasswordOne.value != this.PasswordTwo.value) {
			// Check if the 2 password match
			this.ErrorMSG.innerHTML = "Les 2 mots de passes ne correspondent pas";
			this.ErrorMSG.style.display = "block";
			return;
		} else {
			// Create the new account
			$.ajax({
				url: server + "/functions/users/createAccount.php",
				type: "POST",
				data: {
					"user_login": this.Email.value,
					"user_password": this.PasswordOne.value
				},
				success: function (response) {
					if (response == "true") {
						this.ErrorMSG.style.color = "green";
						this.ErrorMSG.innerHTML = "Votre compte à bien été créé";
						this.ErrorMSG.style.display = "block";
					}else {
						this.ErrorMSG.style.color = "red";
						this.ErrorMSG.innerHTML = "Une erreur s'est produite lors de la création du compte";
						this.ErrorMSG.style.display = "block";
					}
				}
			});
		}	
	}

	Hide() {
		console.log("Hide CA")
		backgroundHide();
		this.Element.className = "";
	}

	Show() {
		console.log("Show CA")
		backgroundAppear();
		document.getElementById("CreateAccount").classList.add("appear");
	}
}

var createAccount = new CreateAccount()