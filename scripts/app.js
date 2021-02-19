function init() {

  console.log('Javascript connected')

  const width = 9
  const height = 9
  const gridArea = width * height
  const gridWrapper = document.querySelector('.grid-wrapper')
  const cells = []
  const startPosition = cells[4]
  let currentPosition = startPosition

  const rectangle = [cells[currentPosition], cells[currentPosition + width], cells[currentPosition + (width * 2)], cells[currentPosition + (width * 3)]]

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











}

window.addEventListener('DOMContentLoaded', init)