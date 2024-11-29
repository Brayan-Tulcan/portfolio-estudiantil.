// Variables globales
let inventory = [];
let currentId = 1;

// Función para agregar o actualizar un producto
document.getElementById('productForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const productId = document.getElementById('productId').value;
  const productName = document.getElementById('productName').value;
  const prevStock = parseInt(document.getElementById('prevStock').value);
  const entries = parseInt(document.getElementById('entries').value);
  const outputs = parseInt(document.getElementById('outputs').value);
  const inStock = prevStock + entries - outputs;

  if (productId) {
    updateProduct(parseInt(productId), productName, prevStock, entries, outputs, inStock);
  } else {
    addProduct(productName, prevStock, entries, outputs, inStock);
  }

  resetForm();
  renderTable();
});

// Función para agregar un nuevo producto
function addProduct(name, prevStock, entries, outputs, inStock) {
  const product = { id: currentId++, name, prevStock, entries, outputs, inStock };
  inventory.push(product);
}

// Función para actualizar un producto existente
function updateProduct(id, name, prevStock, entries, outputs, inStock) {
  const product = inventory.find(item => item.id === id);
  if (product) {
    product.name = name;
    product.prevStock = prevStock;
    product.entries = entries;
    product.outputs = outputs;
    product.inStock = inStock;
  }
}

// Función para eliminar un producto
function deleteProduct(id) {
  inventory = inventory.filter(item => item.id !== id);
  renderTable();
}

// Función para editar un producto
function editProduct(id) {
  const product = inventory.find(item => item.id === id);
  if (product) {
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('prevStock').value = product.prevStock;
    document.getElementById('entries').value = product.entries;
    document.getElementById('outputs').value = product.outputs;
  }
}

// Función para buscar producto por ID
function buscarPorID() {
    const buscarID = parseInt(document.getElementById('buscarID').value);
    const producto = inventory.find(p => p.id === buscarID);

    const resultado = document.getElementById('resultadoBusqueda');
    if (producto) {
        resultado.innerHTML = `
            <br>
            <h3>Producto Encontrado</h3>
            <p>ID: ${producto.id}</p>
            <p>Nombre: ${producto.name}</p>
            <p>Existencia Anterior: ${producto.prevStock}</p>
            <p>Entradas: ${producto.entries}</p>
            <p>Salidas: ${producto.outputs}</p>
            <p>En Stock: ${producto.inStock}</p>
            <br>
        `;
    } else {
        resultado.innerHTML = '<p>Producto no encontrado.</p>';
    }
}



// Función para renderizar la tabla
function renderTable() {
  const tbody = document.querySelector('#inventoryTable tbody');
  tbody.innerHTML = '';
  inventory.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.prevStock}</td>
      <td>${product.entries}</td>
      <td>${product.outputs}</td>
      <td>${product.inStock}</td>
      <td>
        <button onclick="editProduct(${product.id})">Editar <br><br></button>
        <button onclick="deleteProduct(${product.id})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Función para resetear el formulario
function resetForm() {
  document.getElementById('productId').value = '';
  document.getElementById('productForm').reset();
}

// Función para exportar la tabla a Excel
/*document.getElementById('exportExcel').addEventListener('click', function() {
  let table = document.getElementById('inventoryTable');
  let rows = table.querySelectorAll('tr');
  
  let csvContent = 'data:text/csv;charset=utf-8,';
  
  rows.forEach(row => {
    let rowData = Array.from(row.children).map(cell => cell.textContent);
    csvContent += rowData.join(',') + '\r\n';
  });
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'inventario.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});*/

// Función para exportar tabla a Excel
document.getElementById('exportExcel').addEventListener('click', function() {
  const table = document.getElementById('inventoryTable');
  const tableHTML = table.outerHTML.replace(/ /g, '%20');

  const downloadLink = document.createElement('a');
  downloadLink.href = 'data:application/vnd.ms-excel,' + tableHTML;
  downloadLink.download = 'inventario.xls';
  downloadLink.click();
});

