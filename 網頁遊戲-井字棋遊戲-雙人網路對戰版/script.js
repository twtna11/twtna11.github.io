let peer, conn;
        let mySymbol = ''; // 'X' 或 'O'
        let currentPlayer = 'X';
        let gameState = Array(9).fill("");
        let gameActive = false;

        const statusEl = document.getElementById('status');
        const boardEl = document.getElementById('board');
        const cells = document.querySelectorAll('.cell');

        // --- 連線邏輯 ---
        function initPeer() {
            peer = new Peer();
            peer.on('open', id => {
                document.getElementById('peer-id-display').innerText = id;
            });
            peer.on('connection', c => {
                conn = c;
                mySymbol = 'X'; // 房主是 X
                setupChat();
                startGame();
            });
        }

        function createRoom() {
            document.getElementById('step1').style.display = 'none';
            document.getElementById('step2').style.display = 'block';
            initPeer();
        }

        function joinRoom() {
            const id = document.getElementById('join-id').value;
            if (!id) return alert("請輸入 ID");
            peer = new Peer();
            peer.on('open', () => {
                conn = peer.connect(id);
                mySymbol = 'O'; // 加入者是 O
                setupChat();
                startGame();
            });
        }

        function setupChat() {
            conn.on('open', () => {
                document.getElementById('setup').style.display = 'none';
                statusEl.innerText = "連線成功！遊戲開始。";
            });
            conn.on('data', data => {
                if (data.type === 'move') {
                    handleRemoteMove(data.index);
                }
            });
        }

        // --- 遊戲邏輯 ---
        function startGame() {
            gameActive = true;
            boardEl.style.display = 'grid';
            updateStatusText();
        }

        function handleCellClick(e) {
            const idx = e.target.getAttribute('data-index');
            if (gameState[idx] !== "" || !gameActive || currentPlayer !== mySymbol) return;

            // 執行本地移動
            executeMove(idx, mySymbol);
            
            // 傳送給對方
            conn.send({ type: 'move', index: idx });
        }

        function handleRemoteMove(idx) {
            const opponentSymbol = mySymbol === 'X' ? 'O' : 'X';
            executeMove(idx, opponentSymbol);
        }

        function executeMove(idx, symbol) {
            gameState[idx] = symbol;
            cells[idx].innerText = symbol;
            cells[idx].classList.add(symbol.toLowerCase(), 'taken');
            
            if (checkWin()) {
                statusEl.innerText = symbol === mySymbol ? "你贏了！" : "你輸了！";
                gameActive = false;
            } else if (!gameState.includes("")) {
                statusEl.innerText = "平手！";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                updateStatusText();
            }
        }

        function updateStatusText() {
            if (!gameActive) return;
            statusEl.innerText = currentPlayer === mySymbol ? "輪到你了！" : "等待對方下棋...";
        }

        function checkWin() {
            const winPaths = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
            for (let p of winPaths) {
                if (gameState[p[0]] && gameState[p[0]] === gameState[p[1]] && gameState[p[0]] === gameState[p[2]]) {
                    p.forEach(i => cells[i].classList.add('winner-line'));
                    return true;
                }
            }
            return false;
        }

        cells.forEach(cell => cell.addEventListener('click', handleCellClick));