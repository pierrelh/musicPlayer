document.getElementById("Arrow").addEventListener("click", function(){
	if (this.dataset.status == "hidden") { // Show the sidebar and reduce the librarys and the player
		this.dataset.status = "show";
		this.classList.add("arrow-active");
		document.getElementById("Sidebar").classList.remove("sidebar-hide");
		document.getElementById("Library").classList.add("library");
		document.getElementById("DivPlaylist").classList.remove("playlist-sidebar-hided");
		document.getElementById("AudioPlayer").classList.remove("left");

	}else { // Hide the sidebar and enlarge the librarys and the player
		this.classList.remove("arrow-active");
		this.dataset.status = "hidden";
		document.getElementById("Sidebar").classList.add("sidebar-hide");
		document.getElementById("Library").classList.remove("library");
		document.getElementById("DivPlaylist").classList.add("playlist-sidebar-hided");
		document.getElementById("AudioPlayer").classList.add("left");
	}
});
