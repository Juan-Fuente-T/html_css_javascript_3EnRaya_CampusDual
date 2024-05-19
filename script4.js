let jugadorTurno = 1;
let tablero = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0
];
let jugador1 = '';
let jugador2 = '';
let colorJugador1 = '';
let colorJugador2 = '';

//victorias de cada jugador
let victoriasJugador1 = 0;
let victoriasJugador2 = 0;
let empates = 0;

let avisoJugador = document.getElementById("avisoJugador");
let avisoEmpates = document.getElementById("empates");
let avisoVictorias = document.getElementById("numVictorias");

class DatosGuardados{
    jugadorTurno;
    tablero;
    victoriasJugador1;
    victoriasJugador2;
    empates;
    jugador1;
    jugador2;
    colorJugador1;
    colorJugador2;
}


function empezarPartida(jugadorUno, jugadorDos, colorJugadorUno, colorJugadorDos){
    if(
        jugadorUno == null ||
        jugadorUno == undefined ||
        jugadorUno == '' ||
        jugadorDos == null ||
        jugadorDos == undefined ||
        jugadorDos == ''
    ){
        alert("Debe escribir ambos nombres!");
    }else{
        jugador1 = jugadorUno;
        jugador1 = jugador1 == "Tu nombre 1"? "XR-22H": jugador1;
        jugador2 = jugadorDos;
        jugador2 = jugador2 == "Tu nombre 2"? "Space Lord": jugador2;
        colorJugador1 = colorJugadorUno;
        colorJugador2 = colorJugadorDos;
        let form = document.getElementById("jugadoresForm");
        // form.style.visibility = 'hidden';
        form.style.display = 'none';
        form.style.height = '0px';
        let juego = document.getElementById("contenedorJuego");
        juego.style.visibility = 'visible';
        // juego.style.height = "100%";
        (new Audio('assets/open.mp3')).play();
        console.log("DatosInicio: ", jugador1, colorJugador1, jugador2, colorJugador2);
    }
}

// function guardarJugadores(event){
//     event.preventDefault();
//     // console.log("Porras");
//     jugadorUno = document.getElementById("jugador1").value;
//     colorJugadorUno = document.getElementById("colorJugador1").value;
//     jugadorDos = document.getElementById("jugador2").value;
//     colorJugadorDos = document.getElementById("colorJugador2").value;
//     console.log("Jugadores y colores: ", jugadorUno, jugadorDos, colorJugadorUno, colorJugadorDos);
// }

function manejarTurno(posicion){
    let cell = document.getElementById(`cellButton${posicion}`);

    // console.log("Cell: ", document.getElementById(`cellButton${row}${numCell}`).innerHTML);
    console.log("Cell", cell)
    console.log("Color1", colorJugador1)
    // console.log("NumCell", numCell);
    
    if(tablero[posicion] != 0){
        // alert("No se puede sobreescribir la jugada de otro jugador");
        return;
    }
    // tablero[posicion] = jugadorTurno;
    // jugadorTurno = jugadorTurno == 1 ? 2 : 1;
    console.log("Turno principio", jugadorTurno);
    if (jugadorTurno == 1) {
        cell.style.backgroundImage = "url('')";
        // cell.innerHTML = '<div>x</div>';
        // cell.style.backgroundColor = colorJugador1;
        console.log("Color2", colorJugador2);
        cell.style.backgroundImage = "url('./assets/ovni.png')";
        tablero[posicion] = 1;
        (new Audio('assets/ficha1.mp3')).play();
        // avisoJugador.innerHTML = "JUGADOR ACTUAL: JUGADOR 1"
        avisoJugador.innerHTML = `Es el turno de ${jugador2}`;
        jugadorTurno = 2;
    } else {
        cell.style.backgroundImage = "url('')";
        // cell.innerHTML = "<div>o</div>";
        // cell.style.backgroundColor = colorJugador2;
        cell.style.backgroundImage = "url('./assets/nave.png')";
        // console.log("Matriz", cellMatrix);
        tablero[posicion] = 2;
        (new Audio('assets/ficha2.mp3')).play();
        avisoJugador.innerHTML = `Es el turno de ${jugador1}`;
        jugadorTurno = 1;
    }
    
    // mostrarVencedor();
    comprobarVictoria();
    // console.log("Matriz", cellMatrix);
    // console.log("Matriz", cellArray);
    
    
}
const combinacionesGanadoras = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12]
];
function comprobarVictoria(){
    let partidaTerminada = false;
    let ganador = 0;
    for(let combinacion of combinacionesGanadoras){
        console.log("cels", tablero[combinacion[0]], tablero[combinacion[1]],tablero[combinacion[2]],tablero[combinacion[3]]);
        if(
            tablero[combinacion[0]] == tablero[combinacion[1]] &&  
            tablero[combinacion[1]] == tablero[combinacion[2]] &&  
            tablero[combinacion[2]] == tablero[combinacion[3]] &&  
            tablero[combinacion[0]] != 0
        ){
            partidaTerminada = true;
            // ganador = cellMatrix[combinacion[0]];
            ganador = tablero[combinacion[0]];
            break;
        }
    }
    if(partidaTerminada){
        if(ganador == 1){
        // console.log("ganador2", ganador);
        // if(ganador === "x"){
            avisoJugador.innerHTML = `${jugador1} ha vencido`;
            jugadorTurno = 2;
            // partidaTerminada = true;
            // mostrarVencedor()
            // victoria = true;
            setTimeout(function (){
                (new Audio('assets/victoria.mp3')).play();
            }, 400);        
            setTimeout(function (){
                reiniciarPartida();
                // guardarDatos();
            }, 700);
            ++victoriasJugador1;
        // }
        }else if (ganador == 2){
            avisoJugador.innerHTML = `${jugador2} ha vencido`;
            jugadorTurno = 1;
            // partidaTerminada = true;
            // mostrarVencedor()
            // victoria = true;
            setTimeout(function (){
                (new Audio('assets/victoria.mp3')).play();
            }, 400);
            setTimeout(function (){
                reiniciarPartida();
                // guardarDatos();
                }, 700);
            ++victoriasJugador2;
            }
    avisoVictorias.innerHTML = `${jugador1}: ${victoriasJugador1} | ${victoriasJugador2} : ${jugador2}`;
    avisoVictorias.style.background = `linear-gradient(to right, ${colorJugador1} 50%, ${colorJugador2} 50%)`;
    avisoEmpates.style.background = `linear-gradient(to right, ${colorJugador1} 50%, ${colorJugador2} 50%)`;
    guardarDatos();
    return;
}
for (let valorTablero of tablero){
    if (valorTablero == 0){
        return;
    }
}
++empates;
avisoEmpates.innerHTML = `Empates: ${empates}`;
avisoEmpates.style.background = `linear-gradient(to right, ${colorJugador1} 50%, ${colorJugador2} 50%)`;
setTimeout(function (){
    (new Audio('assets/empate.mp3')).play();
}, 700);
    setTimeout(function (){
        reiniciarPartida();
        guardarDatos();
    }, 700);

        // setTimeout(function (){
        //         reiniciarPartida();
        //     }, 800);
            // for (let valorCellMatrix of cellMatrix){
                //     if (valorCellMatrix == ""){
                    //         return;
                    //     }
                    // }
        
    // setTimeout(function (){
    //     reiniciarPartida();
    //     guardarDatos();
    // }, 1200);
    // alert("Empate");
    // reiniciarPartida();
}

function reiniciarContador(){   
    reiniciarPartida();
    victoriasJugador1 = 0;
    victoriasJugador2 = 0;
    empates = 0;
    avisoVictorias.innerHTML = "NUMERO DE VICTORIAS: ";
    avisoEmpates.innerHTML = "EMPATES: ";
    avisoJugador.innerHTML = jugadorTurno == 1? `INICIA EL JUEGO: ${jugador1}`: `INICIA EL JUEGO: ${jugador2}`;
    // jugadorTurno = 1? avisoJugador.innerHTML = `INICIA EL JUEGO: ${jugador1}`: `INICIA EL JUEGO: ${jugador2}`;
    // jugadorTurno = 1;
    
}
function ejecutarSonidoReinicio(){
    setTimeout(function (){
        // (new Audio('assets/reinicio.mp3')).play();
        (new Audio('assets/limpiar.mp3')).play();
    }, 100);
}
function reiniciarPartida(){
    // if(partidaTerminada){
        for(let i = 0; i < tablero.length; ++i){
            cell = document.getElementById(`cellButton${i}`);
            // cell.innerHTML = 0;
            // cell.style.backgroundColor = "";
            cell.style.backgroundImage = "url('./assets/casilla.png')";
            cell.style.backgroundPosition = "center";
            cell.style.backgroundSize = "contain";
        }
         
        tablero = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        ];
    avisoJugador.innerHTML = jugadorTurno == 1? `Es el turno de ${jugador1}`: `Es el turno de ${jugador2}`;
    // victoria = false;
}
function recuperarPartida(){
    let infoPrevia = localStorage.getItem("INFO PREVIA");
    if (infoPrevia){
        let datosCargados = JSON.parse(infoPrevia);
        jugadorTurno = datosCargados.jugadorTurno;
        // partidaTerminada = datosCargados.partidaTerminada;
        // victoria = datosCargados.victoria;
        tablero = datosCargados.tablero;
        victoriasJugador1 = datosCargados.victoriasJugador1;
        victoriasJugador2 = datosCargados.victoriasJugador2; 
        empates = datosCargados.empates;
        jugador1 = datosCargados.jugador1;
        jugador2 = datosCargados.jugador2;
        colorJugador1 = datosCargados.colorJugador1;
        colorJugador2 = datosCargados.colorJugador2;
        // avisoJugador = datosCargados.avisoJugador;
        // cell = datosCargados.cell;
        empezarPartida(jugador1, jugador2, colorJugador1, colorJugador2);
        reiniciarPartida();
        // jugadorTurno == 1? document.getElementById("avisoJugador").innerHTML  = `Es el turno de ${jugador1}` : document.getElementById("avisoJugador").innerHTML  = `Es el turno de ${jugador2}`;
        avisoJugador.innerHTML = jugadorTurno == 1? `Es el turno de ${jugador1}`: `Es el turno de ${jugador2}`;
        // if(jugadorTurno % 2 == 0){
        //     document.getElementById("avisoJugador").innerHTML  = `Es el turno de ${jugador2}`;
        // }else{
        //     document.getElementById("avisoJugador").innerHTML  = `Es el turno de ${jugador1}`;
        // }
        avisoVictorias.innerHTML = `${jugador1}: ${victoriasJugador1} | ${victoriasJugador2} : ${jugador2}`;
        avisoVictorias.style.background = `linear-gradient(to right, ${colorJugador1} 50%, ${colorJugador2} 50%)`;
        
        avisoEmpates.innerHTML = `Empates: ${empates}`;
        avisoEmpates.style.background = `linear-gradient(to right, ${colorJugador1} 50%, ${colorJugador2} 50%)`;
        console.log("INFO PREVIA", localStorage.getItem("INFO PREVIA"));
    }
}


function guardarDatos(){
        let datosAGuardar = new DatosGuardados();
        datosAGuardar.jugadorTurno = jugadorTurno;
        // datosAGuardar.partidaTerminada = partidaTerminada;
        // datosAGuardar,victoria = victoria;
        datosAGuardar.tablero = tablero;
        datosAGuardar.victoriasJugador1 = victoriasJugador1;
        datosAGuardar.victoriasJugador2 = victoriasJugador2;
        datosAGuardar.empates = empates;
        datosAGuardar.jugador1 = jugador1;
        datosAGuardar.jugador2 = jugador2;
        datosAGuardar.colorJugador1 = colorJugador1;
        datosAGuardar.colorJugador2 = colorJugador2;
        localStorage.setItem("INFO PREVIA", JSON.stringify(datosAGuardar));
    }
   
    function eliminarDatos(){
        localStorage.removeItem("INFO PREVIA");
    }
    