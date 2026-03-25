let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let currentSort = 'priority';
let searchTerm = '';

const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const deadlineInput = document.getElementById('deadlineInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const searchInput = document.getElementById('searchInput');
const filterAll = document.getElementById('filterAll');
const filterCompleted = document.getElementById('filterCompleted');
const filterPending = document.getElementById('filterPending');
const sortSelect = document.getElementById('sortSelect');
const taskList = document.getElementById('taskList');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Add task
addTaskBtn.addEventListener('click', () => {
    const title = taskInput.value.trim();
    const priority = prioritySelect.value;
    const deadline = deadlineInput.value;
    
    if (!title || !deadline) {
        alert('Please enter task name and deadline.');
        return;
    }
    
    const task = {
        id: Date.now(),
        title,
        priority,
        deadline,
        completed: false
    };
    
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    deadlineInput.value = '';
});

// Toggle complete
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

// Filter tasks
function setFilter(filter) {
    currentFilter = filter;
    renderTasks();
}

// Sort tasks
sortSelect.addEventListener('change', () => {
    currentSort = sortSelect.value;
    renderTasks();
});

// Search with debounce
const debouncedSearch = debounce(() => {
    searchTerm = searchInput.value.toLowerCase();
    renderTasks();
}, 300);

searchInput.addEventListener('input', debouncedSearch);

// Save to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
    let filteredTasks = tasks.filter(task => {
        const matchesFilter = 
            currentFilter === 'all' ||
            (currentFilter === 'completed' && task.completed) ||
            (currentFilter === 'pending' && !task.completed);
        const matchesSearch = task.title.toLowerCase().includes(searchTerm);
        return matchesFilter && matchesSearch;
    });
    
    // Sort
    if (currentSort === 'priority') {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        filteredTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    } else if (currentSort === 'deadline') {
        filteredTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }
    
    taskList.innerHTML = '';
    filteredTasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'col-12 mb-2';
        
        const today = new Date().toISOString().split('T')[0];
        const isOverdue = task.deadline < today && !task.completed;
        
        taskCard.innerHTML = `
            <div class="card ${isOverdue ? 'border-danger' : ''}">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div class="flex-grow-1">
                        <h5 class="card-title ${task.completed ? 'text-decoration-line-through text-muted' : ''}">${task.title}</h5>
                        <p class="card-text mb-1">
                            <span class="badge ${task.priority === 'Low' ? 'bg-success' : task.priority === 'Medium' ? 'bg-warning' : 'bg-danger'}">${task.priority}</span>
                            Deadline: ${new Date(task.deadline).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <input type="checkbox" class="form-check-input me-2" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${task.id})">
                        <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">🗑</button>
                    </div>
                </div>
            </div>
        `;
        taskList.appendChild(taskCard);
    });
    
    updateCounters();
}

// Update counters
function updateCounters() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;
}

// Event listeners for filters
filterAll.addEventListener('click', () => setFilter('all'));
filterCompleted.addEventListener('click', () => setFilter('completed'));
filterPending.addEventListener('click', () => setFilter('pending'));

// Initial render
renderTasks();