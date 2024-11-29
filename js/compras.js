let productos = [];
let idAutoIncrementable = 1;
let editIndex = -1;

document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombreProducto').value;
    const precio = parseFloat(document.getElementById('precioUnitario').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const fecha = document.getElementById('fechaCompra').value;

    const total = precio * cantidad;

    if (editIndex === -1) {
        // Agregar producto
        productos.push({ id: idAutoIncrementable++, nombre, precio, cantidad, fecha, total });
    } else {
        // Editar producto existente
        productos[editIndex] = { ...productos[editIndex], nombre, precio, cantidad, fecha, total };
        editIndex = -1; // Resetear modo edición
    }

    actualizarTabla();
    limpiarFormulario();
});

function actualizarTabla() {
    const tableBody = document.querySelector('#inventoryTable tbody');
    tableBody.innerHTML = '';

    productos.forEach((producto, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio.toFixed(2)}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.fecha}</td>
            <td>${producto.total.toFixed(2)}</td>
            <td>
                <button onclick="editarProducto(${index})">Editar</button>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function limpiarFormulario() {
    document.getElementById('nombreProducto').value = '';
    document.getElementById('precioUnitario').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('fechaCompra').value = '';
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    actualizarTabla();
}

function editarProducto(index) {
    const producto = productos[index];
    document.getElementById('nombreProducto').value = producto.nombre;
    document.getElementById('precioUnitario').value = producto.precio;
    document.getElementById('cantidad').value = producto.cantidad;
    document.getElementById('fechaCompra').value = producto.fecha;
    editIndex = index; // Guardar el índice en edición
}

function buscarProducto() {
    const searchId = parseInt(document.getElementById('searchId').value);
    const resultado = productos.find(producto => producto.id === searchId);

    if (resultado) {
        const tableBody = document.querySelector('#inventoryTable tbody');
        tableBody.innerHTML = `
            <tr>
                <td>${resultado.id}</td>
                <td>${resultado.nombre}</td>
                <td>${resultado.precio.toFixed(2)}</td>
                <td>${resultado.cantidad}</td>
                <td>${resultado.fecha}</td>
                <td>${resultado.total.toFixed(2)}</td>
                <td>
                    <button onclick="editarProducto(${productos.indexOf(resultado)})">Editar <br><br></button>
                    <button onclick="eliminarProducto(${productos.indexOf(resultado)})">Eliminar</button>
                </td>
            </tr>
        `;
    } else {
        alert("Producto no encontrado");
    }
}

// Función para exportar tabla a Excel
document.getElementById('exportBtn').addEventListener('click', function() {
    const table = document.getElementById('inventoryTable');
    const tableHTML = table.outerHTML.replace(/ /g, '%20');

    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:application/vnd.ms-excel,' + tableHTML;
    downloadLink.download = 'compras.xls';
    downloadLink.click();
});
