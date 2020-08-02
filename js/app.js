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
		<footer class="footer">
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
			<label v-text="task.title"></label>
		</div>
	</li>`,
	computed:{
		classes: function (){
			return {completed:this.task.completed};
		}
	}
});

var app=new Vue({
	el:'#app'
});