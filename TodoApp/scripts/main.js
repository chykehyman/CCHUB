// *** All ID variable declarations and initializations *** //
const divValue = document.getElementById('todo');
const errorDiv = document.getElementById('error');
const clear = document.getElementById("clear");
const add = document.getElementById("add");
const totalActivity = document.getElementById('total');
const completed = document.getElementById('completed');
const table = document.getElementById('table');
const tableBody = document.getElementById('tbody');
const noActivityMsgDiv = document.getElementById('noActivityMsg');
//******************************************************************//

//*** All Number Datatype declarations and initializations ***//
let i = null;
let totalActivityTracker = 0;
let completedTracker = 0;
//******************************************************************//

//***** Function to clear no inputed activity error messages *****//
//*** Check implementation at bottom of page ***// 
const clearError = function() {
    errorDiv.innerHTML = "";
};

const clearFunc = function() {
    if (divValue && divValue.value != "") {
        divValue.value = "";
        errorDiv.innerHTML = "";
    }
};
//******************************************************************//

//*** Function to initially display 'No Activity Recorded Yet' messages ***//
const displayNoActivityMsg = function(number) {
    if (number == 0) {
        noActivityMsgDiv.innerHTML = " **No Activity Recorded Yet** ";
    } else { noActivityMsgDiv.innerHTML = ""; }
}

window.onload = displayNoActivityMsg(totalActivityTracker);
//**********************************************************************//

//*** Function to add todo activity to the My Todo Activities Board ***//
const addFunc = function() {
    if (divValue.value != "") {
        if (divValue.value.length != 1) {
            let rowCount = table.rows.length;
            let newRow = table.insertRow(rowCount);
            let createdRow = tableBody.appendChild(newRow);
            let doneButton = '<button type="button" onclick="doneFunc(this);" class="btn btn-sm btn-success"><i class="fa fa-check-square-o"></i>Done</button>';
            let deleteButton = `<button id="${rowCount - 1}" type="button" onclick="deleteFunc(this);" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i>Delete</button>`;
            let editButton = '<button type="button" onclick="editFunc(this);" class="btn btn-sm btn-info"><i class="fa fa-pencil-square-o"></i>Edit</button>';
            createdRow.innerHTML = `<td style="text-align:left; flex-wrap: wrap;">${divValue.value}</td><td style= "display: flex;justify-content: space-around; border-bottom:0;">${editButton + deleteButton + doneButton}</td>`;

            divValue.value = "";
            totalActivityTracker += 1;
            totalActivity.innerHTML = totalActivityTracker;
            displayNoActivityMsg(totalActivityTracker);
            errorDiv.innerHTML = "<em style='color:green;'>**New todo activity has been added**</em>";
        } else { errorDiv.innerHTML = "<em>*activity length must be greater than one</em>"; }
    } else { errorDiv.innerHTML = "<em>*activity input field is empty</em>"; }
};
//****************************************************************************************************************************************************************************************************************************************//

//*** Function to delete todo activity from the My Todo Activities Board ***//
const deleteFunc = function(row) {
    i = Number(row.id);
    tableBody.removeChild(tableBody.childNodes[i]);
    errorDiv.innerHTML = "";
    totalActivityTracker -= 1;
    displayNoActivityMsg(totalActivityTracker);
    totalActivity.innerHTML = totalActivityTracker;
};
//****************************************************************************//

//*** Function to edit a particular todo activity in the My Todo Activities Board ***//
const editFunc = function(row) {
    let textFieldElement = row.parentNode.parentNode.childNodes[0];
    let textFieldValue = row.parentNode.parentNode.childNodes[0].innerHTML;
    let editButton = row.disabled = true;
    errorDiv.innerHTML = "";
    let button = `<div class="input-group-btn"><button id="save" type="button" onclick="saveFunc(this);" class="btn btn-sm btn-info">Save</button></div>`;
    inputField = `<input type="text" class="form-control input-sm" value=${textFieldValue}>`;
    textFieldElement.innerHTML = "";
    textFieldElement.innerHTML += `<div class="input-group">${button}${inputField}</div><div></div>`;
};
//***************************************************************************************************************************************************************//

//*** Function to save an edited todo activity in the My Todo Activities Board ***//
const saveFunc = function(row) {
    let savefieldElement = row.parentNode.parentNode.parentNode;
    let savefieldvalue = row.parentNode.parentNode.childNodes[1].value;
    let errorDiv = row.parentNode.parentNode.parentNode.childNodes[1];
    if (savefieldvalue != "") {
        savefieldElement.innerHTML = "";
        savefieldElement.innerHTML += savefieldvalue;
        if (savefieldElement.innerHTML == savefieldvalue) {
            let editButton = savefieldElement.parentNode.childNodes[1].childNodes[0];
            editButton.disabled = false;
        } else { return false; }

    } else {
        errorDiv.innerHTML = "";
        errorDiv.innerHTML += "<em style='margin-left:6px; color: brown;'>*Field must not be empty</em>";
    }
};
//**************************************************************************************************************//

//*** Function to check a todo activity as completed ***//
const doneFunc = function(row) {
    let allButtons = row.parentNode.childNodes;
    let buttonslength = row.parentNode.childNodes.length;
    allButtons.forEach(function(button) {
        button.disabled = true;
    });
    completedTracker += 1;
    completed.innerHTML = completedTracker;
};
//****************************************************************************//

//*** onClick and onFocus Event Listeners for add button, clear button and todo activity input field ***//
if (clear.addEventListener) { // For all major browsers, except IE 8 and earlier
    clear.addEventListener("click", clearFunc);
} else if (clear.attachEvent) { // For IE 8 and earlier versions
    clear.attachEvent("onclick", clearFunc);
}

if (add.addEventListener) { // For all major browsers, except IE 8 and earlier
    add.addEventListener("click", addFunc);
} else if (add.attachEvent) { // For IE 8 and earlier versions
    add.attachEvent("onclick", addFunc);
}

if (divValue.addEventListener) { // For all major browsers, except IE 8 and earlier
    divValue.addEventListener("focus", clearError);
} else if (divValue.attachEvent) { // For IE 8 and earlier versions
    divValue.attachEvent("onfocus", clearError);
}
//********************************************************************************************************//