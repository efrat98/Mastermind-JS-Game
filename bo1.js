const arrColors = ['', '', '', ''];
let colorIndex = 0;

function setColor(color) {//שולח את הצבעים
    if (colorIndex < 4) {
        if (arrColors.includes(color) && arrColors[colorIndex] === '') {
            alert("לא ניתן לבחור את אותו הצבע פעמיים");
        } else {
            arrColors[colorIndex] = color;
            document.getElementById(colorIndex + 1).style.backgroundColor = color;//ממלא את הצבעים
            colorIndex++;
        }
    }
}

function clearAll(color) {
    for (var i = 1; i <= 4; i++) {
        document.getElementById(i).style.backgroundColor = color;
        arrColors[i - 1] = '';
    }
    colorIndex = 0;
}
//אחרי הקשה על כפתור התחל משחק :אם נבחרו 4 צבעים עובר לדף השני אם לא שולח הודעה לבחור 4 צבעים
function clearTheScreen() {
    if (colorIndex >= 4) {
        sessionStorage.setItem("arrColors", JSON.stringify(arrColors));//ממיר לסרינג בלוקל סטורג
        window.location = "bo2.html";
    } else {
        alert("נא לבחור 4 צבעים");
    }
}
function showInstructions() {
    // מנווט את הדפדפן לדף ההוראות
    window.location.href = "boo.html"; 
    
}