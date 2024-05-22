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
