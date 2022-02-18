

const miModulo = ( () => {
    'use strict'





    let   deck          = [];
    const tipos         = [ 'C', 'D', 'H', 'S'],
          figuras       = [ 'A', 'J', 'Q', 'K'];

    let   puntosJugadores = [];
      
    
    // ref html
    const btnPedir           = document.querySelector('#btnPedir'),
          btnDetener         = document.querySelector('#btnDetener'),
          btnNuevo           = document.querySelector('#btnNuevo'),
          smalls             = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');
          

    const iniciaJuego = ( numJugadores = 2) => {
          deck = crearDeck();
          puntosJugadores= [];
          for ( let i = 0 ; i < numJugadores ; i++ ){
                puntosJugadores.push(0);
          }

        smalls.forEach( elem => elem.innerText = 0 ) ;
        divCartasJugadores.forEach(elem => elem.innerHTML = '' );

        btnPedir.disabled   = false;
        btnDetener.disabled = false;
    }

    const crearDeck = () => {

        deck = [];
        for(let i=2 ; i<= 10 ; i++ ){
            for ( let tipo of tipos ){
                deck.push( i + tipo );
            }
            
        }
        for (let figura of figuras){
            for( let tipo of tipos){
                deck.push( figura + tipo);

            }
            
        }
        
        return _.shuffle(deck);
    }

    const pedirCarta = ()=> {

        if (deck.length === 0){

            throw 'No hay cartas en el maso/deck';
        }
         
        return deck.pop();
    }
    
    const valorCarta = (carta) => {

        const valor  = carta.substring(0, carta.length - 1);

        return ( isNaN( valor )) ? 
               (valor === 'A'  ) ?  11 : 10 
               : valor * 1;


    }

    const acumulaPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        smalls[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }
        
    const crearCarta = (carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src   = `assets/cartas/${carta}.png`;
        imgCarta.classList.add ('carta');
        divCartasJugadores[turno].append(imgCarta);

    }

    const turnoComputadora = ( puntosMinimos ) => {
        let puntosComputa = 0;
    do {
        const carta = pedirCarta();
        puntosComputa = acumulaPuntos ( carta, puntosJugadores.length - 1 );
        crearCarta( carta , puntosJugadores.length - 1 );

    }
    while ( ( puntosComputa < puntosMinimos ) && ( puntosMinimos <= 21 ) );

    determinaGanador ();
    }
    const determinaGanador = () => {


        const [puntosMinimos, puntosComputa] = puntosJugadores;
        setTimeout(()=>{

            if (puntosComputa === puntosMinimos){
            alert('Empate');
            } else if (puntosMinimos > 21){
            alert('Has Perdido!');
            } else if ( puntosComputa > 21) {
            alert('Felicidades, has ganado!');
            } else {
                alert('Has Perdido!')
            }
        } , 100);
    }

   
   
    // eventos

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumulaPuntos( carta, 0 );

        crearCarta( carta, 0);
        if( puntosJugador > 21 ){
            btnPedir.disabled = true;
            btnDetener.disabled = true;

            turnoComputadora( puntosJugador );

        } else if ( puntosJugador === 21 ){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );

        }
       
    })

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;

    turnoComputadora( puntosJugadores[0] );



    })

    btnNuevo.addEventListener('click', () => {
    
        iniciaJuego(); 
       

});

return {
    nuevoJuego : iniciaJuego
}


}) ();