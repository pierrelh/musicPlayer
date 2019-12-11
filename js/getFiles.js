function getFiles(data){
  $.ajax({
    url: "../functions/files/ajaxGetAllFiles.php",
    type: "POST",
    dataType: 'script',
    data: {'row': data},
    cache: false,
    contentType: false,
    processData: false,
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
          li.setAttribute("onclick", "mediaPlayerAppear('"+data[i]['file_url']+"', '"+data[i]['file_image']+"', '"+data[i]['file_author']+"', '"+data[i]['file_name']+"')");

          if (data[i]['file_image'] != "") {
            li.style.backgroundImage = "url('"+data[i]['file_image']+"')";
          }

          var lip = document.createElement("li");
          ul.appendChild(lip);

          var p = document.createElement("p");
          lip.appendChild(p);
          p.innerHTML = data[i]['file_author'] + " - " + data[i]['file_name'];
          p.setAttribute("onclick", "mediaPlayerAppear('"+data[i]['file_url']+"', '"+data[i]['file_image']+"', '"+data[i]['file_author']+"', '"+data[i]['file_name']+"')");
        }
      }
    }
  });
}
