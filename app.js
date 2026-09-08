/* ==========================================================================
   CONTROLADOR INTERACTIVO DE LA INTERFAZ DE ETHEOS (FRONTEND)
   ========================================================================== */

/**
 * 1. Transición Inmersiva de Entrada
 * Oculta la pantalla de bienvenida (Intro) con animación y despliega la app.
 */
function entrarAApp() {
    const intro = document.getElementById('pantalla-intro');
    const app = document.getElementById('app-principal');
    
    if (intro && app) {
        // Añade la clase CSS que baja la opacidad y expande el fondo
        intro.classList.add('fade-out');
        
        // Espera 600ms (lo que dura la animación en CSS) para removerla del diseño
        setTimeout(() => {
            intro.style.display = 'none';
            app.style.display = 'flex'; // Despliega el workspace con flexbox
        }, 600);
    }
}

/**
 * 2. Enrutador Interno (Single Page Application - SPA)
 * Controla el intercambio de pestañas del menú lateral de forma fluida.
 * @param {string} idSeccion - El identificador de la pantalla a mostrar ('home', 'explorar', etc.)
 */
function cambiarSeccion(idSeccion) {
    // A. Remueve la clase activa de todas las secciones para ocultarlas
    document.querySelectorAll('.seccion-app').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // B. Remueve la clase de selección de todos los botones del menú lateral
    document.querySelectorAll('.btn-nav-item').forEach(tab => {
        tab.classList.remove('active');
    });

    // C. Activa la sección operativa que el usuario seleccionó
    const seccionObjetivo = document.getElementById(`sec-${idSeccion}`);
    if (seccionObjetivo) {
        seccionObjetivo.classList.add('active');
    }

    // D. Alumbra visualmente el botón seleccionado en la barra lateral
    const tabObjetivo = document.getElementById(`tab-${idSeccion}`);
    if (tabObjetivo) {
        tabObjetivo.classList.add('active');
    }
}

/**
 * 3. Controlador de Filtros Temporales (Catálogo)
 * Cambia los estados de los botones de filtro de videos/artículos.
 * @param {string} tipo - El tipo de recurso seleccionado
 */
function filtrarContenido(tipo) {
    document.querySelectorAll('.btn-pill-filter').forEach(btn => {
        btn.classList.remove('active');
        // Si el botón coincide con el filtro, lo activa visualmente
        if (btn.innerText.toLowerCase().includes(tipo.toLowerCase()) || 
            (tipo === 'todos' && btn.innerText.includes('todo'))) {
            btn.classList.add('active');
        }
    });

    console.log(`Filtrando el catálogo local por tipo: ${tipo}`);
    // En el Día 5 conectaremos el fetch aquí para renderizar las tarjetas del servidor
}
/**
 * 4. Controlador de Envíos del Buzón de Sugerencias
 * Captura el formulario, procesa los datos y despliega una alerta premium.
 */
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("form-sugerencia");

    if (formulario) {
        formulario.addEventListener("submit", (event) => {
            // A. Detiene la recarga automática de la página para mantener la experiencia SPA
            event.preventDefault();

            // B. Captura los valores que el usuario escribió con el mouse
            const nombreUsuario = formulario.querySelector('input[type="text"]').value.trim();
            const enlaceRecurso = formulario.querySelector('input[type="url"]').value.trim();
            const descripcionMotivo = formulario.querySelector('textarea') ? formulario.querySelector('textarea').value.trim() : "";

            // C. Validación básica de seguridad antes de procesar
            if (!nombreUsuario || !enlaceRecurso) {
                alert("Por favor, completa los campos principales para registrar tu pasión 🌸");
                return;
            }

            console.log("Enviando datos al servidor de Etheos...", {
                usuario: nombreUsuario,
                url: enlaceRecurso,
                motivo: descripcionMotivo
            });

            // D. Inyección dinámica del mensaje de éxito (Efecto Portafolio Premium)
            // Creamos un contenedor flotante ultra estético temporal
            const alertaKawaii = document.createElement("div");
            alertaKawaii.style.position = "fixed";
            alertaKawaii.style.bottom = "30px";
            alertaKawaii.style.right = "30px";
            alertaKawaii.style.backgroundColor = "#FFFFFF";
            alertaKawaii.style.border = "2px solid #D3E4E9";
            alertaKawaii.style.borderRadius = "20px";
            alertaKawaii.style.padding = "20px 30px";
            alertaKawaii.style.boxShadow = "0 10px 30px rgba(101, 95, 85, 0.08)";
            alertaKawaii.style.zIndex = "10000";
            alertaKawaii.style.animation = "slideUpView 0.4s ease-out forwards";
            
            // Texto estilizado con la fuente Fredoka heredada
            alertaKawaii.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px; font-family: 'Fredoka', sans-serif;">
                    <span style="font-size: 1.5rem;">📌</span>
                    <div style="text-align: left;">
                        <strong style="color: #7E7466; display: block; font-size: 0.95rem;">¡Aporte registrado!</strong>
                        <span style="color: #8A8171; font-size: 0.85rem;">Muchas gracias, ${nombreUsuario}. Tu pasión fue enviada al servidor 🐌</span>
                    </div>
                </div>
            `;

            // E. Desplegamos la notificación en el monitor del usuario
            document.body.appendChild(alertaKawaii);

            // F. Limpiamos los campos del formulario de forma limpia
            formulario.reset();

            // G. Removemos la alerta automáticamente después de 4 segundos con un fadeout sutil
            setTimeout(() => {
                alertaKawaii.style.transition = "all 0.4s ease";
                alertaKawaii.style.opacity = "0";
                alertaKawaii.style.transform = "translateY(10px)";
                setTimeout(() => alertaKawaii.remove(), 400);
            }, 4000);
        });
    }
});