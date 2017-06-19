const domList = document.getElementById('list');
const saveTodo = document.getElementById('saveTodo');

domList.addEventListener('click', (e) => {
    e.preventDefault();
    switch (e.target.className) {
        case "p":
            list.toggleTaskDone(e.target.parentNode.id);
            break;
        case "todo":
            list.toggleTaskDone(e.target.parentNode.id);
            break;
        case "delete":
            list.delTask(e.target.parentNode.id);
            break;
    
        default:
            console.log("not recognized className -", e.target.className);
            break;
    }
});
const nick = "EGOmaniack";
let list = new List();

saveTodo.onclick = () => {
    list.save();
};

list.getTasks();
const addButton = document.getElementById('addTodo');