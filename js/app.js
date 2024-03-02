//Selectores.

const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=> {
  formulario.addEventListener('submit', buscarClima)
});

function buscarClima(e) {
  e.preventDefault();
  
  //Validacion del formulario.
  const ciudad = document.querySelector('#ciudad').value;
  const pais = document.querySelector('#pais').value;

  if (ciudad === '' || pais === '') {
    mostrarError('Ambos campos son obligatorios.');
    return
  };

  //Consultar la API.
  consultarApi(ciudad, pais);
};

function mostrarError(msj) {
  const alerta = document.querySelector('.error');
  if (!alerta) {
    const alerta = document.createElement('DIV');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'error');
    alerta.innerHTML = `
    <strong class='font-bold'>¡Error!</strong>
    <span class='block'>${msj}</span>
    `;
    container.appendChild(alerta);
    setTimeout(() => {
      alerta.remove();
    }, 2000);
  };

};

function consultarApi(ciudad, pais) {
  const appID = 'fae976e32114a3a34339af2ea64fd84b';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod === '404') {
        mostrarError('Ciudad no encontrada.')
      }
    });
};