const ans = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "game over";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:50vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let correct = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const input = block.innerText;
      const rightAns = ans[i];

      if (input === rightAns) {
        correct += 1;
        block.style.background = "#6AAA64";
      } else if (ans.includes(input)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";

      block.style.color = "white";
    }
    if (correct === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;

    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const now = new Date();
      const past = new Date(now - startTime);
      const min = past.getMinutes().toString().padStart(2, "0");
      const sec = past.getSeconds().toString().padStart(2, "0");
      const timerDiv = document.querySelector("#timer");
      timerDiv.innerText = `${min}:${sec}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
