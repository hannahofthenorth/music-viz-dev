import Visualizer from '../classes/visualizer'
import { interpolateRgb, interpolateBasis } from 'd3-interpolate'
import { getRandomElement } from '../util/array'
import { sin, circle, star, drawShape, fractal } from '../util/canvases/rotating_kaleidoscope_dots'
import { defaultTheme } from '../util/color_themes'

export default class KaleidoscopeSandbox extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 10 })
    this.theme = defaultTheme
    this.counter = 1
    this.rotation = 20
    this.height = 256
    this.section = 0
    this.dir = 1
  }

  hooks () {
    this.sync.on('tatum', tatum => {
      if (this.rotation>330) {
        this.rotation=30;
      }
      if (this.rotation>150 && this.rotation<210) {
        this.rotation=210;
    }
      this.rotation++
    })
    this.sync.on('beat', beat => {
        if (this.rotation>330) {
            this.rotation=30;
        }
        if (this.rotation>150 && this.rotation<210) {
            this.rotation=210;
        }
      this.rotation++
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
      if (this.height<256){
        this.dir *= -1
      }
      if (this.height>512) {
        this.dir *= -1
      }
      this.height+= this.dir*3
      console.log(this.dir)
    })
    this.sync.on('section', section => {
      if (this.height<256){
        this.dir *= -1
      }
      if (this.height>512) {
        this.dir *= -1
      }
      this.height+= this.dir*3
    })
  }

  paint ({ ctx, height, width, now }) {
    const bar = interpolateBasis([0, this.sync.volume * 10, 0])(this.sync.bar.progress)
    const beat = interpolateBasis([0, this.sync.volume * 300, 0])(this.sync.beat.progress)
    const tatum = interpolateBasis([0, this.sync.volume * 200, 0])(this.sync.tatum.progress)
    
    
    ctx.fillStyle = 'rgba(0, 0, 0, .05)' //Fill the background black at alpha 0.05 for fade effect
    ctx.fillRect(0, 0, width, height) //Fill the whole screen
    ctx.lineWidth = 4 // Define line width
    ctx.strokeStyle = interpolateRgb(this.lastColor, this.nextColor)(this.sync.bar.progress) // transition between colors smoothly

    fractal(ctx, 175, width/2, height/2, this.rotation, 0, 4)
    ctx.stroke()
  }
}