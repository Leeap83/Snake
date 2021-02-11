document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 // first div in grid
    let appleIndex = 0 
    let currentSnake = [2,1,0] // the div in grid being 2 (Head), and 0 being (Tail, with 1's being body) 
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0 
    let interval = 0 
    
    //Start Game, restart
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

//function that deals with moveoutcomes
function moveOutcomes() {
 
    //Snake hitting border or self
    if (
        (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
        (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake hits Top
        squares[currentSnake[0] + direction].classList.contains('snake') //if snake hits itself
    ) {
        return clearInterval(interval)
    }

    const tail = currentSnake.pop() //removes last item of array and displays it
    squares[tail].classList.remove('snake') //removes class of snake from the Tail
    currentSnake.unshift(currentSnake[0] + direction) //gives direction to head of the array
   
   //snake eating an apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
}

//generate new apple
function randomApple() {
    do{
        appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}
    
    //keyboard functions
    function control(e) {
        squares[currentIndex].classList.remove('snake') // removes snake class from all squares

        if(e.keyCode === 39) {
            direction = 1 // if we press right on keyboard the snake goes right
        } else if (e.keyCode === 38) {
            direction = -width // if we press up snake goes up
        } else if (e.keyCode === 37) {
            direction = -1 // if we press left snake goes left one div
        } else if (e.keyCode === 40) {
            direction = +width // we press down the snake head appears 10 divs below
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})