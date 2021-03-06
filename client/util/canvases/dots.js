export const PI = Math.PI
export const TWO_PI = PI * 2

export function toRadians (angle) {
  return PI * angle / 180
}

export function x (radius, theta, cx = 0) {
  return radius * Math.cos(theta) + cx
}

export function y (radius, theta, cy = 0) {
  return radius * Math.sin(theta) + cy
}

export function coords (radius, theta, cx = 0, cy = 0) {
  return {
    x: x(radius, theta, cx),
    y: y(radius, theta, cy)
  }
}

export function polygon (sides, radius, cx = 0, cy = 0, rotation = 0) {
  const angle = 360/sides
  const vertices = []

  for (var i = 0; i < sides; i++) {
    const _coords = coords(radius, toRadians((angle * i) + rotation), cx, cy)
    vertices.push(_coords)
  }

  return vertices
}

export function star (ctx, points, innerRadius, outerRadius, cx = 0, cy = 0, rotation = 0, round = false) {
  const outer = polygon(points, outerRadius, cx, cy, rotation)
  const inner = polygon(points, innerRadius, cx, cy, (360 / points / 2) + rotation)
  const vertices = []
  
  for (var i = 0; i < points; i++) {
    vertices.push({ x: outer[i].x, y: outer[i].y })
    vertices.push({ x: inner[i].x, y: inner[i].y })
  }
  drawShape(ctx, vertices)
  return { outer, inner, vertices }
}

export function circle (ctx, x, y, radius, start = 0, end = TWO_PI) {
  ctx.beginPath()
  ctx.arc(x, y, radius, start, end)
  ctx.closePath()
  return ctx
}

export function drawShape (ctx, vertices) {
  vertices.forEach(({ x, y }, i) => {
    if (i === 0) {
      ctx.beginPath()
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })

  ctx.closePath()
  return ctx
}

export function sin (ctx, xOffset, yOffset, amplitude, frequency, tick = 5) {
  const y = x => (amplitude * Math.sin((x / frequency) + xOffset) + yOffset)
  const { width } = ctx.canvas 
  ctx.beginPath()
  for (var x = -50; x < width + 50; x += tick) {
    if (x === -50) {
      ctx.moveTo(x, y(x))
    } else {
      ctx.lineTo(x, y(x))
    }
  }
}

export function fractal(ctx, len, x0, y0, angle) {
  // angle in [0,360]
  branch(ctx, len, 1, x0, y0, angle)
  branchMirror(ctx, len, 1, x0, y0, angle)
  branch2(ctx, len, 1, x0, y0, angle)
  branch3(ctx, len, 1, x0, y0, angle)
  return ctx
}

export function branch(ctx, len, counter, x0, y0, angle) {
  if (counter==0){
    ctx.save()
    ctx.moveTo(x0, y0)
    ctx.rotate(Math.PI/3)
    ctx.lineTo(x0-len,y0-len)
  } else {
  }
  ctx.beginPath()
  ctx.save()
  ctx.translate(x0, y0)
  if (counter==1) {
    //ctx.rotate(Math.PI/180)
  } else {
    ctx.rotate(angle * Math.PI/180)
  }
  ctx.moveTo(0,0)
  //ctx.lineTo(-len, -len)
  circle(ctx, 0, 0, 3)
  ctx.stroke()
  if (len<10) {
    ctx.restore()
    return
  }
  branch(ctx, 0.65*len, counter+1, -len, -len, angle)
  branch(ctx, 0.65*len, counter+1, -len, -len, -angle)
  ctx.restore()
}
export function branchMirror(ctx, len, counter, x0, y0, angle) {
  if (counter==0){
    ctx.save()
    ctx.moveTo(x0, y0)
    ctx.rotate(Math.PI/3)
    ctx.lineTo(x0-len,y0-len)
  } else {
  }
  ctx.beginPath()
  ctx.save()
  ctx.translate(x0, y0)
  if (counter==1) {
    ctx.rotate(Math.PI/180)
  } else {
    ctx.rotate(angle * Math.PI/180)
  }
  ctx.moveTo(0,0)
  //ctx.lineTo(len, -len)
  circle(ctx, 0, 0, 3)
  ctx.stroke()
  if (len<10) {
    ctx.restore()
    return
  }

  branchMirror(ctx, 0.65*len, counter+1, len, -len, angle)
  branchMirror(ctx, 0.65*len, counter+1, len, -len, -angle)
  ctx.restore()
}
export function branch2(ctx, len, counter, x0, y0, angle) {
  if (counter==0){
    ctx.save()
    ctx.moveTo(x0, y0)
    ctx.rotate(Math.PI/3)
    ctx.lineTo(x0-len,y0-len)
  } else {
  }
  ctx.beginPath()
  ctx.save()
  ctx.translate(x0, y0)
  if (counter==1) {
    ctx.rotate(Math.PI/180)
  } else {
    ctx.rotate(angle * Math.PI/180)
  }
  ctx.moveTo(0,0)
  //ctx.lineTo(len, len)
  circle(ctx, 0, 0, 3)
  ctx.stroke()
  if (len<10) {
    ctx.restore()
    return
  }

  branch2(ctx, 0.65*len, counter+1, len, len, angle)
  branch2(ctx, 0.65*len, counter+1, len, len, -angle)
  ctx.restore()
}
export function branch3(ctx, len, counter, x0, y0, angle) {
  if (counter==0){
    ctx.save()
    ctx.moveTo(x0, y0)
    ctx.rotate(Math.PI/3)
    ctx.lineTo(x0-len,y0-len)
  } else {
  }
  ctx.beginPath()
  ctx.save()
  ctx.translate(x0, y0)
  if (counter==1) {
    ctx.rotate(Math.PI/180)
  } else {
    ctx.rotate(angle * Math.PI/180)
  }
  ctx.moveTo(0,0)
  //ctx.lineTo(-len, len)
  circle(ctx, 0, 0, 3)
  ctx.stroke()
  if (len<10) {
    ctx.restore()
    return
  }

  branch3(ctx, 0.65*len, counter+1, -len, len, angle)
  branch3(ctx, 0.65*len, counter+1, -len, len, -angle)
  ctx.restore()
}