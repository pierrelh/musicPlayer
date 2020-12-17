// Handle click on CrossAccount button of Account section
document.getElementById("CrossAccount").addEventListener("click", function() {
	backgroundHide();
	var Account = document.getElementById("Account");
	Account.className = "";
});

// Handle click on CrossAccount button of Account section
document.getElementById("UpdatePassword").addEventListener("click", function(e) {
	e.preventDefault();
	var passwordOne = document.getElementById("NewPasswordOne").value;
	var passwordTwo = document.getElementById("NewPasswordTwo").value;
	var errorMsg = document.getElementById("errorMsgEditPassword");
	if (passwordOne == "" || passwordTwo == "") {
		errorMsg.style.color = "red";
		errorMsg.innerHTML = "Veuillez remplir les champs";
		return;
	}else if (passwordOne != passwordTwo) {
		errorMsg.style.color = "red";
		errorMsg.innerHTML = "Les deux mots de passe ne correspondent pas";
		return;
	}else {
		$.ajax({
			url: server + "/functions/users/editPassword.php",
			type: "POST",
			dataType: "script",
			cache: false,
			contentType: false,
			processData: false,
			data: {
				"user_password": passwordOne
			},
			success: function () {
				errorMsg.style.color = "green";
				errorMsg.innerHTML = "Votre mot de passe à bien été mis à jour";
			}
		});
	}
});