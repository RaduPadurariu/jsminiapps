const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')



document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndCheck);
filterOption.addEventListener('click', filterTodo);


function addTodo (event) {
    event.preventDefault();
  
    // Add todo to local storage
    if( todoInput.value !=="" && todoInput.value!== " ") {
        createTodoHTML(todoInput.value);
        saveLocalTodos(todoInput.value);
    }
    // clear values
    todoInput.value='';
}

function deleteAndCheck (e) {
    const item = e.target;
    // delete todo
    if(item.classList[0] === 'delete-btn') {
        const todo = item.parentElement.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        setTimeout(function () {
        todo.remove();
        }, 500)
        
    }

    // check todo
    if(item.classList[0] === 'check-btn') {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle('completed');
    }
}

function createTodoHTML (todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');



    todoDiv.appendChild(newTodo);
    const btnContainer = document.createElement('div');
    todoDiv.appendChild(btnContainer);
 

    // check button
    const checkBtn = document.createElement('button');
    const checkBtn_img = document.createElement('img');
    checkBtn_img.src = "../../../imgs/icons/btn/check.png";
    checkBtn_img.classList.add('imgBtn');
    checkBtn.appendChild(checkBtn_img);
    checkBtn.classList.add('check-btn');
    btnContainer.appendChild(checkBtn);

    // delete button
    const deleteBtn = document.createElement('button');
    const deleteBtn_img = document.createElement('img');
    deleteBtn_img.src = "../../../imgs/icons/btn/delete.png";
    deleteBtn_img.classList.add('imgBtn');
    deleteBtn.appendChild(deleteBtn_img);
    deleteBtn.classList.add('delete-btn');
    btnContainer.appendChild(deleteBtn);

    // append
    todoList.appendChild(todoDiv)
}

function filterTodo (e) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function (todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}


function saveLocalTodos (todo) {
    // is there a todos in local storage?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos () {
     // is there a todos in local storage?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        createTodoHTML(todo);
    })
}

function removeLocalTodos (todo) {
     // is there a todos in local storage?
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
   
}