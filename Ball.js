const INITIAL_VELOCITY = .025;
const VELOCITY_INCREASE = .000001

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem
        this.reset();
    }

    //helper functions to get the coordinates and position of ball
    get x() {
        //taking the CSS x value of 50 and converting it into a JS number we can use
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }
    //setter
    set x(value) {
        this.ballElem.style.setProperty("--x", value)
    }
    get y() {
        //taking the CSS y value of 50 and converting it into a JS number we can use
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }
    //setter
    set y(value) {
        this.ballElem.style.setProperty("--y", value)
    }

    rect() {
        return this.ballElem.getBoundingClientRect()
    }

    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 }
        //in order to calculate our direction, we need to create a value for our x and y
        while (
            Math.abs(this.direction.x) <= .2 ||
            Math.abs(this.direction.x) >= .9
        ) {
            //gives us a random number betwwen 0 and 360 degrees; set in terms of radiance(radians?)
            //with radians, we can use cosine and sine to determine the x and y direction
            const heading = randomNumberBetween(0, 2 * Math.PI)
            //say take in this direction and convet it into x and y position
            //this will be our UNIT VECTOR for those positions
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
        this.velocity = INITIAL_VELOCITY
    }

    update(delta, paddleRects, bumperRects) {
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        this.velocity += VELOCITY_INCREASE * delta
        const rect = this.rect()

        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1
        }
        //check if any of our paddle rectangles had a collision 
        //loops through different paddle rectablges
        if (paddleRects.some(r => isCollision(r, rect))) {
            this.direction.x *= -1
        }
        //checking if any bumpers had collision
        if (bumperRects.some(isCollision(rect))) {
            this.direction.x *= -1
        }  

    }
}
function randomNumberBetween(min, max) {
    //gives us random number between 0 and 1, use max - min trick to make 
    //sure it scales the value to be within our range
    //and then add minumum on to make sure the minumum is the lowest number we can get
    return Math.random() * (max - min) + min
}

function isCollision(rect1, rect2) {
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    )
}

//this element gets passed into the ball class so we can use it and interact with it