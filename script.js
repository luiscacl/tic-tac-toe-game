
// Getting DOM elements
const boxes = document.querySelectorAll('.input');
const gameContainer = document.querySelector('.game-container');
const resultContainer = document.querySelector('.result-container');

const waysToWin = {
    firstWay: ['1', '2', '3'],
    secondWay: ['1', '4', '7'],
    thirdWay: ['3', '6', '9'],
    forthWay: ['1', '5', '9'],
    sixthWay: ['7', '8', '9'],
    fifthWay: ['7', '5', '3'],
    seventhWay: ['2', '5', '8'],
    eigthWay: ['4', '5', '6']
}
let crossPositions = [];
let circlePositions = [];
let checkIfDraw = 0;

function renderCross_Circle(event){
    if(gameContainer.classList.contains('x')){
        if(!event.target.classList.contains('x') && !event.target.classList.contains('o')){
            event.target.classList.add('x');
            crossPositions.push(event.target.id);
            ++checkIfDraw;
    
            // Upadate hover icon
            gameContainer.classList.remove('x');
            gameContainer.classList.add('o');
    
            checkIfWin(crossPositions, 'Cross Wins!');
        }

    } else if(gameContainer.classList.contains('o')){
        if(!event.target.classList.contains('x') && !event.target.classList.contains('o')){
            event.target.classList.add('o');
            circlePositions.push(event.target.id);
            ++checkIfDraw;
    
            // Upadate hover icon
            gameContainer.classList.remove('o');
            gameContainer.classList.add('x');
    
            checkIfWin(circlePositions, 'Circle Wins!');
        }
    }
}

function checkIfWin(checkPositionsArray, textToRenderWinner){
    console.log(checkPositionsArray);
    for (const key in waysToWin) {
        const array = waysToWin[key];

        if(checkPositionsArray.indexOf(array[0]) !== -1 &&
        checkPositionsArray.indexOf(array[1]) !== -1 &&
        checkPositionsArray.indexOf(array[2]) !== -1){
            renderWinner(textToRenderWinner);
            return;
        } 
        if(checkIfDraw === 9){
            renderWinner('It Was A Draw!');
        }
    }
}

function renderWinner(textToDisplay){
    resultContainer.setAttribute('style', 'display: flex');
    document.querySelector('.result').textContent = textToDisplay;

    const playAgainButton = document.querySelector('.result-container button');
    playAgainButton.addEventListener('click', resetGame);
}

function resetGame(){
    Array.from(boxes).forEach((box) => {
        if(box.classList.contains('x')){
            box.classList.remove('x')
        } else {
            box.classList.remove('o');
        }
    });
    resultContainer.setAttribute('style', 'display: none');

    crossPositions = [];
    circlePositions = [];
    checkIfDraw = 0;
}

Array.from(boxes).forEach((box) => {
    box.addEventListener('click', renderCross_Circle);
});

