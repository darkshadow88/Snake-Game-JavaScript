// Creating The Game Context
const canvas = document.getElementById("snake-board");
const ctx = canvas.getContext("2d");

// Creating utility values
const BOARD_BORDER = "black";
const BOARD_BACKGROUND = "lightgrey";
const SNAKE_BORDER = "blue";
const SNAKE_COLOR = "lightgreen";
const BOARD_WIDTH = canvas.width;
const BOARD_HEIGHT = canvas.height;
const BOARD_BORDER_THIKNESS = 5;
const SNAKE_BORDER_THINKNESS = 2;
const FOOD_COLOR = "red";
const FOOD_BORDER = "coral";
const FOOD_BORDER_THIKNESS = 2;

let score = 0;
// Creating the Snake
let snake = {
  body: [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
  ],
  dx: 10,
  dy: 0,
  chagingDirection: false,
};

// Drawing the Snake
let drawSnake = () => {
  let drawSnakePart = (snakePart) => {
    ctx.fillStyle = SNAKE_COLOR;
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.lineWidth = SNAKE_BORDER_THINKNESS;
    ctx.strokeStyle = SNAKE_BORDER;
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
  };
  snake.body.forEach(drawSnakePart);
};

// Create the background
let clearCanvas = () => {
  ctx.fillStyle = BOARD_BACKGROUND;
  ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
  ctx.lineWidth = BOARD_BORDER_THIKNESS;
  ctx.strokeStyle = BOARD_BORDER;
  ctx.strokeRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
};
let autoMoveSnake = () => {
  const head = { x: snake.body[0].x + snake.dx, y: snake.body[0].y + snake.dy };
  snake.body.unshift(head);
  if (snake.body[0].x === food.x && snake.body[0].y === food.y) {
    score += 10;
    document.getElementById("score").innerHTML = "score - "+score;
    genrateFood();
  }
  snake.body.pop();
};
let changeDiretion = (event) => {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (snake.chagingDirection) return;
  snake.chagingDirection = true;
  const keyPressed = event.keyCode;
  const goingUp = snake.dy === -10;
  const goingDown = snake.dy === 10;
  const goingRight = snake.dx === 10;
  const goingLeft = snake.dx === -10;

  keyPressed === LEFT_KEY && !goingRight
    ? ((snake.dx = -10), (snake.dy = 0))
    : null;
  keyPressed === RIGHT_KEY && !goingLeft
    ? ((snake.dx = 10), (snake.dy = 0))
    : null;
  keyPressed === UP_KEY && !goingDown
    ? ((snake.dx = 0), (snake.dy = -10))
    : null;
  keyPressed === DOWN_KEY && !goingUp
    ? ((snake.dx = 0), (snake.dy = 10))
    : null;
};
//When Snake will bit its body
let hasBittenSelf = () => {
  for (let i = 4; i < snake.body.length; i++)
    if (
      snake.body[i].x === snake.body[0].x &&
      snake.body[i].y === snake.body[0].y
    )
      return true;
};
let hasHitWall = () => {
  const hitLeftWall = snake.body[0].x < 10;
  const hitRightWall = snake.body[0].x > BOARD_WIDTH - 15;
  const hitTopWall = snake.body[0].y < 10;
  const hitBottomWall = snake.body[0].y > BOARD_HEIGHT - 15;
  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
};

// start function

let food = {
  x: 0,
  y: 0,
};
let genrateFood = () => {
  let randomPosition = (max, min) => {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
  };
  food.x = randomPosition(0, BOARD_WIDTH - 20);
  food.y = randomPosition(0, BOARD_HEIGHT - 20);
  snake.body.forEach((snakePart) =>
    snakePart.x == food.x && snakePart.y == food.y ? genrateFood() : null
  );
};
genrateFood();
let drawFood = () => {
  ctx.fillStyle = FOOD_COLOR;
  ctx.strokeStyle = FOOD_BORDER;
  ctx.lineWidth = FOOD_BORDER_THIKNESS;
  ctx.fillRect(food.x, food.y, 10, 10);
  ctx.strokeRect(food.x, food.y, 10, 10);
};
let start = () => {
  if (hasHitWall() || hasBittenSelf()) return;

  snake.chagingDirection = false;
  setTimeout(() => {
    clearCanvas();
    drawFood();
    autoMoveSnake();
    drawSnake();
    start();
  }, 100);
};

document.addEventListener("keydown", changeDiretion);
start();
