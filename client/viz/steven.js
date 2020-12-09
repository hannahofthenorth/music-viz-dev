import Visualizer from '../classes/visualizer'
import { interpolateRgb, interpolateBasis } from 'd3-interpolate'
import { convertToRGBA } from '../util/rgb_to_rgba'
import { getRandomElement } from '../util/array'
import { kaleidoscope } from '../util/canvases/steven'
import { shapesDefault } from '../util/color_themes'

export default class Steven extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 10 })
    this.theme = shapesDefault
    this.counter = 1
    this.rotation = 20
    this.height = 200
    this.section = 0
    this.dir = 1
    this.overallRotation = 0
    this.sidesList = [5, 6, 7]
    this.sides = 5
    this.alpha = 0.5
    this.bckgd = 0
  }

  hooks () {
    this.sync.on('tatum', tatum => {
      if (this.rotation>300) {
        this.rotation=60;
      }
      if (this.rotation>150 && this.rotation<210) {
        this.rotation=210;
    }
     if (this.overallRotation>360) {
         this.overallRotation = 0
     }
      this.rotation+= 1
      this.overallRotation+= -1
      this.alpha = 0.05
    })
    this.sync.on('beat', beat => {
        if (this.rotation>300) {
            this.rotation=60;
        }
        if (this.rotation>150 && this.rotation<210) {
            this.rotation=210;
        }
      this.rotation+= 1
    })
    this.sync.on('bar', bar => {
      this.lastColor = this.nextColor || getRandomElement(this.theme)
      this.nextColor = getRandomElement(this.theme.filter(color => color !== this.nextColor))
      this.counter++
      if (this.counter%15==0) {
        this.counter=1
      }
    })
    this.sync.on('segment', segment => {
      // on every segment
    })
    this.sync.on('section', section => {
        this.sides = getRandomElement(this.sidesList)
        this.alpha = 0.1
        if (this.bckgd = 0) {
          this.bckgd = 1
        }
        if (this.bckgd = 1 ) {
          this.bckgd = 0
        }
    })
  }

  paint ({ ctx, height, width, now }) {
    const bar = interpolateBasis([0, this.sync.volume * 10, 0])(this.sync.bar.progress)
    const beat = interpolateBasis([0, this.sync.volume * 300, 0])(this.sync.beat.progress)
    const tatum = interpolateBasis([0, this.sync.volume * 200, 0])(this.sync.tatum.progress)
    
    this.alpha = this.alpha*(bar/10)
    if (this.alpha > 1) {
        this.alpha = 1
    }
    if (this.bckgd - 0) {
    ctx.fillStyle = convertToRGBA('rgb(0, 0, 0)', this.alpha) //Fill the background black at alpha 0.05 for fade effect
    }
    if (this.bckgd = 1) {
      ctx.fillStyle = convertToRGBA('rgb(256, 256, 256)', this.alpha)
    }
    ctx.fillRect(0, 0, width, height) //Fill the whole screen
    ctx.lineWidth = 2 // Define line width
    ctx.strokeStyle = interpolateRgb(this.lastColor, this.nextColor)(this.sync.bar.progress) // transition between colors smoothly
    var branchHeight = this.height + 10*this.sync.volume
    if (branchHeight>256) {
        branchHeight = 256
    }
    kaleidoscope(ctx, branchHeight , width/2, height/2, this.rotation + (bar/10), this.overallRotation, 12)
    // console.log(bar)
    ctx.stroke()
  }
}