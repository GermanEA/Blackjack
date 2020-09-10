const myModule = (() => {
    'use strict'

    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
          specials = ['A', 'J', 'Q', 'K'];
    
    let playersPoints = [];
    
    // HTML REFERENCES
    const btnNew = document.querySelector('#btnNew'),
          btnTake = document.querySelector('#btnTake'),
          btnStop = document.querySelector('#btnStop'),
          divCards = document.querySelectorAll('.divCards'),
          pointsHTML = document.querySelectorAll('small');
    
    // FUNCTION TO INIT GAME
    const initGame = ( numPLayers = 2 ) => {
        deck = createDeck();

        playersPoints = [];
        for( let i = 0; i < numPLayers; i++ ){
            playersPoints.push(0);
        }  

        pointsHTML.forEach( elem => elem.innerText = 0 );
        divCards.forEach( elem => elem.innerHTML = '' );
    
        btnTake.disabled = false;
        btnStop.disabled = false;
    }


    // FUNCTION TO CREATE DECK
    const createDeck = () => {
    
        deck = [];
        for( let i = 2; i <= 10; i++){
            for( let type of types ){
                deck.push( i + type );
            }
        }
    
        for( let type of types ){
            for( let special of specials ){
                deck.push( special + type )
            }
        }
    
        return _.shuffle(deck);
    
    }
    
    // FUNCTION TO TAKE A CARD
    const takeCard = (deck) => {
    
        if(deck.length === 0){
            throw 'No quedan cartas en el mazo.';
        }
       
        return deck.pop();
    }
    
    // FUNCTION TO TAKE A VALUE OF A CARD
    const valueCard = (card) => {
    
        const value = card.substring(0, card.length - 1);
        return (value === 'A') ? 11 : (isNaN (value)) ? 10 : value * 1;
    }

    // FUNCTION TO SUM POINTS
    const sumPoints = ( card, turn ) => {
        playersPoints[turn] = playersPoints[turn] + valueCard(card);
        pointsHTML[turn].innerText = playersPoints[turn];

        return playersPoints[turn];
    }

    const createCard = ( card, turn ) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${card}.png`;
        imgCard.classList.add('card');
        divCards[turn].append(imgCard);
    }

    const whoWin = () => {

        const [ minPoints, computerPoints ] = playersPoints;
        
        setTimeout(() => {
            if( computerPoints === minPoints ) {
                alert( 'La computadora gana en caso de empate' );
            } else if( minPoints > 21) {
                alert( 'Te has pasado la computadora gana')
            } else if( computerPoints > 21 ){
                alert( 'Gana el jugador' )
            } else {
                alert( 'Gana la computadora ')
            }
        }, 100);
    }
    
    // COMPUTER BASIC IA
    const computerTurn = (minPoints) => {
    
        let computerPoints = 0;

        do{
            const card = takeCard(deck);
    
            computerPoints = sumPoints( card, playersPoints.length -1 );
            createCard( card, playersPoints.length -1 ); 
    
        } while( (computerPoints < minPoints ) && ( minPoints <= 21) );
    
        whoWin();
    
    }
    
    // EVENTS
    btnTake.addEventListener('click', () => {
        
        const card = takeCard(deck);    
        const playerPoints = sumPoints( card, 0 );

        createCard( card, 0 );
            
        if( playerPoints > 21 ){
            console.warn('Te has pasado de 21.');
            btnTake.disabled = true;
            btnStop.disabled = true;
            computerTurn( playerPoints );
        } else if ( playerPoints === 21 ){
            console.warn('Tienes justo 21.');
            btnTake.disabled = true;
            btnStop.disabled = true;
            computerTurn( playerPoints );
        }
    
    });
    
    btnStop.addEventListener('click', () => {
    
        btnTake.disabled = true;
        btnStop.disabled = true;
        computerTurn( playersPoints[0] );
    
    });
    
    btnNew.addEventListener('click', () => {
    
        initGame();
    
    });

    return {
        newGame: initGame
    };

})();





