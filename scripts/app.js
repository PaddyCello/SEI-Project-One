function init() {

  console.log('Javascript connected')

  let shapeFallId
  let introId
  const done = document.querySelector('.done')
  const intro = document.querySelector('.intro')
  const introNum = document.querySelector('.intro-number')
  const width = 11
  const height = 20
  const gridArea = width * height
  const gridWrapper = document.querySelector('.grid-wrapper')
  const cells = []
  const startPosition = Math.floor(width / 2) + width
  const audio = document.querySelector('audio')
  
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
  let milliseconds = 1000
  let justGotTetris = false
  let highScore = 0
  const highScoreBoard = document.querySelector('.high-score')

  document.addEventListener('keyup', tryTurn)
  document.addEventListener('keydown', tryMove)
  document.querySelector('.button').addEventListener('click', startGame)
  document.querySelector('.again').addEventListener('click', resetGame)


  //* FUNCTIONS OF SHAPE CONFIGURATIONS
  function makeRectangle() {
    nextShape.push(currentPos, (currentPos + width), (currentPos + (width * 2)), (currentPos - width))
  }
  function makeSquare() {
    nextShape.push(currentPos, (currentPos - width), (currentPos - (width - 1)), (currentPos + 1))
  }
  function makeSidewaysT() {
    nextShape.push(currentPos, (currentPos - width), (currentPos + width), (currentPos + 1))
  }
  function makezigZag() {
    nextShape.push(currentPos, (currentPos - width), (currentPos + 1 + width), (currentPos + 1))
  }
  function makezagZig() {
    nextShape.push(currentPos, (currentPos - width), (currentPos - 1), (currentPos + (width - 1)))
  }
  function makeLShape() {
    nextShape.push(currentPos, (currentPos - width), (currentPos + width), (currentPos + 1 + width))
  }
  function makeJShape() {
    nextShape.push(currentPos, (currentPos - width), (currentPos + width), (currentPos + (width - 1)))
  }
 
  //* POTENTIAL SHAPE COLOURS
  const colours = ['#6E3F52', '#ffffff', '#ffd700', '#800000', '#09a222', '#947cec', '#9798cb']

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

  //* INTRO COUNTDOWN
  function countdown() {
    let i = 9
    introNum.innerText = 10
    intro.style.display = 'flex'
    introId = setInterval(() => {
      introNum.innerText = i
      if (i > 0) {
        i--
      } else {
        clearInterval(introId)
        intro.style.display = 'none'
        throwShapes()
      }
    }, 1000)
  }
  //* PLAY AUDIO
  function playAudio() {
    audio.setAttribute('loop', 'true')
    audio.src = '../Shos_5.wav'
    audio.play()
  }

  
  
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
    return nextShape, currentChoice
  }
  
  //* START GAME FUNCTION
  function startGame() {
    document.querySelector('button').disabled = 'true'
    document.querySelector('.button').innerText = 'удачи!'
    document.querySelector('.filter').classList.add('grain')
    document.querySelector('.filter-under').classList.add('overlay')
    document.querySelector('h1').innerText = 'Тетрис!'
    document.querySelector('title').innerText = 'Тетрис!'
    playAudio()
    countdown()
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
    }, milliseconds)
  }
 
  //* GET AND REMOVE SHAPES
  function addShape(array) {
    array.forEach(item => {
      cells[item].style.backgroundColor = colours[currentChoice]
      cells[item].classList.add('tetrimino')
    })
  }
  
  function removeShape(array) {
    array.forEach(item => {
      item.style.backgroundColor = '#000000'
      item.classList.remove('tetrimino')
    })
  } 
  //* KEYDOWN EVALUATOR
  function tryMove(event) {
    if (event.keyCode === 40 && currentShape.every(item => {
      return (item + width) < gridArea && !(cells[item + width].classList.contains('stopped'))
    })) {
      moveDown()
    } else if (event.keyCode === 40 && currentShape.some(item => {
      return item > (gridArea - (width + 1)) || cells[item + width].classList.contains('stopped')
    })) {
      makeStopped()
    } else if (event.keyCode === 39 && currentShape.every(item => {
      return item % width !== (width - 1) && !(cells[item + 1].classList.contains('stopped'))
    })) {
      moveRight()
    } else if (event.keyCode === 37 && currentShape.every(item => {
      return item % width !== 0 && !(cells[item - 1].classList.contains('stopped'))
    })) {
      moveLeft()
    }
  }
  //* KEYUP EVALUATOR
  function tryTurn(event) {
    if (event.keyCode === 32) {
      turnShape() 
    }
  } 

  //* TURN RECTANGLE
  function turnRectangle() {
    if (compassDirection === compassDirections[0]) {
      nextRotation = [currentShape[0], (currentShape[0] - 1), (currentShape[0] - 2), (currentShape[0] + 1)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped'))
      }) && (nextRotation[1] % width !== (width - 1)) && (nextRotation[2] % width !== (width - 1)) && (nextRotation[3] % width !== 0)){
        removeShape(cells)
        compassDirection = compassDirections[1]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[1]) {
      nextRotation = [currentShape[0], (currentShape[0] - width), (currentShape[0] - (width * 2)), (currentShape[0] + width)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item >= 0) && ((item + width) < gridArea)
      })) {
        removeShape(cells)
        compassDirection = compassDirections[2]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[2]) {
      nextRotation = [currentShape[0], (currentShape[0] + 1), (currentShape[0] + 2), (currentShape[0] - 1)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped'))
      }) && (nextRotation[1] % width !== 0) && (nextRotation[2] % width !== 0) && (nextRotation[3] % width !== (width - 1))){
        removeShape(cells)
        compassDirection = compassDirections[3]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[3]) {
      nextRotation = [currentShape[0], (currentShape[0] + width), (currentShape[0] + (width * 2)), (currentShape[0] - width)]
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
      nextRotation = [currentShape[0], (currentShape[0] + 1), (currentShape[0] + width + 1), (currentShape[0] + width)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== 0) && ((item + width) < gridArea)
      })){
        removeShape(cells)
        compassDirection = compassDirections[1]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[1]) {
      nextRotation = [currentShape[0], (currentShape[0] + width), (currentShape[0] + (width - 1)), (currentShape[0] - 1)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== (width - 1)) && ((item + width) < gridArea) 
      })) {
        removeShape(cells)
        compassDirection = compassDirections[2]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[2]) {
      nextRotation = [currentShape[0], (currentShape[0] - 1), (currentShape[0] - (width + 1)), (currentShape[0] - width)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== (width - 1)) && (item >= 0) 
      })){
        removeShape(cells)
        compassDirection = compassDirections[3]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[3]) {
      nextRotation = [currentShape[0], (currentShape[0] - width), (currentShape[0] - (width - 1)), (currentShape[0] + 1)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== 0) && (item >= 0)  
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
      nextRotation = [currentShape[0], (currentShape[0] + 1), (currentShape[0] - 1), (currentShape[0] + width)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && ((item + width) < gridArea)
      }) && (nextRotation[1] % width !== 0) && (nextRotation[2] % width !== (width - 1))) {
        removeShape(cells)
        compassDirection = compassDirections[1]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[1]) {
      nextRotation = [currentShape[0], (currentShape[0] + width), (currentShape[0] - width), (currentShape[0] - 1)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item >= 0) && (item % width !== (width - 1)) && ((item + width) < gridArea)
      })) {
        removeShape(cells)
        compassDirection = compassDirections[2]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[2]) {
      nextRotation = [currentShape[0], (currentShape[0] - 1), (currentShape[0] + 1), (currentShape[0] - width)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item >= 0)
      }) && (nextRotation[1] % width !== (width - 1)) && (nextRotation[2] % width !== 0) ){
        removeShape(cells)
        compassDirection = compassDirections[3]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[3]) {
      nextRotation = [currentShape[0], (currentShape[0] - width), (currentShape[0] + width), (currentShape[0] + 1)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && ((item + width) < gridArea) && (item % width !== 0) && (item >= 0)
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
      nextRotation = [currentShape[0], (currentShape[0] + 1), (currentShape[0] + (width - 1)), (currentShape[0] + width)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && ((item + width) < gridArea)
      }) && (nextRotation[1] % width !== 0) && (nextRotation[2] % width !== (width - 1))){
        removeShape(cells)
        compassDirection = compassDirections[1]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[1]) {
      nextRotation = [currentShape[0], (currentShape[0] + width), (currentShape[0] - (width + 1)), (currentShape[0] - 1)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item >= 0) && (item % width !== (width - 1)) && ((item + width) < gridArea)
      })) {
        removeShape(cells)
        compassDirection = compassDirections[2]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[2]) {
      nextRotation = [currentShape[0], (currentShape[0] - 1), (currentShape[0] - (width - 1)), (currentShape[0] - width)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item >= 0)
      }) && (nextRotation[1] % width !== (width - 1)) && (nextRotation[2] % width !== 0)) {
        removeShape(cells)
        compassDirection = compassDirections[3]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[3]) {
      nextRotation = [currentShape[0], (currentShape[0] - width), (currentShape[0] + width + 1), (currentShape[0] + 1)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && ((item + width) < gridArea) && (item % width !== 0) && (item >= 0)
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
      nextRotation = [currentShape[0], (currentShape[0] + 1), (currentShape[0] - width), (currentShape[0] - (width + 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item >= 0)
      }) && (nextRotation[1] % width !== 0) && (nextRotation[3] % width !== (width - 1)) ){
        removeShape(cells)
        compassDirection = compassDirections[1]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[1]) {
      nextRotation = [currentShape[0], (currentShape[0] + width), (currentShape[0] + 1), (currentShape[0] - (width - 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== 0) && (item >= 0) && ((item + width) < gridArea) 
      })) {
        removeShape(cells)
        compassDirection = compassDirections[2]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[2]) {
      nextRotation = [currentShape[0], (currentShape[0] - 1), (currentShape[0] + width), (currentShape[0] + width + 1)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && ((item + width) < gridArea) 
      }) && (nextRotation[1] % width !== (width - 1)) && (nextRotation[3] % width !== 0) ){
        removeShape(cells)
        compassDirection = compassDirections[3]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[3]) {
      nextRotation = [currentShape[0], (currentShape[0] - width), (currentShape[0] - 1), (currentShape[0] + (width - 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== (width - 1)) && ((item + width) < gridArea) && (item >= 0) 
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
      nextRotation = [currentShape[0], (currentShape[0] + 1), (currentShape[0] - 1), (currentShape[0] + (width - 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && ((item + width) < gridArea)
      }) && (nextRotation[1] % width !== 0) && (nextRotation[2] % width !== (width - 1)) && (nextRotation[3] % width !== (width - 1)) ){
        removeShape(cells)
        compassDirection = compassDirections[1]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[1]) {
      nextRotation = [currentShape[0], (currentShape[0] - width), (currentShape[0] - (width * 2)), (currentShape[0] - ((width * 2) + 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item >= 0) && (item % width !== (width - 1)) && ((item + width) < gridArea)
      })) {
        removeShape(cells)
        compassDirection = compassDirections[2]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[2]) {
      nextRotation = [currentShape[0], (currentShape[0] - 1), (currentShape[0] + 1), (currentShape[0] - (width - 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item >= 0)
      }) && (nextRotation[1] % width !== (width - 1)) && (nextRotation[2] % width !== 0) && (nextRotation[3] % width !== 0) ){
        removeShape(cells)
        compassDirection = compassDirections[3]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[3]) {
      nextRotation = [currentShape[0], (currentShape[0] - width), (currentShape[0] + width), (currentShape[0] + width + 1)]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && ((item + width) < gridArea) && (item % width !== 0) && (item >= 0)
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
      nextRotation = [currentShape[0], (currentShape[0] + 1), (currentShape[0] - 1), (currentShape[0] - (width + 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && ((item + width) < gridArea)
      }) && (nextRotation[1] % width !== 0) && (nextRotation[2] % width !== (width - 1)) && (nextRotation[3] % width !== (width - 1)) ){
        removeShape(cells)
        compassDirection = compassDirections[1]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[1]) {
      nextRotation = [currentShape[0], (currentShape[0] - width), (currentShape[0] - (width * 2)), (currentShape[0] - ((width * 2) - 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== 0) && (item >= 0) && ((item + width) < gridArea) 
      })) {
        removeShape(cells)
        compassDirection = compassDirections[2]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[2]) {
      nextRotation = [currentShape[0], (currentShape[0] - 1), (currentShape[0] + 1), (currentShape[0] + (width + 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && ((item + width) < gridArea)
      }) && (nextRotation[1] % width !== (width - 1)) && (nextRotation[2] % width !== 0) && (nextRotation[3] % width !== 0) ){
        removeShape(cells)
        compassDirection = compassDirections[3]
        currentShape = nextRotation
        addShape(currentShape)
      }
    } else if (compassDirection === compassDirections[3]) {
      nextRotation = [currentShape[0], (currentShape[0] - width), (currentShape[0] + width), (currentShape[0] + (width - 1))]
      if (nextRotation.every(item => {
        return !(cells[item].classList.contains('stopped')) && (item % width !== (width - 1)) && ((item + width) < gridArea) && (item >= 0) 
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
    addShape(currentShape)
  }
  //* LEFT MOVE FUNCTION
  function moveLeft() {
    removeShape(cells)
    currentShape = currentShape.map(item => {
      item--
      return item
    })
    addShape(currentShape)
  }
  //* MOVE DOWN FUNCTION
  function moveDown() {
    removeShape(cells)
    currentPos += width
    currentShape = currentShape.map(item => {
      item += width
      return item
    })
    addShape(currentShape)
  }
  //* EVALUATOR FOR SEEING IF SHAPE IS UNABLE TO DESCEND
  function makeStopped() {
    if (currentShape.every(item => {
      return !(cells[item].classList.contains('stopped'))
    })) {
      currentShape.map(item => {
        cells[item].classList.remove('tetrimino')
        cells[item].classList.add('stopped')
        cells[item].style.backgroundColor = '#463848'
        return item
      })
      checkRow()
      currentPos = startPosition
      if (milliseconds > 100) {
        milliseconds -= 10
      }
      throwShapes()
    } else {
      clearInterval(shapeFallId)
      updateHighScore()
      done.style.display = 'flex'
      audio.removeAttribute('loop')
      audio.src = '../64940__syna-max__wilhelm-scream.wav'
      audio.play()
    }
  }
  
  //* CHECK TO SEE IF ROW IS FULL
  function checkRow() {
    let rowCells = []
    let rowsAtOnce = 0
    for (let i = 0; i < gridArea; i += width) {
      rowCells = cells.slice(i, (i + width))
      if (rowCells.every(item => {
        return (item.classList.contains('stopped'))
      })) {
        score += 100
        rowsAtOnce += 1
        scoreBoard.innerText = score
        rowCells = rowCells.map(item => {
          return item.classList.remove('stopped'), item.style.backgroundColor = '#000000'
        })
        for (let j = (i - 1); j >= 0; j--) {
          if (cells[j].classList.contains('stopped')) {
            cells[j].classList.remove('stopped')
            cells[j].style.backgroundColor = '#000000'
            cells[j + width].classList.add('stopped')
            cells[j + width].style.backgroundColor = '#463848'
          }
        }
      }
    }
    if (rowsAtOnce === 4 && justGotTetris === true) {
      score += 800
      scoreBoard.innerText = score
      justGotTetris = true
    } else if (rowsAtOnce === 4) {
      score += 400
      scoreBoard.innerText = score
      justGotTetris = true
    } else if (rowsAtOnce > 1 && rowsAtOnce < 4) {
      justGotTetris = false
    }
  }
  //* RESET GAME 
  function resetGame() {
    score = 0
    scoreBoard.innerText = 0
    cells.forEach(item => {
      item.style.backgroundColor = '#000000'
      item.classList.remove('tetrimino')
      item.classList.remove('stopped')
    })
    milliseconds = 1000
    done.style.display = 'none'
    playAudio()
    countdown()
  }
  //* HIGH SCORE
  function updateHighScore() {
    if (score > highScore) {
      highScore = score
      highScoreBoard.innerText = highScore
    } else {
      highScoreBoard.innerText = highScore
    }
  }
  

}

window.addEventListener('DOMContentLoaded', init)