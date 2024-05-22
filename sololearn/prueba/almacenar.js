// // Variables globales para almacenar los datos
// let calculosExceso = [];
// let calculosDefensaPenal = [];
// let calculosApov = [];

// // Función para almacenar datos de Exceso
// function fetchAndLogValue() {
//     const sumaAsegurada = parseInt(document.getElementById('exceso').value);
//     const tipoVehiculo = document.getElementById('tipo-vehiculo').value;

//     if (isNaN(sumaAsegurada) || !tipoVehiculo) {
//         console.log('Por favor, selecciona una suma asegurada y escribe un tipo de vehículo válido.');
//         return;
//     }

//     fetch("./tasaexceso.json")
//         .then(response => response.json())
//         .then(data => {
//             const resultado = data.find(item => item["SUMA ASEGURADA "] === sumaAsegurada);

//             if (resultado) {
//                 const valor = resultado[tipoVehiculo];
//                 if (valor !== undefined) {
//                     console.log(`Suma Asegurada: ${sumaAsegurada}, Tipo de Vehículo: ${tipoVehiculo}, Valor: ${valor}`);
//                     calculosExceso.push({ sumaAsegurada, tipoVehiculo, valor });
//                 } else {
//                     console.log(`Tipo de vehículo: ${tipoVehiculo} no encontrado en la suma asegurada: ${sumaAsegurada}.`);
//                 }
//             } else {
//                 console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
//             }
//         })
//         .catch(error => {
//             console.error('Error al cargar el JSON:', error);
//         });
// }

// // Función para almacenar datos de Defensa Penal
// function fetchAndLogDefensaPenal() {
//     const sumaAsegurada = parseInt(document.getElementById('defensapenal').value);

//     if (isNaN(sumaAsegurada)) {
//         console.log('Por favor, selecciona una suma asegurada válida.');
//         return;
//     }

//     fetch('./defensapenal.json')
//         .then(response => response.json())
//         .then(data => {
//             const resultado = data.find(item => item["SUMA ASEGURADA"] === sumaAsegurada);

//             if (resultado) {
//                 const prima = resultado["PRIMA"];
//                 console.log(`Suma Asegurada: ${sumaAsegurada}, Prima: ${prima}`);
//                 calculosDefensaPenal.push({ sumaAsegurada, prima });
//             } else {
//                 console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
//             }
//         })
//         .catch(error => {
//             console.error('Error al cargar el JSON:', error);
//         });
// }

// // Función para almacenar datos de APOV
// function fetchAndLogapov() {
//     const sumaAsegurada = parseInt(document.getElementById('apov').value);
//     const ocupantes = parseInt(document.getElementById('ocupantes').value);

//     if (isNaN(sumaAsegurada)) {
//         console.log('Por favor, selecciona una suma asegurada válida.');
//         return;
//     }

//     if (isNaN(ocupantes)) {
//         console.log('Por favor, ingresa un número válido de ocupantes.');
//         return;
//     }

//     fetch('./apov.json')
//         .then(response => response.json())
//         .then(data => {
//             const resultado = data.find(item => item["SUMA ASEGURADA"] === sumaAsegurada);

//             if (resultado) {
//                 const ovMuerte = resultado["O.V MUERTE"] * ocupantes;
//                 const ovInvalidez = resultado["O.V INVALIDEZ"] * ocupantes;
//                 const ovGastosMedicos = resultado["O.V GASTOS MÉDICOS"] * ocupantes;
//                 const gastosFunerarios = resultado["GASTOS FUNERARIOS"] * ocupantes;

//                 console.log(`Suma Asegurada: ${sumaAsegurada}, O.V MUERTE: ${ovMuerte}, O.V INVALIDEZ: ${ovInvalidez}, O.V GASTOS MÉDICOS: ${ovGastosMedicos}, GASTOS FUNERARIOS: ${gastosFunerarios}`);
//                 calculosApov.push({ sumaAsegurada, ocupantes, ovMuerte, ovInvalidez, ovGastosMedicos, gastosFunerarios });
//             } else {
//                 console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
//             }
//         })
//         .catch(error => {
//             console.error('Error al cargar el JSON:', error);
//         });
// }

// // Agregar los event listeners
// document.getElementById('exceso').addEventListener('change', fetchAndLogValue);
// document.getElementById('tipo-vehiculo').addEventListener('input', fetchAndLogValue);
// document.getElementById('defensapenal').addEventListener('change', fetchAndLogDefensaPenal);
// document.getElementById('apov').addEventListener('change', fetchAndLogapov);
// document.getElementById('ocupantes').addEventListener('input', fetchAndLogapov);



// console.log(calculosApov,calculosExceso,calculosDefensaPenal)






// // Variables globales para almacenar los valores individuales
// let sumaAseguradaExceso, tipoVehiculoExceso, valorExceso;
// let sumaAseguradaDefensaPenal, primaDefensaPenal;
// let sumaAseguradaApov, ocupantesApov, ovMuerteApov, ovInvalidezApov, ovGastosMedicosApov, gastosFunerariosApov;


// // Función para almacenar datos de Exceso individualmente
// function fetchAndLogValue() {
//     const sumaAsegurada = parseInt(document.getElementById('exceso').value);
//     const tipoVehiculo = document.getElementById('tipo-vehiculo').value;

//     if (isNaN(sumaAsegurada) || !tipoVehiculo) {
//         console.log('Por favor, selecciona una suma asegurada y escribe un tipo de vehículo válido.');
//         return;
//     }

//     fetch("./tasaexceso.json")
//         .then(response => response.json())
//         .then(data => {
//             const resultado = data.find(item => item["SUMA ASEGURADA "] === sumaAsegurada);

//             if (resultado) {
//                 const valor = resultado[tipoVehiculo];
//                 if (valor !== undefined) {
//                     console.log(`Suma Asegurada: ${sumaAsegurada}, Tipo de Vehículo: ${tipoVehiculo}, Valor: ${valor}`);
//                     // Almacenar valores en las variables globales
//                     sumaAseguradaExceso = sumaAsegurada;
//                     tipoVehiculoExceso = tipoVehiculo;
//                     valorExceso = valor;
//                     console.log('Valores de Exceso almacenados:', { sumaAseguradaExceso, tipoVehiculoExceso, valorExceso });
//                 } else {
//                     console.log(`Tipo de vehículo: ${tipoVehiculo} no encontrado en la suma asegurada: ${sumaAsegurada}.`);
//                 }
//             } else {
//                 console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
//             }
//         })
//         .catch(error => {
//             console.error('Error al cargar el JSON:', error);
//         });
// }

// // Función para almacenar datos de Defensa Penal individualmente
// function fetchAndLogDefensaPenal() {
//     const sumaAsegurada = parseInt(document.getElementById('defensapenal').value);

//     if (isNaN(sumaAsegurada)) {
//         console.log('Por favor, selecciona una suma asegurada válida.');
//         return;
//     }

//     fetch('./defensapenal.json')
//         .then(response => response.json())
//         .then(data => {
//             const resultado = data.find(item => item["SUMA ASEGURADA"] === sumaAsegurada);

//             if (resultado) {
//                 const prima = resultado["PRIMA"];
//                 console.log(`Suma Asegurada: ${sumaAsegurada}, Prima: ${prima}`);
//                 // Almacenar valores en las variables globales
//                 sumaAseguradaDefensaPenal = sumaAsegurada;
//                 primaDefensaPenal = prima;
//                 console.log('Valores de Defensa Penal almacenados:', { sumaAseguradaDefensaPenal, primaDefensaPenal });
//             } else {
//                 console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
//             }
//         })
//         .catch(error => {
//             console.error('Error al cargar el JSON:', error);
//         });
// }

// // Función para almacenar datos de APOV individualmente
// function fetchAndLogapov() {
//     const sumaAsegurada = parseInt(document.getElementById('apov').value);
//     const ocupantes = parseInt(document.getElementById('ocupantes').value);

//     if (isNaN(sumaAsegurada)) {
//         console.log('Por favor, selecciona una suma asegurada válida.');
//         return;
//     }

//     if (isNaN(ocupantes)) {
//         console.log('Por favor, ingresa un número válido de ocupantes.');
//         return;
//     }

//     fetch('./apov.json')
//         .then(response => response.json())
//         .then(data => {
//             const resultado = data.find(item => item["SUMA ASEGURADA"] === sumaAsegurada);

//             if (resultado) {
//                 const ovMuerte = resultado["O.V MUERTE"] * ocupantes;
//                 const ovInvalidez = resultado["O.V INVALIDEZ"] * ocupantes;
//                 const ovGastosMedicos = resultado["O.V GASTOS MÉDICOS"] * ocupantes;
//                 const gastosFunerarios = resultado["GASTOS FUNERARIOS"] * ocupantes;

//                 console.log(`Suma Asegurada: ${sumaAsegurada}, O.V MUERTE: ${ovMuerte}, O.V INVALIDEZ: ${ovInvalidez}, O.V GASTOS MÉDICOS: ${ovGastosMedicos}, GASTOS FUNERARIOS: ${gastosFunerarios}`);
//                 // Almacenar valores en las variables globales
//                 sumaAseguradaApov = sumaAsegurada;
//                 ocupantesApov = ocupantes;
//                 ovMuerteApov = ovMuerte;
//                 ovInvalidezApov = ovInvalidez;
//                 ovGastosMedicosApov = ovGastosMedicos;
//                 gastosFunerariosApov = gastosFunerarios;
//                 console.log('Valores de APOV almacenados:', { sumaAseguradaApov, ocupantesApov, ovMuerteApov, ovInvalidezApov, ovGastosMedicosApov, gastosFunerariosApov });
//             } else {
//                 console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
//             }
//         })
//         .catch(error => {
//             console.error('Error al cargar el JSON:', error);
//         });
// }

// // Agregar los event listeners
// document.getElementById('exceso').addEventListener('change', fetchAndLogValue);
// document.getElementById('tipo-vehiculo').addEventListener('input', fetchAndLogValue);
// document.getElementById('defensapenal').addEventListener('change', fetchAndLogDefensaPenal);
// document.getElementById('apov').addEventListener('change', fetchAndLogapov);
// document.getElementById('ocupantes').addEventListener('input', fetchAndLogapov);


// let primaExceso;
// document.getElementById('exceso').addEventListener('change', fetchAndLogValue);
// document.getElementById('tipo-vehiculo').addEventListener('input', fetchAndLogValue);

// function fetchAndLogValue() {
//     const sumaAsegurada = parseInt(document.getElementById('exceso').value);
//     const tipoVehiculo = document.getElementById('tipo-vehiculo').value;

//     if (isNaN(sumaAsegurada) || !tipoVehiculo) {
//         console.log('Por favor, selecciona una suma asegurada y escribe un tipo de vehículo válido.');
//         return;
//     }

//     fetch("./tasaexceso.json")
//         .then(response => response.json())
//         .then(data => {
//             const resultado = data.find(item => item["SUMA ASEGURADA "] === sumaAsegurada);

//             if (resultado) {
//                 const valor = resultado[tipoVehiculo];
//                 if (valor !== undefined) {
//                     console.log(`Suma Asegurada: ${sumaAsegurada}, Tipo de Vehículo: ${tipoVehiculo}, Valor: ${valor}`);
//                     // Almacenar el valor de la prima de exceso en la variable global
//                     primaExceso = valor;
//                     console.log('Prima de Exceso almacenada:', primaExceso);
//                 } else {
//                     console.log(`Tipo de vehículo: ${tipoVehiculo} no encontrado en la suma asegurada: ${sumaAsegurada}.`);
//                 }
//             } else {
//                 console.log(`Suma Asegurada: ${sumaAsegurada} no encontrada.`);
//             }
//         })
//         .catch(error => {
//             console.error('Error al cargar el JSON:', error);
//         });
// }



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

// prima defensa penal
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
