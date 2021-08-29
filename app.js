let grid = [];
let colors = ['#B4B6C2', '#42B5A6', '#9D600F', '#B92C92', '#FFD203', '#00ABD6', '#018752', '#FF6D00', '#C6D601', '#00457C', '#F3426E'];
let bigBox = document.querySelector('.grid');
let score = document.querySelector('#score');
let resetButton = document.querySelector('#resetGame');
let left = 16;
let currentScore = 0;



let closeGame = (win) => {
    let src = 'defeat.png';
    if(win){
        src = 'victory.png';
    }
    let content = '';
    content += 
        `<div class="modal">
        <div class="win-or-lose">
        <img src=${src} alt="">
        </div>
        <button>Restart</button>
        </div>`;
    bigBox.innerHTML += content;
}
let fillColor = () => {
    let arr = bigBox.children;
    for(let member of arr){
        let num = Number(member.children[0].innerText);
        let pos = 0;
        if(num > 0){
            pos = Math.log2(num);
        }
        member.style.backgroundColor = colors[pos];
    }
    score.innerText = currentScore;
}
let checkMoves = () => {
    let ok = false;
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            let val = grid[4 * i + j];
            if(i + 1 < 4 && grid[4 * (i + 1) + j] === val){
                ok = true;
            }
            if(i - 1 >= 0 && grid[4 * (i - 1) + j] === val){
                ok = true;
            }
            if(j + 1 < 4 && grid[4 * i + j + 1] === val){
                ok = true;
            }
            if(j - 1 >= 0 && grid[4 * i + j - 1] === val){
                ok = true;
            }
        }
    }
    if(ok === false){
        closeGame(false);
    }
    console.log(ok);
}
let generateGrid = () => {
    
    for(let i = 0; i < 4 * 4; i++){
        let newDiv = document.createElement('div');
        newDiv.classList.add('box');
        let newText = document.createElement('p');
        newText.innerText = '0';
        newText.classList.add('value-text');
        newDiv.appendChild(newText);
        bigBox.appendChild(newDiv);
        grid.push(0);
    }
}
let randomFill = () => {
    let num = Math.floor(Math.random() * 16);
    if(grid[num] !== 0){
        randomFill();
    }else{
        grid[num] = 2;
        bigBox.children[num].children[0].innerText = '2';
        left--;
        fillColor();
        if(left === 0){
            checkMoves();
        }
    }
}
generateGrid();
randomFill();
randomFill();
let moveRight = () => {
    let ok = false;
    for(let i = 0; i < 4; i++){
        for(let j = 3; j >= 0; j--){
            let k = j;
            while(k + 1 < 4 && grid[4 * i + k + 1] === 0){
                let val = grid[4 * i + k];
                grid[4 * i + k + 1] = val;
                grid[4 * i + k] = 0;

                bigBox.children[4 * i + k + 1].children[0].innerText = val;
                bigBox.children[4 * i + k].children[0].innerText = '0'
                k++;
                if(val > 0){
                    ok = true;
                }
            }

            if(k + 1 < 4 && grid[4 * i + k + 1] === grid[4 * i + k]){
                let val = grid[4 * i + k];
                if(val === 1024){
                    closeGame(true);
                }
                grid[4 * i + k + 1] = val * 2;
                currentScore += val * 2;
                grid[4 * i + k] = 0;

                bigBox.children[4 * i + k + 1].children[0].innerText = val * 2;
                bigBox.children[4 * i + k].children[0].innerText = '0'
                left++;
                if(val > 0){
                    ok = true;
                }
            }
        }
    }
    fillColor();
    return ok;
}
let moveLeft = () => {
    let ok = false;
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            let k = j;
            
            while(k - 1 >= 0 && grid[4 * i + k - 1] === 0){
                let val = grid[4 * i + k];
                grid[4 * i + k - 1] = val;
                grid[4 * i + k] = 0;

                bigBox.children[4 * i + k - 1].children[0].innerText = val;
                bigBox.children[4 * i + k].children[0].innerText = '0'
                k--;
                if(val > 0){
                    ok = true;
                }
            }

            if(k - 1 >= 0 && grid[4 * i + k - 1] === grid[4 * i + k]){
                let val = grid[4 * i + k];
                if(val === 1024){
                    closeGame(true);
                }
                
                grid[4 * i + k - 1] = val * 2;
                currentScore += val * 2;
                grid[4 * i + k] = 0;

                bigBox.children[4 * i + k - 1].children[0].innerText = val * 2;
                bigBox.children[4 * i + k].children[0].innerText = '0'
                left++;
                if(val > 0){
                    ok = true;
                }
            }
        }
    }
    fillColor();
    return ok;
}
let moveUp = () => {
    let ok = false;
    for(let j = 0; j < 4; j++){
        for(let i = 0; i < 4; i++){
            let k = i;
            while(k - 1 >= 0 && grid[4 * (k - 1) + j] === 0){
                let val = grid[4 * k + j];
                grid[4 * (k - 1) + j] = val;
                grid[4 * k + j] = 0;
        
                bigBox.children[4 * (k - 1) + j].children[0].innerText = val;
                bigBox.children[4 * k + j].children[0].innerText = '0'
                k--;
                if(val > 0){
                    ok = true;
                }
            }
            if(k - 1 >= 0 && grid[4 * (k - 1) + j] === grid[4 * k + j]){
                let val = grid[4 * k + j];
                if(val === 1024){
                    closeGame(true);
                }
                grid[4 * (k - 1) + j] = val * 2;
                currentScore += val * 2;

                grid[4 * k + j] = 0;
        
                bigBox.children[4 * (k - 1) + j].children[0].innerText = val * 2;
                bigBox.children[4 * k + j].children[0].innerText = '0'
                left++;
                if(val > 0){
                    ok = true;
                }
            }

        }
    }
    fillColor();
    return ok;
}
let moveDown = () => {
    let ok = false;
    for(let j = 0; j < 4; j++){
        for(let i = 3; i >= 0; i--){
            let k = i
            while(k + 1 < 4 && grid[4 * (k + 1) + j] === 0){
                let val = grid[4 * k + j];
                grid[4 * (k + 1) + j] = val;
                grid[4 * k + j] = 0;
        
                bigBox.children[4 * (k + 1) + j].children[0].innerText = val;
                bigBox.children[4 * k + j].children[0].innerText = '0'
                k++;
                if(val > 0){
                    ok = true;
                }
            }
            if(k + 1 < 4 && grid[4 * (k + 1) + j] === grid[4 * k + j]){
                let val = grid[4 * k + j];
                if(val === 1024){
                    closeGame(true);
                }
                grid[4 * (k + 1) + j] = val * 2;
                currentScore += val * 2;

                grid[4 * k + j] = 0;
        
                bigBox.children[4 * (k + 1) + j].children[0].innerText = val * 2;
                bigBox.children[4 * k + j].children[0].innerText = '0'
                left++;
                if(val > 0){
                    ok = true;
                }
            }

        }
    }
    fillColor();
    return ok;
}

window.addEventListener('keydown', (e) => {
    let ok = false;
    if(e.key === 'ArrowRight'){
        ok = moveRight();
    }else if(e.key === 'ArrowLeft'){
        ok = moveLeft();
    }else if(e.key === 'ArrowUp'){
        ok = moveUp();
    }
    else if(e.key === 'ArrowDown'){
        ok = moveDown(); 
    }else{
        fillColor();
    }

    if(ok === true){
        randomFill();
    }    
})

let resetGame = () => {
    currentScore = 0;
    generateGrid();
    randomFill();
    randomFill();

}
resetButton.addEventListener('click', () => {
    bigBox.innerHTML = '';
    left = 16;
    grid = [];
    resetGame();
})

bigBox.addEventListener('click', (e) => {
    if(e.target.nodeName === 'BUTTON'){
        bigBox.innerHTML = '';
        left = 16;
        grid = [];
        resetGame();
    }
})