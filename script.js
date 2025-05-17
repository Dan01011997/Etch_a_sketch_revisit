let board = document.querySelector(".board");
//functionality buttons
const sketchBoard = document.querySelector(".sketchboard");
let grid = document.querySelector(".grid");
let colorSpace = document.querySelector(".colorPalette").children;
let colorArray=Array.from(colorSpace);
let erase = document.querySelector(".erase");
colorArray.push(erase);
let clear = document.querySelector(".clear");
let boardSizeout;
//set marker state
let state = "";
//functionality event listeners
grid.addEventListener("click", () => {
  takeInput();
  resetBoard();
});
for (let elem of colorArray) {
  elem.addEventListener("click", (e) => {
    if (boardSizeout) {
      if (state.includes("marker") && state.includes(e.target.className)) {
        e.target.style.backgroundColor = "rgba(179, 179, 179, 0.757)";
        e.target.style.color = "rgb(255, 253, 250)";

        state = "";
      } else {
        if (state.includes("marker")) {
          document.getElementsByClassName(state.slice(6))[0].style.backgroundColor = "rgba(179, 179, 179, 0.757)";
          document.getElementsByClassName(state.slice(6))[0].style.color = "rgb(255, 253, 250)";

        }

        state = "marker" + e.target.className;
        e.target.style.backgroundColor = "white";
        e.target.style.color="black"
      }
    }
  });
}
clear.addEventListener("click",resetBoard);
let sketchNodes = document.querySelector(".sketchNode");
function takeInput() {
  const boardSize = parseInt(prompt("Enter Board Size:(03-100)"), 10);
  if (boardSize && typeof boardSize === "number") {
    if (boardSize < 3 || boardSize > 100) {
      alert("enter valid size");

      return takeInput();
    } else {
      boardSizeout = boardSize;
      console.log(boardSizeout);
      return boardSize;
    }
  } else {
    alert("enter valid size");
    return takeInput();
  }
}
function resetBoard() {
  if (sketchBoard.firstElementChild.firstElementChild) {
    sketchBoard.removeChild(sketchBoard.firstElementChild);
    console.log(sketchBoard.firstElementChild);
    board = document.createElement("div");
    sketchBoard.appendChild(board);
    board.setAttribute("class", "board");

    makeUI(board);
  } else {
    makeUI(board);
  }
}

function makeUI(sboard) {
  let divSize = Math.floor((sboard.offsetHeight / boardSizeout) * 100) / 100;
  for (let i = 0; i < boardSizeout * boardSizeout; i++) {
    const div = document.createElement("div");
    div.style.width = divSize - 0.002 * divSize + "px";
    div.style.height = divSize - 0.002 * divSize + "px";
    sboard.appendChild(div);

    div.className = "sketchNode";
    div.setAttribute("id", ` #${i}`);
    // div.style.backgroundColor=`rgb(0,0,0)`;
    div.style.opacity = "0.25";

    div.addEventListener("mousedown", (e) => {
      if (state.includes("marker")) {
        console.log(state);
        sboard.addEventListener("mousemove", makeSketch);
      } else {
        console.log("hey");
        return;
      }
    });
  }
}
function makeSketch(event) {
  event.preventDefault();
  if (event.buttons === 0) {
    board.removeEventListener("mousemove", makeSketch);
    return;
  }

  if (event.target.className === "sketchNode") {
    event.target.style.backgroundColor = `rgb(${sketchColor()},${sketchColor()},${sketchColor()})`;
    const currentOpacity = getComputedStyle(event.target).getPropertyValue("opacity");
    if(state.includes("erase"))
    {
      console.log("hey")
      event.target.style.opacity="1";
      return;
    }
    event.target.style.opacity = `${changeOpacity(currentOpacity,event.target.id
    )}`;
  }
}

function changeOpacity(prevOpac, elem) {
  //console.log(prevOpac + elem);
  prevOpac = parseFloat(prevOpac) + 0.1;
  return prevOpac;
}
function sketchColor() {
  let value;
  if (state.includes("pencil")) value = 128;
  else if (state.includes("rainbow")) value = Math.floor(Math.random() * 255);
  else if(state.includes("erase"))
    value=244;
  return value;
}
