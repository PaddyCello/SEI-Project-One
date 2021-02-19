function init() {

  console.log('Javascript connected')

  const width = 9
  const height = 9
  const gridArea = width * height
  const gridWrapper = document.querySelector('.grid-wrapper')
  const cells = []
  const startPosition = 40
  const currentPos = startPosition

  function makeGrid(gridArea) {
    for (let i = 0; i < gridArea; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.innerText = i
      gridWrapper.appendChild(cell)
      cells.push(cell)
    }
  }
  makeGrid(gridArea)

  const rectangleN = [cells[currentPos], cells[currentPos + width], cells[currentPos + (width * 2)], cells[currentPos + (width * 3)]]
  const squareN = [cells[currentPos], cells[currentPos + 1], cells[currentPos + width], cells[currentPos + width + 1]]
  const sidewaysTN = [cells[currentPos], cells[currentPos + width], cells[currentPos + (width * 2)], cells[currentPos + width + 1]]
  const zigZagN = [cells[currentPos], cells[currentPos + width], cells[currentPos + 1 + (width * 2)], cells[currentPos + width + 1]]

  const rectangleE = [cells[currentPos], cells[currentPos - 1], cells[currentPos - 2], cells[currentPos - 3]]
  const squareE = [cells[currentPos], cells[currentPos - 1], cells[currentPos + width - 1], cells[currentPos + width]]
  const sidewaysTE = [cells[currentPos], cells[currentPos + width], cells[currentPos + (width * 2)], cells[currentPos + width + 1]]
  const zigZagE = [cells[currentPos], cells[currentPos + width], cells[currentPos + 1 + (width * 2)], cells[currentPos + width + 1]]

  const rectangleS = [cells[currentPos], cells[currentPos - width], cells[currentPos - (width * 2)], cells[currentPos - (width * 3)]]
  const squareS = [cells[currentPos], cells[currentPos - 1], cells[currentPos - width], cells[currentPos - (width + 1)]]
  const sidewaysTS = [cells[currentPos], cells[currentPos + width], cells[currentPos + (width * 2)], cells[currentPos + width + 1]]
  const zigZagS = [cells[currentPos], cells[currentPos + width], cells[currentPos + 1 + (width * 2)], cells[currentPos + width + 1]]

  const rectangleW = [cells[currentPos], cells[currentPos + 1], cells[currentPos + 2], cells[currentPos + 3]]
  const squareW = [cells[currentPos], cells[currentPos + 1], cells[currentPos - width], cells[currentPos - (width - 1)]]
  const sidewaysTW = [cells[currentPos], cells[currentPos + width], cells[currentPos + (width * 2)], cells[currentPos + width + 1]]
  const zigZagW = [cells[currentPos], cells[currentPos + width], cells[currentPos + 1 + (width * 2)], cells[currentPos + width + 1]]

  function getRectangle(array) {
    array.forEach(item => {
      item.classList.add('rectangle')
    })
  }

  getRectangle(squareW)







}

window.addEventListener('DOMContentLoaded', init)