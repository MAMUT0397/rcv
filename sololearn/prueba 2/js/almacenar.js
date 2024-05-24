
let nombre = document.getElementById("Nombre");
nombre.addEventListener("change", function (){
    nombreSelect = nombre.value
    datosCapturados.push(nombreSelect)
    console.log("nombre:",nombreSelect)
})

let apellido = document.getElementById("apellido");
apellido.addEventListener("change", function (){
    apellidoSelect = apellido.value
    datosCapturados.push(apellidoSelect)
    console.log("apellido:",apellidoSelect)
})

    let fechaNaci = document.getElementById("fenaci");
    fechaNaci.addEventListener("change", function () {
        fenaci = fechaNaci.value
        datosCapturados.push(fenaci)
        console.log("fecha de nacimiento",fenaci)
    })

    let tipoDocu = document.getElementById("tipo");
tipoDocu.addEventListener("change", function () {
   tipoSelect= tipoDocu.value;
   datosCapturados.push(tipoSelect)
});

let numDocu = document.getElementById("Cedula/rif");
numDocu.addEventListener("change", function () {
   cedulaRif = numDocu.value;
   datosCapturados.push(cedulaRif)
   console.log("cedula/rif",tipoSelect,cedulaRif)
});

let numTelf = document.getElementById("ntlf");
numTelf.addEventListener("change", function () {
    numerotelefono = numTelf.value;
    datosCapturados.push(numerotelefono)
    console.log("Numero de telefono",numerotelefono)
})


 let listaMarca = document.getElementById("marca");
listaMarca.addEventListener("change", function () {
    marcaSeleccionada = listaMarca.value;
    if (marcaSeleccionada.trim() !==""){
        datosCapturados.push(marcaSeleccionada)
    console.log("Marca seleccionada:", marcaSeleccionada)
    }else{ }
});

let datoModelo = document.getElementById("modelo");
datoModelo.addEventListener("change",function () {
    moodeloSelect = datoModelo.value
    datosCapturados.push(moodeloSelect)
   
    console.log("Modelo seleccionado:", moodeloSelect)
})




let primaExceso;
let primaDefensaPenal;
let primaApoVMuerte;
let primaApoVInvalidez;
let primaApoVGastosMedicos;
let primaGastosFunerarios;


// prima exceso
document.getElementById('exceso').addEventListener('change', fetchAndLogValue);
document.getElementById('tipo-vehiculo').addEventListener('input', fetchAndLogValue);

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

// prima defensa penal
document.getElementById('defensapenal').addEventListener('change', fetchAndLogDefensaPenal);

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
                console.log('Prima de Defensa Penal almacenada:', primaDefensaPenal);
            } else {
                console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
            }
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
        });
}



// prima apov
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

    fetch('./datos/apov.json')
        .then(response => response.json())
        .then(data => {
            const resultado = data.find(item => item["SUMA ASEGURADA"] === sumaAsegurada);

            if (resultado) {
                primaApoVMuerte = resultado["O.V MUERTE"] * ocupantes;
                primaApoVInvalidez = resultado["O.V INVALIDEZ"] * ocupantes;
                primaApoVGastosMedicos = resultado["O.V GASTOS MÉDICOS"] * ocupantes;
                primaGastosFunerarios = resultado["GASTOS FUNERARIOS"] * ocupantes;

                datosCapturados.push({
                    primaApoVMuerte: primaApoVMuerte,
                    primaApoVInvalidez: primaApoVInvalidez,
                    primaApoVGastosMedicos: primaApoVGastosMedicos,
                    primaGastosFunerarios: primaGastosFunerarios
                });

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



let datosCapturados = [];
console.log(datosCapturados)