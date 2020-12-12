var MyAccountSidebar = document.getElementById("MyAccountSidebar");
var CreateAccountSidebar = document.getElementById("CreateAccountSidebar");
var UploadFileSidebar = document.getElementById("UploadFileSidebar");
var EditFileSidebar = document.getElementById("EditFileSidebar");
var DeleteFileSidebar = document.getElementById("DeleteFileSidebar");
var UploadFileSidebar = document.getElementById("UploadFileSidebar");
var FilterAuthor = document.getElementById("FilterAuthor");
var FilterAlbum = document.getElementById("FilterAlbum");
var FilterId = document.getElementById("FilterId");
var FilterName = document.getElementById("FilterName");
var MyPlaylistsSidebar = document.getElementById("MyPlaylistsSidebar");
var CreatePlaylistSidebar = document.getElementById("CreatePlaylistSidebar");

// Handle the my account button click
MyAccountSidebar.addEventListener("click", function() {
    console.log("Opening: My account settings");
});

// Handle the create account button click
CreateAccountSidebar.addEventListener("click", function() {
    console.log("Opening: Create account");
});

// Handle the upload file button click
UploadFileSidebar.addEventListener("click", function() {
    backgroundAppear();
    var upload = document.getElementById("upload");
    upload.classList.add("appear");
});

// Handle the edit file button click
EditFileSidebar.addEventListener("click", function() {
    var library = document.getElementById("LibraryObjects").children;
    for (var i = 0; i < library.length; i++) (function(i) {

        // Check if library is already in editing mode
        if (document.getElementById("Edit" + i) != undefined) {
            document.getElementById("Edit" + i).remove();
        }else {
            // Check if library is already on delete or add to playlist mode & remove it if needed
            if (document.getElementById("Delete" + i) != undefined) {
                document.getElementById("Delete" + i).remove();
            }else if (document.getElementById("Add" + i) != undefined) {
                document.getElementById("Add" + i).remove();
            }

            var li = document.createElement("li");
            li.classList.add("edit");
            li.id = "Edit" + i;

            var parent = document.getElementById("MusicList" + i);
            var child = document.getElementById("Music" + i);
            parent.insertBefore(li, child);

            document.getElementById("Edit" + i).onclick = function () {
                showEditSection(i);
            };
        }        
    })(i);
});

// Handle the delete file button click
DeleteFileSidebar.addEventListener("click", function() {
    
});

// Handle the filter author button click
FilterAuthor.addEventListener("click", function() {
    
});

// Handle the filter album button click
FilterAlbum.addEventListener("click", function() {
    
});

// Handle the filter id button click
FilterId.addEventListener("click", function() {
    
});

// Handle the filter name button click
FilterName.addEventListener("click", function() {
    
});

// Handle the my playlists button click
MyPlaylistsSidebar.addEventListener("click", function() {
    
});

// Handle the create playlist button click
CreatePlaylistSidebar.addEventListener("click", function() {
    
});
