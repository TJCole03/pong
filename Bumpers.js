const SPEED = .04


export default class Bumpers {
    constructor(bumperElem) {
        this.bumperElem = bumperElem
    }

    get position() {
        return parseFloat(getComputedStyle(this.bumperElem).getPropertyValue("--position"))

    }

    set position(value) {
        this.bumperElem.style.setProperty("--position", value)

    }

    rect() {
        return this.bumperElem.getBoundingClientRect()
    }
    update(delta, ballHeight) {
        this.position += SPEED * delta * (ballHeight - this.position)
    }

}

//collision detection for ball to hit bumpers and bounce off. 
//if ball hits bumper-left top, bottom, left, or right 
//return 