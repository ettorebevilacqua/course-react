
const rangeAr = (length)=> Array.from({ length }, (value, index) => index);

export const createGrid = (rows, cols) => {

  const length    = rows * cols
      , cells     = rangeAr(length)
      , getCoords = n => ({ col: n % cols, row: Math.floor(n / cols) })

  return {
    getCoords
  , length
  , cells
  , rows
  , cols
  }
}
