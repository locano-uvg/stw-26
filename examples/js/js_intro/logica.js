// IMPRIMIR EN CONSOLE DEL NAVEGADOR (CLIENTE)
console.log("Hola mundo");
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
console.log(typeof fecha);
console.log(typeof edad);
console.log(typeof role);
console.log(typeof genero);

// DOM - DOCUMENT OBJECT MODEL
// SE ACCEDE USANDO LA PALABRA "document"
let domsite = document;
let tagEmplo = document.getElementById("ejemplo");

// tagEmplo.innerText= "Modificado desde JS";
// GET ELEMENT BY TAG
let tagsA = document.getElementsByTagName("a");
let tagsDiv = document.getElementsByTagName("div");
console.log(tagsA);
console.log(tagsDiv);

//  GEt ELEMENT BY ID
let idEjemplos = document.getElementById("ejemplo");
console.log(idEjemplos);

// GET ELEMENT BY TAG NAME
let parrafos = document.getElementsByTagName("p");
console.log("getElementsByTagName", parrafos);
let primer_parrafo = parrafos[0];
console.log(primer_parrafo);

// GET ELEMENT BY CLASS NAME
let elementos = document.getElementsByClassName("parrafo");
console.log("getElementsByClassName", elementos);

// CREA UN ELEMENTO
let nuevaImagen = document.createElement("img");
nuevaImagen.id = "nuevaImagen";
nuevaImagen.width = 100;
nuevaImagen.height = 100;
nuevaImagen.src =
  "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
// Agregar al body
document.body.appendChild(nuevaImagen);

let ejemplo1 = document.getElementById("ejemplo1");
ejemplo1.style.color = "red";
