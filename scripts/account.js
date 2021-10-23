const _account = new class {
	constructor() {
		this.Data		= false;
		this.URLs		= {
			AdminData:		'/functions/account/getCloudinaryAdmin.php',
			EditPassword:	'/functions/users/editPassword.php'

		};
		this.IsVisible	= false;
		this.Elements	= {
			Main:				document.getElementById('Account'),
			Cross:				document.getElementById('CrossAccount'),
			Password: {
				Btn:	document.getElementById('UpdatePassword'),
				One:	document.getElementById('NewPasswordOne'),
				Two:	document.getElementById('NewPasswordTwo'),
			},
			ErrorMSG:			document.getElementById('errorMsgEditPassword'),
			Plan:				document.getElementById('AccountPlan'),
			LastUpdate:			document.getElementById('AccountLastUpdate'),
			Requests:			document.getElementById('AccountRequests'),
			Ressources:			document.getElementById('AccountRessources'),
			DerivedRessources:	document.getElementById('AccountDerivedRessources'),
			ImageMaxSize:		document.getElementById('AccountImageMaxSize'),
			VideoMaxSize:		document.getElementById('AccountVideoMaxSize'),
			RawMaxSize:			document.getElementById('AccountRawMaxSize'),
			ImageMaxPx:			document.getElementById('AccountImageMaxPx'),
			AssetMaxTotalPx:	document.getElementById('AccountAssetMaxTotalPx'),
			Transformation:		{
				Usage:		document.getElementById('AccountTransformationUsage'),
				Percent:	document.getElementById('AccountTransformationPercent'),
				Bar:		document.getElementById('AccountTransformationProgressBar'),
				Limit:		document.getElementById('AccountTransformationLimit'),
			},
			Objects:			{
				Usage:		document.getElementById('AccountObjectsUsage'),
				Percent:	document.getElementById('AccountObjectsPercent'),
				Bar:		document.getElementById('AccountObjectsProgressBar'),
				Limit:		document.getElementById('AccountObjectsUsageLimit'),
			},
			Bandwidth:			{
				Usage:		document.getElementById('AccountBandwidthUsage'),
				Percent:	document.getElementById('AccountBandwidthPercent'),
				Bar:		document.getElementById('AccountBandwidthProgressBar'),
				Limit:		document.getElementById('AccountBandwidthLimit'),
			},
			Storage:			{
				Usage:		document.getElementById('AccountStorageUsage'),
				Percent:	document.getElementById('AccountStoragePercent'),
				Bar:		document.getElementById('AccountStorageProgressBar'),
				Limit:		document.getElementById('AccountStorageLimit'),
			},
		};

		this.Elements.Cross.addEventListener('click', evt => this.Toggle(), false);
		this.Elements.Password.Btn.addEventListener('click', evt => this.UpdatePassword(evt), false);
	}

	Show() {
		if (!this.Data)
			this.Hydrate();
		_background.Show();
		this.Elements.Main.classList.add('appear');
		this.IsVisible = true;
	}

	Hide() {
		_background.Hide();
		this.Elements.Main.classList.remove('appear');
		this.IsVisible = false;
	}

	Toggle() {
		if (this.IsVisible)
			this.Hide();
		else
			this.Show();
	}

	UpdatePassword(e) {
		e.preventDefault();
		if (this.Elements.Password.One.value || this.Elements.Password.Two.value) {
			this.Elements.ErrorMSG.style.color = 'red';
			this.Elements.ErrorMSG.innerHTML = 'Veuillez remplir les champs';
			this.Elements.ErrorMSG.style.display = 'block';
			return;
		} else if (this.Elements.Password.One.value != this.Elements.Password.Two.value) {
			this.Elements.ErrorMSG.style.color = 'red';
			this.Elements.ErrorMSG.innerHTML = 'Les deux mots de passe ne correspondent pas';
			this.Elements.ErrorMSG.style.display = 'block';
			return;
		} else {
			const self = this;
			$.ajax({
				url: server + this.URLs.EditPassword,
				type: 'POST',
				data: {
					'user_password': this.Elements.Password.One.value
				},
				success: function (response) {
					if (response == 'true') {
						self.Elements.ErrorMSG.style.color = 'green';
						self.Elements.ErrorMSG.innerHTML = 'Votre mot de passe à bien été mis à jour';
						self.Elements.ErrorMSG.style.display = 'block';
					} else {
						self.Elements.ErrorMSG.innerHTML = 'Une erreur s\'est produite lors de la mise à jour';
						self.Elements.ErrorMSG.style.display = 'block';
					}
				}
			});
		}
	}

	Hydrate() {
		const self = this;
		fetch(server + this.URLs.AdminData)
		.then((response) => response.json())
		.then(function (response) {
			self.Data = response;

			self.Elements.Plan.innerHTML				= response.plan;
			self.Elements.LastUpdate.innerHTML			= response['last_updated'];
			self.Elements.Requests.innerHTML			= response['requests'];
			self.Elements.Ressources.innerHTML			= response['resources'];
			self.Elements.DerivedRessources.innerHTML	= response['derived_resources'];
	
			self.Elements.Transformation.Usage.innerHTML	= response['transformations']['usage'];
			self.Elements.Transformation.Percent.innerHTML	= response['transformations']['used_percent'] + '%';
			self.Elements.Transformation.Bar.style.width	= response['transformations']['used_percent'] + '%';
			self.Elements.Transformation.Limit.innerHTML	= response['transformations']['limit'];
	
			self.Elements.Objects.Usage.innerHTML	= response['objects']['usage'];
			self.Elements.Objects.Percent.innerHTML	= response['objects']['used_percent'] + '%';
			self.Elements.Objects.Bar.style.width	= response['objects']['used_percent'] + '%';
			self.Elements.Objects.Limit.innerHTML	= response['objects']['limit'];
	
			self.Elements.Bandwidth.Usage.innerHTML		= (response['bandwidth']['usage'] / 1000000000).toFixed(2) + ' GB';
			self.Elements.Bandwidth.Percent.innerHTML	= response['bandwidth']['used_percent'] + '%';
			self.Elements.Bandwidth.Bar.style.width		= response['bandwidth']['used_percent'] + '%';
			self.Elements.Bandwidth.Limit.innerHTML		= (response['bandwidth']['limit'] / 1000000000).toFixed(2) + ' GB';
	
			self.Elements.Storage.Usage.innerHTML	= (response['storage']['usage'] / 1000000000).toFixed(2) + ' GB';
			self.Elements.Storage.Percent.innerHTML	= response['storage']['used_percent'] + '%';
			self.Elements.Storage.Bar.style.width	= response['storage']['used_percent'] + '%';
			self.Elements.Storage.Limit.innerHTML	= (response['storage']['limit'] / 1000000000).toFixed(2) + ' GB';
	
			self.Elements.ImageMaxSize.innerHTML	= response['media_limits']['image_max_size_bytes'];
			self.Elements.VideoMaxSize.innerHTML	= response['media_limits']['video_max_size_bytes'];
			self.Elements.RawMaxSize.innerHTML		= response['media_limits']['raw_max_size_bytes'];
			self.Elements.ImageMaxPx.innerHTML		= response['media_limits']['image_max_px'];
			self.Elements.AssetMaxTotalPx.innerHTML	= response['media_limits']['asset_max_total_px'];
		});
	}
}