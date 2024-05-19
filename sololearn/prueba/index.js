document.addEventListener("DOMContentLoaded", function() {
    fetch('./json/marca.json')
        .then(response => response.json())
        .then(data => {
            let marcaSelect = document.getElementById('marca');
            if (Array.isArray(data)) {
                data.forEach(marcaObj => {
                    if (marcaObj && marcaObj.marca) {
                        let option = document.createElement('option');
                        option.value = marcaObj.marca;
                        option.text = marcaObj.marca;
                        marcaSelect.appendChild(option);
                    }
                });
            }
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});

document.addEventListener("DOMContentLoaded", function() {
    fetch('./json/marca-modelo.json')
        .then(response => response.json())
        .then(data => {
            let marcaSelect = document.getElementById('marca');
            let modeloSelect = document.getElementById('modelo');
            let marcasModelos = {};

            data.forEach(item => {
                if (!marcasModelos[item.marca]) {
                    marcasModelos[item.marca] = [];
                }
                marcasModelos[item.marca].push(item.modelo);
            });

            marcaSelect.addEventListener('change', function() {
                let selectedMarca = this.value;
                let modelos = marcasModelos[selectedMarca];

                modeloSelect.innerHTML = '<option value=""></option>';

                if (modelos) {
                    modelos.forEach(modelo => {
                        let option = document.createElement('option');
                        option.value = modelo;
                        option.text = modelo;
                        modeloSelect.appendChild(option);
                    });
                }
            });

            marcaSelect.dispatchEvent(new Event('change'));
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});

document.addEventListener("DOMContentLoaded", function() {
    fetch('./json/marca-modelo-version-tipo.json')
        .then(response => response.json())
        .then(data => {
            let marcaSelect = document.getElementById('marca');
            let modeloSelect = document.getElementById('modelo');
            let versionSelect = document.getElementById('version');
            let tipoVehiculoInput = document.getElementById('tipo-vehiculo');
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

            marcaSelect.addEventListener('change', function() {
                let selectedMarca = this.value;
                let modelos = Object.keys(marcasModelos[selectedMarca]);

                modeloSelect.innerHTML = '<option value=""></option>';
                versionSelect.innerHTML = '<option value=""></option>';
                tipoVehiculoInput.value = '';

                if (modelos) {
                    modelos.forEach(modelo => {
                        let option = document.createElement('option');
                        option.value = modelo;
                        option.text = modelo;
                        modeloSelect.appendChild(option);
                    });
                }

                modeloSelect.dispatchEvent(new Event('change'));
            });

            modeloSelect.addEventListener('change', function() {
                let selectedMarca = marcaSelect.value;
                let selectedModelo = this.value;
                let versiones = Object.keys(marcasModelos[selectedMarca][selectedModelo]);

                versionSelect.innerHTML = '<option value=""></option>';
                tipoVehiculoInput.value = '';

                if (versiones) {
                    versiones.forEach(version => {
                        let option = document.createElement('option');
                        option.value = version;
                        option.text = version;
                        versionSelect.appendChild(option);
                    });
                }

                versionSelect.dispatchEvent(new Event('change'));
            });

            versionSelect.addEventListener('change', function() {
                let selectedMarca = marcaSelect.value;
                let selectedModelo = modeloSelect.value;
                let selectedVersion = this.value;
                let tipos = marcasModelos[selectedMarca][selectedModelo][selectedVersion];

                tipoVehiculoInput.value = tipos ? tipos[0] : '';
            });

            marcaSelect.dispatchEvent(new Event('change'));
        })
        .catch(error => console.error('Error fetching the JSON:', error));
});

































