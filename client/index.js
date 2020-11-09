import { auth } from './classes/sync'
import Visualization from './config'



if (window.location.hash === '#start') {
  const visualizaiton = new Visualization()
} else {
  auth()
}