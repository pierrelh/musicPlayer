class Account {
	constructor() {
		this.Element			= document.getElementById("Account");
		this.Cross				= document.getElementById("CrossAccount");
		this.UpdatePasswordBtn	= document.getElementById("UpdatePassword");
		this.PasswordOne		= document.getElementById("NewPasswordOne");
		this.PasswordTwo		= document.getElementById("NewPasswordTwo");
		this.ErrorMSG			= document.getElementById("errorMsgEditPassword");

		// Handle click on CrossAccount button of Account section
		this.Cross.addEventListener("click", evt => this.Toggle());

		// Handle click on CrossAccount button of Account section
		this.UpdatePasswordBtn.addEventListener("click", evt => this.UpdatePassword(evt));
	}

	// Toggle account section's visibility 
	Toggle() {
		console.log("Show / hide account")
		if (this.Element.classList.contains("appear")) {
			backgroundHide();
			this.Element.className = "";
		}else {
			fetch(server + "/functions/account/getCloudinaryAdmin.php")
			.then((response) => response.json())
			.then(function (response) {
		
				document.getElementById("AccountPlan").innerHTML = response["plan"];
				document.getElementById("AccountLastUpdate").innerHTML = response["last_updated"];
				document.getElementById("AccountRequests").innerHTML = response["requests"];
				document.getElementById("AccountResources").innerHTML = response["resources"];
				document.getElementById("AccountDerivedResources").innerHTML = response["derived_resources"];
		
				document.getElementById("AccountTransformationUsage").innerHTML = response["transformations"]["usage"];
				document.getElementById("AccountTransformationPercent").innerHTML = response["transformations"]["used_percent"] + "%";
				document.getElementById("AccountTransformationProgressBar").style.width = response["transformations"]["used_percent"] + "%";
				document.getElementById("AccountTransformationLimit").innerHTML = response["transformations"]["limit"];
		
				document.getElementById("AccountObjectsUsage").innerHTML = response["objects"]["usage"];
				document.getElementById("AccountObjectsPercent").innerHTML = response["objects"]["used_percent"] + "%";
				document.getElementById("AccountObjectsProgressBar").style.width = response["objects"]["used_percent"] + "%";
				document.getElementById("AccountObjectsUsageLimit").innerHTML = response["objects"]["limit"];
		
				document.getElementById("AccountBandwidthUsage").innerHTML = (response["bandwidth"]["usage"] / 1000000000).toFixed(2) + " GB";
				document.getElementById("AccountBandwidthPercent").innerHTML = response["bandwidth"]["used_percent"] + "%";
				document.getElementById("AccountBandwidthProgressBar").style.width = response["bandwidth"]["used_percent"] + "%";
				document.getElementById("AccountBandwidthLimit").innerHTML = (response["bandwidth"]["limit"] / 1000000000).toFixed(2) + " GB";
		
				document.getElementById("AccountStorageUsage").innerHTML = (response["storage"]["usage"] / 1000000000).toFixed(2) + " GB";
				document.getElementById("AccountStoragePercent").innerHTML = response["storage"]["used_percent"] + "%";
				document.getElementById("AccountStorageProgressBar").style.width = response["storage"]["used_percent"] + "%";
				document.getElementById("AccountStorageLimit").innerHTML = (response["storage"]["limit"] / 1000000000).toFixed(2) + " GB";
		
				document.getElementById("AccountImageMaxSize").innerHTML = response["media_limits"]["image_max_size_bytes"];
				document.getElementById("AccountVideoMaxSize").innerHTML = response["media_limits"]["video_max_size_bytes"];
				document.getElementById("AccountRawMaxSize").innerHTML = response["media_limits"]["raw_max_size_bytes"];
				document.getElementById("AccountImageMaxPx").innerHTML = response["media_limits"]["image_max_px"];
				document.getElementById("AccountAssetMaxTotalPx").innerHTML = response["media_limits"]["asset_max_total_px"];
		
				backgroundAppear();
				document.getElementById("Account").Element.classList.add("appear");
			});
		}
	}

	UpdatePassword(e) {
		e.preventDefault();
		if (this.PasswordOne.value == "" || this.PasswordTwo.value == "") {
			this.ErrorMSG.style.color = "red";
			this.ErrorMSG.innerHTML = "Veuillez remplir les champs";
			this.ErrorMSG.style.display = "block";
			return;
		}else if (this.PasswordOne.value != this.PasswordTwo.value) {
			this.ErrorMSG.style.color = "red";
			this.ErrorMSG.innerHTML = "Les deux mots de passe ne correspondent pas";
			this.ErrorMSG.style.display = "block";
			return;
		}else {
			$.ajax({
				url: server + "/functions/users/editPassword.php",
				type: "POST",
				data: {
					"user_password": this.PasswordOne.value
				},
				success: function (response) {
					if (response == "true") {
						this.ErrorMSG.style.color = "green";
						this.ErrorMSG.innerHTML = "Votre mot de passe à bien été mis à jour";	
						this.ErrorMSG.style.display = "block";				
					}else {
						this.ErrorMSG.innerHTML = "Une erreur s'est produite lors de la mise à jour";	
						this.ErrorMSG.style.display = "block";
					}
				}
			});
		}
	}
}

var account = new Account()