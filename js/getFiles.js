function getFiles(){
  $.ajax({
    url: "../functions/files/ajaxGetAllFiles.php",
    type: "POST",
    dataType: 'script',
    cache: false,
    contentType: false,
    processData: false,
    success: function(data){
      data = JSON.parse(data);
      console.log(data);
      var library = document.getElementById('Library');
      library.innerHTML = '';
      if (data.length != 0) {
        for (var i = 0; i < data.length; i++) {
          console.log(i)
          var ul = document.createElement("ul");
          ul.appendChild(library);

          var li = document.createElement("li");
          li.appendChild(ul);
          li.className = 'view';
          li.setAttribute("onclick", "mediaPlayerAppear('"+data[i]['file_url']+"', '"+data[i]['file_image']+"', '"+data[i]['file_author']+"', '"+data[i]['file_name']+"')");

          if (data[i]['file_image'] != "") {
            var img = document.createElement("img");
            img.appendChild(li);
            img.src = data[i]['file_image'];
          }

          var lip = document.createElement("li");
          lip.appendChild(ul);

          var p = document.createElement("p");
          p.appendChild(lip);
          p.innerHTML = data[i]['file_author'] + " - " + data[i]['file_name'];
          p.setAttribute("onclick", "mediaPlayerAppear('"+data[i]['file_url']+"', '"+data[i]['file_image']+"', '"+data[i]['file_author']+"', '"+data[i]['file_name']+"')");
        }
      }
    }
  });
}
