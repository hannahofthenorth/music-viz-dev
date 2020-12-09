import Visualizer from '../classes/visualizer'
import { interpolateBasis, interpolateHcl, interpolateRgb } from 'd3-interpolate'
import { getRandomElement } from '../util/array'
import { fractalmirror } from '../util/canvases/matt'
import { likeSugar } from '../util/color_themes'

export default class Matt extends Visualizer {
    constructor() {
        super({ volumeSmoothing: 10 })
        this.theme = likeSugar
        this.counter = 1
        this.rotation = 20
        this.height = 256
        this.section = 1
        this.dir = 0
        this.xtrans = width / 2
        this.sides = 3
        this.overallRotation = 400
    }

    hooks() {
        this.sync.on('tatum', tatum => {
            if (this.rotation > 300) {
                this.rotation = 60
            }
            if (this.rotation > 150 && this.rotation < 210) {
                this.rotation = 210
            }
            if (this.dir > 360) {
                this.dir = 0
            }
            this.rotation++
            this.dir++
        })
        this.sync.on('beat', beat => {
            if (this.rotation > 300) {
                this.rotation = 60
            }
            if (this.rotation > 150 && this.rotation < 210) {
                this.rotation = 210
            }
            if (this.dir > 360) {
                this.dir = 0
            }
            this.rotation += 2
            this.overallRotation++
        })
        this.sync.on('bar', bar => {
            this.lastColor = this.nextColor || getRandomElement(this.theme)
            this.nextColor = getRandomElement(this.theme.filter(color => color !== this.nextColor))
            this.counter++
            if (this.counter % 15 == 0) {
                this.counter = 1
            }
        })
        this.sync.on('segment', segment => {
            // on every segment
        })
        this.sync.on('section', section => {
            // on every section
        })
    }

    paint({ ctx, height, width, now }) {
        const bar = interpolateBasis([0, this.sync.volume * 10, 0])(this.sync.bar.progress)
        const beat = interpolateBasis([0, this.sync.volume * 300, 0])(this.sync.beat.progress)
        const tatum = interpolateBasis([0, this.sync.volume * 200, 0])(this.sync.tatum.progress)

        var vol_input = this.sync.volume * this.height;
        if (vol_input < height / 5) {
            vol_input = height / 5
        }

        ctx.fillStyle = interpolateRgb(this.lastColor, this.nextColor)(this.sync.bar.progress) //Fill the background black at alpha 0.05 for fade effect
        ctx.fillRect(0, 0, width, height) //Fill the whole screen
        ctx.lineWidth = 4 // Define line width
        //ctx.strokeStyle = interpolateRgb(this.lastColor, this.nextColor)(this.sync.bar.progress) // transition between colors smoothly
        //console.log(ctx.strokeStyle)
        ctx.strokeStyle = '#ffffff'
        fractalmirror(ctx, vol_input + 1, width / 2, height / 2, this.rotation, this.dir, 9)
        ctx.stroke()
    }
}