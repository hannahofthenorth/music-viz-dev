import Visualizer from '../classes/visualizer'
import { interpolateRgb, interpolateBasis, interpolateHcl } from 'd3-interpolate'
import { getRandomElement } from '../util/array'
import { sin, circle, star, drawShape, fractal } from '../util/canvases/rotating_fractal_mirror'
import { thunderclouds } from '../util/color_themes'

export default class RotatingFractalMirror extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 10 })
    this.theme = thunderclouds
    this.counter = 1
    this.rotation = 20
    this.height = 256
    this.section = 0
    this.overallRotation = 0
    this.sidesList = [3, 5, 6, 8, 10]
    this.sides=5
  }

  hooks () {
    this.sync.on('tatum', tatum => {
      if (this.rotation>300) {
        this.rotation=60
      }
      if (this.rotation>150 && this.rotation<210) {
        this.rotation=210
      }
      if (this.overallRotation>360) {
        this.overallRotation=0
      }
      this.rotation++
      this.overallRotation++
    })
    this.sync.on('beat', beat => {
      if (this.rotation>300) {
        this.rotation=60
      }
      if (this.rotation>150 && this.rotation<210) {
        this.rotation=210
      }
      if (this.overallRotation>360) {
        this.overallRotation=0
      }
      this.rotation+= 2
      this.overallRotation++
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
      //on every segment
      this.sides = getRandomElement(this.sidesList)
    })
    this.sync.on('section', section => {
      //on every section
    })
  }

  paint ({ ctx, height, width, now }) {
    const bar = interpolateBasis([0, this.sync.volume * 10, 0])(this.sync.bar.progress)
    const beat = interpolateBasis([0, this.sync.volume * 300, 0])(this.sync.beat.progress)
    const tatum = interpolateBasis([0, this.sync.volume * 200, 0])(this.sync.tatum.progress)
    
    
    ctx.fillStyle = 'rgba(0, 0, 0, .3)' //Fill the background black at alpha 0.05 for fade effect
    ctx.fillRect(0, 0, width, height) //Fill the whole screen
    ctx.lineWidth = 1 // Define line width
    ctx.strokeStyle = interpolateHcl(this.lastColor, this.nextColor)(this.sync.bar.progress) // transition between colors smoothly
    fractal(ctx, 400, width/2, height/2, this.rotation, this.overallRotation, this.sides)
    ctx.stroke()
  }
}