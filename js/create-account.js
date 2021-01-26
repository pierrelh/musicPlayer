// Handle click on CrossAccount button of Account section
document.getElementById("CrossCreateAccount").addEventListener("click", function() {
	backgroundHide();
	document.getElementById("CreateAccount").className = "";
});

// Handle click on CrossAccount button of Account section
document.getElementById("CreateAccountButton").addEventListener("click", function(e) {
	e.preventDefault();
	var errorMsg = document.getElementById("errorMsgCreateAccount");
	var email = document.getElementById("NewAccountEmail").value;
	var passwordOne = document.getElementById("NewAccountPasswordOne").value;
	var passwordTwo = document.getElementById("NewAccountPasswordTwo").value;

	if (email == "" || passwordOne == "" || passwordTwo == "") {
		// Check if all the fiels have been sets
		errorMsg.innerHTML = "Veuillez remplir tous les champs";
		errorMsg.style.display = "block";
		return;
	} else if (passwordOne != passwordTwo) {
		// Check if the 2 password match
		errorMsg.innerHTML = "Les 2 mots de passes ne correspondent pas";
		errorMsg.style.display = "block";
		return;
	} else {
		// Create the new account
		$.ajax({
			url: server + "/functions/users/createAccount.php",
			type: "POST",
			data: {
				"user_email": email,
				"user_password": passwordOne
			},
			success: function (response) {
				if (response == "true") {
					errorMsg.style.color = "green";
					errorMsg.innerHTML = "Votre compte à bien été créé";
					errorMsg.style.display = "block";
				}else {
					errorMsg.style.color = "red";
					errorMsg.innerHTML = "Une erreur s'est produite lors de la création du compte";
					errorMsg.style.display = "block";
				}
			}
		});
	}	
});