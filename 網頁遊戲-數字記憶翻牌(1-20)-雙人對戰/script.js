const gameBoard = document.getElementById('gameBoard');
        const panelBlue = document.getElementById('panel-blue');
        const panelRed = document.getElementById('panel-red');
        const scoreElBlue = document.getElementById('score-blue');
        const scoreElRed = document.getElementById('score-red');

        let cards = [];
        let hasFlippedCard = false;
        let lockBoard = false;
        let firstCard, secondCard;
        let matchesFound = 0;
        const totalPairs = 20;

        let currentPlayer = 'blue'; 
        let scores = { blue: 0, red: 0 };

        function initGame() {
            cards = [];
            matchesFound = 0;
            hasFlippedCard = false;
            lockBoard = false;
            firstCard = null;
            secondCard = null;
            
            scores.blue = 0;
            scores.red = 0;
            scoreElBlue.innerText = '0';
            scoreElRed.innerText = '0';
            
            currentPlayer = 'blue';
            updateTurnVisuals();

            gameBoard.innerHTML = '';
            
            let numbers = [];
            for (let i = 1; i <= 20; i++) {
                numbers.push(i);
                numbers.push(i);
            }

            shuffle(numbers);

            numbers.forEach(number => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.dataset.number = number;

                card.innerHTML = `
                    <div class="card-front">${number}</div>
                    <div class="card-back">?</div>
                `;

                card.addEventListener('click', flipCard);
                gameBoard.appendChild(card);
            });
        }

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function flipCard() {
            if (lockBoard) return;
            if (this === firstCard) return;

            this.classList.add('flip');

            if (!hasFlippedCard) {
                hasFlippedCard = true;
                firstCard = this;
                return;
            }

            secondCard = this;
            checkForMatch();
        }

        function checkForMatch() {
            let isMatch = firstCard.dataset.number === secondCard.dataset.number;

            if (isMatch) {
                disableCards();
            } else {
                unflipCards();
            }
        }

        function disableCards() {
            scores[currentPlayer]++;
            updateScoreDisplay();

            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);

            // 延遲一下讓玩家看清楚配對成功
            setTimeout(() => {
                // 加入 hidden class 觸發 CSS opacity transition
                firstCard.classList.add('hidden');
                secondCard.classList.add('hidden');
                
                resetBoard();
                
                matchesFound++;
                if (matchesFound === totalPairs) {
                    declareWinner();
                }
                // 配對成功不換人
            }, 800);
        }

        function unflipCards() {
            lockBoard = true;

            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                
                resetBoard();
                switchTurn(); 
            }, 1000);
        }

        function resetBoard() {
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        }

        function switchTurn() {
            currentPlayer = currentPlayer === 'blue' ? 'red' : 'blue';
            updateTurnVisuals();
        }

        function updateTurnVisuals() {
            if (currentPlayer === 'blue') {
                panelBlue.classList.add('active');
                panelRed.classList.remove('active');
            } else {
                panelRed.classList.add('active');
                panelBlue.classList.remove('active');
            }
        }

        function updateScoreDisplay() {
            scoreElBlue.innerText = scores.blue;
            scoreElRed.innerText = scores.red;
        }

        function declareWinner() {
            // 延遲 0.6 秒等待最後的卡片消失動畫完成
            setTimeout(() => {
                let msg = '';
                if (scores.blue > scores.red) {
                    msg = `🎉 遊戲結束！藍方獲勝！ (比分 ${scores.blue} : ${scores.red})`;
                } else if (scores.red > scores.blue) {
                    msg = `🎉 遊戲結束！紅方獲勝！ (比分 ${scores.red} : ${scores.blue})`;
                } else {
                    msg = `🤝 遊戲結束！雙方平手！ (比分 ${scores.blue} : ${scores.red})`;
                }
                alert(msg);
            }, 600);
        }

        initGame();