let datosCapturados = {};

function actualizarDatosCapturados(id, valor) {
    datosCapturados[id] = valor;
    console.log(`${id}: ${valor}`);
    console.log(datosCapturados);
}

// Datos del Solicitante
let nombre = document.getElementById("Nombre");
nombre.addEventListener("change", function () {
    actualizarDatosCapturados('nombre', nombre.value);
});

let apellido = document.getElementById("apellido");
apellido.addEventListener("change", function () {
    actualizarDatosCapturados('apellido', apellido.value);
});

let fechaNaci = document.getElementById("fenaci");
fechaNaci.addEventListener("change", function () {
    actualizarDatosCapturados('fechaNacimiento', fechaNaci.value);
});

let tipoDocu = document.getElementById("tipo");
tipoDocu.addEventListener("change", function () {
    actualizarDatosCapturados('tipoDocumento', tipoDocu.value);
});

let numDocu = document.getElementById("Cedula/rif");
numDocu.addEventListener("change", function () {
    actualizarDatosCapturados('cedulaRif', numDocu.value);
});

let numTelf = document.getElementById("ntlf");
numTelf.addEventListener("change", function () {
    actualizarDatosCapturados('telefono', numTelf.value);
});

document.querySelectorAll('input[name="sexo"]').forEach((input) => {
    input.addEventListener('change', function () {
        if (input.checked) {
            actualizarDatosCapturados('sexo', input.value);
        }
    });
});

// Información del Vehículo
let listaMarca = document.getElementById("marca");
listaMarca.addEventListener("change", function () {
    actualizarDatosCapturados('marca', listaMarca.value);
});

let datoModelo = document.getElementById("modelo");
datoModelo.addEventListener("change", function () {
    actualizarDatosCapturados('modelo', datoModelo.value);
});

let datoVersion = document.getElementById("version");
datoVersion.addEventListener("change", function () {
    actualizarDatosCapturados('version', datoVersion.value);
});

let tipoVehiculo = document.getElementById("tipo-vehiculo");
tipoVehiculo.addEventListener("change", function () {
    actualizarDatosCapturados('tipoVehiculo', tipoVehiculo.value);
});

let ocupantes = document.getElementById("ocupantes");
ocupantes.addEventListener("change", function () {
    actualizarDatosCapturados('ocupantes', ocupantes.value);
});

let ano = document.getElementById("ano");
ano.addEventListener("change", function () {
    actualizarDatosCapturados('ano', ano.value);
});

// Coberturas
let exceso = document.getElementById("exceso");
exceso.addEventListener("change", function () {
    actualizarDatosCapturados('exceso', exceso.value);
    fetchAndLogValue();
});

let defensapenal = document.getElementById("defensapenal");
defensapenal.addEventListener("change", function () {
    actualizarDatosCapturados('defensaPenal', defensapenal.value);
    fetchAndLogDefensaPenal();
});

let apov = document.getElementById("apov");
apov.addEventListener("change", function () {
    actualizarDatosCapturados('apov', apov.value);
    fetchAndLogapov();
});

let primaExceso;
let primaDefensaPenal;
let primaApoVMuerte;
let primaApoVInvalidez;
let primaApoVGastosMedicos;
let primaGastosFunerarios;

function fetchAndLogValue() {
    const sumaAsegurada = parseInt(document.getElementById('exceso').value);
    const tipoVehiculo = document.getElementById('tipo-vehiculo').value;

    if (isNaN(sumaAsegurada) || !tipoVehiculo) {
        console.log('Por favor, selecciona una suma asegurada y escribe un tipo de vehículo válido.');
        return;
    }

    fetch("./datos/tasaexceso.json")
        .then(response => response.json())
        .then(data => {
            const resultado = data.find(item => item["SUMA ASEGURADA "] === sumaAsegurada);

            if (resultado) {
                const valor = resultado[tipoVehiculo];
                if (valor !== undefined) {
                    console.log(`Suma Asegurada: ${sumaAsegurada}, Tipo de Vehículo: ${tipoVehiculo}, Valor: ${valor}`);
                    primaExceso = valor;
                    actualizarDatosCapturados('primaExceso', primaExceso);
                } else {
                    console.log(`Tipo de vehículo: ${tipoVehiculo} no encontrado en la suma asegurada: ${sumaAsegurada}.`);
                }
            } else {
                console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
            }
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
        });
}

function fetchAndLogDefensaPenal() {
    const sumaAsegurada = parseInt(document.getElementById('defensapenal').value);

    if (isNaN(sumaAsegurada)) {
        console.log('Por favor, selecciona una suma asegurada válida.');
        return;
    }

    fetch('./datos/defensapenal.json')
        .then(response => response.json())
        .then(data => {
            const resultado = data.find(item => item["SUMA ASEGURADA"] === sumaAsegurada);

            if (resultado) {
                const prima = resultado["PRIMA"];
                console.log(`Suma Asegurada: ${sumaAsegurada}, Prima: ${prima}`);
                primaDefensaPenal = prima;
                actualizarDatosCapturados('primaDefensaPenal', primaDefensaPenal);
            } else {
                console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
            }
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
        });
}

function fetchAndLogapov() {
    const sumaAsegurada = parseInt(document.getElementById('apov').value);
    const ocupantes = parseInt(document.getElementById('ocupantes').value);

    if (isNaN(sumaAsegurada)) {
        console.log('Por favor, selecciona una suma asegurada válida.');
        return;
    }

    if (isNaN(ocupantes)) {
        console.log('Por favor, ingresa un número válido de ocupantes.');
        return;
    }

    fetch('./datos/apov.json')
        .then(response => response.json())
        .then(data => {
            const resultado = data.find(item => item["SUMA ASEGURADA"] === sumaAsegurada);

            if (resultado) {
                primaApoVMuerte = resultado["O.V MUERTE"] * ocupantes;
                primaApoVInvalidez = resultado["O.V INVALIDEZ"] * ocupantes;
                primaApoVGastosMedicos = resultado["O.V GASTOS MÉDICOS"] * ocupantes;
                primaGastosFunerarios = resultado["GASTOS FUNERARIOS"] * ocupantes;

                actualizarDatosCapturados('primaApoVMuerte', primaApoVMuerte);
                actualizarDatosCapturados('primaApoVInvalidez', primaApoVInvalidez);
                actualizarDatosCapturados('primaApoVGastosMedicos', primaApoVGastosMedicos);
                actualizarDatosCapturados('primaGastosFunerarios', primaGastosFunerarios);

                console.log(`Suma Asegurada: ${sumaAsegurada}, O.V MUERTE: ${primaApoVMuerte}, O.V INVALIDEZ: ${primaApoVInvalidez}, O.V GASTOS MÉDICOS: ${primaApoVGastosMedicos}, GASTOS FUNERARIOS: ${primaGastosFunerarios}`);
            } else {
                console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
            }
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
        });
}

console.log(datosCapturados);



   
document.addEventListener('DOMContentLoaded', function() {
    

    function actualizarDatosCapturados(id, valor) {
        datosCapturados[id] = valor;
        console.log(`${id}: ${valor}`);
        console.log(datosCapturados);
    }

    // Registrar eventos de cambio para capturar datos
    document.getElementById('cotizarCoberturas').addEventListener('click', function() {
        // Leer el archivo Excel existente
        fetch('./datos/FC.xlsx')
            .then(response => response.arrayBuffer())
            .then(data => {
                const workbook = XLSX.read(data, { type: 'array' });
                console.log(workbook)

                // Seleccionar la hoja de trabajo por nombre
                const sheetName = 'PRINT';
                const worksheet = workbook.Sheets[sheetName];

                // Escribir los datos capturados en celdas específicas
                worksheet['A18'].v = datosCapturados['nombre'] || '';
                // worksheet['B1'].v = datosCapturados['apellido'] || '';
                // worksheet['C1'].v = datosCapturados['fechaNacimiento'] || '';
                // worksheet['D1'].v = datosCapturados['tipoDocumento'] || '';
                // worksheet['E1'].v = datosCapturados['cedulaRif'] || '';
                // worksheet['F1'].v = datosCapturados['telefono'] || '';
                // worksheet['G1'].v = datosCapturados['sexo'] || '';
                // worksheet['H1'].v = datosCapturados['marca'] || '';
                // worksheet['I1'].v = datosCapturados['modelo'] || '';
                // worksheet['J1'].v = datosCapturados['version'] || '';
                // worksheet['K1'].v = datosCapturados['tipoVehiculo'] || '';
                // worksheet['L1'].v = datosCapturados['ocupantes'] || '';
                // worksheet['M1'].v = datosCapturados['ano'] || '';
                // worksheet['N1'].v = datosCapturados['exceso'] || '';
                // worksheet['O1'].v = datosCapturados['primaExceso'] || '';
                // worksheet['P1'].v = datosCapturados['defensaPenal'] || '';
                // worksheet['Q1'].v = datosCapturados['primaDefensaPenal'] || '';
                // worksheet['R1'].v = datosCapturados['apov'] || '';
                // worksheet['S1'].v = datosCapturados['primaApoVMuerte'] || '';
                // worksheet['T1'].v = datosCapturados['primaApoVInvalidez'] || '';
                // worksheet['U1'].v = datosCapturados['primaApoVGastosMedicos'] || '';
                // worksheet['V1'].v = datosCapturados['primaGastosFunerarios'] || '';

                // Generar el nuevo archivo Excel
                const newWorkbook = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

                // Descargar el archivo Excel modificado
                const blob = new Blob([newWorkbook], { type: 'application/octet-stream' });
                saveAs(blob, 'cotizacion_actualizada.xlsx');
            })
            .catch(error => {
                console.error('Error al leer o procesar el archivo Excel:', error);
            });
    });
});

    document.getElementById('cotizarCoberturas').addEventListener('click', function() {
        fetch('./datos/FC.xlsx')
            .then(response => response.arrayBuffer())
            .then(data => {
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = 'PRINT';
                const worksheet = workbook.Sheets[sheetName];

                // Asegurarse de que la celda 'A18' exista
                if (!worksheet['A18']) {
                    worksheet['A18'] = { v: '' }; // Inicializar la celda si no existe
                }

                // Continuar con el resto del código para escribir en la hoja de cálculo...

            })
            .catch(error => {
                console.error('Error al leer o procesar el archivo Excel:', error);
            });
    });

    document.getElementById('cotizarCoberturas').addEventListener('click', function() {
        fetch('./datos/FC.xlsx')
            .then(response => response.arrayBuffer())
            .then(data => {
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = 'PRINT';
                const worksheet = workbook.Sheets[sheetName];
    
                // Asegurarse de que la celda 'A18' exista
                if (!worksheet['A18']) {
                    worksheet['A18'] = { v: '' }; // Inicializar la celda si no existe
                }
    
                // Continuar con el resto del código para escribir en la hoja de cálculo...
    
            })
            .catch(error => {
                console.error('Error al leer o procesar el archivo Excel:', error);
            });
    });
    