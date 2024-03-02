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

  //Consultar la API.
};