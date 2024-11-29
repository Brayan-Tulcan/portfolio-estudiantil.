let inventory = [];
let currentId = 1;

document.getElementById("inventory-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const productId = document.getElementById("product-id").value;
    const provider = document.getElementById("provider").value;
    const productName = document.getElementById("name").value;
    const initialValue = parseFloat(document.getElementById("initial-value").value);
    const finalValue = parseFloat(document.getElementById("final-value").value);
    const initialDate = new Date(document.getElementById('initial-date').value);
    const expiryDate = new Date(document.getElementById('expiry-date').value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const productType = document.getElementById("product-type").value;
    
    const ValorGanancia  = finalValue-initialValue;
    const diasDiferencia = Math.ceil((expiryDate - initialDate) / (1000 * 60 * 60 * 24));

    let image = document.getElementById("image").files[0];
    let imageUrl = "";
    if (image) {
        const reader = new FileReader();
        reader.onload = function(event) {
            imageUrl = event.target.result;
            if (!productId) {
                addProduct({
                    id: currentId++,
                    name: productName,
                    initialValue,
                    finalValue,
                    ValorGanancia,
                    initialDate:initialDate.toLocaleDateString(),
                    expiryDate:expiryDate.toLocaleDateString(),
                    diasDiferencia,
                    quantity,
                    image: imageUrl,
                    provider,
                    productType
                });
            } else {
                updateProduct(parseInt(productId), {
                    id: parseInt(productId),
                    name: productName,
                    initialValue,
                    finalValue,
                    ValorGanancia,
                    initialDate: initialDate.toLocaleDateString(),
                    expiryDate:  expiryDate.toLocaleDateString(),
                    diasDiferencia,
                    quantity,
                    image: imageUrl,
                    provider,
                    productType
                });
            }
            resetForm();
        };
        reader.readAsDataURL(image);
    } else {
        if (!productId) {
            addProduct({
                id: currentId++,
                name: productName,
                initialValue,
                finalValue,
                initialDate: initialDate.toLocaleDateString(),
                expiryDate:  expiryDate.toLocaleDateString(),
                quantity,
                image: "",
                provider,
                productType
            });
        } else {
            updateProduct(parseInt(productId), {
                id: parseInt(productId),
                name: productName,
                initialValue,
                finalValue,
                initialDate: initialDate.toLocaleDateString(),
                expiryDate:  expiryDate.toLocaleDateString(),
                quantity,
                image: "",
                provider,
                productType
            });
        }
        resetForm();
    }
});


//añadir producto

function addProduct(product) {
    inventory.push(product);
    displayInventory();
}


//actualizar producto

function updateProduct(id, updatedProduct) {
    inventory = inventory.map(product => product.id === id ? updatedProduct : product);
    displayInventory();
}

//eliminar producto

function deleteProduct(id) {
    inventory = inventory.filter(product => product.id !== id);
    displayInventory();
}

//buscar producto

function searchProduct() {
    const searchId = parseInt(document.getElementById("search-id").value);
    const foundProduct = inventory.find(product => product.id === searchId);
    if (foundProduct) {
        alert(`Producto Encontrado:
            ID: ${foundProduct.id}
            Nombre: ${foundProduct.name}
            Valor Inicial: $${foundProduct.initialValue}
            Valor Final: $${foundProduct.finalValue}
            Valor Ganancia: $${foundProduct.ValorGanancia}
            Fecha Inicial: ${foundProduct.initialDate}
            Fecha de Vencimiento: ${foundProduct.expiryDate}
            Caducidad del Producto: ${foundProduct.diasDiferencia} días
            Cantidad: ${foundProduct.quantity}
            Proveedor: ${foundProduct.provider}
            Tipo de Producto: ${foundProduct.productType}`);
    } else {
        alert("Producto No Encontrado");
    }
}


//mostrar acciones en la tabla

function displayInventory() {
    const tbody = document.querySelector("#product-list tbody");
    tbody.innerHTML = "";
    inventory.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.initialValue}</td>
            <td>$${product.finalValue}</td>
            <td>$${product.ValorGanancia}</td>
            <td>${product.initialDate}</td>
            <td>${product.expiryDate}</td>
            <td>${product.diasDiferencia} días</td>
            <td>${product.quantity}</td>
            <td><img src="${product.image}" alt="Imagen" width="50"></td>
            <td>${product.provider}</td>
            <td>${product.productType}</td>
            <td>
                <button class="edit" onclick="editProduct(${product.id})">Editar <br><br> </button>
                <button class="delete" onclick="deleteProduct(${product.id})">Borrar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}


//editar producto

function editProduct(id) {
    const product = inventory.find(product => product.id === id);
    if (product) {
        document.getElementById("product-id").value = product.id;
        document.getElementById("name").value = product.name;
        document.getElementById("initial-value").value = product.initialValue;
        document.getElementById("final-value").value = product.finalValue;
        document.getElementById('initial-date').value = new Date(product.initialDate).toISOString().split('T')[0];
        document.getElementById('expiry-date').value = new Date(product.expiryDate).toISOString().split('T')[0];
        document.getElementById("quantity").value = product.quantity;
        document.getElementById("provider").value = product.provider;
        document.getElementById("product-type").value = product.productType;
    }
}

//limpiar producto

function resetForm() {
    document.getElementById("inventory-form").reset();
    document.getElementById("product-id").value = "";
}



// Función para exportar tabla a Excel
document.getElementById('exportBtn').addEventListener('click', function() {
    const table = document.getElementById('product-list');
    const tableHTML = table.outerHTML.replace(/ /g, '%20');

    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:application/vnd.ms-excel,' + tableHTML;
    downloadLink.download = 'productos.xls';
    downloadLink.click();
});
