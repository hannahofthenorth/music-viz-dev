export function fractalmirror(ctx, len, x0, y0, angle, overallAngle, branches) {
    // angle in [0,360]
    const angleConst = 360 / branches
    for (var i = 0; i < branches; i++) {
        branch(ctx, len, 1, x0, y0, angle, overallAngle + i * angleConst)
    }
    return ctx
}

export function branch(ctx, len, counter, x0, y0, angle, overallAngle) {
    ctx.beginPath()
    ctx.save()
    // ctx.rotate(overallAngle) // this is a cool abstract effect
    ctx.translate(x0, y0)
    if (counter == 1) {
        ctx.rotate(overallAngle * Math.PI / 180)
    } else {
        ctx.rotate(angle * Math.PI / 180)
    }
    ctx.moveTo(0, 0)
    ctx.lineTo(-len, 0)
    ctx.stroke()
    if (len < 10) {
        ctx.restore()
        return
    }
    branch(ctx, 0.7 * len, counter + 1, -len, 0, angle, overallAngle)
    branch(ctx, 0.7 * len, counter + 1, -len, 0, -angle, overallAngle)
    // console.log(overallAngle)
    ctx.restore()
}