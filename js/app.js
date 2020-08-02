Vue.component('tasks',{
	template:`<div>
		<h1>Tareas</h1>
		<p>Tareas Completas: {{completed}}</p>
		<p>Tareas Incompletas: {{incompleted}}</p>
		<ul>
			<li is="task" v-for="task in tasks" :task="task"></li>
			<li class="form-inline">
				<input v-on:keyup.enter="add" v-model="newTask" type="text" class="form-control">
			</li>
		</ul>
	</div>`,
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
	template:`<li>
		<span v-text="task.title"></span>
		<span @click="completeTask()" :class="classes"></span>
	</li>`,
	methods:{
		complete:function(){
			return this.task.completed=!this.task.completed;
		}
	},
	computed:{
		classes: function (){
			return ['glyphicon',this.task.completed?'glyphicon-check': 'glyphicon-unchecked'];
		}
	}
});

var app=new Vue({
	el:'#app'
});