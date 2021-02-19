function init() {

  console.log('Javascript connected')

  //* GRID CONSTRUCTOR
  const width = 9
  const height = 9
  const gridArea = width * height
  const gridWrapper = document.querySelector('.grid-wrapper')
  const cells = []
  let startPosition = 40
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

  //* ARRAYS OF SHAPE CONFIGURATIONS
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

  //* ARRAYS OF SHAPES IN ALL ROTATIONS
  const rectangleArray = [rectangleN, rectangleE, rectangleS, rectangleW]
  const squareArray = [squareN, squareE, squareS, squareW]
  const sidewaysTArray = [sidewaysTN, sidewaysTE, sidewaysTS, sidewaysTW]
  const zigZagArray = [zigZagN, zigZagE, zigZagS, zigZagW]

  //* ASSIGN VARIABLES TO CHOSEN SHAPES
  let currentArray = rectangleArray
  let currentIndex = 0
  const currentShape = currentArray[currentIndex]

  //* GET AND REMOVE SHAPES
  function getShape(array) {
    array.forEach(item => {
      item.classList.add('rectangle')
    })
  }

  function removeShape(array) {
    array.forEach(item => {
      item.classList.remove('rectangle')
    })
  } 
  getShape(currentShape)
  document.addEventListener('keyup', processShape)
  document.addEventListener('keydown', shapeDown)

  //* ROTATOR FUNCTION
  function turnShape() {
    if (currentIndex < 3) {
      removeShape(currentArray[currentIndex])
      currentIndex++
      getShape(currentArray[currentIndex])
    }  else {
      removeShape(currentArray[currentIndex])
      currentIndex = 0
      getShape(currentArray[currentIndex])
    }  
  }
  //* RIGHT MOVE FUNCTION (IN PROGRESS)
  function moveRight() {
    removeShape(currentShape)
    currentPos++
  }
  //* LEFT MOVE FUNCTION (IN PROGRESS)
  function moveLeft() {
    removeShape(currentShape)
    currentPos--
  }
  //* KEYUP EVALUATOR
  function processShape(event) {
    if (event.keyCode === 32) {
      turnShape() 
    } else if (event.keyCode === 39) {
      moveRight()
    } else if (event.keyCode === 37) {
      moveLeft()
    } else {
      console.log('invalid key')
    }
  }  
  //* KEYDOWN EVALUATOR
  function shapeDown(event) {
    if (event.keyCode === 40) {
      removeShape(currentShape)
      currentPos += width
      console.log(currentPos)
    }
  }

}

window.addEventListener('DOMContentLoaded', init)