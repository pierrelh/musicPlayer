function editFiles(){
  var library = document.getElementById('Library').children;
  for (var i = 0; i < library.length; i++) (function(i) {
    var li = document.createElement('li');
    li.classList.add('edit');
    li.id = 'edit' + i;

    var parent = document.getElementById('ul'+i);
    var child = document.getElementById(i);
    parent.insertBefore(li, child);

    document.getElementById('edit'+i).onclick = function () {
      alert(i);
    };
  })(i);
}
