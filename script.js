//Update Loop
import Ball from './Ball.js'

const ball = new Ball(document.getElementById("ball"))

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
        console.log(delta)
    }

    lastTime = time
    window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update) 