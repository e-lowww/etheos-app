const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Permitir conexiones desde tu frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // Nueva ruta para obtener los hobbys/pasiones
    if (req.url === '/api/pasiones' && req.method === 'GET') {
        const rutaArchivo = path.join(__dirname, 'pasiones.json');
        
        fs.readFile(rutaArchivo, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: "Error al leer los datos de Etheos" }));
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Ruta no encontrada en Etheos" }));
    }
});

server.listen(PORT, () => {
    console.log(`Servidor de Etheos corriendo en http://localhost:${PORT}`);
});
