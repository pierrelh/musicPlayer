// Handle click on CrossAccount button of Account section
document.getElementById("CrossAccount").addEventListener("click", function() {
	backgroundHide();
	document.getElementById("Account").className = "";
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
		errorMsg.style.display = "block";
		return;
	}else if (passwordOne != passwordTwo) {
		errorMsg.style.color = "red";
		errorMsg.innerHTML = "Les deux mots de passe ne correspondent pas";
		errorMsg.style.display = "block";
		return;
	}else {
		$.ajax({
			url: server + "/functions/users/editPassword.php",
			type: "POST",
			data: {
				"user_password": passwordOne
			},
			success: function (response) {
				if (response == "true") {
					errorMsg.style.color = "green";
					errorMsg.innerHTML = "Votre mot de passe à bien été mis à jour";	
					errorMsg.style.display = "block";				
				}else {
					errorMsg.innerHTML = "Une erreur s'est produite lors de la mise à jour";	
					errorMsg.style.display = "block";
				}
			}
		});
	}
});