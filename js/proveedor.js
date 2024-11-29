let inventory = [];
let nextId = 1;

// Referencias a los elementos del formulario y la tabla
const form = document.getElementById("inventoryForm");
const tableBody = document.querySelector("#inventoryTable tbody");
const searchIdInput = document.getElementById("searchId");

// Manejo del formulario para agregar o actualizar elementos
form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const nit = document.getElementById("nit").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    if (id) {
        // Si hay un ID, actualizamos el registro existente
        updateEntry(parseInt(id), name, nit, phone, email);
    } else {
        // Si no hay ID, agregamos un nuevo registro
        addEntry(name, nit, phone, email);
    }

    // Limpiar el formulario
    form.reset();
    document.getElementById("id").value = "";
});

// Función para agregar una entrada al inventario de Proveedores
function addEntry(name, nit, phone, email) {
    const entry = {
        id: nextId++,
        name,
        nit,
        phone,
        email
    };

    inventory.push(entry);
    renderTable();
}

// Función para actualizar una entrada existente
function updateEntry(id, name, nit, phone, email) {
    const entry = inventory.find(item => item.id === id);
    
    if (entry) {
        entry.name = name;
        entry.nit = nit;
        entry.phone = phone;
        entry.email = email;
        renderTable();
    }
}

// Función para eliminar una entrada del inventario
function deleteEntry(id) {
    inventory = inventory.filter(item => item.id !== id);
    renderTable();
}

// Función para editar una entrada
function editEntry(id) {
    const entry = inventory.find(item => item.id === id);
    
    if (entry) {
        document.getElementById("id").value = entry.id;
        document.getElementById("name").value = entry.name;
        document.getElementById("nit").value = entry.nit;
        document.getElementById("phone").value = entry.phone;
        document.getElementById("email").value = entry.email;
    }
}

// Función para buscar una entrada por ID
function searchById() {
    const id = parseInt(searchIdInput.value);
    
    if (!isNaN(id)) {
        const entry = inventory.find(item => item.id === id);
        
        if (entry) {
            alert(`!Proveedor Encontrado!
                 \nID: ${entry.id}
                \nNombre: ${entry.name}
                \nNIT: ${entry.nit}
                \nTeléfono: ${entry.phone}
                \nCorreo: ${entry.email}`);
        } else {
            alert("Proveedor no encontrado");
        }
    } else {
        alert("Ingrese un ID válido");
    }

    searchIdInput.value = "";
}

// Función para renderizar la tabla de inventario
function renderTable() {
    tableBody.innerHTML = "";

    inventory.forEach(entry => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${entry.id}</td>
            <td>${entry.name}</td>
            <td>${entry.nit}</td>
            <td>${entry.phone}</td>
            <td>${entry.email}</td>
            <td class="actions">
                <button onclick="editEntry(${entry.id})">Editar<br><br></button>  
                <button onclick="deleteEntry(${entry.id})">Eliminar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
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
    downloadLink.download = 'proveedores.xls';
    downloadLink.click();
});
