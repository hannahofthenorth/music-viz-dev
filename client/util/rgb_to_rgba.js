export function convertToRGBA(rgb, alpha) {
    var rgb2
    var rgb3
    var rgb4
    var rgb5
    var rgb6
    rgb2 = rgb.replace('rgb', 'rgba')
    rgb3 = rgb2.slice(0,rgb2.length-1)
    rgb4 = rgb3.concat(', ')
    rgb5 = rgb4.concat(alpha)
    rgb6 = rgb5.concat(')')
    return rgb6
}