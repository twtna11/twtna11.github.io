const boardElement = document.getElementById('board');
        const statusElement = document.getElementById('status');
        const cells = document.querySelectorAll('.cell');
        
        let currentPlayer = 'X';
        let gameState = ["", "", "", "", "", "", "", "", ""];
        let gameActive = true;

        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // 橫向
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縱向
            [0, 4, 8], [2, 4, 6]             // 斜向
        ];

        function handleCellClick(e) {
            const clickedCell = e.target;
            const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

            if (gameState[clickedIndex] !== "" || !gameActive) return;

            updateCell(clickedCell, clickedIndex);
            checkResult();
        }

        function updateCell(cell, index) {
            gameState[index] = currentPlayer;
            cell.innerText = currentPlayer;
            cell.classList.add(currentPlayer.toLowerCase(), 'taken');
        }

        function checkResult() {
            let roundWon = false;
            let winningCells = [];

            for (let condition of winningConditions) {
                const [a, b, c] = condition;
                if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                    roundWon = true;
                    winningCells = [a, b, c];
                    break;
                }
            }

            if (roundWon) {
                statusElement.innerText = `恭喜！玩家 ${currentPlayer} 獲勝！`;
                highlightWinner(winningCells);
                gameActive = false;
                return;
            }

            if (!gameState.includes("")) {
                statusElement.innerText = "平手！";
                gameActive = false;
                return;
            }

            // 切換玩家
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusElement.innerText = `輪到 ${currentPlayer} 玩家`;
        }

        function highlightWinner(indices) {
            indices.forEach(index => {
                cells[index].classList.add('winner-line');
            });
        }

        function resetGame() {
            currentPlayer = 'X';
            gameState = ["", "", "", "", "", "", "", "", ""];
            gameActive = true;
            statusElement.innerText = `輪到 X 玩家`;
            cells.forEach(cell => {
                cell.innerText = "";
                cell.className = 'cell';
            });
        }

        cells.forEach(cell => cell.addEventListener('click', handleCellClick));