function getFiles(row, type){
  $.ajax({
    url: "../functions/files/ajaxGetAllFiles.php",
    type: "POST",
    data: {'row': row,
           'type': type},
    success: function(data){
      data = JSON.parse(data);
      var library = document.getElementById('Library');
      library.innerHTML = '';
      if (data.length != 0) {
        for (var i = 0; i < data.length; i++) (function(i) {
          var ul = document.createElement("ul");
          library.appendChild(ul);

          li = document.createElement("li");
          ul.appendChild(li);
          li.className = 'view';
          li.id = i;
          li.dataset.url = data[i]['file_url'];
          li.dataset.artist = data[i]['file_artist'];
          li.dataset.title = data[i]['file_title'];
          document.getElementById(i).onclick = function () {
            mediaPlayerAppear(li.id);
          };

          if (data[i]['file_image'] != "") {
            li.style.backgroundImage = "url('"+data[i]['file_image']+"')";
          }

          var lip = document.createElement("li");
          ul.appendChild(lip);

          var p = document.createElement("p");
          lip.appendChild(p);
          p.innerHTML = data[i]['file_author'] + " - " + data[i]['file_name'];
          p.id = 'p'+i;
          document.getElementById('p'+i).onclick = function () {
            mediaPlayerAppear(li.id);
          };
        })(i);
      }
    }
  });
}
