function init() {

  console.log('Javascript connected')

  const width = 9
  const height = 9
  const gridArea = width * height
  const gridWrapper = document.querySelector('.grid-wrapper')
  const cells = []
  const startPosition = 4
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

  const rectangle = [cells[currentPos], cells[currentPos + width], cells[currentPos + (width * 2)], cells[currentPos + (width * 3)]]
  const square = [cells[currentPos], cells[currentPos + 1], cells[currentPos + width], cells[currentPos + width + 1]]

  function getRectangle(array) {
    array.forEach(item => {
      item.classList.add('rectangle')
    })
  }

  getRectangle(square)







}

window.addEventListener('DOMContentLoaded', init)