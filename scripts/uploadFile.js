const _uploadSection = new class {
	constructor() {
		this.Element	= document.getElementById('Upload');
		this.Cross		= document.getElementById('CrossUpload');
		this.UploadBTN	= document.getElementById('UploadButton');
		this.Form		= document.getElementById('FormUpload');
		this.FileIPT	= document.getElementById('File');
		this.PictureIPT	= document.getElementById('Picture');
		this.NameIPT	= document.getElementById('FileName');
		this.AuthorIPT	= document.getElementById('FileAuthor');
		this.IsVisible	= false;

		this.Cross.addEventListener('click', evt => this.Toggle(), false);
		this.UploadBTN.addEventListener('click', evt => this.UploadFiles(evt), false);
	}

	Show() {
		_background.Show();
		this.Element.classList.add('appear');
		this.IsVisible = true;
	}

	Hide() {
		_background.Hide();
		this.Element.classList.remove('appear');
		this.IsVisible = false;
	}

	Toggle() {
		if (this.IsVisible)
			this.Hide();
		else
			this.Show();
	}

	async UploadFiles(e) {
		e.preventDefault();
		let file = this.FileIPT.files[0];
		let picture = this.PictureIPT.files[0];

		if (!file && !picture)
			return _info.SetTitle('Aucun fichier n\'a été choisi.', 'red');

		if (this.NameIPT.value == '' || this.AuthorIPT.value == '')
			return _info.SetTitle('Merci de remplir tous les champs.', 'red');
		
		let formData = new FormData(this.Form);
		formData.delete('file');
		formData.delete('picture');
		let formDataMusic = new FormData();
		formDataMusic.append('music', file);
		let formDataCover = new FormData();
		formDataCover.append('cover', picture);

		await this.UploadFileCloudinary(formDataMusic, 'ProgressBarVideo', 'TextProgressBarVideo', 'uploadMusic.php')
		.then( async (response) => {
			if (response == 'false') 
				return _info.SetTitle('Une erreur s\'est produite lors de l\'envoi de la musique.', 'red');
			formData.append('file_url', response);
					
			// Uploading the cover
			await this.UploadFileCloudinary(formDataCover, 'ProgressBarPicture', 'TextProgessBarPicture', 'uploadCover.php')
			.then( async (response) => {
				if (!response) 
					return _info.SetTitle('Une erreur s\'est produite lors de l\'envoi de la cover.', 'red');
				formData.append('file_covers', JSON.stringify(response));
				$.ajax({
					url: server + '/functions/files/uploadFile.php',
					type: 'POST',
					dataType: 'script',
					cache: false,
					contentType: false,
					processData: false,
					data: formData,
					success: function () {
						_library.GetFiles();
					}
				});
			});
		});
	}

	UploadFileCloudinary(formDataMusic, barId, txtId, link) {
		return new Promise((resolve, reject) => {
			let url = server + '/functions/files/' + link;
			let xhr = new XMLHttpRequest();

			// Update progress for audio file
			xhr.upload.addEventListener('progress', function (e) {
				let progress = Math.round((e.loaded * 100.0) / e.total);
				document.getElementById(barId).style.width = progress + '%';
				document.getElementById(txtId).innerHTML = progress + '%';
			}, false);

			xhr.onerror = () => reject('false');
			xhr.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					document.getElementById(txtId).innerHTML = 'Envoyé';
					resolve(this.responseText);
				}
			}
			xhr.open('POST', url, true);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.send(formDataMusic);
		});
	}
}