export const colors = [
  '#1976d2', // Rojo
  '#303030', // Gris oscuro
  '#FF2400', // Bordo
  '#FFC0CB', // Magenta suave
  '#FFA500', // Naranja
  '#800080', // Púrpura]
]

export function calculateGradientColor(color) {
  const darkRGB = color.match(/\w\w/g).map((str) => parseInt(str, 16))

  const r = Math.round((255 + darkRGB[0]) / 2)
  const g = Math.round((255 + darkRGB[1]) / 2)
  const b = Math.round((255 + darkRGB[2]) / 2)

  const gradientColor = '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0')
  return gradientColor
}
