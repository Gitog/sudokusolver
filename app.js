const puzzleBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve-button");
const solutionDisplay = document.querySelector("#solution")

const squares = 81;
const submission = [];

for (let i = 0; i < squares; i++) {
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("min", "0");
  inputElement.setAttribute("max", "9");
  if(
    ((1 % 9 == 0 || i % 9 == 2) && i < 21) ||
    ((1 % 9 == 6 || i % 9 == 8) && i < 27) ||
    ((1 % 9 == 3 || i % 9 == 5) && (i > 27 &&  i < 53)) ||
    ((1 % 9 == 0 || i % 9 == 2) && i < 53) ||
    ((1 % 9 == 6 || i % 9 == 8) && i < 53) 
  ){
    inputElement.classList.add('odd-section')
  }
  puzzleBoard.appendChild(inputElement);
}

const joinValues = () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value) {
      submission.push(input.value);
    } else {
      submission.push(".");
    }
  });

    console.log(submission);
};

const populateValues = (isSolvable) => {
    const inputs = document.querySelectorAll('input');
    if(isSolvable && solution){
        inputs.forEach((input,i) => {
            input.value = solution[i];
        });
        solutionDisplay.innerHTML = "This is the answer"
    }else{
        solutionDisplay.innerHTML = "This is not solvable"

    }
};

const solve = () => {
  joinValues();
  const data = submission.join('');
  console.log("data", data);
  const options = {
    method: "POST",
    url: "https://sudoku-solver3.p.rapidapi.com/sudokusolver/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.SUDOKU_API_KEY,
      "X-RapidAPI-Host": "sudoku-solver3.p.rapidapi.com",
    },
    data:data,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      populateValues(response.data.solvable, response.data.solution)
    })
    .catch(function (error) {
      console.error(error);
    });
};

solveButton.addEventListener("click", solve);
