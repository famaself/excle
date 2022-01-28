// 选择器

const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector(".standard-theme");
const lightTheme = document.querySelector(".light-theme");
const darkerTheme = document.querySelector(".darker-theme");

// Event Listeners

toDoBtn.addEventListener("click", addToDo);
toDoList.addEventListener("click", deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);
standardTheme.addEventListener("click", () => changeTheme("standard"));
lightTheme.addEventListener("click", () => changeTheme("light"));
darkerTheme.addEventListener("click", () => changeTheme("darker"));

// 检查是否设置该主题
let savedTheme = localStorage.getItem("savedTheme");
savedTheme === null
  ? changeTheme("standard")
  : changeTheme(localStorage.getItem("savedTheme"));

//设置函数
function addToDo(event) {
    //防止表单提交或重新加载
    event.preventDefault();

    //toDo DIV
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add("todo", `${savedTheme}-todo`);

    //创建列表
    const newToDo = document.createElement('li');
    if(toDoInput.value === ''){
        alert('请填写计划的任务');
    }else{
        newToDo.innerText = toDoInput.value;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        //添加到本地库
        savelocal(toDoInput.value);

        // 完成按钮
        const checked = document.createElement("button");
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(checked);

        //删除按钮
        const deleted = document.createElement("button");
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);
        
        //附加元素
        toDoList.appendChild(toDoDiv);

        //清空输入栏
        toDoInput.value = '';
    }
}



function deletecheck(event){
    const item = event.target;/////痛苦源泉targrt

    //删除
    if(item.classList[0] === `delete-btn`)
    {
        item.parentElement.classList.add('fall');
        removeLocalTodos(item.parentElement);

        item.parentElement.addEventListener("transitionend", function () {
          item.parentElement.remove();
        });
    }

    // 核实
    if (item.classList[0] === "check-btn") {
      item.parentElement.classList.toggle("completed");
    }
}

// 保存到本地库
function savelocal(todo){
    //Check: if item/s are there;
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//----------------------------------------------
function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];

    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
      //
      const toDoDiv = document.createElement("div");
      toDoDiv.classList.add("todo", `${savedTheme}-todo`);
      // Create LI
      const newToDo = document.createElement("li");

      newToDo.innerText = todo;
      newToDo.classList.add("todo-item");
      toDoDiv.appendChild(newToDo);

      // check btn;
      const checked = document.createElement("button");
      checked.innerHTML = '<i class="fas fa-check"></i>';
      checked.classList.add("check-btn", `${savedTheme}-button`);
      toDoDiv.appendChild(checked);
      // delete btn;
      const deleted = document.createElement("button");
      deleted.innerHTML = '<i class="fas fa-trash"></i>';
      deleted.classList.add("delete-btn", `${savedTheme}-button`);
      toDoDiv.appendChild(deleted);

      // Append to list;
      toDoList.appendChild(toDoDiv);
    })
}


function removeLocalTodos(todo){
    //Check: if item/s are there;
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex =  todos.indexOf(todo.children[0].innerText);
    // console.log(todoIndex);
    todos.splice(todoIndex, 1);
    // console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}




// 改变主题函数
// Change theme function:
function changeTheme(color) {
  localStorage.setItem("savedTheme", color);
  savedTheme = localStorage.getItem("savedTheme");

  document.body.className = color;
  // Change blinking cursor for darker theme:
  color === "darker"
    ? document.getElementById("title").classList.add("darker-title")
    : document.getElementById("title").classList.remove("darker-title");

  document.querySelector("input").className = `${color}-input`;
  // Change todo color without changing their status (completed or not):
  document.querySelectorAll(".todo").forEach((todo) => {
    Array.from(todo.classList).some((item) => item === "completed")
      ? (todo.className = `todo ${color}-todo completed`)
      : (todo.className = `todo ${color}-todo`);
  });
  // Change buttons color according to their type (todo, check or delete):
  document.querySelectorAll("button").forEach((button) => {
    //Array函数可以储存多个值
    Array.from(button.classList).some((item) => {
      if (item === "check-btn") {
        button.className = `check-btn ${color}-button`;
      } else if (item === "delete-btn") {
        button.className = `delete-btn ${color}-button`;
      } else if (item === "todo-btn") {
        button.className = `todo-btn ${color}-button`;
      }
    });
  });
}


