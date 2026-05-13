// ============================================================
// SECCIÓN 1: Selectores del DOM
// querySelector devuelve el PRIMER elemento que coincide
// con el selector CSS especificado.
// Usamos const porque estas referencias no cambian.
// ============================================================

const inputCiudad = document.querySelector("#inputCiudad");
const btnBuscar = document.querySelector("#btnBuscar");
const divCargando = document.querySelector("#cargando");
const secResultado = document.querySelector("#resultado");
const divError = document.querySelector("#error");
const listaHistorial = document.querySelector("#listaHistorial");

// Elementos dentro de la tarjeta de resultado
const nombreCiudad = document.querySelector("#nombreCiudad");
const tempActual = document.querySelector("#tempActual");
const descripcion = document.querySelector("#descripcion");
const humedad = document.querySelector("#humedad");
const viento = document.querySelector("#viento");
const visibilidad = document.querySelector("#visibilidad");

// ============================================================
// SECCIÓN 2: Estado de la aplicación
// Toda app moderna maneja "estado" — datos que cambian
// y que determinan qué muestra la interfaz.
// ============================================================

const historial = []; // Array para guardar búsquedas previas

// ============================================================
// SECCIÓN 3: Funciones utilitarias para el DOM
// Separamos la lógica de UI en funciones pequeñas y claras.
// Esto es el principio de "Single Responsibility".
// ============================================================

/**
 * Muestra u oculta un elemento del DOM.
 * @param {HTMLElement} elemento - El nodo del DOM a controlar
 * @param {boolean} visible - true para mostrar, false para ocultar
 */
const setVisibilidad = (elemento, visible) => {
  if (visible) {
    elemento.classList.remove("oculto");
  } else {
    elemento.classList.add("oculto");
  }
};

/**
 * Muestra el estado de carga y oculta resultado/error.
 * Buena práctica: siempre dar feedback visual al usuario
 * mientras se espera una respuesta del servidor.
 */
const mostrarCargando = () => {
  setVisibilidad(divCargando, true);
  setVisibilidad(secResultado, false);
  setVisibilidad(divError, false);
};

/**
 * Oculta el spinner de carga.
 */
const ocultarCargando = () => {
  setVisibilidad(divCargando, false);
};

/**
 * Muestra el mensaje de error.
 */
const mostrarError = () => {
  setVisibilidad(divError, true);
  setVisibilidad(secResultado, false);
};

// ============================================================
// SECCIÓN 4: Función principal — Fetch a la API
//
// fetch() es la forma moderna de hacer peticiones HTTP
// desde el navegador. Devuelve una Promise.
// async/await hace que el código asíncrono sea legible.
//
// URL de la API: https://wttr.in/{ciudad}?format=j1
// Responde con JSON con datos meteorológicos detallados.
// ============================================================

/**
 * Consulta el clima de una ciudad usando la API de wttr.in
 * @param {string} ciudad - Nombre de la ciudad a consultar
 */
const consultarClima = async (ciudad) => {
  // Validación básica — nunca confíes en el input del usuario
  if (!ciudad.trim()) {
    alert("Por favor ingresa el nombre de una ciudad.");
    return;
  }

  mostrarCargando();

  try {
    // fetch() hace la petición HTTP GET
    // await pausa la ejecución hasta tener respuesta
    const url = `https://wttr.in/${encodeURIComponent(ciudad)}?format=j1`;
    const respuesta = await fetch(url);

    // Verificamos que el servidor respondió exitosamente
    // Un status 200-299 es éxito; 400-599 es error
    if (!respuesta.ok) {
      throw new Error(`Error del servidor: ${respuesta.status}`);
    }

    // .json() parsea el body de la respuesta como JSON
    // También devuelve una Promise, así que usamos await
    const datos = await respuesta.json();

    // Procesamos y mostramos los datos
    mostrarResultado(ciudad, datos);
    agregarAlHistorial(ciudad);
  } catch (error) {
    // catch atrapa: errores de red, errores del servidor,
    // errores de parseo JSON, cualquier excepción del try
    console.error("Error al consultar el clima:", error);
    mostrarError();
  } finally {
    // finally SIEMPRE se ejecuta, haya error o no.
    // Ideal para limpiar estados de carga.
    ocultarCargando();
  }
};

// ============================================================
// SECCIÓN 5: Renderizar datos en el DOM
//
// Esta función recibe datos en bruto (JSON) y los transforma
// en HTML visible. Separar "obtener datos" de "mostrar datos"
// es una buena práctica fundamental.
// ============================================================

/**
 * Actualiza el DOM con los datos del clima recibidos.
 * @param {string} ciudad - Nombre de la ciudad buscada
 * @param {Object} datos  - Objeto JSON de la API wttr.in
 */
const mostrarResultado = (ciudad, datos) => {
  const condicion = datos.current_condition[0];

  // textContent modifica el texto de un nodo (más seguro que innerHTML)
  // para datos del usuario siempre usa textContent, no innerHTML
  nombreCiudad.textContent = ciudad;

  // Template literals: permiten incrustar variables en strings
  tempActual.textContent = condicion.temp_C;
  descripcion.textContent = condicion.weatherDesc[0].value;
  humedad.textContent = `${condicion.humidity}%`;
  viento.textContent = condicion.windspeedKmph;
  visibilidad.textContent = condicion.visibility;

  // Mostramos la sección de resultado
  setVisibilidad(secResultado, true);
};

// ============================================================
// SECCIÓN 6: Historial de búsquedas
//
// Demuestra cómo manipular el DOM dinámicamente:
// crear nodos, insertarlos, y manejar eventos en elementos
// que no existían cuando cargó la página.
// ============================================================

/**
 * Agrega una ciudad al historial y actualiza el DOM.
 * @param {string} ciudad - Ciudad a agregar
 */
const agregarAlHistorial = (ciudad) => {
  // Evitar duplicados consecutivos
  if (historial[0] === ciudad) return;

  // Añadir al inicio del array (más reciente primero)
  historial.unshift(ciudad);

  // Limitar a 5 búsquedas en el historial
  if (historial.length > 5) historial.pop();

  // Limpiar la lista actual del DOM
  listaHistorial.innerHTML = "";

  // Crear un elemento <li> por cada ciudad en el historial
  historial.forEach((ciudadGuardada) => {
    const li = document.createElement("li");
    li.textContent = ciudadGuardada;

    // Los elementos creados dinámicamente también pueden tener eventos
    li.addEventListener("click", () => {
      inputCiudad.value = ciudadGuardada;
      consultarClima(ciudadGuardada);
    });

    listaHistorial.appendChild(li);
  });
};

// ============================================================
// SECCIÓN 7: Eventos del usuario
//
// addEventListener es la forma correcta de manejar eventos.
// Nunca uses onclick="" directamente en el HTML.
// ============================================================

// Evento: clic en el botón
btnBuscar.addEventListener("click", () => {
  consultarClima(inputCiudad.value);
});

// Evento: presionar Enter en el input
// Mejora de UX — el usuario no necesita usar el mouse
inputCiudad.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    consultarClima(inputCiudad.value);
  }
});

// ============================================================
// SECCIÓN 8: Inicialización
//
// Código que corre cuando la página carga.
// Es buena práctica tener una función "init" explícita.
// ============================================================

const init = () => {
  console.log("ClimaGuate inicializado ✅");
  // Enfocar el input automáticamente al cargar la página
  inputCiudad.focus();
};

// Ejecutar cuando el DOM esté completamente listo
document.addEventListener("DOMContentLoaded", init);
