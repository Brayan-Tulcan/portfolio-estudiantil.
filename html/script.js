let inventory = [];
let currentEditId = null;

// Cargar el formulario y manejar el guardado/edición
document.getElementById("productForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const quantity = parseInt(document.getElementById("productQuantity").value);
    const category = document.getElementById("productCategory").value;
    const purchaseDate = document.getElementById("purchaseDate").value;
    const supplier = document.getElementById("supplier").value;
    const total = price * quantity;

    if (currentEditId === null) {
        // ID auto-incrementable
        const id = inventory.length + 1;
        inventory.push({ id, name, price, quantity, category, purchaseDate, supplier, total });
    } else {
        // Editar producto existente
        const product = inventory.find(item => item.id === currentEditId);
        product.name = name;
        product.price = price;
        product.quantity = quantity;
        product.category = category;
        product.purchaseDate = purchaseDate;
        product.supplier = supplier;
        product.total = total;
        currentEditId = null;
    }

    document.getElementById("productForm").reset();
    renderTable();
});

// Renderizar la tabla
function renderTable() {
    const tableBody = document.querySelector("#inventoryTable tbody");
    tableBody.innerHTML = "";

    inventory.forEach(product => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>${product.category}</td>
            <td>${product.purchaseDate}</td>
            <td>${product.supplier}</td>
            <td>${product.total}</td>
            <td>
                <button onclick="editProduct(${product.id})">Editar</button>
                <button onclick="deleteProduct(${product.id})">Eliminar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Editar producto
function editProduct(id) {
    const product = inventory.find(item => item.id === id);
    document.getElementById("productName").value = product.name;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productQuantity").value = product.quantity;
    document.getElementById("productCategory").value = product.category;
    document.getElementById("purchaseDate").value = product.purchaseDate;
    document.getElementById("supplier").value = product.supplier;

    currentEditId = id;
}

// Eliminar producto
function deleteProduct(id) {
    inventory = inventory.filter(product => product.id !== id);
    renderTable();
}

// Filtro de búsqueda
document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filteredInventory = inventory.filter(product => {
        return (
            product.id.toString().includes(query) ||
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)||
            product.supplier.toLowerCase().includes(query)
        );
    });
    renderFilteredTable(filteredInventory);
});

function renderFilteredTable(filteredInventory) {
    const tableBody = document.querySelector("#inventoryTable tbody");
    tableBody.innerHTML = "";

    filteredInventory.forEach(product => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>${product.category}</td>
            <td>${product.purchaseDate}</td>
            <td>${product.supplier}</td>
            <td>${product.total}</td>
            <td>
                <button onclick="editProduct(${product.id})">Editar</button>
                <button onclick="deleteProduct(${product.id})">Eliminar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Exportar tabla a Excel
document.getElementById("exportBtn").addEventListener("click", function () {
    exportTableToExcel('inventoryTable', 'inventario');
});

function exportTableToExcel(tableID, filename = '') {
    const downloadLink = document.createElement("a");
    const dataType = 'application/vnd.ms-excel';
    const tableSelect = document.getElementById(tableID);
    const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Nombre del archivo por defecto
    filename = filename ? filename + '.xls' : 'excel_data.xls';
    
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    downloadLink.download = filename;

    // Llamar al enlace para descargar
    downloadLink.click();
}
