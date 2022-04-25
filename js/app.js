const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

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
  const url = `https://pixabay.com/api/?key=${key}&q=${termino}&image_type=photo`;

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      mostrarImagenes(resultado.hits);
    });
}

function mostrarImagenes(imagenes) {
  console.log(imagenes);
}
