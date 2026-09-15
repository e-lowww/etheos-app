const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const rutaPasiones = path.join(__dirname, "pasiones.json");
const rutaSugerencias = path.join(__dirname, "sugerencias.json");

function responderJSON(res, codigo, datos) {
    res.writeHead(codigo, {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    });

    res.end(JSON.stringify(datos, null, 2));
}

function obtenerBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", (parte) => {
            body += parte.toString();
        });

        req.on("end", () => {
            try {
                const datos = body ? JSON.parse(body) : {};
                resolve(datos);
            } catch (error) {
                reject(new Error("El contenido enviado no es un JSON válido."));
            }
        });

        req.on("error", reject);
    });
}

function asegurarArchivoSugerencias() {
    if (!fs.existsSync(rutaSugerencias)) {
        fs.writeFileSync(
            rutaSugerencias,
            "[]",
            "utf8"
        );
    }
}

function leerSugerencias() {
    asegurarArchivoSugerencias();

    try {
        const contenido = fs.readFileSync(
            rutaSugerencias,
            "utf8"
        );

        return JSON.parse(contenido);
    } catch (error) {
        console.error("Error al leer sugerencias.json:", error);
        return [];
    }
}

function guardarSugerencias(sugerencias) {
    fs.writeFileSync(
        rutaSugerencias,
        JSON.stringify(sugerencias, null, 2),
        "utf8"
    );
}

function validarSugerencia(datos) {
    if (!datos || typeof datos !== "object") {
        return "No se recibieron datos.";
    }

    if (
        typeof datos.nombre !== "string" ||
        datos.nombre.trim().length < 2
    ) {
        return "El nombre no es válido.";
    }

    if (
        typeof datos.enlace !== "string" ||
        datos.enlace.trim() === ""
    ) {
        return "El enlace es obligatorio.";
    }

    try {
        const url = new URL(datos.enlace);

        if (
            url.protocol !== "http:" &&
            url.protocol !== "https:"
        ) {
            return "El enlace debe comenzar con http:// o https://.";
        }
    } catch (error) {
        return "El enlace no es válido.";
    }

    if (
        typeof datos.motivo !== "string" ||
        datos.motivo.trim().length < 10
    ) {
        return "El motivo debe tener al menos 10 caracteres.";
    }

    return null;
}

const server = http.createServer(async (req, res) => {

    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    if (
        req.url === "/api/status" &&
        req.method === "GET"
    ) {
        responderJSON(res, 200, {
            conectado: true,
            mensaje: "¡El servidor local de Etheos está vivo y conectado! 🐌✨"
        });

        return;
    }

    if (
        req.url === "/api/pasiones" &&
        req.method === "GET"
    ) {
        fs.readFile(
            rutaPasiones,
            "utf8",
            (error, contenido) => {

                if (error) {
                    console.error(
                        "Error al leer pasiones.json:",
                        error
                    );

                    responderJSON(res, 500, {
                        error: "No se pudo cargar el contenido de Etheos."
                    });

                    return;
                }

                try {
                    const pasiones = JSON.parse(contenido);

                    responderJSON(res, 200, pasiones);

                } catch (error) {

                    responderJSON(res, 500, {
                        error: "pasiones.json contiene información inválida."
                    });
                }
            }
        );

        return;
    }

    if (
        req.url === "/api/sugerencias" &&
        req.method === "GET"
    ) {
        const sugerencias = leerSugerencias();

        responderJSON(res, 200, {
            total: sugerencias.length,
            sugerencias: sugerencias
        });

        return;
    }

    if (
        req.url === "/api/sugerencias" &&
        req.method === "POST"
    ) {
        try {
            const datos = await obtenerBody(req);

            const errorValidacion =
                validarSugerencia(datos);

            if (errorValidacion) {
                responderJSON(res, 400, {
                    error: errorValidacion
                });

                return;
            }

            const sugerencias =
                leerSugerencias();

            const nuevaSugerencia = {
                id: Date.now(),
                fecha: new Date().toISOString(),
                nombre: datos.nombre.trim(),
                enlace: datos.enlace.trim(),
                motivo: datos.motivo.trim()
            };

            sugerencias.push(
                nuevaSugerencia
            );

            guardarSugerencias(
                sugerencias
            );

            responderJSON(res, 201, {
                mensaje: "¡Sugerencia guardada correctamente! 💌",
                sugerencia: nuevaSugerencia
            });

        } catch (error) {

            console.error(
                "Error al procesar la sugerencia:",
                error
            );

            responderJSON(res, 400, {
                error: error.message
            });
        }

        return;
    }

    responderJSON(res, 404, {
        error: "Ruta no encontrada en el servidor de Etheos."
    });
});

server.listen(PORT, () => {
    console.log("==================================================");
    console.log("✨ Etheos Backend corriendo con éxito");
    console.log(`🚀 Servidor disponible en: http://localhost:${PORT}`);
    console.log("==================================================");
});