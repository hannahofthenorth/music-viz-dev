import Visualizer from '../classes/visualizer'
import { interpolateBasis, interpolateHcl } from 'd3-interpolate'
import { getRandomElement } from '../util/array'
import { shape } from '../util/canvases/canvas'
import { rainbow } from '../util/color_themes'

export default class Shapes extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 10 })
    this.theme = rainbow 
    this.counter = 1
    this.rotation = 20
    this.height = 256
    this.section = 1
    this.dir = 1
    this.sidesList = [3, 4, 5, 6]
  }

  hooks () {
    this.sync.on('tatum', tatum => {
      if (this.rotation>360) {
        this.rotation=0;
      }
      this.rotation+= 2
    })
    this.sync.on('beat', beat => {
      this.lastColor = this.nextColor || getRandomElement(this.theme)
      this.nextColor = getRandomElement(this.theme.filter(color => color !== this.nextColor))
      if (this.rotation>360) {
        this.rotation=0;
      }
      this.rotation+= 2
    })
    this.sync.on('bar', bar => {
      this.counter++
      if (this.counter%20==0) {
        this.counter=1
      }
    })
    this.sync.on('segment', segment => {
      if (this.height<256){
        this.dir *= -1
      }
      if (this.height>1024) {
        this.dir *= -1
      }
      this.height+= this.dir*2
      this.sides = getRandomElement(this.sidesList)
    })
    this.sync.on('section', section => {
    })
  }

  paint ({ ctx, height, width, now }) {
    const bar = interpolateBasis([0, this.sync.volume * 10, 0])(this.sync.bar.progress)
    const beat = interpolateBasis([0, this.sync.volume * 300, 0])(this.sync.beat.progress)
    const tatum = interpolateBasis([0, this.sync.volume * 200, 0])(this.sync.tatum.progress)
    
    var vol_input = this.sync.volume*height
    if (vol_input > height) {
      vol_input = height
    }

    // setup
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, width, height) //Fill the whole screen
    ctx.strokeStyle = interpolateHcl(this.lastColor, this.nextColor)(this.sync.bar.progress) // transition between colors smoothly


    shape(ctx, this.sides, width/2, height/2, 50*bar+tatum, this.rotation)
    ctx.stroke()
  }
}