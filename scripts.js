const mensaje = document.querySelector(".mensaje")

let indicador1 = 0;
let indicador2 = 0;
let contador = 0;

class Puerta{
	constructor(contenedor, puerta, manija){
		this.contenedor = contenedor;
		this.puerta = puerta;
		this.manija = manija;
	}
	seleccionar(reference){
		if(reference == true){
			this.contenedor.style.animationDuration = "1s";
		}
		else if(reference == false){
			this.contenedor.style.animationDuration = "0s";
		}
	}
	abrir(reference){
		if(reference == true){
			this.puerta.style.width = "0";
			this.manija.style.width = "0";
		}
		else if(reference == false){
			this.puerta.style.width = "100%";
			this.manija.style.width = "1.5rem";
		}
	}
}

const puertasOriginales = [document.querySelectorAll(".opcion"), document.querySelectorAll(".puerta"), document.querySelectorAll(".manija")];

const puertas = [];

for(let i = 0; i < 3; i++){
	puertas[i] = new Puerta(puertasOriginales[0][i], puertasOriginales[1][i], puertasOriginales[2][i]);
}

window.addEventListener("click", (e)=>{

	const eleccion = e.target;

	if(contador == 0){
		for(let i = 0; i < puertas.length; i++){
			if(eleccion.className === puertas[i].puerta.className){
				puertas[i].seleccionar(true);
				indicador1 = parseInt(i, "10");
				contador = 1;
				return parte2()
			}
		}
	}
	else if(contador == 2){
		for(let i = 0; i < puertas.length; i++){
			if((eleccion.className === puertas[i].puerta.className) && (eleccion.className != puertas[indicador2].puerta.classname)){
				for(let i = 0; i < puertas.length; i++){
					puertas[i].seleccionar(false)
				}
				puertas[i].seleccionar(true);
				indicador1 = parseInt(i, "10");
				contador = 3;
				return parte3()
			}
		}
	}

})

function parte1(){

	mensaje.innerHTML = `Una de estas puertas esconde el premio ganador. Elige una para empezar.`;

	for(let i = 0; i < puertas.length; i++){
		puertas[i].seleccionar(false);
		puertas[i].abrir(false);
		if(puertas[i].contenedor.childNodes.length == 2){
			puertas[i].contenedor.childNodes[1].remove()
		}
	}

	setTimeout(()=>{
		let conPremio = Math.floor(Math.random() * puertas.length);
		const premioContenedor = document.createElement("div");
		const premio = `<i class="fa-sharp fa-solid fa-trophy"></i>`;
		premioContenedor.innerHTML = premio;
		premioContenedor.classList.add("premio-contenedor");
		puertas[conPremio].contenedor.appendChild(premioContenedor);
	}, 1000)

	contador = 0

}

parte1()

function parte2(){

	mensaje.innerHTML = `Elegiste la puerta ${indicador1 + 1}.`;
	
	setTimeout(()=>{

		let valorAleatorio = Math.floor(Math.random() * puertas.length);

		while((puertas[valorAleatorio] == puertas[indicador1]) || (puertas[valorAleatorio].contenedor.childNodes.length == 2)){
			valorAleatorio = Math.floor(Math.random() * puertas.length);
		}

		indicador2 = valorAleatorio;
		
		puertas[valorAleatorio].abrir(true);

		mensaje.innerHTML = "La puerta que se acaba de abrir definitivamente no contiene el premio.";

		setTimeout(()=>{
			mensaje.innerHTML = `Tienes 2 opciones: quedarte con la puerta que elegiste, o apostar por la otra puerta que permanece cerrada. ¿Cuál es tu decisión?`;
			contador = 2;
		}, 5000)

	}, 5000)

}

function parte3(){
	
	mensaje.innerHTML = `Elegiste la puerta ${indicador1 + 1}.`;

	setTimeout(()=>{

		for(let i = 0; i < puertas.length; i++){
			puertas[i].abrir(true);
		}

		if(puertas[indicador1].contenedor.childNodes.length == 2){
			mensaje.innerHTML = `<span class="win">Felicidades!</span> la puerta que seleccionaste era la correcta.`;
		}
		else if(puertas[indicador1].contenedor.childNodes.length == 1){
			mensaje.innerHTML = `<span class="lose">Perdiste!</span> la puerta que seleccionaste no era la correcta.`;
		}

		setTimeout(()=>{
			mensaje.innerHTML += `<br>Para apostar nuevamente, haz <span class="reiniciar" onclick="parte1()">click aquí</span>.`;
		}, 5000)

	}, 5000)

}