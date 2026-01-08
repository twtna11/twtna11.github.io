const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const scoreElement = document.getElementById('score');
        const highScoreElement = document.getElementById('highScore');
        const overlay = document.getElementById('overlay');
        const overlayTitle = document.getElementById('overlayTitle');
        const overlaySub = document.getElementById('overlaySub');
        const startBtn = document.getElementById('startBtn');

        // 遊戲參數
        const tileCount = 20; // 格子數量 (20x20)
        let gridSize = canvas.width / tileCount; // 每格大小
        
        let score = 0;
        let highScore = localStorage.getItem('snakeHighScore') || 0;
        highScoreElement.innerText = highScore;

        let velocity = { x: 0, y: 0 };
        let trail = [];
        let tail = 5;
        let player = { x: 10, y: 10 };
        let food = { x: 15, y: 15 };
        
        let isGameRunning = false;
        let isPaused = false;
        let gameInterval;
        let lastInputDirection = { x: 0, y: 0 }; // 防止單一幀內快速按兩次導致自殺

        // 初始化
        function resetGame() {
            player = { x: 10, y: 10 };
            trail = [];
            tail = 5;
            velocity = { x: 1, y: 0 }; // 初始向右移動
            lastInputDirection = { x: 1, y: 0 };
            score = 0;
            scoreElement.innerText = score;
            placeFood();
        }

        function startGame() {
            resetGame();
            isGameRunning = true;
            isPaused = false;
            overlay.classList.add('hidden');
            if (gameInterval) clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, 1000 / 5); 
        }

        function togglePause() {
            if (!isGameRunning) return;
            isPaused = !isPaused;
            if (isPaused) {
                overlayTitle.innerText = "已暫停";
                overlaySub.innerText = "點擊按鈕繼續遊戲";
                startBtn.innerText = "繼續";
                overlay.classList.remove('hidden');
                clearInterval(gameInterval);
            } else {
                overlay.classList.add('hidden');
                gameInterval = setInterval(gameLoop, 1000 / 5);
            }
        }

        function gameOver() {
            isGameRunning = false;
            clearInterval(gameInterval);
            
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('snakeHighScore', highScore);
                highScoreElement.innerText = highScore;
            }

            overlayTitle.innerText = "遊戲結束";
            overlaySub.innerText = `最終分數: ${score}`;
            startBtn.innerText = "再玩一次";
            overlay.classList.remove('hidden');
        }

        function gameLoop() {
            player.x += velocity.x;
            player.y += velocity.y;

            // 穿牆機制 (碰到牆壁會從另一邊出來)
            // 如果想要撞牆死，可以把這裡改成 gameOver() 判斷
            if (player.x < 0) {
                // player.x = tileCount - 1; 
                gameOver(); return; // 撞牆死模式
            }
            if (player.x > tileCount - 1) {
                // player.x = 0;
                gameOver(); return; // 撞牆死模式
            }
            if (player.y < 0) {
                // player.y = tileCount - 1;
                gameOver(); return; // 撞牆死模式
            }
            if (player.y > tileCount - 1) {
                // player.y = 0;
                gameOver(); return; // 撞牆死模式
            }

            // 繪製背景
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 繪製蛇
            for (let i = 0; i < trail.length; i++) {
                // 蛇頭顏色略不同
                if (i === trail.length - 1) {
                    ctx.fillStyle = '#4ade80'; // 亮綠
                } else {
                    ctx.fillStyle = '#22c55e'; // 綠色
                }

                // 繪製蛇身，留一點空隙製造格子感
                ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);

                // 檢查是否撞到自己
                if (trail[i].x === player.x && trail[i].y === player.y) {
                    gameOver();
                    return;
                }
            }

            trail.push({ x: player.x, y: player.y });
            while (trail.length > tail) {
                trail.shift();
            }

            // 繪製食物
            ctx.fillStyle = '#ef4444'; // 紅色
            // 讓食物圓潤一點
            ctx.beginPath();
            let foodRadius = (gridSize - 2) / 2;
            let foodX = food.x * gridSize + gridSize / 2;
            let foodY = food.y * gridSize + gridSize / 2;
            ctx.arc(foodX, foodY, foodRadius, 0, 2 * Math.PI);
            ctx.fill();

            // 檢查吃到食物
            if (player.x === food.x && player.y === food.y) {
                tail++;
                score += 10;
                scoreElement.innerText = score;
                placeFood();
            }
            
            // 更新最後輸入方向，用於防止快速按鍵導致的自殺
            lastInputDirection = { ...velocity };
        }

        function placeFood() {
            // 避免食物生成在蛇身上
            let valid = false;
            while (!valid) {
                food.x = Math.floor(Math.random() * tileCount);
                food.y = Math.floor(Math.random() * tileCount);
                
                valid = true;
                for (let part of trail) {
                    if (part.x === food.x && part.y === food.y) {
                        valid = false;
                        break;
                    }
                }
            }
        }

        // 處理方向輸入
        function changeDirection(x, y) {
            if (!isGameRunning || isPaused) return;
            
            // 防止 180 度掉頭 (例如正在往右，不能直接往左)
            // 使用 lastInputDirection 而不是 current velocity 確保快速按鍵安全
            if (lastInputDirection.x !== 0 && x !== 0) return; // 水平移動中不能水平轉向
            if (lastInputDirection.y !== 0 && y !== 0) return; // 垂直移動中不能垂直轉向

            velocity = { x: x, y: y };
        }

        // 鍵盤控制
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    changeDirection(-1, 0);
                    break;
                case 'ArrowUp':
                    changeDirection(0, -1);
                    break;
                case 'ArrowRight':
                    changeDirection(1, 0);
                    break;
                case 'ArrowDown':
                    changeDirection(0, 1);
                    break;
                case ' ':
                    if (!isGameRunning && overlay.classList.contains('hidden')) {
                        // 遊戲中按下空白鍵
                        togglePause();
                    } else if (!isGameRunning) {
                        // 開始畫面
                        startGame();
                    } else {
                        togglePause();
                    }
                    break;
            }
        });

        // 虛擬按鈕控制
        const btnUp = document.getElementById('btnUp');
        const btnDown = document.getElementById('btnDown');
        const btnLeft = document.getElementById('btnLeft');
        const btnRight = document.getElementById('btnRight');

        // 使用 touchstart 以獲得更快的反應速度，避免 300ms 延遲
        const addTouchHandler = (elem, x, y) => {
            elem.addEventListener('touchstart', (e) => {
                e.preventDefault(); // 防止雙擊縮放等默認行為
                changeDirection(x, y);
            }, { passive: false });
            
            // 為了在電腦上測試也可以用滑鼠點
            elem.addEventListener('click', () => changeDirection(x, y));
        };

        addTouchHandler(btnUp, 0, -1);
        addTouchHandler(btnDown, 0, 1);
        addTouchHandler(btnLeft, -1, 0);
        addTouchHandler(btnRight, 1, 0);

        // 開始按鈕
        startBtn.addEventListener('click', () => {
            if (isPaused) {
                togglePause();
            } else {
                startGame();
            }
        });

        // 視窗大小調整時重新計算格子大小 (雖然Canvas大小固定，但為了可能的擴展性)
        window.addEventListener('resize', () => {
            // 目前 Canvas 採用 CSS 固定比例縮放，邏輯無需變更
        });