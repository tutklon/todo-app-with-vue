// Componentler , Methodlar aslında kısaca tüm uygulama
Vue.component('todo', {
    data() {
        return {
            todo: ""
        }
    },
    methods: {
        getTodosFromStorage() {
            let todos;
            if (localStorage.getItem('todos') === null) {
                todos = [];
            }
            else {
                todos = JSON.parse(localStorage.getItem("todos"));
                this.getAllTodos(todos);
            }
            return todos;
        },
        getDoneTodosFromStorage() {
            let done_todos;
            if (localStorage.getItem("done-todos") === null) {
                done_todos = [];
            }
            else {
                done_todos = JSON.parse(localStorage.getItem("done-todos"));
                this.getDoneTodos(done_todos);
            }
            return done_todos;
        },
        addTodoStorage() {
            if (this.todo == "") {
                return;
            }
            let todos = this.getTodosFromStorage();
            todos.push(this.todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            this.todo = "";
        },
        getAllTodos(todos) {
            console.log(todos);
        }
    },
    created() {
        this.getTodosFromStorage();
        this.getDoneTodosFromStorage();
    },
    template: `
    <div class="todo">
        <div style="display:flex; width: 90%; margin: 10px 0px 0px -15px;" >
        <i class="gg-math-plus iconposition"></i><input type="text" placeholder="Görevler.." class="todo-input" v-model="todo" @keyup.enter="addTodoStorage"/>
        </div>
        <br>
        <div class="b-div">
            <bekleyenler :todos="getTodosFromStorage()"></bekleyenler>
        </div>
    </div>
        `

})
Vue.component('bekleyenler', {
    props: {
        todos: {
            type: Array
        },
        title: {
            type: String
        },
    },
    methods: {
        deleteTodo(index) {
            this.todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(this.todos));
        }
    },
    data() {
        return {
            checkedbox: false,
        }
    },
    template: `
    <div>
        <h1 v-if="todos.length > 0">{{ title }}</h1><br>
        <div v-for="(todo , index) in todos" class="list"> 
            <div class="card">
                <label>
                    <input type="checkbox" class="filled-in" @click="deleteTodo(index)" />
                    <span>{{ todo }}</span>
                </label>
            </div>
        </div>
    </div>`,

})
Vue.component('application', {
    methods: {
        getMessage() {
            let msg = localStorage.getItem('message');
            return msg;
        }
    },
    template: `
        <div class="background">
            <video src="./img/vids/video.mp4"  autoplay></video>
            <bilgilendirme :msg="getMessage()" />
            <nav>
                <h1>Todo List {{ msg }}</h1>
                <p>Yapılacaklar listeniz, Görevleriniz ve dahası..</p>
            </nav>
            <todo></todo>
        </div>
    `
})
window.addEventListener('load', () => {
    new Vue({
        el: "#app",
        data: {
            message: "İçdaş Biga Mesleki Teknik Anadolu Lisesi",
        },
    })
})
