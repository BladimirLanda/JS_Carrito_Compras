//SIMULADOR CARRITO DE COMPRA

//Selección HTML
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#carrito-compra');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
const listaCursos = document.querySelector('#lista-cursos');

//Arreglo Campos
let articulosCarrito = [];

//Eventos
cargarEventos(); //Función-Contenedora de Eventos (recomendable)

function cargarEventos() {
    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso);

    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccion = e.target.parentElement.parentElement; //= div class='card'
        obtenerDatos(cursoSeleccion);
    }
}

//--//
function eliminarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('borrar-curso')) {
        borrarElemento(e);
    }

    if(e.target.classList.contains('borrar-cantidad')) {
        let indice = articulosCarrito.findIndex( curso => curso.id === e.target.getAttribute('data-id'));
        if (articulosCarrito[indice].cantidad === 1) {
            borrarElemento(e);
        } else {
            articulosCarrito[indice].cantidad -= 1;
        }
    }

    carritoHTML();
}

//--//
function vaciarCarrito() {
    articulosCarrito = [];
    limpiarHTML(contenedorCarrito);
}

//--//
function obtenerDatos(curso) {
    const infoCurso = {
        imagen: curso.querySelector('.imagen-curso').src,
        titulo: curso.querySelector('.info-card h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('.info-card a').getAttribute('data-id'),
        cantidad: 1,
    }

    if (articulosCarrito.some(curso => curso.id === infoCurso.id)) {
        let indice = articulosCarrito.findIndex(curso => curso.id === infoCurso.id);
        articulosCarrito[indice].cantidad += 1;
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

//--//
function carritoHTML() {
    limpiarHTML(contenedorCarrito);

    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, id, cantidad} = curso;
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
        <td><img src=${imagen} class="imagen-curso" width="150px"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id=${id}> X </a>
        </td>
        <td>
            <a href="#" class="borrar-cantidad" data-id=${id}> - </a>
        </td>
        `;

        contenedorCarrito.appendChild(tableRow);
    })
}

//--//
function borrarElemento(e) {
    const cursoId = e.target.getAttribute('data-id');
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
}

//--//
function limpiarHTML(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}