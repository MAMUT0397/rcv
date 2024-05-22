const nombre = document.getElementById("Nombre");
let nombreSelect;
nombre.addEventListener("change", function () {
    nombreSelect = nombre.value;
    console.log("nombre:", nombreSelect);
});

const apellido = document.getElementById("apellido");
let apellidoSelect;
apellido.addEventListener("change", function () {
    apellidoSelect = apellido.value;
    console.log("apellido:", apellidoSelect);
});

const fechaNaci = document.getElementById("fenaci");
let fenaci;
fechaNaci.addEventListener("change", function () {
    fenaci = fechaNaci.value;
    console.log("fecha de nacimiento:", fenaci);
});

const tipoDocu = document.getElementById("tipo");
let tipoSelect;
tipoDocu.addEventListener("change", function () {
    tipoSelect = tipoDocu.value;
    console.log("tipo de documento:", tipoSelect);
});

const numDocu = document.getElementById("cedula_rif"); // Cambiar el ID en el HTML también
let cedulaRif;
numDocu.addEventListener("change", function () {
    cedulaRif = numDocu.value;
    console.log("cedula/rif:", tipoSelect, cedulaRif);
});

const numTelf = document.getElementById("ntlf");
let numerotelefono;
numTelf.addEventListener("change", function () {
    numerotelefono = numTelf.value;
    console.log("Numero de telefono:", numerotelefono);
});

const listaMarca = document.getElementById("marca");
let marcaSeleccionada;
listaMarca.addEventListener("change", function () {
    marcaSeleccionada = listaMarca.value;
    console.log("Marca seleccionada:", marcaSeleccionada);
});

const datoModelo = document.getElementById("modelo");
let moodeloSelect;
datoModelo.addEventListener("change", function () {
    moodeloSelect = datoModelo.value;
    console.log("Modelo seleccionado:", moodeloSelect);
});

const version = document.getElementById("version");
let versionSeleccionada;
version.addEventListener("change", function () {
    versionSeleccionada = version.value;
    console.log("Versión seleccionada:", versionSeleccionada);
});

const tipoVehiculo = document.getElementById("tipo-vehiculo");
let tipoVehiculoSeleccionado;
tipoVehiculo.addEventListener("change", function () {
    tipoVehiculoSeleccionado = tipoVehiculo.value;
    console.log("Tipo de vehículo:", tipoVehiculoSeleccionado);
});

const ocupantes = document.getElementById("ocupantes");
let numeroOcupantes;
ocupantes.addEventListener("change", function () {
    numeroOcupantes = ocupantes.value;
    console.log("Número de ocupantes:", numeroOcupantes);
});

const ano = document.getElementById("ano");
let anoSeleccionado;
ano.addEventListener("change", function () {
    anoSeleccionado = ano.value;
    console.log("Año seleccionado:", anoSeleccionado);
});

// Manejo de primas de exceso, defensa penal y APOV
let primaExceso, primaDefensaPenal, primaApoVMuerte, primaApoVInvalidez, primaApoVGastosMedicos, primaGastosFunerarios;
document.getElementById('exceso').addEventListener('change', fetchAndLogValue);
document.getElementById('tipo-vehiculo').addEventListener('input', fetchAndLogValue);
document.getElementById('exceso').addEventListener('change', fetchAndLogValue);
document.getElementById('tipo-vehiculo').addEventListener('input', fetchAndLogValue);

function fetchAndLogValue() {
    const sumaAsegurada = parseInt(document.getElementById('exceso').value);
    const tipoVehiculo = document.getElementById('tipo-vehiculo').value;

    if (isNaN(sumaAsegurada) || !tipoVehiculo) {
        console.log('Por favor, selecciona una suma asegurada y escribe un tipo de vehículo válido.');
        return;
    }

    fetch("./tasaexceso.json")
        .then(response => response.json())
        .then(data => {
            const resultado = data.find(item => item["SUMA ASEGURADA "] === sumaAsegurada);

            if (resultado) {
                const valor = resultado[tipoVehiculo];
                if (valor !== undefined) {
                    console.log(`Suma Asegurada: ${sumaAsegurada}, Tipo de Vehículo: ${tipoVehiculo}, Valor: ${valor}`);
                    primaExceso = valor;
                    console.log('Prima de Exceso almacenada:', primaExceso);
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


document.getElementById('defensapenal').addEventListener('change', fetchAndLogDefensaPenal);

function fetchAndLogDefensaPenal() {
    const sumaAsegurada = parseInt(document.getElementById('defensapenal').value);

    if (isNaN(sumaAsegurada)) {
        console.log('Por favor, selecciona una suma asegurada válida.');
        return;
    }

    fetch('./defensapenal.json')
        .then(response => response.json())
        .then(data => {
            const resultado = data.find(item => item["SUMA ASEGURADA"] === sumaAsegurada);

            if (resultado) {
                const prima = resultado["PRIMA"];
                console.log(`Suma Asegurada: ${sumaAsegurada}, Prima defensa penal : ${prima}`);
                primaDefensaPenal = prima;
                console.log('Prima de Defensa Penal almacenada:', primaDefensaPenal);
            } else {
                console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
            }
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
        });
}


document.getElementById('apov').addEventListener('change', fetchAndLogapov);

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

    fetch('./apov.json')
        .then(response => response.json())
        .then(data => {
            const resultado = data.find(item => item["SUMA ASEGURADA"] === sumaAsegurada);

            if (resultado) {
                primaApoVMuerte = resultado["O.V MUERTE"] * ocupantes;
                primaApoVInvalidez = resultado["O.V INVALIDEZ"] * ocupantes;
                primaApoVGastosMedicos = resultado["O.V GASTOS MÉDICOS"] * ocupantes;
                primaGastosFunerarios = resultado["GASTOS FUNERARIOS"] * ocupantes;

                console.log(`Suma Asegurada: ${sumaAsegurada}, O.V MUERTE: ${primaApoVMuerte}, O.V INVALIDEZ: ${primaApoVInvalidez}, O.V GASTOS MÉDICOS: ${primaApoVGastosMedicos}, GASTOS FUNERARIOS: ${primaGastosFunerarios}`);
                console.log('Prima de APOV Muerte almacenada:', primaApoVMuerte);
                console.log('Prima de APOV Invalidez almacenada:', primaApoVInvalidez);
                console.log('Prima de APOV Gastos Médicos almacenada:', primaApoVGastosMedicos);
                console.log('Prima de Gastos Funerarios almacenada:', primaGastosFunerarios);
            } else {
                console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
            }
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
        });
}


// document.getElementById('downloadBtn').addEventListener('click', function() {
//     // Leer el archivo Excel existente
//     fetch('ruta/a/tu/archivo.xlsx')
//         .then(response => response.arrayBuffer())
//         .then(data => {
//             const workbook = XLSX.read(data, {type: 'array'});
            
//             // Selecciona la hoja de trabajo donde quieres escribir los datos
//             const worksheet = workbook.Sheets[workbook.SheetNames[0]];

//             // Escribir datos en celdas específicas
//             worksheet['A1'] = {v: nombreSelect};  // Nombre
//             worksheet['B1'] = {v: apellidoSelect};  // Apellido
//             worksheet['C1'] = {v: fenaci};  // Fecha de Nacimiento
//             worksheet['D1'] = {v: tipoSelect};  // Tipo de documento
//             worksheet['E1'] = {v: cedulaRif};  // Cédula/RIF
//             worksheet['F1'] = {v: numerotelefono};  // Número de teléfono
//             worksheet['G1'] = {v: marcaSeleccionada};  // Marca
//             worksheet['H1'] = {v: moodeloSelect};  // Modelo
//             worksheet['I1'] = {v: versionSeleccionada};  // Versión
//             worksheet['J1'] = {v: tipoVehiculoSeleccionado};  // Tipo de Vehículo
//             worksheet['K1'] = {v: numeroOcupantes};  // Número de Ocupantes
//             worksheet['L1'] = {v: anoSeleccionado};  // Año
//             worksheet['M1'] = {v: primaExceso};  // Prima de Exceso
//             worksheet['N1'] = {v: primaDefensaPenal};  // Prima de Defensa Penal
//             worksheet['O1'] = {v: primaApoVMuerte};  // Prima de APOV Muerte
//             worksheet['P1'] = {v: primaApoVInvalidez};  // Prima de APOV Invalidez
//             worksheet['Q1'] = {v: primaApoVGastosMedicos};  // Prima de APOV Gastos Médicos
//             worksheet['R1'] = {v: primaGastosFunerarios};  // Prima de Gastos Funerarios

//             // Escribir los cambios en el libro de trabajo
//             XLSX.writeFile(workbook, 'DatosActualizados.xlsx');
//         })
//         .catch(error => {
//             console.error('Error al leer el archivo Excel:', error);
//         });
// });



// fetch('template.xlsx') // La plantilla de Excel debe estar en el mismo servidor o en un lugar accesible
//             .then(response => response.arrayBuffer())
//             .then(dataBuffer => {
//                 const workbook = XLSX.read(dataBuffer, { type: 'array' });
//                 const sheetName = workbook.SheetNames[0]; // Suponiendo que trabajas con la primera hoja
//                 const worksheet = workbook.Sheets[sheetName];

//                 // Escribir datos en celdas específicas
//                 worksheet['A1'].v = data.nombre;
//                 worksheet['B1'].v = data.apellido;
//                 worksheet['C1'].v = data.fechaNaci;
//                 worksheet['D1'].v = data.tipoDocu;
//                 worksheet['E1'].v = data.cedulaRif;
//                 worksheet['F1'].v = data.numTelf;
//                 worksheet['G1'].v = data.marca;
//                 worksheet['H1'].v = data.modelo;
//                 worksheet['I1'].v = data.version;
//                 worksheet['J1'].v = data.tipoVehiculo;
//                 worksheet['K1'].v = data.ocupantes;
//                 worksheet['L1'].v = data.ano;
//                 worksheet['M1'].v = data.primaExceso;
//                 worksheet['N1'].v = data.primaDefensaPenal;
//                 worksheet['O1'].v = data.primaApoVMuerte;
//                 worksheet['P1'].v = data.primaApoVInvalidez;
//                 worksheet['Q1'].v = data.primaApoVGastosMedicos;
//                 worksheet['R1'].v = data.primaGastosFunerarios;

//                 // Convertir el archivo Excel modificado a un HTML (temporal para crear PDF)
//                 const excelHTML = XLSX.utils.sheet_to_html(worksheet);

//                 // Convertir el HTML a PDF usando html2canvas y jsPDF
//                 const { jsPDF } = window.jspdf;
//                 html2canvas(document.body).then(canvas => {
//                     const imgData = canvas.toDataURL('image/png');
//                     const pdf = new jsPDF('p', 'pt', 'a4');
//                     pdf.addImage(imgData, 'PNG', 0, 0);
//                     pdf.save('DatosActualizados.pdf');
//                 });
//             });
//     });