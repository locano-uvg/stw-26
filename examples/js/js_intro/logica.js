// IMPRIMIR EN CONSOLE DEL NAVEGADOR (CLIENTE)
// console.log("Hola mundo");
/*
    VARIABLES
  LET => VARIABLES QUE PUEDEN CAMBIAR EN EL TIEMPO
  CONST => VARIABLES CONSTANTES QUE NO CAMBIAN EN EL TIEMPO
*/

const mostrar_alerta = true;
const duracion = 100;

let a = 5;
let fecha = new Date();
let edad = 30;
let role = "admin";
let genero = false; // false = mujer, true = hombre

// CONDICIONALES
if (mostrar_alerta == false) {
  alert("Esto es activo");
}

if (a == 10) {
  alert("es 10");
} else {
  console.log("no es 10");
}

// TIPO DE DATOS
// console.log(typeof fecha);
// console.log(typeof edad);
// console.log(typeof role);
// console.log(typeof genero);

// DOM - DOCUMENT OBJECT MODEL
// SE ACCEDE USANDO LA PALABRA "document"
let domsite = document;
let tagEmplo = document.getElementById("ejemplo");

// tagEmplo.innerText= "Modificado desde JS";
// GET ELEMENT BY TAG
let tagsA = document.getElementsByTagName("a");
let tagsDiv = document.getElementsByTagName("div");
// console.log(tagsA);
// console.log(tagsDiv);

//  GEt ELEMENT BY ID
let idEjemplos = document.getElementById("ejemplo");
// console.log(idEjemplos);

// GET ELEMENT BY TAG NAME
let parrafos = document.getElementsByTagName("p");
// console.log("getElementsByTagName", parrafos);
let primer_parrafo = parrafos[0];
console.log(primer_parrafo);

// GET ELEMENT BY CLASS NAME
let elementos = document.getElementsByClassName("parrafo");
// console.log("getElementsByClassName", elementos);

// CREA UN ELEMENTO
// let nuevaImagen = document.createElement("img");
// nuevaImagen.id = "nuevaImagen";
// nuevaImagen.width = 400;
// nuevaImagen.height = 400;
// nuevaImagen.src =
//   "https://tienda.uvg.edu.gt/attach/tiendas/Logo-vertical-verde_5a8b26cb76441.jpg";
// // Agregar al body
// document.body.appendChild(nuevaImagen);

let ejemplo1 = document.getElementById("ejemplo1");
ejemplo1.style.color = "red";

// ARREGLOS
let edades = [15, 30, 17, 50];
let nombres = ["Juan", "Maria", "Pedro"];
let saldo_actual = [1000.5, 2000.75, 3000.25];
let datos_mixtos = [20, "Juan", true, 1000.5];

console.log("edades", edades);
console.log("edades longitud", edades.length);
console.log("nombres", nombres);
console.log("saldo_actual", saldo_actual);
console.log("datos_mixtos", datos_mixtos);

// ITERACION FOR
for (let i = 0; i < edades.length; i++) {
  let edadActual = edades[i];
  console.log("edad en el indice", i, "es", edadActual);
}

// FUNCIONES DE UN ARREGLO
// forEach - para recorrer cada elemento del arreglo
edades.forEach((_edadActual) => {
  console.log("edad actual", _edadActual);
});

// filter - para filtrar elementos del arreglo
// filtar edad > 18 anios
let edadesMayorA18 = edades.filter((_edadActual) => {
  // siempre hay que dar un return para saber que voy a devolver y que sea una condicion que cumpla en true
  return _edadActual > 18;
});
// let edadesMayorA18 = edades.filter((_edadActual) => {
//  let edadMayorA18 = _edadActual > 18;
//   return edadMayorA18 > 18;
// });
console.log("edadesMayorA18", edadesMayorA18);

// Funcion push
edadesMayorA18.push(25);
console.log("edadesMayorA18 despues de push", edadesMayorA18);

// Funcion pop
let elemento = edadesMayorA18.pop();
console.log("edadesMayorA18 despues de pop", edadesMayorA18);
console.log("elemento eliminado con pop", elemento);

// Funcion map para trasformar cada elemento del arreglo generando un nuevo arreglo
let aprobacionCreditoPorSaldo = saldo_actual.map((_saldo) => {
  if (_saldo > 3000) {
    return "aprobado por su saldo " + _saldo;
  } else {
    return "no aprobado tiene un saldo bajo " + _saldo;
  }
});
console.log("aprobacionCreditoPorSaldo", aprobacionCreditoPorSaldo);
let edadesX2 = edades.map((_edad) => {
  return _edad * 2;
});

// SI LO HACES CON FOREACH ME TRASNFORMA EL ARREGLO ORIGNAL
edades.forEach((_edad, _indice) => {
  edades[_indice] = _edad * 2;
});
console.log("edades nuevo", edades);

// OBJETOS
// es un elemento que posea key(llave)-value(valor)
// se declara usando  let xxxx = {}

// DEFINIR UN OBJETO VACIO
let estudiante = {};
// DEFINIR UN OBJETO CON PROPIEDADES
let estudiante1 = {
  // se define el key:value con "":""
  nombre_estudiante: "Ana",
  edad_estudiante: 20,
  carrera: {
    nombre: "Ingenieria en Informatica",
    facultad: "FIEE",
  },
  esGraduado: false,
  saludar: function () {
    console.log("Hola desde la función");
  },
};
console.log("estudiante1", estudiante1);

// Acceder a una propiedad del objeto objeto.propiedad
console.log("nombre del estudiante1", estudiante1.nombre_estudiante);
console.log("edad del estudiante1", estudiante1.edad_estudiante);
console.log("carrera del estudiante1", estudiante1.carrera);
console.log("nombre de la carrera del estudiante1", estudiante1.carrera.nombre);
estudiante1.saludar();

// DESTRUCTURING
let { nombre_estudiante, edad_estudiante } = estudiante1;

console.log("nombre sin destructuring", estudiante1.nombre_estudiante);
console.log("nombre con destructuring", nombre_estudiante);
console.log("edad con destructuring", edad_estudiante);

// SPREAD OPERATOR

let estudiantes_stw = {};

let estudiante_de_ste = {
  nombre: "Juanito",
  promedio: 90.0,
};
let notas_estuante = {
  mate: 90,
  progra: 100,
  ciencias: 75,
};
// crear objeto a manita
let objeto_nuevo = {
  nombre: estudiante_de_ste.nombre,
  promedio: estudiante_de_ste.promedio,
  mate: notas_estuante.mate,
  progra: notas_estuante.progra,
  ciencias: notas_estuante.ciencias,
};
console.log("objeto nuevo", objeto_nuevo);
estudiantes_stw = { ...notas_estuante, ...estudiante_de_ste };
console.log("objeto nuevo spread", estudiantes_stw);

// FUNCIONES
// UNA FUNCION ES UN BLOQUE DE CODIGO QUE SE EJECUTA CUANDO ES LLAMADA
// SE DECLARA USANDO LA PALABRA FUNCTION O CON ARROW FUNCTION
// PUEDE O NO DEVOLVER ALGO
function contarA10() {
  for (let i = 0; i <= 10; i++) {
    console.log(i);
  }
}
// funcion que tiene parametros
function contarAX(hastaDonde) {
  for (let i = 0; i <= hastaDonde; i++) {
    console.log(i);
  }
}
// para llamar a la funcion se hace con el nombre_funcion()
contarA10();
contarAX(15);

// ARROW FUNCTION
// es una forma mas corta de escribir funciones
// se declara usando la sintaxis () => {}
let funcionArrow = () => {}; //aqui va la lógica dentro de las {}
let contarA10Arrow = () => {
  for (let i = 0; i <= 10; i++) {
    console.log(i);
  }
};
contarA10Arrow();

// APIS COMO CONSUMIRLAS USANDO FETCH DE JAVASCRIPT`
// EL API ME AYUDA A CONECTARME A LOGICA/DATA DE MI BACKEND
// GET, POST, PUT, PATCH, DELETE
// 400(ERRORES), 500(ERROR INTERNO), 200(CORRECTO)

async function cargarUsuarios() {
  // LLAMAR AL API DE MANERA SINCRONICA NO ESPERO
  let users1 = fetch("https://api.github.com/users");
  // DEVUELVO UNA PROMESA PENDIENTE POR RESOLVER
  console.log("usuarios fetch1", users1);

  // LLMAR AL API DE MANERA ASINCRONICA ESPERO A QUE ME DEVUELVA LA RESPUESTA

  // CON EL AWAIT Y EL ASYNT
  try {
    let users = await fetch("https://api.github.com/users");
    console.log("users", users);

    // OBTENER LOS DATOS TRANSFORMADOS A JSON DE UN READABLSTREAM
    let userData = await users.json();
    console.log("usuarios data", userData);

    console.log("usuario en position 3", userData[2]);
    console.log("url de usuario en position 3", userData[2].avatar_url);

    let nuevoDiv = document.createElement("div");
    nuevoDiv.style.width = "100vw";
    nuevoDiv.style.height = "100vh";
    nuevoDiv.style.backgroundColor = "blue";
    nuevoDiv.style.padding = 16;
    nuevoDiv.id = "contenedor";
    document.body.appendChild(nuevoDiv);
    // los arreglos tienen una fucnion para hacer for que se llama forEach y recorrere cada elemento para poder utilizarlo
    userData.forEach((_usuario) => {
      crearTarjetaUsuario(_usuario);
    });
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
  // let users = await fetch("https://dogapi.dog/api/v2/breeds");
  return true;
}

function crearUsuario(data) {
  return {
    nombre: data.login,
    avatar: data.avatar_url,
  };
}

// usuario = objeto con key:values
function crearTarjetaUsuario(usuario) {
  let contenedor = document.getElementById("contenedor");

  // CREAR LA TARJETA DEL USUARI EN EL DOM
  let _div = document.createElement("div");
  _div.style.width = "50px";
  _div.style.height = "50px";
  _div.style.backgroundColor = "gray";
  _div.style.padding = 16;
  contenedor.appendChild(_div);

  let _img = document.createElement("img");
  _img.src = usuario.avatar_url;
  _img.width = 10;
  _img.height = 10;
  _div.appendChild(_img);

  let _h3 = document.createElement("h3");
  _h3.innerText = usuario.login;
  _div.appendChild(_h3);
}

function cargarData() {
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "4X1ivrh94r2Zebi8J6S7caxMy27Ztmjh3Z7T4FZp");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    msisdn: "3016107130",
    channel_id: "migra_test",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://wllot57n31.execute-api.us-east-1.amazonaws.com/prod/v1/tigo/digital-data/customer-profile/segmentation/use-case/nbo/postpaid/recommendation-bt",
    requestOptions,
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
let botonCargar = document.createElement("button");
botonCargar.innerText = "Cargar Usuarios";
botonCargar.style.width = "200px";
botonCargar.style.height = "200px";
botonCargar.addEventListener("click", () => {
  // console.log("hola");
  // cargarUsuarios();
  cargarData();
});
document.body.appendChild(botonCargar);
