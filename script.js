//your code here
document.addEventListener('DOMContentLoaded', () => {
      const gameContainer = document.getElementById('gameContainer');
      const scoreElement = document.getElementById('score');
      
      const totalPixels = 400 / 40;
      const totalPixelsSquared = totalPixels * totalPixels;
      let snake = [{ row: 20, col: 1 }];
      let food = { row: getRandomNumber(), col: getRandomNumber() };
      let direction = 'right';
      let score = 0;

      function getRandomNumber() {
        return Math.floor(Math.random() * totalPixels) + 1;
      }

      function createGameArea() {
        for (let i = 1; i <= totalPixelsSquared; i++) {
          const pixel = document.createElement('div');
          pixel.className = 'pixel';
          pixel.id = `pixel${i}`;
          gameContainer.appendChild(pixel);
        }
      }

      function drawSnake() {
        snake.forEach((pixel, index) => {
          const pixelElement = document.getElementById(`pixel${pixel.row}_${pixel.col}`);
          if (index === 0) {
            pixelElement.className = 'pixel snakeBodyPixel';
          } else {
            pixelElement.className = 'pixel snakeBodyPixel';
          }
        });
      }

      function clearSnake() {
        snake.forEach(pixel => {
          const pixelElement = document.getElementById(`pixel${pixel.row}_${pixel.col}`);
          pixelElement.className = 'pixel';
        });
      }

      function drawFood() {
        const foodPixel = document.getElementById(`pixel${food.row}_${food.col}`);
        foodPixel.className = 'pixel food';
      }

      function updateScore() {
        scoreElement.textContent = score;
      }

      function moveSnake() {
        const head = Object.assign({}, snake[0]);

        switch (direction) {
          case 'right':
            head.col += 1;
            break;
          case 'left':
            head.col -= 1;
            break;
          case 'up':
            head.row -= 1;
            break;
          case 'down':
            head.row += 1;
            break;
        }

        if (head.row < 1 || head.row > totalPixels || head.col < 1 || head.col > totalPixels || isSnakeCollision(head)) {
          clearInterval(gameInterval);
          alert('Game over!');
          return;
        }

        snake.unshift(head);
        
        if (head.row === food.row && head.col === food.col) {
          score += 1;
          updateScore();
          food = { row: getRandomNumber(), col: getRandomNumber() };
          drawFood();
        } else {
          const tail = snake.pop();
          const tailPixel = document.getElementById(`pixel${tail.row}_${tail.col}`);
		  tailPixel.className = 'pixel';
        }

        drawSnake();
      }

      function isSnakeCollision(head) {
        return snake.slice(1).some(pixel => pixel.row === head.row && pixel.col === head.col);
      }

      function handleKeyPress(event) {
        const key = event.key;
        
        if (key === 'ArrowRight' && direction !== 'left') {
          direction = 'right';
        } else if (key === 'ArrowLeft' && direction !== 'right') {
          direction = 'left';
        } else if (key === 'ArrowUp' && direction !== 'down') {
          direction = 'up';
        } else if (key === 'ArrowDown' && direction !== 'up') {
          direction = 'down';
        }
      }

      document.addEventListener('keydown', handleKeyPress);

      createGameArea();
      drawSnake();
      drawFood();
      updateScore();

      const gameInterval = setInterval(moveSnake, 100);
    });