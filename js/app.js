Vue.component('tasks',{
	template:`<section class="todoapp">
		<header class="header">
			<h1>Tareas</h1>
			<input v-on:keyup.enter="add" v-model="newTask" type="text" class="new-todo">
		</header>
		<section>
			<ul class="todo-list">
				<li class="todo" is="task" v-for="task in tasks" :task="task"></li>
			</ul>
		</section>
		<footer class="footer" v-show="tasks.length">
			<span class="todo-count">Completas: {{completed}} | Incompletas: {{incompleted}}</span>
		</footer>
	</section>`,
	data:function(){
		//aqui se encuentran los datos que se estan manejando con VueJS
		return{
			newTask:"",
			tasks:[
				{title:"Tarea 1",completed:true},
				{title:"Tarea 2",completed:false},
				{title:"Tarea 3",completed:true}
			]
		}
	},
	methods:{
		//se definen todos los metodos a usar
		/*reverse:function () {
			this.message=this.message.split('').reverse().join('');
		}*/
		add:function (){
			if(this.newTask.length<=1){
				return alert('Ingrese un nombre en su tarea');
			}
			this.tasks.push({
				title:this.newTask,
				completed:false
			});
			this.newTask="";
		}
	},
	computed:{
		/*reversedTask:function (){
			return this.newTask.split('').reverse().join('');
		},*/
		completed: function (){
			return this.tasks.filter(function(task){
				return task.completed;
			}).length;
		},
		incompleted: function (){
			return this.tasks.filter(function(task){
				return !task.completed;
			}).length;
		}
	}
});

Vue.component('task',{
	props:['task'],
	template:`<li :class="classes">
		<div class="view">
			<input type="checkbox" class="toggle" v-model="task.completed"/>
			<label v-text="task.title" @dblclick="edit()"></label>
			<button class="destroy" @click="remove()"></button>
		</div>
		<input class="edit" v-model="task.title" @keyup.enter="doneEdit()" @blur="doneEdit()" @keyup.esc="cancelEdit()"/>
	</li>`,
	data: function(){
		return {
			editing:false,
			cacheEdit:''
		}
	},
	methods:{
		edit:function(){
			this.cacheEdit=this.task.title;
			this.editing=true;
		},
		doneEdit:function(){
			if (!this.task.title) {
				this.remove();
			}
			this.editing=false;
		},
		cancelEdit:function(){
			this.editing=false;
			this.task.title=this.cacheEdit;
		},
		remove: function(){
			var tasks=this.$parent.tasks;

			tasks.splice(tasks.indexOf(this.task),1);
		}
	},
	computed:{
		classes: function (){
			return {completed:this.task.completed,editing:this.editing};
		}
	}
});

var app=new Vue({
	el:'#app'
});