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
        this.addButton.onclick = ()=>{this.AddElement(this)};
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
        request.open('GET', 'http://egomaniack.ru/lessons/ToDo/getToDo.php?nick=' + nick + '&list=false', true);
        let self = this;
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                let resp = request.responseText;
                resp = JSON.parse(resp);
                resp.forEach((task)=>{
                    self.addTask(task);
                });
                self.render();
            } else {
                // We reached our target server, but it returned an error
                return "error";
            }
        };
        request.onerror = function() {
            // There was a connection error of some sort
            return "error";
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
        let self = this;
        var request = new XMLHttpRequest(); //http://egomaniack.ru
        request.open('POST', 'http://egomaniack.ru/lessons/ToDo/save.php', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send('input=' + JSON.stringify(self.taskList) + '&nick=' + nick + '&list=false');
        request.onload = function(){
            self.render(request.responseText);
        }
    }
    delTask(id){
        console.log(id);
        this.taskList = this.taskList.filter(value => value.id != id);
        this.render();
    }
}