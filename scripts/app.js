function init() {

  console.log('Javascript connected')

  
  const width = 9
  const height = 9
  const gridArea = width * height
  const gridWrapper = document.querySelector('.grid-wrapper')
  const cells = []
  const startPosition = 40
  let currentPos = startPosition
  document.addEventListener('keyup', processShape)

  //* ARRAYS OF SHAPE CONFIGURATIONS
  const rectangleN = [currentPos, (currentPos + width), (currentPos + (width * 2)), (currentPos + (width * 3))]
  const squareN = [currentPos, (currentPos + 1), (currentPos + width), (currentPos + width + 1)]
  const sidewaysTN = [currentPos, (currentPos + width), (currentPos + (width * 2)), (currentPos + width + 1)]
  const zigZagN = [(currentPos), (currentPos + width), (currentPos + 1 + (width * 2)), (currentPos + width + 1)]
 
  const rectangleE = [currentPos, (currentPos - 1), (currentPos - 2), (currentPos - 3)]
  const squareE = [currentPos, (currentPos - 1), (currentPos + width - 1), (currentPos + width)]
  const sidewaysTE = [currentPos, (currentPos - 1), (currentPos + width - 1), (currentPos - 2)]
  const zigZagE = [currentPos, (currentPos - 1), (currentPos + width - 1), (currentPos + width - 2)]
 
  const rectangleS = [currentPos, (currentPos - width), (currentPos - (width * 2)), (currentPos - (width * 3))]
  const squareS = [currentPos, (currentPos - 1), (currentPos - width), (currentPos - (width + 1))]
  const sidewaysTS = [currentPos, (currentPos - width), (currentPos - (width * 2)), (currentPos - (width + 1))]
  const zigZagS = [currentPos, (currentPos - width), (currentPos - 1 - (width * 2)), (currentPos - (width + 1))]
 
  const rectangleW = [currentPos, (currentPos + 1), (currentPos + 2), (currentPos + 3)]
  const squareW = [currentPos, (currentPos + 1), (currentPos - width), (currentPos - (width - 1))]
  const sidewaysTW = [currentPos, (currentPos + 1), (currentPos + 2), (currentPos - (width - 1))]
  const zigZagW = [currentPos, (currentPos - (width - 1)), (currentPos + 1), (currentPos - (width - 2))]
 
  //* ARRAYS OF SHAPES IN ALL ROTATIONS
  const rectangleArray = [rectangleN, rectangleE, rectangleS, rectangleW]
  const squareArray = [squareN, squareE, squareS, squareW]
  const sidewaysTArray = [sidewaysTN, sidewaysTE, sidewaysTS, sidewaysTW]
  const zigZagArray = [zigZagN, zigZagE, zigZagS, zigZagW]

  const starterArray = [rectangleArray, squareArray, sidewaysTArray, zigZagArray]

  //* ASSIGN VARIABLES TO CHOSEN SHAPES
  let currentArray = rectangleArray
  let currentIndex = 0
  let currentShape = currentArray[currentIndex]

 
  //* GRID CONSTRUCTOR

  function makeGrid() {
    for (let i = 0; i < gridArea; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.innerText = i
      gridWrapper.appendChild(cell)
      cells.push(cell)
    }
    addShape(currentShape, startPosition)
  }
  makeGrid(currentPos)

  //* MIGHT BE USEFUL LATER
  // function generateShape(array, position) {
  //   currentShape = array[Math.floor(Math.random() * 4)][0]
  // }
  // generateShape(starterArray, currentPos)
  //*
 
  //* GET AND REMOVE SHAPES
  function addShape(array, position) {
    array.forEach(item => {
      cells[item].classList.add('rectangle')
    })
  }

  
  function removeShape(array) {
    array.forEach(item => {
      cells[item].classList.remove('rectangle')
    })
  } 
  
  
  //* ROTATOR FUNCTION
  function turnShape() {
    if (currentIndex < 3) {
      removeShape(currentArray[currentIndex])
      currentIndex++
      addShape(currentArray[currentIndex])
    }  else {
      removeShape(currentArray[currentIndex])
      currentIndex = 0
      addShape(currentArray[currentIndex])
    }  
  }
  //* RIGHT MOVE FUNCTION (IN PROGRESS)
  function moveRight(currentShape) {
    removeShape(currentShape)
    currentPos++
    return currentShape.forEach(item => {
      console.log(item)
      item++
      console.log(item)
      cells[item].classList.add('rectangle')
    })
  }
  //* LEFT MOVE FUNCTION (IN PROGRESS)
  function moveLeft(array) {
    removeShape(currentShape)
    currentPos--
    array.forEach(item => {
      item--
      cells[item].classList.add('rectangle')
    })
  }
  //* MOVE DOWN FUNCTION (IN PROGRESS)
  function moveDown(array) {
    removeShape(currentShape)
    currentPos += width
    array.forEach(item => {
      item += width
      cells[item].classList.add('rectangle')
    })
  }
  //* KEYUP EVALUATOR
  function processShape(event) {
    if (event.keyCode === 32) {
      turnShape() 
    } else if (event.keyCode === 39) {
      moveRight(currentShape)
    } else if (event.keyCode === 37) {
      moveLeft(currentShape)
    } else if (event.keyCode === 40) {
      moveDown(currentShape)
    } else {
      console.log('invalid key')
    }
  }  
  

}

window.addEventListener('DOMContentLoaded', init)