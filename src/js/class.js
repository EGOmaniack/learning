class Task {
    constructor({id, label, done}){
        this.id = id;
        this.label = label;
        this.done = done;
    }

    ToggleDone(){
        this.done = !this.done;
    }
}
class List {
    constructor(){
        this.idCount = 0;
        this.taskList = [];
        this.domList = document.getElementById('list');
        this.addInput = document.getElementById('addInput');
        this.addButton = document.getElementById('addTodo');
        this.addButton.onclick = ()=>this.AddElement(this);
    }
    toggleTaskDone(id){
        this.taskList.forEach(task => {
            if(task.id == id) {
                task.ToggleDone();
                this.render();
            }
        });
    }
    render(){
        let listInner = '';
        this.taskList.forEach((value, index) => {
            listInner += `<div id="${
                value.id
            }" class="listItem"><input type="checkbox" class="p" ${
                value.done ? 'checked' : ''
            } /><div class="todo">${
                value.label
            }</div><div class="delete">x</div></div>`;
        });
        this.domList.innerHTML = listInner;
    }
    addTask(newLabel){
        let newTask = new Task({id: newLabel.id, label: newLabel.label, done: newLabel.done});
        this.taskList.push(newTask);
    }
    getTasks(){
        var request = new XMLHttpRequest();
        request.open('GET', `http://egomaniack.ru/lessons/ToDo/getToDo.php?nick=${ nick }&list=false`, true);
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                JSON.parse(request.responseText).forEach(task => this.addTask(task));
                this.render();
            } else {
                console.error("We reached our target server, but it returned an error");
            }
        };
        request.onerror = () => {
            console.error("There was a connection error of some sort");
        };
        request.send();
    }
    AddElement(){
        if(this.addInput.value != ''){
            this.addTask({id:this.idCount--, label:this.addInput.value, done: false});
            this.render();
            this.addInput.value = '';
        }
    }
    save(){
        var request = new XMLHttpRequest();
        request.open('POST', 'http://egomaniack.ru/lessons/ToDo/save.php', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(`input=${ JSON.stringify(this.taskList) }&nick=${ nick }&list=false`);
        request.onload = () => this.render(request.responseText)
    }
    delTask(id){
        this.taskList = this.taskList.filter(value => value.id != id);
        this.render();
    }
}