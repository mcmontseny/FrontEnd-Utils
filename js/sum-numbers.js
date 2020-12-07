// ---- SUM NUMBERS TOOLS ---- //

// Set Variables
const sumNumInput = document.getElementById("sum-num-input");
const divResults = document.getElementById("sum-results");
const totalNum = document.getElementById("result-total-num");
const sumNum = document.getElementById("result-sum-num");
const aveNum = document.getElementById("result-ave-num");

// Sum all numbers
function sumNumCalc() {
  try {
    divResults.hidden = true;

    let numArray = sumNumInput.value.replace(/[^\d.]/g, ' ').split(' ');
    numArray = numArray.filter((el) => el !== "").map((el) => +el);

    if (numArray.length > 0) {
      totalNum.innerHTML = numArray.length;
      sumNum.innerHTML = numArray.reduce((total, num) => total + num, 0);

      const ave = sumNum.innerHTML / totalNum.innerHTML;
      // aveNum.innerHTML = Math.round(ave) === ave ? ave : ave.toFixed(2);
      aveNum.innerHTML = Math.round(ave*100)/100;
      divResults.hidden = false;
    } else {
      alert("Error to sum numbers. Check Input values.");
    }
  } catch (error) {
    alert("Error to sum numbers. Check Input values.");
  }
}

// Clear textArea Input
function sumNumClear() {
  sumNumInput.value = "";
}
