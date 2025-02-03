// main.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Web application is running!');

    document.getElementById('todoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const input = document.getElementById('todoInput');
        const todoText = input.value.trim();
        
        if (todoText) {
            addTodo(todoText);
            input.value = '';
        }
    });

    function addTodo(text) {
        const list = document.getElementById('todoList');
        const li = document.createElement('li');
        
        li.innerHTML = `
            <span>${text}</span>
            <button onclick="this.parentElement.remove()">Delete</button>
        `;
        
        list.appendChild(li);
    }

    // Add your JavaScript functionality here
});

document.getElementById('todoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('todoInput');
    const todoText = input.value.trim();
    
    if (todoText) {
        addTodo(todoText);
        input.value = '';
    }
});

function addTodo(text) {
    const list = document.getElementById('todoList');
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text}</span>
        <button onclick="this.parentElement.remove()">Delete</button>
    `;
    list.appendChild(li);
}