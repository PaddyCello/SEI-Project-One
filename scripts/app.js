function init() {

  console.log('Javascript connected')

  let shapeFallId
  const width = 11
  const height = 20
  const gridArea = width * height
  const gridWrapper = document.querySelector('.grid-wrapper')
  const cells = []
  const startPosition = Math.floor(width / 2)
  
  let nextRotation
  let currentPos = startPosition
  let currentShape
  let currentChoice
  let nextShape
  let score = 0
  const scoreBoard = document.querySelector('.score')
  scoreBoard.innerText = score
  const compassDirections = ['N', 'E', 'S', 'W']
  let compassDirection

  document.addEventListener('keyup', processShape)
  document.addEventListener('keydown', tryMoveDown)
  document.querySelector('button').addEventListener('click', startGame)


  //* FUNCTIONS OF SHAPE CONFIGURATIONS
  function makeRectangle() {
    nextShape.push(currentPos, (currentPos + width), (currentPos + (width * 2)), (currentPos + (width * 3)))
  }
  function makeSquare() {
    nextShape.push(currentPos, (currentPos + 1), (currentPos + width + 1), (currentPos + width))
  }
  function makeSidewaysT() {
    nextShape.push(currentPos, (currentPos + width), (currentPos + (width * 2)), (currentPos + width + 1))
  }
  function makezigZag() {
    nextShape.push(currentPos, (currentPos + width), (currentPos + 1 + (width * 2)), (currentPos + width + 1))
  }
  function makezagZig() {
    nextShape.push(currentPos, (currentPos + width), (currentPos - 1 + width), (currentPos - 1 + (width * 2)))
  }
  function makeLShape() {
    nextShape.push(currentPos, (currentPos + width), (currentPos + (width * 2)), currentPos + 1 + (width * 2))
  }
  function makeJShape() {
    nextShape.push(currentPos, (currentPos + width), (currentPos + (width * 2)), currentPos - 1 + (width * 2))
  }
 
  //* POTENTIAL SHAPE COLOURS
  //const colours = ['#000000', '#ffffff', '#ffd700', '#800000']

  //* GRID CONSTRUCTOR

  function makeGrid() {
    for (let i = 0; i < gridArea; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      gridWrapper.appendChild(cell)
      cells.push(cell)
    }
  }
  makeGrid(gridArea)
   
  //* GENERATE NEXT SHAPE
  function createShape(position) {
    nextShape = []
    currentChoice = Math.floor(Math.random() * 7)
    if (currentChoice === 0) {
      makeRectangle()
    } else if (currentChoice === 1) {
      makeSquare()
    } else if (currentChoice === 2) {
      makeSidewaysT()
    } else if (currentChoice === 3) {
      makezigZag()
    } else if (currentChoice === 4) {
      makezagZig()
    } else if (currentChoice === 5) {
      makeLShape()
    } else {
      makeJShape()
    }
    currentPos = position
    compassDirection = compassDirections[0]
    return nextShape
  }
  
  //* START GAME FUNCTION
  function startGame() {
    document.querySelector('button').disabled = 'true'
    document.querySelector('button').classList.remove('button')
    document.querySelector('button').innerText = 'удачи!'
    throwShapes()
  }
  
  //* SETINTERVAL
  function throwShapes() {
    clearInterval(shapeFallId)
    createShape(startPosition)
    currentShape = nextShape
    addShape(currentShape)
    compassDirection = compassDirections[0]
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
 
  //* GET AND REMOVE SHAPES
  function addShape(array) {
    array.forEach(item => {
      cells[item].classList.add('tetrimino')
    })
  }
  
  function removeShape(array) {
    array.forEach(item => {
      item.classList.remove('tetrimino')
    })
  } 
  //* KEYDOWN EVALUATOR
  function tryMoveDown(event) {
    if (event.keyCode === 40 && currentShape.every(item => {
      return (item + width) < gridArea && !(cells[item + width].classList.contains('stopped'))
    })) {
      moveDown()
    } else if (event.keyCode === 40 && currentShape.some(item => {
      return item > (gridArea - (width + 1)) || cells[item + width].classList.contains('stopped')
    })) {
      makeStopped()
    }
  }
  //* KEYUP EVALUATOR
  function processShape(event) {
    if (event.keyCode === 32) {
      console.log(compassDirection)
      turnShape() 
    } else if (event.keyCode === 39 && currentShape.every(item => {
      return item % width !== (width - 1) && !(cells[item + 1].classList.contains('stopped'))
    })) {
      moveRight()
    } else if (event.keyCode === 37 && currentShape.every(item => {
      return item % width !== 0 && !(cells[item - 1].classList.contains('stopped'))
    })) {
      moveLeft()
    } else {
      console.log('invalid key')
    }
  } 

  //* TURN RECTANGLE
  function turnRectangle() {
    if (compassDirection === compassDirections[0]) {
      nextRotation = [currentShape[0], (currentShape[0] - 1), (currentShape[0] - 2), (currentShape[0] - 3)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== (width - 1))
      })){
        removeShape(cells)
        compassDirection = compassDirections[1]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[1]) {
      nextRotation = [currentShape[0], (currentShape[0] - width), (currentShape[0] - (width * 2)), (currentShape[0] - (width * 3))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item >= 0) && ((item + width) < gridArea)
      })) {
        removeShape(cells)
        compassDirection = compassDirections[2]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[2]) {
      nextRotation = [currentShape[0], (currentShape[0] + 1), (currentShape[0] + 2), (currentShape[0] + 3)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== 0)
      })){
        removeShape(cells)
        compassDirection = compassDirections[3]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[3]) {
      nextRotation = [currentShape[0], (currentShape[0] + width), (currentShape[0] + (width * 2)), (currentShape[0] + (width * 3))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && ((item + width) < gridArea) && (item >= 0)
      })){
        removeShape(cells)
        compassDirection = compassDirections[0]
        currentShape = nextRotation
        addShape(currentShape)
      }
    }
  }

  //* TURN SQUARE
  function turnSquare() {
    if (compassDirection === compassDirections[0]) {
      nextRotation = [currentShape[0], (currentShape[0] - 1), (currentShape[0] + width), (currentShape[0] + (width - 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== (width - 1)) && ((item + width) < gridArea)
      })){
        removeShape(cells)
        compassDirection = compassDirections[1]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[1]) {
      nextRotation = [currentShape[0], (currentShape[0] - width), (currentShape[0] - (width + 1)), (currentShape[0] - 1)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== (width - 1)) && (item >= 0) 
      })) {
        removeShape(cells)
        compassDirection = compassDirections[2]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[2]) {
      nextRotation = [currentShape[0], (currentShape[0] + 1), (currentShape[0] - width), (currentShape[0] - (width - 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== 0) && (item >= 0) 
      })){
        removeShape(cells)
        compassDirection = compassDirections[3]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[3]) {
      nextRotation = [currentShape[0], (currentShape[0] + width), (currentShape[0] + (width + 1)), (currentShape[0] + 1)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== 0) && ((item + width) < gridArea) 
      })){
        removeShape(cells)
        compassDirection = compassDirections[0]
        currentShape = nextRotation
        addShape(currentShape)
      }
    }
  }

  //* TURN SIDEWAYS T
  function turnSidewaysT() {
    if (compassDirection === compassDirections[0]) {
      nextRotation = [currentShape[0], (currentShape[0] - 1), (currentShape[0] - 2), (currentShape[0] + (width - 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== (width - 1)) && ((item + width) < gridArea)
      })){
        removeShape(cells)
        compassDirection = compassDirections[1]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[1]) {
      nextRotation = [currentShape[0], (currentShape[0] - width), (currentShape[0] - (width * 2)), (currentShape[0] - (width + 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item >= 0) && (item % width !== (width - 1))
      })) {
        removeShape(cells)
        compassDirection = compassDirections[2]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[2]) {
      nextRotation = [currentShape[0], (currentShape[0] + 1), (currentShape[0] + 2), (currentShape[0] - (width - 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== 0) && (item >= 0)
      })){
        removeShape(cells)
        compassDirection = compassDirections[3]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[3]) {
      nextRotation = [currentShape[0], (currentShape[0] + width), (currentShape[0] + (width * 2)), (currentShape[0] + (width + 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && ((item + width) < gridArea) && (item % width !== 0)
      })){
        removeShape(cells)
        compassDirection = compassDirections[0]
        currentShape = nextRotation
        addShape(currentShape)
      }
    }
  }

  //* TURN ZIGZAG
  function turnZigZag() {
    if (compassDirection === compassDirections[0]) {
      nextRotation = [currentShape[0], (currentShape[0] - 1), (currentShape[0] + (width - 2)), (currentShape[0] + (width - 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== (width - 1)) && ((item + width) < gridArea)
      })){
        removeShape(cells)
        compassDirection = compassDirections[1]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[1]) {
      nextRotation = [currentShape[0], (currentShape[0] - width), (currentShape[0] - ((width * 2) + 1)), (currentShape[0] - (width + 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item >= 0) && (item % width !== (width - 1))
      })) {
        removeShape(cells)
        compassDirection = compassDirections[2]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[2]) {
      nextRotation = [currentShape[0], (currentShape[0] + 1), (currentShape[0] - (width - 2)), (currentShape[0] - (width - 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== 0) && (item >= 0)
      })){
        removeShape(cells)
        compassDirection = compassDirections[3]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[3]) {
      nextRotation = [currentShape[0], (currentShape[0] + width), (currentShape[0] + (width * 2) + 1), (currentShape[0] + (width + 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && ((item + width) < gridArea) && (item % width !== 0)
      })){
        removeShape(cells)
        compassDirection = compassDirections[0]
        currentShape = nextRotation
        addShape(currentShape)
      }
    }
  }

  //* TURN ZAGZIG
  function turnZagZig() {
    if (compassDirection === compassDirections[0]) {
      nextRotation = [currentShape[0], (currentShape[0] - (width + 2)), (currentShape[0] - (width + 1)), (currentShape[0] - 1)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== (width - 1)) && ((item + width) < gridArea)
      })){
        removeShape(cells)
        compassDirection = compassDirections[1]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[1]) {
      nextRotation = [currentShape[0], (currentShape[0] - ((width * 2) - 1)), (currentShape[0] - width), (currentShape[0] - (width - 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== (width - 1)) && (item >= 0) 
      })) {
        removeShape(cells)
        compassDirection = compassDirections[2]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[2]) {
      nextRotation = [currentShape[0], (currentShape[0] + width + 2), (currentShape[0] + (width + 1)), (currentShape[0] + 1)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== 0) && (item >= 0) 
      })){
        removeShape(cells)
        compassDirection = compassDirections[3]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[3]) {
      nextRotation = [currentShape[0], (currentShape[0] - 1 + (width * 2)), (currentShape[0] + width), (currentShape[0] + (width - 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== 0) && ((item + width) < gridArea) 
      })){
        removeShape(cells)
        compassDirection = compassDirections[0]
        currentShape = nextRotation
        addShape(currentShape)
      }
    }
  }

  //* TURN L SHAPE
  function turnLShape() {
    if (compassDirection === compassDirections[0]) {
      nextRotation = [currentShape[0], (currentShape[0] - 1), (currentShape[0] - 2), (currentShape[0] + (width - 2))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== (width - 1)) && ((item + width) < gridArea)
      })){
        removeShape(cells)
        compassDirection = compassDirections[1]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[1]) {
      nextRotation = [currentShape[0], (currentShape[0] - width), (currentShape[0] - (width * 2)), (currentShape[0] - ((width * 2) + 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item >= 0) && (item % width !== (width - 1))
      })) {
        removeShape(cells)
        compassDirection = compassDirections[2]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[2]) {
      nextRotation = [currentShape[0], (currentShape[0] + 1), (currentShape[0] + 2), (currentShape[0] - (width - 2))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== 0) && (item >= 0)
      })){
        removeShape(cells)
        compassDirection = compassDirections[3]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[3]) {
      nextRotation = [currentShape[0], (currentShape[0] + width), (currentShape[0] + (width * 2)), (currentShape[0] + (width * 2) + 1)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && ((item + width) < gridArea) && (item % width !== 0)
      })){
        removeShape(cells)
        compassDirection = compassDirections[0]
        currentShape = nextRotation
        addShape(currentShape)
      }
    }
  }

  //* TURN J SHAPE
  function turnJShape() {
    if (compassDirection === compassDirections[0]) {
      nextRotation = [currentShape[0], (currentShape[0] - 1), (currentShape[0] - 2), (currentShape[0] - (width + 2))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== (width - 1)) && ((item + width) < gridArea)
      })){
        removeShape(cells)
        compassDirection = compassDirections[1]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[1]) {
      nextRotation = [currentShape[0], (currentShape[0] - width), (currentShape[0] - (width * 2)), (currentShape[0] - ((width * 2) - 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== (width - 1)) && (item >= 0) 
      })) {
        removeShape(cells)
        compassDirection = compassDirections[2]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[2]) {
      nextRotation = [currentShape[0], (currentShape[0] + 1), (currentShape[0] + 2), (currentShape[0] + (width + 2))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== 0) && (item >= 0) 
      })){
        removeShape(cells)
        compassDirection = compassDirections[3]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[3]) {
      nextRotation = [currentShape[0], (currentShape[0] + (width * 2)), (currentShape[0] + ((width * 2) - 1)), (currentShape[0] + width)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== 0) && ((item + width) < gridArea) 
      })){
        removeShape(cells)
        compassDirection = compassDirections[0]
        currentShape = nextRotation
        addShape(currentShape)
      }
    }
  }
  //* ROTATOR FUNCTION
  function turnShape() {
    if (currentChoice === 0) {
      turnRectangle()
    } else if (currentChoice === 1) {
      turnSquare()
    } else if (currentChoice === 2) {
      turnSidewaysT()
    } else if (currentChoice === 3) {
      turnZigZag()
    } else if (currentChoice === 4) {
      turnZagZig()
    } else if (currentChoice === 5) {
      turnLShape()
    } else if (currentChoice === 6) {
      turnJShape()
    }
  }
  //* RIGHT MOVE FUNCTION
  function moveRight() {
    removeShape(cells)
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
    removeShape(cells)
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
    removeShape(cells)
    currentPos += width
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
      checkRow()
      currentPos = startPosition
      throwShapes()
    } else {
      clearInterval(shapeFallId)
      window.alert('You lose!')
    }
  }
  
  //* CHECK TO SEE IF ROW IS FULL
  function checkRow() {
    let rowCells = []
    for (let i = 0; i < gridArea; i += width) {
      rowCells = cells.slice(i, (i + width))
      if (rowCells.every(item => {
        return (item.classList.contains('stopped'))
      })) {
        score += 100
        scoreBoard.innerText = score
        rowCells = rowCells.map(item => {
          return item.classList.remove('stopped')
        })
        for (let j = (i - 1); j >= 0; j--) {
          if (cells[j].classList.contains('stopped')) {
            cells[j].classList.remove('stopped')
            cells[j + width].classList.add('stopped')
          }
        }
      }
    }
  }

  
  

}

window.addEventListener('DOMContentLoaded', init)