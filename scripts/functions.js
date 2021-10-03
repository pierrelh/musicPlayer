// Shuffle an array
function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

// Decode html txt
function htmlDecode(input) {
	var doc = new DOMParser().parseFromString(input, "text/html");
	return doc.documentElement.textContent;
}

// Set Time to the right format
function getTime(t) {
	var m = ~~(t / 60),
	s = ~~(t % 60);
	return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
}

// Decode dataset to put in values
function decodeHTML(html) {
	var txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
}

// Get an url & return the public_id. ex: https://exemple/exemple/monfichier.jpg => monfichier
function getPublicIdFromUrl(url) {
	url = url.split("/");
	url = url.pop();
	url = url.split(".");
	url.pop();
	url = url.join("");
	return url;
}

// Upload a file to Cloudinary
function uploadFileCloudinary(formDataMusic, barId, txtId, link) {
	return new Promise((resolve, reject) => {
		var url = server + "/functions/files/" + link;
		
		var xhr = new XMLHttpRequest();

		// Update progress for audio file
		xhr.upload.addEventListener("progress", function (e) {
			var progress = Math.round((e.loaded * 100.0) / e.total);
			document.getElementById(barId).style.width = progress + "%";
			document.getElementById(txtId).innerHTML = progress + "%";
		});

		xhr.onerror = () => reject("false");
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById(txtId).innerHTML = "Envoyé";
				resolve(this.responseText);
			}
		}
		xhr.open("POST", url, true);
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhr.send(formDataMusic);
	});
}