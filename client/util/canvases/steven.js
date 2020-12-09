import {circle} from './canvas'

export const PI = Math.PI
export const TWO_PI = PI * 2

export function kaleidoscope(ctx, len, x0, y0, angle, overallAngle, branches) {
  // angle is in [0,360]
  const angleConst = 360 / branches // number of degrees between each branch
  for (var i = 0; i < branches; i++) {
    branch(ctx, len, 1, x0, y0, angle, overallAngle + i * angleConst)
  }
  return ctx
}

export function branch(ctx, len, counter, x0, y0, angle, overallAngle) { 

  // Passing in counter as 1 so this doesn't seem to do anything
  if (counter==0){
    ctx.save()
    ctx.moveTo(x0, y0)
    ctx.rotate(Math.PI/3)
    ctx.lineTo(x0-len,y0-len)
  } else {
  }

  // setup
  ctx.beginPath()
  ctx.save()

  // move reference frame
  ctx.translate(x0, y0)

  // rotate the whole frame -- comment out or pass in overallAngle as a constant to turn off overall rotation
  if (counter==1) {
    ctx.rotate(overallAngle * Math.PI/180)
  } else {
    ctx.rotate(angle * Math.PI/180)
  }

  // move
  ctx.moveTo(0,0)
  circle(ctx, 0, 0, 1) // draw a circle
  ctx.stroke() // fill it in

  // stop drawing before too many iterations
  if (len<20) {
    ctx.restore()
    return
  }

  if (counter>4) {
      ctx.restore()
      return
  }

  // branches
  branch(ctx, 0.75*len, counter+1, -len, -len, angle, overallAngle)
  branch(ctx, 0.75*len, counter+1, -len, -len, -angle-30, overallAngle)

  // restore
  ctx.restore()
}