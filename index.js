// CRM - Clear Render Move
// MORE CODE: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Mouse_controls

const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

let ballRadius = 10
let x = canvas.width/2
let y = canvas.height-30
let dx = 2
let dy = -2
let paddleHeight = 10
let paddleWidth = 75
let paddleX = (canvas.width-paddleWidth)/2
let rightPressed = false
let leftPressed = false

let brickRowCount = 3
let brickColumnCount = 5
let brickWidth = 75
let brickHeight = 20
let brickPadding = 10
let brickOffsetTop = 30
let brickOffsetLeft = 30

let score = 0

let bricks = []
for ( let c = 0; c < brickColumnCount; c++ ) {
  bricks[c] = []
  for ( let r = 0; r < brickRowCount; r++ ) {
    bricks[c][r] = {
      x: brickOffsetLeft+(brickWidth*c)+(brickPadding*c),
      y: brickOffsetTop+(brickWidth*r)+(brickPadding*r),
      destroyed: false
    }
  }
}

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

function keyDownHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = true
  }
  else if (e.keyCode === 37) {
    leftPressed = true
  }
}

function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false
  }
  else if (e.keyCode === 37) {
    leftPressed = false
  }
}

function drawScore() {
  ctx.font = "16px Impact"
  ctx.filLStyle = "orange"
  ctx.fillText("Score: " + score, 8, 20)
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (!bricks[c][r].destroyed) {
        ctx.beginPath()
        ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
      }
    }
  }
}

function drawBall() {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI*2)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}

function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = "#0095DD"
  ctx.fill()
  ctx.closePath()
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (x + ballRadius > bricks[c][r].x
        && x - ballRadius < bricks[c][r].x + brickWidth
        && y + ballRadius > bricks[c][r].y
        && y - ballRadius < bricks[c][r].y + brickHeight ) {

        if (!bricks[c][r].destroyed && x + ballRadius > bricks[c][r].x && x - ballRadius < bricks[c][r].x + brickWidth) {
          dx = -dx
        }
        if (!bricks[c][r].destroyed && y + ballRadius > bricks[c][r].y && y - ballRadius < bricks[c][r].y + brickHeight) {
          dy = -dy
        }

        if (!bricks[c][r].destroyed) {
          score++
        }

        bricks[c][r].destroyed = true
      }
    }
  }
}

function checkIfGameWon() {
  if (score === brickRowCount * brickColumnCount ) {
    alert("YOU WIN")
    document.location.reload()
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBricks()

  // PADDLE CONTROLS
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7
  }
  drawPaddle()

  // BALL CYCLE
  if ( y + dy < ballRadius ) {
    dy = -dy
  } else if ( y + dy > canvas.height - ballRadius ) {
    if ( x > paddleX && x < paddleX + paddleWidth ) {
      dy = -dy;
    }
    else {
      alert("GAME OVER")
      document.location.reload()
    }
  }

  collisionDetection()

  if ( x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx
  }
  // clearing
  drawBall()
  // moving
  x += dx
  y += dy

  drawScore()

  checkIfGameWon()
}

setInterval(draw, 10)
