// let boxes = document.querySelectorAll(".box");
// let resetId = document.querySelector("#reset-id");
// let newBtn = document.querySelector("#newBtn");
// let msgContainer = document.querySelector(".msgContainer");
// let msg = document.querySelector("#msg");   

// let turnO = true;// player O/player X
// let count = 0;
// // let arr = ["apple", "banana", "litchi"];   // 1D arrray

// // let arr2 = [["apple", "litchi"], ["banana", "mushroom"], ["pants", "shirt"]];  //2D array

// const winPatterns = [

//     [0, 1, 2],
//     [0, 3, 6],
//     [0, 4, 8],
//     [1, 4, 7],
//     [2, 5, 8],
//     [2, 4, 6],
//     [3, 4, 5],
//     [6, 7, 8]
    
// ];

// const resetGame = () => {
//     turnO = true;
//     count = 0;
//     enableBoxes();
//     msgContainer.classList.add("hide");
    
// }

// boxes.forEach((box) => {
//     box.addEventListener("click", () => {
//         // console.log("button was clicked");
//         // box.innerText = "ABCD";
//         if (turnO) {

//             box.style.color = "black";
//             box.innerText="O";
//             turnO = false;

//         }
//         else {
//             box.style.color = "pink";
//             box.innerText = "X";
//             turnO = true;
//         }

//         box.disabled = true;
//         count++;

//         let isWinner = checkWinner();
        
//         if (count === 9 && !isWinner) {
//             drawGame();
//         }

//     });

// }); 

// const disableBoxes = () => {
//     for (let box of boxes) {
//         box.disabled = true;
//     }
// };

// const enableBoxes = () => {
//     for (let box of boxes) {
//         box.disabled = false;
//         box.innerText = "";
//     }
// };

// const showWinner = (winner) => {
//     msg.innerText = `Congrats, winner is ${winner}`;
//     msgContainer.classList.remove("hide");
//     disableBoxes();
    
// };

// const drawGame = () => {

//     msg.innerText = "Game was draw";
//     msgContainer.classList.remove("hide");
//     disableBoxes();

      
// };

// const checkWinner = () => {
//     for (let pattern of winPatterns) {
//         // console.log(pattern);
//         // console.log(pattern[0], pattern[1], pattern[2]);

//         // console.log(
//         //     boxes[pattern[0]].innerText,
//         //     boxes[pattern[1]].innerText,
//         //     boxes[pattern[2]].innerText
//         // );

//         let pos1Val = boxes[pattern[0]].innerText;
//         let pos2Val = boxes[pattern[1]].innerText;
//         let pos3Val = boxes[pattern[2]].innerText;

//         if ((pos1Val === pos2Val && pos2Val === pos3Val) && (pos1Val === "O" || pos1Val==="X")) {

//             console.log(`Winner is ${pos1Val}`);
//             showWinner(pos1Val);
//             // return true;
            
//         }
        
//     }

// };


// newBtn.addEventListener("click", resetGame);
// resetId.addEventListener("click", resetGame);

// // const reset = () => {
// //     checkWinner();
// // };

let boxes = document.querySelectorAll(".box");
let resetId = document.querySelector("#reset-id");
let newBtn = document.querySelector("#newBtn");
let undoBtn = document.querySelector("#undoBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");
let wins = document.querySelector("#wins");
let losses = document.querySelector("#losses");
let draws = document.querySelector("#draws");

let turnO = true;
let count = 0;
let gameHistory = [];

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    gameHistory = [];
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.style.color = "#0074D9";
            box.innerText = "O";
            turnO = false;
        } else {
            box.style.color = "#FF4136";
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;
        gameHistory.push(index);

        let isWinner = checkWinner();

        if (isWinner) {
            let winner = isWinner === "O" ? "O" : "X";
            updateStats(winner);
            disableBoxes();
            msgContainer.classList.remove("hide");
            msg.innerText = `${winner} Wins!`;
            showConfetti();
        } else if (count === 9) {
            updateStats("Draw");
            msgContainer.classList.remove("hide");
            msg.innerText = "Draw!";
        }
    });
});

undoBtn.addEventListener("click", () => {
    if (gameHistory.length > 0) {
        let lastMove = gameHistory.pop();
        boxes[lastMove].innerText = "";
        boxes[lastMove].disabled = false;
        turnO = !turnO;
        count--;
    }
});

const checkWinner = () => {
    let grid = Array.from(boxes).map(box => box.innerText);
    for (let pattern of winPatterns) {
        if (grid[pattern[0]] && grid[pattern[0]] === grid[pattern[1]] && grid[pattern[1]] === grid[pattern[2]]) {
            return grid[pattern[0]];
        }
    }
    return null;
}

const updateStats = (result) => {
    if (result === "O") {
        wins.innerText = parseInt(wins.innerText) + 1;
    } else if (result === "X") {
        losses.innerText = parseInt(losses.innerText) + 1;
    } else {
        draws.innerText = parseInt(draws.innerText) + 1;
    }
}

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
}

const enableBoxes = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
}

const showConfetti = () => {
    let confettiContainer = document.createElement("div");
    confettiContainer.classList.add("confetti-container");

    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = `${Math.random() * 100}vw`;
        confettiContainer.appendChild(confetti);
    }

    document.body.appendChild(confettiContainer);

    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

resetId.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
