document.addEventListener("DOMContentLoaded", function () {
  fetch("equipment-data.json")
    .then((response) => response.json())
    .then((equipmentData) => {
      const flattenData = (data, level = 0) => {
        const result = [];
        data.forEach((item) => {
          const newItem = { ...item, level };
          result.push(newItem);
          if (item.children && item.children.length > 0) {
            result.push(...flattenData(item.children, level + 1));
          }
        });
        return result;
      };

      const tableData = flattenData(equipmentData);

      const container = document.getElementById("equipment-table");
      const hot = new Handsontable(container, {
        data: tableData,
        columns: [
          { data: "name", title: "Name" },
          { data: "image", title: "Image", renderer: imageRenderer },
          { data: "mass", title: "Mass" },
          { data: "power", title: "Power" },
          { data: "thermal", title: "Thermal" },
        ],

nestedHeaders: [
    [
      { label: 'Name', colspan: 1 },
      { label: 'Image', colspan: 1 },
      { label: 'Mass', colspan: 1 },
      { label: 'Power', colspan: 1 },
      { label: 'Thermal', colspan: 1 },
    ],
  ],


  collapsibleColumns: [
    {
      row: -2,
      col: 0,
      collapsible: true,
    },
    {
      row: -2,
      col: 1,
      collapsible: true,
    },
    {
      row: -2,
      col: 2,
      collapsible: true,
    },
    {
      row: -2,
      col: 3,
      collapsible: true,
    },
    {
      row: -2,
      col: 4,
      collapsible: true,
    },
  ],


        stretchH: "all",
        rowHeaders: true,
        colHeaders: true,
        filters: true,
        dropdownMenu: true,
        nestedRows: true,
        contextMenu: true,
        manualColumnResize: true,
        manualRowResize: true,
        collapsibleColumns: true,
        columnHeaderHeight: 30,
        rowHeights: 23,
        columnSorting: {
          sortEmptyCells: true,
        },
        autoColumnSize: {
          samplingRatio: 23,
        },
        trimWhitespace: false,
        licenseKey: "non-commercial-and-evaluation",
      });
    });
});

function imageRenderer(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);

  if (value) {
    const img = document.createElement('img');
    img.src = value;
    img.style.width = '100px';
    img.style.height = 'auto';

    Handsontable.dom.empty(td);
    td.appendChild(img);
  }
}
