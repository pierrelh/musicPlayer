const _account = new class {
	constructor() {
		this.Data		= false;
		this.IsVisible	= false;
		this.ClassName	= 'appear';
		this.URLs		= {
			AdminData:		'/functions/account/getCloudinaryAdmin.php',
			EditPassword:	'/functions/users/editPassword.php'
		};
		this.Elements	= {
			Main:				document.getElementById('Account'),
			Cross:				document.getElementById('CrossAccount'),
			ErrorMSG:			document.getElementById('errorMsgEditPassword'),
			Password: {
				Btn:	document.getElementById('UpdatePassword'),
				One:	document.getElementById('NewPasswordOne'),
				Two:	document.getElementById('NewPasswordTwo'),
			},
			Account: {
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
				}
			}
		};

		this.Elements.Cross.addEventListener('click', evt => this.Toggle(), false);
		this.Elements.Password.Btn.addEventListener('click', evt => this.UpdatePassword(evt), false);
	}

	Show() {
		if (!this.Data)
			this.Hydrate();
		_background.Show();
		this.Elements.Main.classList.add(this.ClassName);
		this.IsVisible = true;
	}

	Hide() {
		_background.Hide();
		this.Elements.Main.classList.remove(this.ClassName);
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

			self.Elements.Account.Plan.innerHTML				= response.plan;
			self.Elements.Account.LastUpdate.innerHTML			= response.last_updated;
			self.Elements.Account.Requests.innerHTML			= response.requests;
			self.Elements.Account.Ressources.innerHTML			= response.resources;
			self.Elements.Account.DerivedRessources.innerHTML	= response.derived_resources;
	
			self.Elements.Account.Transformation.Usage.innerHTML	= response.transformations.usage;
			self.Elements.Account.Transformation.Percent.innerHTML	= response.transformations.used_percent + '%';
			self.Elements.Account.Transformation.Bar.style.width	= response.transformations.used_percent + '%';
			self.Elements.Account.Transformation.Limit.innerHTML	= response.transformations.limit;
	
			self.Elements.Account.Objects.Usage.innerHTML	= response.objects.usage;
			self.Elements.Account.Objects.Percent.innerHTML	= response.objects.used_percent + '%';
			self.Elements.Account.Objects.Bar.style.width	= response.objects.used_percent + '%';
			self.Elements.Account.Objects.Limit.innerHTML	= response.objects.limit;
	
			self.Elements.Account.Bandwidth.Usage.innerHTML		= (response.bandwidth.usage / 1000000000).toFixed(2) + ' GB';
			self.Elements.Account.Bandwidth.Percent.innerHTML	= response.bandwidth.used_percent + '%';
			self.Elements.Account.Bandwidth.Bar.style.width		= response.bandwidth.used_percent + '%';
			self.Elements.Account.Bandwidth.Limit.innerHTML		= (response.bandwidth.limit / 1000000000).toFixed(2) + ' GB';
	
			self.Elements.Account.Storage.Usage.innerHTML	= (response.storage.usage / 1000000000).toFixed(2) + ' GB';
			self.Elements.Account.Storage.Percent.innerHTML	= response.storage.used_percent + '%';
			self.Elements.Account.Storage.Bar.style.width	= response.storage.used_percent + '%';
			self.Elements.Account.Storage.Limit.innerHTML	= (response.storage.limit / 1000000000).toFixed(2) + ' GB';
	
			self.Elements.Account.ImageMaxSize.innerHTML	= response.media_limits.image_max_size_bytes;
			self.Elements.Account.VideoMaxSize.innerHTML	= response.media_limits.video_max_size_bytes;
			self.Elements.Account.RawMaxSize.innerHTML		= response.media_limits.raw_max_size_bytes;
			self.Elements.Account.ImageMaxPx.innerHTML		= response.media_limits.image_max_px;
			self.Elements.Account.AssetMaxTotalPx.innerHTML	= response.media_limits.asset_max_total_px;
		});
	}
}