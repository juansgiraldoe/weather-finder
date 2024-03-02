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
  spinner();
  setTimeout(() => {
    consultarApi(ciudad, pais);
    limpiarHtml();
    formulario.reset();
  }, 1200);
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
          mostrarError('Ciudad no encontrada.');
          return;
        };
        //Mostrar respuesta en el DOM.
        mostrarClima(data);
      });
};

function mostrarClima(datos){
  const { main:{temp, temp_max, temp_min}, name } = datos
  const centigratos = conversionGrados(temp);
  const max = conversionGrados(temp_max);
  const min = conversionGrados(temp_min);

  const title = document.createElement('P');
  title.classList.add('text-xl');
  title.innerHTML = `El clima en <strong>${name}</strong> hoy:`

  const actual = document.createElement('P');
  actual.innerHTML = `${centigratos} &#8451;`;
  actual.classList.add('font-bold', 'text-6xl');

  const tempMax = document.createElement('P');
  tempMax.innerHTML = `Maxima: <strong>${max} &#8451;</strong>`;
  tempMax.classList.add('text-xl')
  
  const tempMin = document.createElement('P');
  tempMin.innerHTML = `Minima: <strong>${min} &#8451;</strong>`;
  tempMin.classList.add('text-xl')
  
  const resultadoDiv = document.createElement('DIV');
  resultadoDiv.classList.add('text-center', 'text-white');
  resultadoDiv.appendChild(title);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMax);
  resultadoDiv.appendChild(tempMin);

  resultado.appendChild(resultadoDiv);
};

function limpiarHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  };
};

const conversionGrados = grados => (grados - 273.15).toFixed(1);

function spinner() {
  limpiarHtml();
  const divSpinner = document.createElement('DIV');
  divSpinner.classList.add('sk-chase');
  divSpinner.innerHTML = `
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  `;
  resultado.appendChild(divSpinner);
}