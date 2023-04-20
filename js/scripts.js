$(document).ready(function() {
  console.log('Document is ready.');

  $.getJSON('equipment-data.json', function(data) {
    console.log('JSON data fetched:', data);

    function createListItem(item) {
      console.log('Creating list item for:', item.name);
      var li = $('<li>');
      li.text(item.name);

      if (item.image) {
        li.append('<br>');
        li.append('<img src="' + item.image + '" alt="' + item.name + '">');
      }

      li.append('<br>');
      li.append('Mass: ' + item.mass);
      li.append('<br>');
      li.append('Power: ' + item.power);
      li.append('<br>');
      li.append('Thermal: ' + item.thermal);

      if (item.children && item.children.length > 0) {
        var ul = $('<ul>');
        item.children.forEach(function(child) {
          ul.append(createListItem(child));
        });
        li.append(ul);
      }

      return li;
    }

    data.forEach(function(item) {
      $('.equipment-list').append(createListItem(item));
    });

    console.log('Equipment list populated.');
  }).fail(function(jqxhr, textStatus, error) {
    console.error('Error fetching JSON data:', textStatus, error);
  });
});

