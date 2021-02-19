function init() {

  console.log('Javascript connected')

  const width = 9
  const height = 9
  const gridArea = width * height
  const gridWrapper = document.querySelector('.grid-wrapper')
  const cells = []
  const startPosition = 40
  let currentPos = startPosition

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
  const sidewaysTE = [cells[currentPos], cells[currentPos - 1], cells[currentPos + width - 1], cells[currentPos - 2]]
  const zigZagE = [cells[currentPos], cells[currentPos - 1], cells[currentPos + width - 1], cells[currentPos + width - 2]]

  const rectangleS = [cells[currentPos], cells[currentPos - width], cells[currentPos - (width * 2)], cells[currentPos - (width * 3)]]
  const squareS = [cells[currentPos], cells[currentPos - 1], cells[currentPos - width], cells[currentPos - (width + 1)]]
  const sidewaysTS = [cells[currentPos], cells[currentPos - width], cells[currentPos - (width * 2)], cells[currentPos - (width + 1)]]
  const zigZagS = [cells[currentPos], cells[currentPos - width], cells[currentPos - 1 - (width * 2)], cells[currentPos - (width + 1)]]

  const rectangleW = [cells[currentPos], cells[currentPos + 1], cells[currentPos + 2], cells[currentPos + 3]]
  const squareW = [cells[currentPos], cells[currentPos + 1], cells[currentPos - width], cells[currentPos - (width - 1)]]
  const sidewaysTW = [cells[currentPos], cells[currentPos + 1], cells[currentPos + 2], cells[currentPos - (width - 1)]]
  const zigZagW = [cells[currentPos], cells[currentPos - (width - 1)], cells[currentPos + 1], cells[currentPos - (width - 2)]]

  const rectangleArray = [rectangleN, rectangleE, rectangleS, rectangleW]
  const squareArray = [squareN, squareE, squareS, squareW]
  const sidewaysTArray = [sidewaysTN, sidewaysTE, sidewaysTS, sidewaysTW]
  const zigZagArray = [zigZagN, zigZagE, zigZagS, zigZagW]

  let currentArray = rectangleArray
  let currentShape = rectangleArray[0]
  

  function getRectangle(array) {
    array.forEach(item => {
      item.classList.add('rectangle')
    })
  }
  

  function removeRectangle(array) {
    array.forEach(item => {
      item.classList.remove('rectangle')
    })
  } 
  getRectangle(currentShape)
  document.addEventListener('keyup', processShape)

  //* LEAVING THIS TEMPORARILY WHILE I SORT OUT SOME UNEXPECTED OBSTACLES
  function turnShape() {
    console.log('space')
  }
  //* BRB
  
  function processShape(event) {
    if (event.keyCode === 32) {
      turnShape() 
    } else if (event.keyCode === 39) {
      console.log('right')
    } else if (event.keyCode === 37) {
      console.log('left')
    } else {
      console.log('invalid key')
    }
  }  
  


}

window.addEventListener('DOMContentLoaded', init)