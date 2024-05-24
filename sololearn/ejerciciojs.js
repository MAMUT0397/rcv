document.addEventListener("DOMContentLoaded", async function () {
    const response = await fetch("./prueba 2/datos/tasaexceso.json")
    const data = await response.json()
    .then(data => {
        let excesoSelect = document.getElementById('exceso');
        if (!Array.isArray(data)) {
            console.error('Error: el JSON no es una lista/array.');
            return;
        }
        data.forEach(excesoObj => {
            if (!excesoObj || !excesoObj["SUMA ASEGURADA "]) { 
                console.error('Error: Formato de objeto incorrecto ', excesoObj);
                return;
            }
            let option = document.createElement('option');
            option.value = excesoObj["SUMA ASEGURADA "];
            option.text = excesoObj["SUMA ASEGURADA "]; 
            excesoSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching the JSON:', error))

})



document.addEventListener("DOMContentLoaded", async function () {
    const response = await fetch("./prueba 2/datos/defensapenal.json")
    const data = await response.json()
    .then(data => {
        let defensaSelect = document.getElementById('defensapenal');
        if (!Array.isArray(data)) {
            console.error('Error: el JSON no es una lista/array.');
            return;
        }
        data.forEach(defensaObj => {
            if (!defensaObj || !defensaObj["SUMA ASEGURADA"]) { 
                console.error('Error: Formato de objeto incorrecto ', defensaObj);
                return;
            }
            let option = document.createElement('option');
            option.value = defensaObj["SUMA ASEGURADA"]; 
            option.text = defensaObj["SUMA ASEGURADA"]; 
            defensaSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching the JSON:', error));
   
})