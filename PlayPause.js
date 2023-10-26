

export default class PlayPause {
    constructor(button) {
        this.button = button
    }

    playPause(ball, pauseButton) {
        return ball.pause(ball)
    }
}