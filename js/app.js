const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

const registrosPorPagina = 40;
let totalPaginas;
let iterador;

window.onload = () => {
  formulario.addEventListener("submit", validarFormulario);
};

function validarFormulario(e) {
  e.preventDefault();

  const terminoBusqueda = document.querySelector("#termino").value.trim();
  console.log(terminoBusqueda);

  if (!terminoBusqueda) {
    mostrarAlerta("Por favor, introduce un término de búsqueda");
    return;
  }

  buscarImagenes(terminoBusqueda);
}

function mostrarAlerta(mensaje) {
  const existeAlerta = document.querySelector(".bg-red-100");
  if (!existeAlerta) {
    const alerta = document.createElement("p");
    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center",
      "font-bold"
    );
    alerta.textContent = mensaje;
    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function buscarImagenes(termino) {
  const key = "27000774-24f141e29c282119bae780cea";
  const url = `https://pixabay.com/api/?key=${key}&q=${termino}&image_type=photo&per_page=100`;

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      totalPaginas = calcularPaginas(resultado.totalHits);
      console.log(totalPaginas);
      mostrarImagenes(resultado.hits);
    });
}

//Generador que registra cantidad de elementos según páginas
function* crearPaginador(total) {
  for (let i = 1; i <= total; i++) {
    yield i;
  }
}

function calcularPaginas(total) {
  return parseInt(Math.ceil(total / registrosPorPagina));
}

function mostrarImagenes(imagenes) {
  limpiarHTML();

  //Recorrer el array de imágenes

  imagenes.forEach((imagen) => {
    const { likes, views, largeImageURL, user } = imagen;

    resultado.innerHTML += `
        <div class="w-1/2  md:w-1/3 lg:w-1/4 p-3 mb-4">
            <div class="bg-white">
                <img class="w-full" src="${largeImageURL}">
                <div class="p-4">
                    <p class="font-bold">${likes}<span class="font-light"> Me gusta</span></p>
                    <p class="font-bold">${views}<span class="font-light"> veces visto</span></p>
                    <p class="font-bold">By ${user}</p>
                    <button class="btn"><a href="${largeImageURL}" target="_blank" rel="noopener noreferrer">Ver imagen HD</a></button>
                </div>
            </div>
        </div>
     `;
  });
  imprimirPaginador();
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function imprimirPaginador() {
  iterador = crearPaginador(totalPaginas);
}
