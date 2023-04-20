$(document).ready(function() {
  const equipmentList = $(".equipment-list");

  // Replace with the URL to the raw JSON file in your GitHub repository
  const jsonFileURL = "https://raw.githubusercontent.com/user/repository/branch/equipment-data.json";

  fetch(jsonFileURL)
    .then(response => response.json())
    .then(data => {
      buildEquipmentList(data, equipmentList);
      $('.equipment-item').hide().first().show();
    });

  function buildEquipmentList(data, parentElement) {
    data.forEach(item => {
      let itemElement = $('<li class="equipment-item"></li>');
      itemElement.append(`<span>${item.name}</span>`);

      if (item.image) {
        itemElement.append(`<img src="${item.image}" alt="${item.name}">`);
      }

      if (item.mass || item.power || item.thermal) {
        let propertiesElement = $('<ul class="equipment-item"></ul>');
        if (item.mass) propertiesElement.append(`<li>Mass: ${item.mass}</li>`);
        if (item.power) propertiesElement.append(`<li>Power: ${item.power}</li>`);
        if (item.thermal) propertiesElement.append(`<li>Thermal properties: ${item.thermal}</li>`);
        itemElement.append(propertiesElement);
      }

      if (item.children && item.children.length > 0) {
        let childrenElement = $('<ul class="equipment-item"></ul>');
        buildEquipmentList(item.children, childrenElement);
        itemElement.append(childrenElement);
      }

      parentElement.append(itemElement);
    });
  }

  $(document).on('click', '.equipment-item > span', function() {
    $(this).siblings('.equipment-item').toggle();
    event.stopPropagation();
  });
});

