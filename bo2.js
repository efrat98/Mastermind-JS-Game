

let arrColors = JSON.parse(sessionStorage.getItem("arrColors")) || [];
let currentColors = ['', '', '', ''];
let colorIndex = 0;
let btnIndex = 1;
let tdIndex = 1;
let inPlace = 0;
let notInPlace = 0;
let idInterval;
let timer = 1000;
let numberAgain=0;
// פונקציה לבדוק אם צבע קיים כבר בניחוש הנוכחי
function isColorAlreadySelected(color) {
    return currentColors.includes(color);
}

//צובעת את השורה של בניחושים לפי ניחושי המשתמש
function setColor(color) {
    if (colorIndex < 4) {
        if (isColorAlreadySelected(color)) {
            alert("לא ניתן לבחור את אותו צבע פעמיים בניחוש אחד!");
            return;
        }
        document.getElementById(btnIndex + colorIndex).style.backgroundColor = color;
        currentColors[colorIndex] = color;
        colorIndex++;
    }

}
//מנקה את כל הבחירות
function clearAll(color) {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(i).style.backgroundColor = color;
        currentColors[i - 1] = '';
    }
    colorIndex = 0;
}
//בודקת ניחושים
function check() {
    numberAgain++;
  
    if (numberAgain > 10) {// תנאי לסיום המשחק אחרי 10 ניסיונות
        alert("המשחק הסתיים!");
        stopTimer();// עצירת הטיימר
        return;//סיום המשחק
    }
    
    if (colorIndex === 4) {
        inPlace = 0;
        notInPlace = 0;
        let guessedColors = [...currentColors];// כל הערכים שיש בתוך המערך, ושם אותם אחד-אחד במערך חדש

        // לספור צבעים נכונים במקום הנכון והצבעים הנכונים במקום הלא נכון
        let colorCounts = {};
        arrColors.forEach(c => colorCounts[c] = (colorCounts[c] || 0) + 1);
        
        for (let i = 0; i < 4; i++) {
            if (arrColors[i] === guessedColors[i]) {
                inPlace++;
                colorCounts[arrColors[i]]--;
            }
        }
        
        for (let i = 0; i < 4; i++) {
            if (arrColors[i] !== guessedColors[i] && colorCounts[guessedColors[i]] > 0) {
                notInPlace++;
                colorCounts[guessedColors[i]]--;
            }
        }

        // עדכון הטבלה עם התוצאות
        let resultRow = document.createElement('tr');
        for (let i = 0; i < 4; i++) {
            let td = document.createElement('td');
            td.className = 'tdResults';
            if (arrColors[i] === guessedColors[i]) {
                td.style.backgroundColor = 'red'; // צבע נכון במקום נכון
              
            } else if (arrColors.includes(guessedColors[i])) {
                td.style.backgroundColor = 'orange'; // צבע נכון במקום לא נכון
              
            } else {
                td.style.backgroundColor = 'white'; // צבע לא נמצא בכלל
                
            }
            resultRow.appendChild(td);
        }
        let resultsTable = document.getElementById('tbl1');//הצגת טבלת תוצאות
        resultsTable.appendChild(resultRow);
        
        // יצירת שורת ניסיון שמציגה את 4 הצבעים שניחש המשתמש
let guessRow = document.createElement('tr');

for (let i = 0; i < 4; i++) {
    let tdGuess = document.createElement('td');
    tdGuess.style.height = "1.2cm";
    tdGuess.style.width = "1.2cm";
    tdGuess.style.borderRadius = "10%";         // מרובע
    tdGuess.style.backgroundColor = guessedColors[i];
    tdGuess.style.border = "2px solid black";
    guessRow.appendChild(tdGuess);
}

resultsTable.appendChild(guessRow);

//רבוע הירוק
      
        if (inPlace === 4) {
            window.location = "bo3.html";
        }

        clearAll('white');

    } else {
        alert("נא לבחור 4 צבעים");
    }
      
}

function startTimer() {
    idInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timer--;
    document.getElementById("timer").innerHTML = timer;
    if (timer <= 0) {
        clearInterval(idInterval);
        alert("הזמן נגמר!");
    }
}

function stopTimer() {
    clearInterval(idInterval);
}

function clearTimer() {
    timer =1000;
    document.getElementById("timer").innerHTML = timer;
    startTimer();
}