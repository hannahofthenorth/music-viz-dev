import { auth } from './classes/sync'
import Template from './template'
import Example from './example'
import FractalMirror from './fractal_mirror'
import Square from './squares'
import Dots from './kaleidoscope_dots'
import RotatingFractalMirror from './rotating_fractal_mirror'



if (window.location.hash === '#start') {
  //const template = new Template()
  //const example = new Example()
  const kaleidoscope = new Dots()
  //const square = new Square()
  //const fractalMirror = new FractalMirror()
  //const square = new Square()
  //const rotatingFractalMirror = new RotatingFractalMirror()
} else {
  auth()
}