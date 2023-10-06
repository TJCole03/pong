export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem
    }

    //helper functions to get the coordinates and position of ball
    get x() {
        return getComputedStyle(this.ballElem).getPropertyValue("--x")
    }

    set x(value) {
        this.ballElem.style.setProperty("--x", value)
    }

    update(delta) {
        this.x = 5
    }

}

//this element gets passed into the ball class so we can use it and interact with it