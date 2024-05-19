document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Muestra el JSON en la página
        document.getElementById('output').textContent = JSON.stringify(jsonData, null, 2);

        const dataStr = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

   
        const originalFileName = file.name.split('.').slice(0, -1).join('.');

        const a = document.createElement('a');
        a.href = url;

       
        a.download = `${originalFileName}.json`;

        a.click();
        URL.revokeObjectURL(url);
    };

    reader.readAsArrayBuffer(file);
});
