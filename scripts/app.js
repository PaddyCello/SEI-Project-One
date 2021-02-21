function init() {

  console.log('Javascript connected')

  let shapeFallId
  const width = 9
  const height = 9
  const gridArea = width * height
  const gridWrapper = document.querySelector('.grid-wrapper')
  const cells = []
  const startPosition = Math.ceil(width / 2)
  let currentPos = startPosition
  let currentShape
  let nextShape

  document.addEventListener('keyup', processShape)
  document.querySelector('button').addEventListener('click', startGame)


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
 
  //* GRID CONSTRUCTOR

  function makeGrid() {
    for (let i = 0; i < gridArea; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.innerText = i
      gridWrapper.appendChild(cell)
      cells.push(cell)
    }
    createShape(starterArray, startPosition)
  }
  makeGrid(currentPos)
  
  //* GENERATE NEXT SHAPE
  function createShape(array, position) {
    nextShape = array[Math.floor(Math.random() * array.length)][0]
    currentPos = position
    return nextShape
  }
 
  //* GET AND REMOVE SHAPES
  function addShape(array) {
    array.forEach(item => {
      cells[item].classList.add('tetrimino')
    })
  }

  
  function removeShape(array) {
    array.forEach(item => {
      cells[item].classList.remove('tetrimino')
    })
  } 
  
  
  //* ROTATOR FUNCTION (IN PROGRESS)
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
  //* RIGHT MOVE FUNCTION
  function moveRight() {
    removeShape(currentShape)
    //currentPos++
    currentShape = currentShape.map(item => {
      item++
      return item
    })
    currentShape.forEach(item => {
      cells[item].classList.add('tetrimino')
    })
  }
  //* LEFT MOVE FUNCTION
  function moveLeft() {
    removeShape(currentShape)
    //currentPos--
    currentShape = currentShape.map(item => {
      item--
      return item
    })
    currentShape.forEach(item => {
      cells[item].classList.add('tetrimino')
    })
  }
  //* MOVE DOWN FUNCTION
  function moveDown() {
    removeShape(currentShape)
    //currentPos += width
    currentShape = currentShape.map(item => {
      item += width
      return item
    })
    currentShape.forEach(item => {
      cells[item].classList.add('tetrimino')
    })
  }

  //* EVALUATOR FOR SEEING IF SHAPE IS UNABLE TO DESCEND
  function makeStopped() {
    if (currentShape.every(item => {
      return !(cells[item].classList.contains('stopped'))
    })) {
      currentShape.map(item => {
        cells[item].classList.remove('tetrimino')
        cells[item].classList.add('stopped')
        return item
      })
      throwShapes()
    } else {
      clearInterval(shapeFallId)
      window.alert('You lose!')
    }
  }
  
  //* KEYUP EVALUATOR
  function processShape(event) {
    if (event.keyCode === 32) {
      turnShape() 
    } else if (event.keyCode === 39 && currentShape.every(item => {
      return item % width !== (width - 1) && !(cells[item + 1].classList.contains('stopped'))
    })) {
      moveRight()
    } else if (event.keyCode === 37 && currentShape.every(item => {
      return item % width !== 0 && !(cells[item - 1].classList.contains('stopped'))
    })) {
      moveLeft()
    } else if (event.keyCode === 40 && currentShape.every(item => {
      return (item + width) < gridArea && !(cells[item + width].classList.contains('stopped'))
    })) {
      moveDown()
    } else if (event.keyCode === 40 && currentShape.some(item => {
      return item > (gridArea - (width + 1)) || cells[item + width].classList.contains('stopped')
    })) {
      makeStopped()
    } else {
      console.log('invalid key')
    }
  }  
  //* START GAME FUNCTION
  function startGame() {
    throwShapes()
  }
  
  //* SETINTERVAL
  function throwShapes() {
    clearInterval(shapeFallId)
    createShape(starterArray, startPosition)
    currentShape = nextShape
    addShape(currentShape)

    shapeFallId = setInterval(() => {
      if (currentShape.every(item => {
        return (item + width) < gridArea && !(cells[item + width].classList.contains('stopped'))
      })) {
        moveDown()
      } else {
        makeStopped()
      }
    }, 1000)
  }

}

window.addEventListener('DOMContentLoaded', init)