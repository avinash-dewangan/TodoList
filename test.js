showTask();
let addInputTask = document.getElementById("inputbox")
let addTask = document.getElementById("addTask")

addTask.addEventListener("click", () => {
    addInputTaskVal = addInputTask.value;
    if (addInputTaskVal.trim() != 0) {
        let webTask = localStorage.getItem("localtask");
        if (webTask === null) {
            taskObj = []
        } else {
            taskObj = JSON.parse(webTask);
        }
        taskObj.push(addInputTaskVal);
        localStorage.setItem("localtask", JSON.stringify(taskObj));
    }
    addInputTask.value = "";
    showTask()
})

function showTask() {
    let webTask = localStorage.getItem("localtask");
    if (webTask === null) {
        taskObj = []
    } else {
        taskObj = JSON.parse(webTask);
    }
    let html = "";
    let taskList = document.getElementById("taskList");
    taskObj.forEach((item, index) => {
        html += `<tr>
        <td>${index + 1}</td>
        <td>${item}</td>
        <td><i class="fa fa-edit" onclick="edittask(${index})"></i></td>
        <td><i class="fa fa-trash-o" style="color:red" onclick="deletetask(${index})"></td>
      </tr>`;
    });

    taskList.innerHTML = html;
}


//edit task
function edittask(index) {
    let addTaskbtn = document.getElementById("addTask")
    let saveTaskbtn = document.getElementById("saveTask")
    let webTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webTask);
    addInputTask.value = taskObj[index];
    addInputTask.setAttribute("data", index)
    addTaskbtn.style.display = "none";
    saveTaskbtn.style.display = "inline-block";
}

//save task
let saveTaskbtn = document.getElementById("saveTask")
saveTaskbtn.addEventListener("click", function () {
    let addTaskbtn = document.getElementById("addTask")
    let webTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webTask)
    let dataIndex = addInputTask.getAttribute("data")
    taskObj[dataIndex] = addInputTask.value;
    addTaskbtn.style.display = "inline-block";
    saveTaskbtn.style.display = "none";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addInputTask.value = "";
    showTask()

})

//delete task
function deletetask(index) {
    let webTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webTask)
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showTask()
    addInputTask.value = "";
}

//delete all task
let deleteAllbtn = document.getElementById("deleteAllTask")
deleteAllbtn.addEventListener("click", function () {
    let addTaskbtn = document.getElementById("addTask")
    let webTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webTask)
    if (webTask === null) {
        taskObj = []
    } else {
        taskObj = JSON.parse(webTask);
        taskObj = []
    }
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showTask()
    addTaskbtn.style.display = "inline-block";
    saveTaskbtn.style.display = "none";
    addInputTask.value = "";
})


//search box
let searchTextBox = document.getElementById("search")
searchTextBox.addEventListener("input", function () {
    let trlist = document.querySelectorAll("tbody tr");
    Array.from(trlist).forEach(function (item) {
        let searchTdText = item.getElementsByTagName("td")[1].innerText;
        let searchTextBoxVal = searchTextBox.value;
        let re = new RegExp(searchTextBoxVal, 'gi');
        if (searchTdText.match(re)) {
            item.style.display = "table-row";
        } else {
            item.style.display = "none"
        }
    })
})
