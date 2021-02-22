function init() {

  console.log('Javascript connected')

  let shapeFallId
  const width = 11
  const height = 20
  const gridArea = width * height
  const gridWrapper = document.querySelector('.grid-wrapper')
  const cells = []
  const startPosition = Math.floor(width / 2)
  
  let currentPos = startPosition
  let currentShape
  //let currentArray
  //let currentIndex
  let currentChoice
  let nextShape
  let score = 0
  const scoreBoard = document.querySelector('.score')
  scoreBoard.innerText = score
  const compassDirections = ['N', 'E', 'S', 'W']
  let compassDirection

  document.addEventListener('keyup', processShape)
  document.querySelector('button').addEventListener('click', startGame)


  //* ARRAYS OF SHAPE CONFIGURATIONS
  // const rectangleN = [currentPos, (currentPos + width), (currentPos + (width * 2)), (currentPos + (width * 3))]
  // const squareN = [currentPos, (currentPos + 1), (currentPos + width), (currentPos + width + 1)]
  // const sidewaysTN = [currentPos, (currentPos + width), (currentPos + (width * 2)), (currentPos + width + 1)]
  // const zigZagN = [(currentPos), (currentPos + width), (currentPos + 1 + (width * 2)), (currentPos + width + 1)]
  // const zagZigN = [currentPos, (currentPos + width), (currentPos - 1 + width), (currentPos - 1 + (width * 2))]
  // const lShapeN = [currentPos, (currentPos + width), (currentPos + (width * 2)), currentPos + 1 + (width * 2)]
  // const jShapeN = [currentPos, (currentPos + width), (currentPos + (width * 2)), currentPos - 1 + (width * 2)]
 
  //const rectangleE = [currentPos, (currentPos - 1), (currentPos - 2), (currentPos - 3)]
  // const squareE = [currentPos, (currentPos - 1), (currentPos + width - 1), (currentPos + width)]
  // const sidewaysTE = [currentPos, (currentPos - 1), (currentPos + width - 1), (currentPos - 2)]
  // const zigZagE = [currentPos, (currentPos - 1), (currentPos + width - 1), (currentPos + width - 2)]
 
  // const rectangleS = [currentPos, (currentPos - width), (currentPos - (width * 2)), (currentPos - (width * 3))]
  // const squareS = [currentPos, (currentPos - 1), (currentPos - width), (currentPos - (width + 1))]
  // const sidewaysTS = [currentPos, (currentPos - width), (currentPos - (width * 2)), (currentPos - (width + 1))]
  // const zigZagS = [currentPos, (currentPos - width), (currentPos - 1 - (width * 2)), (currentPos - (width + 1))]
 
  // const rectangleW = [currentPos, (currentPos + 1), (currentPos + 2), (currentPos + 3)]
  // const squareW = [currentPos, (currentPos + 1), (currentPos - width), (currentPos - (width - 1))]
  // const sidewaysTW = [currentPos, (currentPos + 1), (currentPos + 2), (currentPos - (width - 1))]
  // const zigZagW = [currentPos, (currentPos - (width - 1)), (currentPos + 1), (currentPos - (width - 2))]
 
  //* ARRAYS OF SHAPES IN ALL ROTATIONS
  // const rectangleArray = [rectangleN, rectangleE, rectangleS, rectangleW]
  // const squareArray = [squareN, squareE, squareS, squareW]
  // const sidewaysTArray = [sidewaysTN, sidewaysTE, sidewaysTS, sidewaysTW]
  // const zigZagArray = [zigZagN, zigZagE, zigZagS, zigZagW]
  // const zagZigArray = [zagZigN]
  // const lShapeArray = [lShapeN]
  // const jShapeArray = [jShapeN]
  
  //const starterArray = [rectangleN, squareN, sidewaysTN, zigZagN, zagZigN, lShapeN, jShapeN]
  //* POTENTIAL SHAPE COLOURS
  //const colours = ['#000000', '#ffffff', '#ffd700', '#800000']

  //* GRID CONSTRUCTOR

  function makeGrid() {
    for (let i = 0; i < gridArea; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      //cell.innerText = i
      gridWrapper.appendChild(cell)
      cell.innerText = i
      cells.push(cell)
    }
  }
  makeGrid(gridArea)
   
  //* GENERATE NEXT SHAPE
  function createShape(position) {
    nextShape = []
    currentChoice = 5
    //currentChoice = Math.floor(Math.random() * 7)
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
  // function createShape(array, position) {
  //   //currentIndex = 0
  //   currentChoice = Math.floor(Math.random() * array.length)
  //   currentArray = array[currentChoice]
  //   nextShape = currentArray//[currentIndex]
  //   currentPos = position
  //   return nextShape
  // }
  function makeRectangle() {
    nextShape.push(currentPos, (currentPos + width), (currentPos + (width * 2)), (currentPos + width * 3))
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
  //* START GAME FUNCTION
  function startGame() {
    document.querySelector('button').disabled = 'true'
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
  function turnRectangle() {
    if (compassDirection === compassDirections[0]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] - (width + 1)
      currentShape[2] = currentShape[2] - ((width * 2) + 2)
      currentShape[3] = currentShape[3] - ((width * 3) + 3)
      compassDirection = compassDirections[1]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[1]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] - (width - 1)
      currentShape[2] = currentShape[2] - ((width * 2) - 2)
      currentShape[3] = currentShape[3] - ((width * 3) - 3)
      compassDirection = compassDirections[2]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[2]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] + (width + 1)
      currentShape[2] = currentShape[2] + ((width * 2) + 2)
      currentShape[3] = currentShape[3] + ((width * 3) + 3)
      compassDirection = compassDirections[3]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[3]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] + (width - 1)
      currentShape[2] = currentShape[2] + ((width * 2) - 2)
      currentShape[3] = currentShape[3] + ((width * 3) - 3)
      compassDirection = compassDirections[0]
      addShape(currentShape)
    }
  }

  function turnSquare() {
    if (compassDirection === compassDirections[0]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] + (width - 1)
      currentShape[2] = currentShape[2] - 2
      currentShape[3] = currentShape[3] - (width + 1)
      compassDirection = compassDirections[1]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[1]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] - (width + 1)
      currentShape[2] = currentShape[2] - (width * 2)
      currentShape[3] = currentShape[3] - (width - 1)
      compassDirection = compassDirections[2]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[2]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] - (width - 1)
      currentShape[2] = currentShape[2] + 2
      currentShape[3] = currentShape[3] + (width + 1)
      compassDirection = compassDirections[3]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[3]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] + (width + 1)
      currentShape[2] = currentShape[2] + (width * 2)
      currentShape[3] = currentShape[3] + (width - 1)
      compassDirection = compassDirections[0]
      addShape(currentShape)
    }
  }

  function turnSidewaysT() {
    if (compassDirection === compassDirections[0]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] - (width + 1)
      currentShape[2] = currentShape[2] - ((width * 2) + 2)
      currentShape[3] = currentShape[3] - 2
      compassDirection = compassDirections[1]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[1]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] - (width - 1)
      currentShape[2] = currentShape[2] - ((width * 2) - 2)
      currentShape[3] = currentShape[3] - (width * 2)
      compassDirection = compassDirections[2]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[2]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] + (width + 1)
      currentShape[2] = currentShape[2] + ((width * 2) + 2)
      currentShape[3] = currentShape[3] + 2
      compassDirection = compassDirections[3]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[3]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] + (width - 1)
      currentShape[2] = currentShape[2] + ((width * 2) - 2)
      currentShape[3] = currentShape[3] + (width * 2)
      compassDirection = compassDirections[0]
      addShape(currentShape)
    }
  }

  function turnZigZag() {
    if (compassDirection === compassDirections[0]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] - (width + 1)
      currentShape[2] = currentShape[2] - (width + 3)
      currentShape[3] = currentShape[3] - 2
      compassDirection = compassDirections[1]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[1]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] - (width - 1)
      currentShape[2] = currentShape[2] - ((width * 3) - 1)
      currentShape[3] = currentShape[3] - (width * 2)
      compassDirection = compassDirections[2]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[2]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] + (width + 1)
      currentShape[2] = currentShape[2] + (width + 3)
      currentShape[3] = currentShape[3] + 2
      compassDirection = compassDirections[3]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[3]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] + (width - 1)
      currentShape[2] = currentShape[2] + ((width * 3) - 1)
      currentShape[3] = currentShape[3] + (width * 2)
      compassDirection = compassDirections[0]
      addShape(currentShape)
    }
  }

  function turnZagZig() {
    if (compassDirection === compassDirections[0]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] - (width + 1)
      currentShape[2] = currentShape[2] - (width * 2)
      currentShape[3] = currentShape[3] - ((width * 3) + 1)
      compassDirection = compassDirections[1]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[1]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] - (width - 1)
      currentShape[2] = currentShape[2] + 2
      currentShape[3] = currentShape[3] - (width - 3)
      compassDirection = compassDirections[2]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[2]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] + (width + 1)
      currentShape[2] = currentShape[2] + (width * 2)
      currentShape[3] = currentShape[3] + (width * 3) + 1
      compassDirection = compassDirections[3]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[3]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] + (width - 1)
      currentShape[2] = currentShape[2] - 2
      currentShape[3] = currentShape[3] + (width - 3)
      compassDirection = compassDirections[0]
      addShape(currentShape)
    }
  }

  function turnLShape() {
    if (compassDirection === compassDirections[0]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] - (width + 1)
      currentShape[2] = currentShape[2] - ((width * 2) + 2)
      currentShape[3] = currentShape[3] - (width + 3)
      compassDirection = compassDirections[1]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[1]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] - (width - 1)
      currentShape[2] = currentShape[2] - ((width * 2) - 2)
      currentShape[3] = currentShape[3] - ((width * 3) - 1)
      compassDirection = compassDirections[2]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[2]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] + (width + 1)
      currentShape[2] = currentShape[2] + ((width * 2) + 2)
      currentShape[3] = currentShape[3] + (width + 3)
      compassDirection = compassDirections[3]
      addShape(currentShape)
    } else if (compassDirection === compassDirections[3]) {
      removeShape(cells)
      currentShape[1] = currentShape[1] + (width - 1)
      currentShape[2] = currentShape[2] + ((width * 2) - 2)
      currentShape[3] = currentShape[3] + ((width * 3) - 1)
      compassDirection = compassDirections[0]
      addShape(currentShape)
    }
  }
  //* ROTATOR FUNCTION (IN PROGRESS)
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
    }
    
    // if (compassDirection === 0) {
    //   currentShape = [currentPos]
    //   if (cells[currentPos + width].classList.contains('tetrimino')) {
    //     currentShape.push(currentPos - 1)
    //     // cells[currentPos + width].classList.remove('tetrimino')
    //     // cells[currentPos - 1].classList.add('tetrimino')
    //   } 
    //   if (cells[currentPos - (width * 2)].classList.contains('tetrimino')) {
    //     currentShape.push(currentPos - 2)
    //     // cells[currentPos - (width * 2)].classList.contains('tetrimino')
    //     // cells[currentPos - 2].classList.add('tetrimino')
    //   }
    //   if (cells[currentPos - (width * 2)].classList.contains('tetrimino')) {
    //     currentShape.push(currentPos - 3)
    //     // cells[currentPos - (width * 3)].classList.contains('tetrimino')
    //     // cells[currentPos - 3].classList.add('tetrimino')
    //   }
    //   removeShape(cells)
    //   addShape(currentShape)
    
    // }

    // if (currentIndex < (currentArray.length - 1) && currentArray[currentIndex + 1].every(item => {
    //   return !(cells[item].classList.contains('stopped')) && (item % width !== (width - 1)) && (item % width !== 0) && ((item + width) < gridArea) && (item >= 0)
    // })) {
    //   removeShape(cells)
    //   currentIndex++
    //   currentShape = currentArray[currentIndex]
    //   addShape(currentShape)
    // }  else if (currentIndex === 3 && currentArray[0].every(item => {
    //   return !(cells[item].classList.contains('stopped')) && (item % width !== (width - 1)) && (item % width !== 0) && ((item + width) < gridArea) && (item >= 0)
    // })) {
    //   removeShape(cells)
    //   currentIndex = 0
    //   currentShape = currentArray[currentIndex]
    //   addShape(currentShape)
    // } else {
    //   console.log('cannot rotate')
    // }
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