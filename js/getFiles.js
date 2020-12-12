function getFiles(row, type){
  $.ajax({
    url: server + "/functions/files/ajaxGetAllFiles.php",
    type: "POST",
    data: {"row": row,
           "type": type},
    success: function(data){
      data = JSON.parse(data);
      var library = document.getElementById("LibraryObjects");
      library.innerHTML = "";
      if (data.length != 0) {
        playlist = [];
        for (var i = 0; i < data.length; i++) {
          var ul = document.createElement("ul");
          ul.id = "MusicList" + i;
          library.appendChild(ul);

          li = document.createElement("li");
          ul.appendChild(li);
          li.className = "view";
          li.id = "Music" + i;
          li.dataset.url = data[i]["file_url"];
          li.dataset.artist = data[i]["file_author"];
          li.dataset.title = data[i]["file_name"];
          li.dataset.album = data[i]["file_album"];
          li.dataset.img = data[i]["file_image"];
          li.dataset.id = data[i]["file_id"];

          if (data[i]["file_image"] != "") {
            li.style.backgroundImage = "url('" + data[i]["file_image"] + "')";
          }

          var lip = document.createElement("li");
          ul.appendChild(lip);

          var p = document.createElement("p");
          lip.appendChild(p);
          p.innerHTML = data[i]["file_author"] + " - " + data[i]["file_name"];
          p.id = "MusicP" + i;

          playlist.push(i);
        }

        var musicNumber = document.getElementById("LibraryObjects").children.length;

        for (var i = 0; i < musicNumber; i++) (function(i) {
          document.getElementById("Music" + i).addEventListener("click", function(){playMusic(i)}, false);
          document.getElementById("MusicP"+i).addEventListener("click", function(){playMusic(i)}, false);
        })(i);
      }
    }
  });
}
