let todoListContainerEl = document.getElementById('todoListContainer');

let todoList = [
    {
        name: 'Sample task 1',
        uniqueId: 1,
        isCompleted: true
    },
    {
        name: 'Sample task 2',
        uniqueId: 2,
        isCompleted: false
    },

];

let storedTodoList = localStorage.getItem('todoList');
if (storedTodoList) todoList = JSON.parse(storedTodoList);

function getIndex(todoItemContainerEl) {
    const uniqueId = parseInt(todoItemContainerEl.slice(-1));
    return todoList.findIndex(function (todo) {
        if (todo.uniqueId === uniqueId) return true;
        return false;
    });
}

function completeTodo(todoItemContainerId, todoItemLabelId) {
    let todoItemContainerEl = document.getElementById(todoItemContainerId);
    let todoItemLabelEl = document.getElementById(todoItemLabelId);

    index = getIndex(todoItemContainerId);
    todoList[index].isCompleted = true;
    localStorage.setItem('todoList', JSON.stringify(todoList));

    todoItemContainerEl.classList.toggle('todo-item-container-completed');
    todoItemLabelEl.classList.toggle('todo-item-label-completed');
}

function deleteTodo(todoItemContainerId) {
    let todoItemContainerEl = document.getElementById(todoItemContainerId);

    index = getIndex(todoItemContainerId);
    todoList.splice(index, 1);

    if (todoList.length === 0) localStorage.removeItem('todoList');
    else localStorage.setItem('todoList', JSON.stringify(todoList));

    todoListContainerEl.removeChild(todoItemContainerEl);
}

function createTodo(todo) {
    const { name, uniqueId } = todo;
    const todoItemContainerId = 'todoItemContainer' + uniqueId;
    const todoItemCheckBoxInputId = 'todoItemCheckBoxInput' + uniqueId;
    const todoItemLabelId = 'todoItemLabel' + uniqueId;

    let todoItemContainerEl = document.createElement('li');
    todoItemContainerEl.id = todoItemContainerId;
    todoItemContainerEl.classList.add('todo-item-container', 'd-flex');
    todoListContainerEl.appendChild(todoItemContainerEl);

    let todoItemCheckboxInputEl = document.createElement('input');
    todoItemCheckboxInputEl.type = 'checkbox';
    todoItemCheckboxInputEl.id = todoItemCheckBoxInputId;

    todoItemCheckboxInputEl.onclick = function () {
        completeTodo(todoItemContainerId, todoItemLabelId);
    };

    todoItemCheckboxInputEl.classList.add('todo-item-checkbox-input');
    todoItemContainerEl.appendChild(todoItemCheckboxInputEl);

    let todoItemLabelContainerEl = document.createElement('div');
    todoItemLabelContainerEl.classList.add('todo-item-label-container', 'd-flex');
    todoItemContainerEl.appendChild(todoItemLabelContainerEl);

    let todoItemLabelEl = document.createElement('label');
    todoItemLabelEl.htmlFor = todoItemCheckBoxInputId;
    todoItemLabelEl.id = todoItemLabelId;
    todoItemLabelEl.textContent = name;
    todoItemLabelEl.classList.add('todo-item-label');
    todoItemLabelContainerEl.appendChild(todoItemLabelEl);

    let deleteIconContainerEl = document.createElement('div');
    deleteIconContainerEl.classList.add('todo-item-delete-icon-container');
    todoItemLabelContainerEl.appendChild(deleteIconContainerEl);

    let deleteIconEl = document.createElement('i');
    deleteIconEl.onclick = function () {
        deleteTodo(todoItemContainerId);
    };
    deleteIconEl.classList.add('bi', 'bi-trash');
    deleteIconContainerEl.appendChild(deleteIconEl);

    if (todo.isCompleted) {
        todoItemCheckboxInputEl.checked = todo.isCompleted;
        completeTodo(todoItemContainerId, todoItemLabelId);
    }
}

let addBtnEl = document.getElementById('addBtn');
addBtnEl.onclick = function () {
    let todoTextInputEl = document.getElementById('todoTextInput');
    if (todoTextInputEl.value) {
        const newTodo = {
            name: todoTextInputEl.value,
            uniqueId: todoList.length + 1,
            isCompleted: false
        };

        todoList.push(newTodo);
        localStorage.setItem('todoList', JSON.stringify(todoList));
        createTodo(newTodo);
        todoTextInputEl.value = '';
    }
    else {
        alert('Please enter a task.');
    }

};

for (let todo of todoList) {
    createTodo(todo);
}

// console.log(todoListContainerEl);