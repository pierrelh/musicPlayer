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
