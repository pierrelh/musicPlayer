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
        for (var i = 0; i < data.length; i++) {
          var ul = document.createElement("ul");
          library.appendChild(ul);

          var li = document.createElement("li");
          ul.appendChild(li);
          li.className = 'view';
          li.setAttribute("onclick", "mediaPlayerAppear('"+data[i]+"', '"+data[i-1]+"', '"+data[i+1]+"')");

          if (data[i]['file_image'] != "") {
            li.style.backgroundImage = "url('"+data[i]['file_image']+"')";
          }

          var lip = document.createElement("li");
          ul.appendChild(lip);

          var p = document.createElement("p");
          lip.appendChild(p);
          p.innerHTML = data[i]['file_author'] + " - " + data[i]['file_name'];
          p.setAttribute("onclick", "mediaPlayerAppear('"+data[i]+"', '"+data[i-1]+"', '"+data[i+1]+"')");
        }
      }
    }
  });
}
