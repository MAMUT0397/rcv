

document.addEventListener("DOMContentLoaded", function() {
    fetch('./marca.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let marcaSelect = document.getElementById('marca');
            if (!Array.isArray(data)) {
                console.error('Error: El JSON no es una lista/array.');
                return;
            }
            data.forEach(marcaObj => {
                if (!marcaObj || !marcaObj.marca) {
                    console.error('Error: Formato de objeto incorrecto:', marcaObj);
                    return;
                }
                let option = document.createElement('option');
                option.value = marcaObj.marca;
                option.text = marcaObj.marca;
                marcaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});


// actualiza modelo
document.addEventListener("DOMContentLoaded", function() {
    fetch('./marca-modelo.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let marcaSelect = document.getElementById('marca');
            let modeloSelect = document.getElementById('modelo');

            // Crear un objeto para agrupar modelos por marca
            let marcasModelos = {};

            data.forEach(item => {
                if (!marcasModelos[item.marca]) {
                    marcasModelos[item.marca] = [];
                }
                marcasModelos[item.marca].push(item.modelo);
            });

            // Población inicial de marcas
            Object.keys(marcasModelos).forEach(marca => {
                let option = document.createElement('option');
                option.value = marca;
                option.text = marca;
                marcaSelect.appendChild(option);
            });

            // Evento para actualizar los modelos
            marcaSelect.addEventListener('change', function() {
                let selectedMarca = this.value;
                let modelos = marcasModelos[selectedMarca];

                // Limpiar los modelos actuales
                modeloSelect.innerHTML = '';

                // Población de nuevos modelos
                modelos.forEach(modelo => {
                    let option = document.createElement('option');
                    option.value = modelo;
                    option.text = modelo;
                    modeloSelect.appendChild(option);
                });
            });

            // Disparar el evento de cambio al cargar para poblar los modelos iniciales
            marcaSelect.dispatchEvent(new Event('change'));
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});




document.addEventListener("DOMContentLoaded", function() {
    fetch('./marca-modelo-version-tipo.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let marcaSelect = document.getElementById('marca');
            let modeloSelect = document.getElementById('modelo');
            let versionSelect = document.getElementById('version');

            // Crear un objeto para agrupar modelos y versiones por marca
            let marcasModelos = {};

            data.forEach(item => {
                if (!marcasModelos[item.MARCA]) {
                    marcasModelos[item.MARCA] = {};
                }
                if (!marcasModelos[item.MARCA][item.MODELO]) {
                    marcasModelos[item.MARCA][item.MODELO] = [];
                }
                marcasModelos[item.MARCA][item.MODELO].push(item.VERSION);
            });

            // Población inicial de marcas
            Object.keys(marcasModelos).forEach(marca => {
                let option = document.createElement('option');
                option.value = marca;
                option.text = marca;
                marcaSelect.appendChild(option);
            });

            // Evento para actualizar los modelos
            marcaSelect.addEventListener('change', function() {
                let selectedMarca = this.value;
                let modelos = Object.keys(marcasModelos[selectedMarca]);

                // Limpiar los modelos y versiones actuales
                modeloSelect.innerHTML = '';
                versionSelect.innerHTML = '';

                // Población de nuevos modelos
                modelos.forEach(modelo => {
                    let option = document.createElement('option');
                    option.value = modelo;
                    option.text = modelo;
                    modeloSelect.appendChild(option);
                });

                // Disparar el evento de cambio del modelo para poblar las versiones
                modeloSelect.dispatchEvent(new Event('change'));
            });

            // Evento para actualizar las versiones
            modeloSelect.addEventListener('change', function() {
                let selectedMarca = marcaSelect.value;
                let selectedModelo = this.value;
                let versiones = marcasModelos[selectedMarca][selectedModelo];

                // Limpiar las versiones actuales
                versionSelect.innerHTML = '';

                // Población de nuevas versiones
                versiones.forEach(version => {
                    let option = document.createElement('option');
                    option.value = version;
                    option.text = version;
                    versionSelect.appendChild(option);
                });
            });

            // Disparar el evento de cambio al cargar para poblar los modelos y versiones iniciales
            marcaSelect.dispatchEvent(new Event('change'));
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});

/**actualizar el tipo */

document.addEventListener("DOMContentLoaded", function() {
    fetch('./marca-modelo-version-tipo.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let marcaSelect = document.getElementById('marca');
            let modeloSelect = document.getElementById('modelo');
            let versionSelect = document.getElementById('version');
            let tipoSelect = document.getElementById('tipo-vehiculo');

            // Crear un objeto para agrupar modelos, versiones y tipos por marca
            let marcasModelos = {};

            data.forEach(item => {
                if (!marcasModelos[item.MARCA]) {
                    marcasModelos[item.MARCA] = {};
                }
                if (!marcasModelos[item.MARCA][item.MODELO]) {
                    marcasModelos[item.MARCA][item.MODELO] = {};
                }
                if (!marcasModelos[item.MARCA][item.MODELO][item.VERSION]) {
                    marcasModelos[item.MARCA][item.MODELO][item.VERSION] = [];
                }
                marcasModelos[item.MARCA][item.MODELO][item.VERSION].push(item.TIPO);
            });

            // Población inicial de marcas
            Object.keys(marcasModelos).forEach(marca => {
                let option = document.createElement('option');
                option.value = marca;
                option.text = marca;
                marcaSelect.appendChild(option);
            });

            // Evento para actualizar los modelos
            marcaSelect.addEventListener('change', function() {
                let selectedMarca = this.value;
                let modelos = Object.keys(marcasModelos[selectedMarca]);

                // Limpiar los modelos, versiones y tipos actuales
                modeloSelect.innerHTML = '';
                versionSelect.innerHTML = '';
                tipoSelect.innerHTML = '';

                // Población de nuevos modelos
                modelos.forEach(modelo => {
                    let option = document.createElement('option');
                    option.value = modelo;
                    option.text = modelo;
                    modeloSelect.appendChild(option);
                });

                // Disparar el evento de cambio del modelo para poblar las versiones y tipos
                modeloSelect.dispatchEvent(new Event('change'));
            });

            // Evento para actualizar las versiones y tipos
            modeloSelect.addEventListener('change', function() {
                let selectedMarca = marcaSelect.value;
                let selectedModelo = this.value;
                let versiones = Object.keys(marcasModelos[selectedMarca][selectedModelo]);

                // Limpiar las versiones y tipos actuales
                versionSelect.innerHTML = '';
                tipoSelect.innerHTML = '';

                // Población de nuevas versiones
                versiones.forEach(version => {
                    let option = document.createElement('option');
                    option.value = version;
                    option.text = version;
                    versionSelect.appendChild(option);
                });

                // Disparar el evento de cambio de la versión para poblar los tipos
                versionSelect.dispatchEvent(new Event('change'));
            });

            // Evento para actualizar los tipos
            versionSelect.addEventListener('change', function() {
                let selectedMarca = marcaSelect.value;
                let selectedModelo = modeloSelect.value;
                let selectedVersion = this.value;
                let tipos = marcasModelos[selectedMarca][selectedModelo][selectedVersion];

                // Limpiar los tipos actuales
                tipoSelect.innerHTML = '';

                // Población de nuevos tipos
                tipos.forEach(tipo => {
                    let option = document.createElement('option');
                    option.value = tipo;
                    option.text = tipo;
                    tipoSelect.appendChild(option);
                });
            });

            // Disparar el evento de cambio al cargar para poblar los modelos, versiones y tipos iniciales
            marcaSelect.dispatchEvent(new Event('change'));
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});




