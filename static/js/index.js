let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayCorrect = () => {
    const div = document.createElement("div");
    div.innerText = "Correct";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:42vw; background-color:white; width:250px; height:50px; border-radius: 5px; font-weight: bold; font-size: 30px;";
    div.animate(
      [
        // keyframes
        { transform: "translateY(0px)" },
        { transform: "translateY(-300px)" },
      ],
      {
        // timing options
        duration: 1000,
        iterations: Infinity,
      }
    );
    document.body.appendChild(div);
  };

  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "Gameover";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:42vw; background-color:white; width:250px; height:50px; border-radius: 5px; font-weight: bold; font-size: 30px;";
    div.animate(
      [
        // keyframes
        { transform: "translateY(0px)" },
        { transform: "translateY(-300px)" },
      ],
      {
        // timing options
        duration: 1000,
        iterations: Infinity,
      }
    );
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const correctAns = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayCorrect();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 5) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = async () => {
    let correct = 0;

    //서버에서 정답을 받아오는 코드
    const 응답 = await fetch("/answer");
    const ans = await 응답.json();

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const input = block.innerText;

      const keyblock = document.querySelector(
        `.keyboard-column[data-key='${input}']`
      );

      const rightAns = ans[i];

      if (input === rightAns) {
        correct += 1;
        block.style.background = "#6AAA64";
        keyblock.style.background = "#6AAA64";
      } else if (ans.includes(input)) {
        block.style.background = "#C9B458";
        keyblock.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
        keyblock.style.background = "#787C7E";
      }

      block.style.color = "white";
      keyblock.style.color = "white";
    }
    if (correct === 5) correctAns();
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
