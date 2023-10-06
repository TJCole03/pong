//Update Loop
import Ball from './Ball.js'
import Paddle from './Paddle.js'

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))

//can use this inside of our update loop
//takes in time variable for how much timne has passed since start of program

let lastTime 
function update(time) {
    //taking time that gets passed in and converting it to a delta
    //determine how much time has passed from previous frame to new frame

    if (lastTime != null) {
        const delta = time - lastTime
        //Update code
        ball.update(delta)
        //passing in delta because the due to how much 
        //the delta fluctuates in time
        //important to use the delta to make sure all
        //game movements are based off the delta
        computerPaddle.update(delta, ball.y)
        console.log(delta)
    }

    lastTime = time
    window.requestAnimationFrame(update)
}

document.addEventListener('mousemove', e => {
    //setting position of player paddle
    //this is a pixel value, so we need to convert to a percentage
                            //gives value between 0 and 1, //multiply it by 100 to get the value bewtween 0 and 100 (%)
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update) 