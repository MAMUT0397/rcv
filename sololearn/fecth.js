/**.then =despues es un proceso de espera */

/**
 * fetch(link)
 * .then(res => res.json()
 *  .then (data =>)
 *
 *
 */

// fetch("./prueba 2/datos/años.json")
//   .then(res => res.json())
//   .then(data => console.log(data))

//** otra forma de hacer lo mmismo con  sync async  */

// ejemplo funcion async da acceso a la funcion await
//  async function hola(){
//   await
//  }

//    const hola = async () => {
//     const res =  await fetch("./prueba 2/datos/años.json")
//     const data = await res.json()
//     console.log(data)

//    }
// hola()

// callback

//codigo original
/**
 * console.log("1");
 *
 * setTimeout(function(){
 * console.log("2")},3000)
 *
 * console.log("3")
 *
 * se quiere que lo numeros se impriman en orden
 */

/** solucion 
 * //  console.log("1");

// function imprimeNum2(functionx){
// setTimeout(function(){
//   console.log("2")
//   functionx()
// },2000)
// }

// function imprimeNum3 (){
//   console.log('3')
// }
// imprimeNum2(imprimeNum3)
*/

/** promesa
 * representa un valor que puede esatr  disponible ahora, en el futuro o nunca 
 * estructura
 new Promise((resolve,rejecy) =>{
  if (true){
    reolve("todo Bien ")
  }else {
    reject("Error")
  }
 })
 
*/

//  console.log("1");

//  setTimeout(function(){
//  console.log("2")},3000)

//  console.log("3")

// resolve y rsponse son funciones
//se llama a resolve cuando la promeso se resolvio correctamente
// y se llama a response en caso contario
// console.log("1");

//    const miPromesa = new Promise((resolve, reject) =>{
//     setTimeout(function(){
//       console.log("2")
//       resolve()}
//       ,1000)

//    })
// las promesas se resuleven de la siguiente forma  siempre
// si se resuelve de manera correta promesa.thne
//si da error catch
//  miPromesa.then(() => {
//   console.log("3")
//  }).catch(() => {console.log("ocurrio un error")
//  })

/**async/await
 * ejemplo de  funcion async
 *
 * async fuction resgister (){
 * const nweUser = await userRegister()
 * await sendEmailConfirmation (newuser)
 * console.log("user created")
 * }
 */

//  //resolucion del mismo ejemplo
//  function conexionDb() {
//   return new Promise((resolve,reject) => {
//     setTimeout(function(){
//       console.log("2")
//       resolve();
//     },1000)
//   })

//  }

//   async function  codigoAsincrono(){
//   console.log("1")
//   await conexionDb()
//    console.log("3")
// }

// codigoAsincrono()

/** try catch */

async function codigoAsincrono() {
  console.log("1");
  try {
    await conexionDb();
    console.log("3");
  } catch (e) {
    console.log("Ocurrio un error")
  }
}

codigoAsincrono()