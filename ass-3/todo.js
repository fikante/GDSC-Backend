function TodoItem(description) {
    this.description = description;
    this.completed = false;
}

TodoItem.prototype.toggle = function() {
    this.completed = !this.completed;
};

function TodoList() {
    this.items = [];
}

TodoList.prototype.addItem = function(description) {
    var newItem = new TodoItem(description);
    this.items.push(newItem);
};

TodoList.prototype.render = function() {
    var listElement = document.getElementById('todo-list');
    listElement.innerHTML = '';
    this.items.forEach(function(item, index) {
        var listItem = document.createElement('li');
        listItem.className = 'todo-item';
        listItem.innerHTML = `<span class="${item.completed ? 'completed' : ''}">${item.description}</span>
                              <button data-index="${index}" class="toggle-todo">Toggle</button>`;
        listElement.appendChild(listItem);
    });
};

var todoList = new TodoList();

document.getElementById('add-todo').addEventListener('click', function() {
    var todoInput = document.getElementById('todo-input');
    if (todoInput.value.trim()) {
        todoList.addItem(todoInput.value.trim());
        todoInput.value = '';
        todoList.render();
    }
});

document.getElementById('todo-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('toggle-todo')) {
        var index = event.target.getAttribute('data-index');
        todoList.items[index].toggle();
        todoList.render();
    }
});
