
const express = require('express');
const app = express();
const path = require('path');

// Ruta para servir archivos estáticos desde la carpeta raíz
app.use(express.static(path.join(__dirname)));

// Ruta de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
