/* ==========================================================================
   1. PANTALLA DE ENTRADA
   ========================================================================== */

function entrarAApp() {
    const intro = document.getElementById("pantalla-intro");
    const app = document.getElementById("app-principal");

    if (!intro || !app) return;

    intro.classList.add("fade-out");

    setTimeout(() => {
        intro.style.display = "none";
        app.style.display = "flex";
    }, 600);
}


/* ==========================================================================
   2. NAVEGACIÓN SPA
   ========================================================================== */

function cambiarSeccion(idSeccion) {
    const secciones = document.querySelectorAll(".seccion-app");
    const botones = document.querySelectorAll(".btn-nav-item");

    // Ocultar todas las secciones
    secciones.forEach((seccion) => {
        seccion.classList.remove("active");
    });

    // Quitar estado activo de los botones
    botones.forEach((boton) => {
        boton.classList.remove("active");
    });

    // Mostrar la sección seleccionada
    const seccionObjetivo =
        document.getElementById(`sec-${idSeccion}`);

    if (seccionObjetivo) {
        seccionObjetivo.classList.add("active");
    }

    // Activar botón correspondiente
    const botonObjetivo =
        document.getElementById(`tab-${idSeccion}`);

    if (botonObjetivo) {
        botonObjetivo.classList.add("active");
    }

    // Volver arriba del contenido
    const viewport =
        document.querySelector(".main-viewport");

    if (viewport) {
        viewport.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


/* ==========================================================================
   3. FILTROS DEL CATÁLOGO
   ========================================================================== */

function filtrarContenido(categoria) {

    const botones =
        document.querySelectorAll(".filtro-btn");

    const tarjetas =
        document.querySelectorAll(".card-hobby-item");

    const contador =
        document.getElementById("contador-contenido");

    const estadoVacio =
        document.getElementById("estado-vacio");

    let cantidadVisible = 0;

    // Actualizar botón activo
    botones.forEach((boton) => {

        boton.classList.remove("active");

        if (boton.dataset.filter === categoria) {
            boton.classList.add("active");
        }

    });

    // Filtrar tarjetas
    tarjetas.forEach((tarjeta) => {

        const tipo =
            tarjeta.dataset.tipo;

        if (
            categoria === "todos" ||
            tipo === categoria
        ) {
            tarjeta.style.display = "";
            cantidadVisible++;
        } else {
            tarjeta.style.display = "none";
        }

    });

    // Actualizar contador
    if (contador) {

        contador.textContent =
            `${cantidadVisible} ${
                cantidadVisible === 1
                    ? "recurso disponible"
                    : "recursos disponibles"
            }`;

    }

    // Mostrar mensaje si no existen resultados
    if (estadoVacio) {

        estadoVacio.style.display =
            cantidadVisible === 0
                ? "block"
                : "none";

    }
}


/* ==========================================================================
   4. MENTOR VOCACIONAL IA
   ========================================================================== */

function enviarMensajeIA() {

    const input =
        document.getElementById("input-intereses");

    const cajaMensajes =
        document.getElementById("chat-messages");

    if (!input || !cajaMensajes) return;

    const textoUsuario =
        input.value.trim();

    // No enviar mensajes vacíos
    if (textoUsuario === "") return;

    // Crear mensaje del usuario
    agregarMensajeChat(
        textoUsuario,
        "usuario"
    );

    // Limpiar campo
    input.value = "";

    // Mostrar indicador de pensamiento
    const indicador =
        crearIndicadorPensando(cajaMensajes);

    // Simular procesamiento del Mentor
    setTimeout(() => {

        indicador.remove();

        const respuesta =
            generarRespuestaMentor(textoUsuario);

        agregarMensajeChat(
            respuesta,
            "sistema"
        );

        guardarChat(
            "usuario",
            textoUsuario
        );

        guardarChat(
            "sistema",
            respuesta
        );

    }, 1200);
}


/* ==========================================================================
   5. GENERADOR DE RESPUESTAS DEL MENTOR
   ========================================================================== */

function generarRespuestaMentor(texto) {

    const minusculas =
        texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    let respuesta =
        `¡Qué interesante! 🌈 Sigue alimentando tus pasiones.

        Te sugiero explorar nuestra pestaña de "Descubrir"
        para ampliar tu conocimiento y encontrar nuevas
        áreas que puedan despertar tu curiosidad.`;

    // ARTE
    if (
        minusculas.includes("arte") ||
        minusculas.includes("dibujo") ||
        minusculas.includes("pintar") ||
        minusculas.includes("ilustracion")
    ) {

        respuesta =
            `¡Oh, veo que te apasiona el arte! 🎨

            En la pestaña "Descubrir" tienes un tutorial
            magnífico para explorar técnicas de sombreado.

            Puedes comenzar practicando formas básicas,
            luces y sombras, y después experimentar con
            tu propio estilo.

            ¡Alimenta tu creatividad! 💕`;

    }

    // MÚSICA
    else if (
        minusculas.includes("musica") ||
        minusculas.includes("producir") ||
        minusculas.includes("cancion") ||
        minusculas.includes("ritmos") ||
        minusculas.includes("produccion musical")
    ) {

        respuesta =
            `¡Excelente oído musical! 🎵

            En nuestro catálogo encontrarás una guía
            de producción musical desde cero.

            Puedes comenzar explorando ritmo, melodía,
            estructura, edición y creación de tus propias
            canciones.

            ¡Quizás tu próxima canción empiece aquí! 🎧`;

    }

    // CIENCIA
    else if (
        minusculas.includes("ciencia") ||
        minusculas.includes("agujero") ||
        minusculas.includes("fisica") ||
        minusculas.includes("universo") ||
        minusculas.includes("astronomia")
    ) {

        respuesta =
            `¡Una mente científica brillante! 🌌

            Tienes que explorar el artículo sobre la
            Paradoja de la Información en los Agujeros
            Negros disponible en nuestro catálogo.

            La ciencia comienza muchas veces con una
            pregunta aparentemente imposible.

            ¡Sigue preguntando! 🔭`;

    }

    // LECTURA
    else if (
        minusculas.includes("leer") ||
        minusculas.includes("lectura") ||
        minusculas.includes("literatura") ||
        minusculas.includes("libro") ||
        minusculas.includes("poesia")
    ) {

        respuesta =
            `📚 La lectura puede convertirse en una puerta
            hacia miles de pasiones.

            Puedes comenzar con un género que realmente
            despierte tu curiosidad y descubrir poco a poco
            qué temas te atrapan más.

            ¿Qué historia te gustaría descubrir hoy? ✨`;

    }

    // TECNOLOGÍA
    else if (
        minusculas.includes("tecnologia") ||
        minusculas.includes("programacion") ||
        minusculas.includes("codigo") ||
        minusculas.includes("computador")
    ) {

        respuesta =
            `💻 ¡La tecnología tiene muchísimo por explorar!

            Puedes acercarte al desarrollo web, programación,
            inteligencia artificial, videojuegos o diseño
            digital.

            Empieza con un proyecto pequeño y deja que la
            curiosidad te lleve al siguiente nivel. 🚀`;

    }

    return respuesta;
}


/* ==========================================================================
   6. CREAR MENSAJES DEL CHAT
   ========================================================================== */

function agregarMensajeChat(texto, tipo) {

    const cajaMensajes =
        document.getElementById("chat-messages");

    if (!cajaMensajes) return;

    const contenedor =
        document.createElement("div");

    contenedor.classList.add(
        "chat-message"
    );

    if (tipo === "usuario") {
        contenedor.classList.add(
            "message-user"
        );
    } else {
        contenedor.classList.add(
            "message-system"
        );
    }

    const parrafo =
        document.createElement("p");

    // textContent evita insertar HTML peligroso
    parrafo.textContent =
        texto.trim();

    contenedor.appendChild(parrafo);

    cajaMensajes.appendChild(
        contenedor
    );

    desplazarChat();
}


/* ==========================================================================
   7. INDICADOR "ETHEOS ESTÁ PENSANDO..."
   ========================================================================== */

function crearIndicadorPensando(cajaMensajes) {

    const indicador =
        document.createElement("div");

    indicador.classList.add(
        "chat-message",
        "message-system",
        "mensaje-pensando"
    );

    const texto =
        document.createElement("p");

    texto.textContent =
        "Etheos está pensando... ✨";

    indicador.appendChild(texto);

    cajaMensajes.appendChild(
        indicador
    );

    desplazarChat();

    return indicador;
}


/* ==========================================================================
   8. SCROLL AUTOMÁTICO DEL CHAT
   ========================================================================== */

function desplazarChat() {

    const cajaMensajes =
        document.getElementById("chat-messages");

    if (!cajaMensajes) return;

    cajaMensajes.scrollTop =
        cajaMensajes.scrollHeight;
}


/* ==========================================================================
   9. SUGERENCIAS RÁPIDAS
   ========================================================================== */

function usarSugerencia(texto) {

    const input =
        document.getElementById("input-intereses");

    if (!input) return;

    input.value = texto;

    input.focus();

    enviarMensajeIA();
}


/* ==========================================================================
   10. BUZÓN DE SUGERENCIAS
   ========================================================================== */

function procesarBuzon(event) {

    event.preventDefault();

    const formulario =
        document.getElementById(
            "form-sugerencia"
        );

    if (!formulario) return;

    const nombre =
        document.getElementById(
            "nombre-usuario"
        );

    const enlace =
        document.getElementById(
            "enlace-recurso"
        );

    const motivo =
        document.getElementById(
            "motivo-recurso"
        );

    const feedback =
        document.getElementById(
            "buzon-feedback"
        );

    if (
        !nombre ||
        !enlace ||
        !motivo
    ) {
        return;
    }

    const nombreValor =
        nombre.value.trim();

    const enlaceValor =
        enlace.value.trim();

    const motivoValor =
        motivo.value.trim();

    // VALIDACIÓN DEL NOMBRE
    if (nombreValor.length < 2) {

        mostrarMensajeBuzon(
            "Por favor, escribe un nombre válido.",
            "error"
        );

        nombre.focus();

        return;
    }

    // VALIDACIÓN DEL ENLACE
    if (!validarEnlace(enlaceValor)) {

        mostrarMensajeBuzon(
            "Por favor, introduce un enlace válido.",
            "error"
        );

        enlace.focus();

        return;
    }

    // VALIDACIÓN DEL MOTIVO
    if (motivoValor.length < 10) {

        mostrarMensajeBuzon(
            "Cuéntanos un poco más sobre el recurso.",
            "error"
        );

        motivo.focus();

        return;
    }

    // Crear objeto del recurso
    const nuevoRecurso = {

        id: Date.now(),

        nombre: nombreValor,

        enlace: enlaceValor,

        motivo: motivoValor,

        fecha:
            new Date().toISOString()

    };

    // Guardar localmente
    guardarRecurso(
        nuevoRecurso
    );

    // Mostrar confirmación
    mostrarMensajeBuzon(
        `¡Aporte registrado! 💌 Muchas gracias, ${nombreValor}. Tu propuesta fue guardada en ETHEOS.`,
        "exito"
    );

    formulario.reset();
}


/* ==========================================================================
   11. VALIDAR ENLACE
   ========================================================================== */

function validarEnlace(enlace) {

    try {

        const url =
            new URL(enlace);

        return (
            url.protocol === "http:" ||
            url.protocol === "https:"
        );

    } catch (error) {

        return false;

    }
}


/* ==========================================================================
   12. GUARDAR RECURSOS EN LOCALSTORAGE
   ========================================================================== */

function guardarRecurso(recurso) {

    try {

        const recursos =
            JSON.parse(
                localStorage.getItem(
                    "etheos_recursos"
                )
            ) || [];

        recursos.push(recurso);

        localStorage.setItem(
            "etheos_recursos",
            JSON.stringify(
                recursos
            )
        );

    } catch (error) {

        console.error(
            "Error al guardar el recurso:",
            error
        );

    }
}


/* ==========================================================================
   13. MOSTRAR MENSAJES DEL BUZÓN
   ========================================================================== */

function mostrarMensajeBuzon(
    mensaje,
    tipo
) {

    const feedback =
        document.getElementById(
            "buzon-feedback"
        );

    if (!feedback) {

        alert(mensaje);

        return;
    }

    feedback.textContent =
        mensaje;

    feedback.className =
        `buzon-feedback ${tipo}`;

    setTimeout(() => {

        feedback.textContent = "";

        feedback.className =
            "buzon-feedback";

    }, 4500);
}


/* ==========================================================================
   14. GUARDAR HISTORIAL DEL CHAT
   ========================================================================== */

function guardarChat(
    tipo,
    texto
) {

    try {

        const historial =
            JSON.parse(
                localStorage.getItem(
                    "etheos_chat"
                )
            ) || [];

        historial.push({

            tipo: tipo,

            texto: texto,

            fecha:
                new Date().toISOString()

        });

        // Conservamos los últimos 40 mensajes
        const historialLimitado =
            historial.slice(-40);

        localStorage.setItem(
            "etheos_chat",
            JSON.stringify(
                historialLimitado
            )
        );

    } catch (error) {

        console.error(
            "No se pudo guardar el historial:",
            error
        );

    }
}


/* ==========================================================================
   15. CARGAR HISTORIAL DEL CHAT
   ========================================================================== */

function cargarHistorialChat() {

    try {

        const historial =
            JSON.parse(
                localStorage.getItem(
                    "etheos_chat"
                )
            ) || [];

        historial.forEach(
            (mensaje) => {

                agregarMensajeChat(
                    mensaje.texto,
                    mensaje.tipo
                );

            }
        );

    } catch (error) {

        console.error(
            "No se pudo cargar el historial:",
            error
        );

    }
}


/* ==========================================================================
   16. INICIALIZACIÓN
   ========================================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* ---------------------------------------
           FORMULARIO DEL BUZÓN
           --------------------------------------- */

        const formulario =
            document.getElementById(
                "form-sugerencia"
            );

        if (formulario) {

            formulario.addEventListener(
                "submit",
                procesarBuzon
            );

        }


        /* ---------------------------------------
           FORMULARIO DEL CHAT
           --------------------------------------- */

        const formularioChat =
            document.getElementById(
                "form-chat"
            );

        if (formularioChat) {

            formularioChat.addEventListener(
                "submit",
                (event) => {

                    event.preventDefault();

                    enviarMensajeIA();

                }
            );

        }


        /* ---------------------------------------
           CARGAR HISTORIAL
           --------------------------------------- */

        cargarHistorialChat();


        /* ---------------------------------------
           FILTRO INICIAL
           --------------------------------------- */

        filtrarContenido("todos");

    }
);


/* ==========================================================================
   17. ATAJOS DEL TECLADO
   ========================================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        const input =
            document.getElementById(
                "input-intereses"
            );

        // Enter envía el mensaje
        if (
            event.key === "Enter" &&
            document.activeElement === input
        ) {

            event.preventDefault();

            enviarMensajeIA();

        }

    }
);


/* ==========================================================================
   18. EXPONER FUNCIONES PARA EL HTML
   ========================================================================== */

window.entrarAApp =
    entrarAApp;

window.cambiarSeccion =
    cambiarSeccion;

window.filtrarContenido =
    filtrarContenido;

window.enviarMensajeIA =
    enviarMensajeIA;

window.usarSugerencia =
    usarSugerencia;

window.procesarBuzon =
    procesarBuzon;