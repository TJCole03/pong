//Update Loop
import Ball from './Ball.js'
import Paddle from './Paddle.js'
import Bumpers from './Bumpers.js'
import Button from './PlayPause.js' 

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
const bumperElem = new Bumpers(document.getElementById("bumpers"))
const pauseButton = new Button(document.getElementById("start-pause"))
const upperBound = document.getElementById("upper-bound")
// const lowerBound = document.getElementById("lower-bound")
//can use this inside of our update loop
//takes in time variable for how much timne has passed since start of program

let lastTime 
function update(time) {
    //taking time that gets passed in and converting it to a delta
    //determine how much time has passed from previous frame to new frame

    if (lastTime != null) {
        const delta = time - lastTime
        //Update code
        // ball.update(delta, [playerPaddle.rect(), computerPaddle.rect(), bumperElem.rect(),])
        //passing in delta because due to how much 
        //the delta fluctuates in time
        //important to use the delta to make sure all
        //game movements are based off the delta
        computerPaddle.update(delta, ball.y)
        bumperElem.update(delta, ball.y)
        // upperBound.update(delta, ball.y)
        if (isLose()) handleLose()
        // if (hitUpperBound()) handleUpperBound()
        // if (playPause()) pause()
        //console.log(delta)
    }

    lastTime = time
    window.requestAnimationFrame(update)
}

function isLose() {
    const rect = ball.rect()
    //ball is "outta bounds" code
    return rect.right >= window.innerWidth || rect.left <= 0 
}




function handleLose() {
    const rect = ball.rect()
    if (rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
}



document.addEventListener('mousemove', e => {
    //setting position of player paddle
    //this is a pixel value, so we need to convert to a percentage
    //gives value between 0 and 1, //multiply it by 100 to get the value bewtween 0 and 100 (%)
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

//UH OH! SCRIPT IS ONLY READING THIS EVENT LISTENER
// document.addEventListener('click', e => {
//     bumperElem.update(e.delta, e.ball)
//     console.log('shit')
// })

document.addEventListener('click', e => {
    pauseButton(e.ball)
    console.log('clicked')
})


//upperBound.requestAnimationFrame(update)
window.requestAnimationFrame(update) 