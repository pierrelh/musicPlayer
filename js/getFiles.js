function decode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function getFiles(row, type, identifier){
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
        if (identifier != undefined) {
          var filtre = document.getElementById(identifier);
          if (type == 'ASC') {
            type = 'DESC';
          }else {
            type = 'ASC';
          }
          filtre.setAttribute('onclick', "getFiles('"+row+"', '"+type+"', '"+identifier+"')")
        }
        for (var i = 0; i < data.length; i++) (function(i) {
          var ul = document.createElement("ul");
          ul.id = 'ul' + i;
          library.appendChild(ul);

          li = document.createElement("li");
          ul.appendChild(li);
          li.className = 'view';
          li.id = i;
          li.dataset.url = decode_utf8(data[i]['file_url']);
          li.dataset.artist = decode_utf8(data[i]['file_author']);
          li.dataset.title = decode_utf8(data[i]['file_name']);
          li.dataset.album = decode_utf8(data[i]['file_album']);
          li.dataset.id = data[i]['file_id'];
          document.getElementById(i).onclick = function () {
            mediaPlayerAppear(i);
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
            mediaPlayerAppear(i);
          };
        })(i);
      }
    }
  });
}
