const SPEED = .02


export default class UpperBoundary {
    constructor(boundaryElem) {
        this.boundaryElem = boundaryElem
    }

    get position() {
        return parseFloat(getComputedStyle(this.boundaryElem).getPropertyValue("--position"))

    }

    set position(value) {
        this.boundaryElem.style.setProperty("--position", value)

    }

    rect() {
        return this.boundaryElem.getBoundingClientRect()
    }
    update(delta, ballHeight) {
        //if ball hits upper boundary, do this: 
        this.position += SPEED * delta * (ballHeight - this.position)
    }

}