(function(){

	//entire scope
	vm = this;


	//the Task obejct
	vm.Task = function(id, taskName, completed){
		this.id = id;
		this.taskName = taskName;
		this.completed = completed;
		var getId = function(){
			return  this.id;
		}
		var getTaskName = function(){
			return this.taskName;
		}
		var getIsCompleted = function(){
			return this.completed;
		}
		var setTaskName = function(name){
			this.taskName = name;
		}
		var setIsCompleted = function(setter){
			this.completed = setter;
		}

		return {
			id: id,
			taskName: taskName,
			completed: completed,
			getTaskName: getTaskName,
			getIsCompleted: getIsCompleted,
			getId: getId,
			setIsCompleted: setIsCompleted,
			setTaskName: setTaskName
		}
	}

	//create Task List div
	vm.createTaskListDiv = function(){
		var mainDiv = document.createElement('div');
		mainDiv.className = "col-md-7";
		mainDiv.id = "taskList";
		document.getElementById('mid-content').appendChild(mainDiv);
		var ul = createTaskListNav(mainDiv);
		var lis = createLis(3);
		for (let i=0; i<lis.length; ++i){
			ul.appendChild(lis[i]);
		}
	}

	//create the li elements
	vm.createLis = function(numberOfLis){
		var lis = new Array(numberOfLis);
		for (let i=0;  i<lis.length; ++i){
			lis[i] = document.createElement('li');
			if(i==0){
				lis[i].appendChild(vm.createA("#","All"));
			}
			else if(i==1){
				lis[i].appendChild(vm.createA("#","Completed"));
			}
			else if(i==2){
				lis[i].appendChild(vm.createA("#","Active"));
			}
		}
		return lis;
	}

	//create a elements
	vm.createA = function(hrefStr, name){
		var a = document.createElement('a');
		a.href = hrefStr;
		a.innerText = name;
		return a;
	}


	//cerate the navbar ul
	vm.createTaskListNav = function(mainDiv){
		var ul = document.createElement('ul');
		ul.className = "nav navbar-nav";
		mainDiv.appendChild(ul);
		return ul;
	}

	//create ul & Li for data-portion
	vm.createUlAndLiForData = function(){
		var mainDiv = document.getElementById('taskList');
		var ul = createUlForData();
		mainDiv.appendChild(ul);
	}

	//create ul for data-portion
	vm.createUlForData = function(){
		var ul = document.createElement('ul');
		ul.className = "list-group";
		ul.id = "list-group";
		var li = createLiForData();
		ul.appendChild(li);
		return ul;
	}

	//create li for data portion
	vm.createLiForData = function(){
		var li = document.createElement('li');
		li.className = "list-group-item";
		li.id = "list-group-item";
		li.innerText = "Yes I am here";
		return li;
	}

	//fill out the div that contains the data
	vm.fillData = function(){
		var li = document.getElementById('list-group-item');
		li.innerHTML = "";
		var tasks = JSON.parse(sessionStorage.getItem('tasks'));
		for (let i=0; i<tasks.length; ++i){
			div = document.createElement('div');
			div.className = "row";
			div.id = "data-portion"+tasks[i].id;
			div.innerText = tasks[i].taskName;
			div.style.color = "red";
			li.appendChild(div);
			// createCheckBox();
			// createContent();
			// createAction();
		}
		

	}

	//submitTask
	vm.onSubmit = function(){
		if (sessionStorage.getItem("tasks")===null){
			var tasks =  new Array();
			var task = new Task(1, document.getElementById('taskName').value, 0);
			tasks.push(task);
			sessionStorage.setItem("tasks", JSON.stringify(tasks));
			createTaskListDiv();
			createUlAndLiForData();
			fillData();
		}
		else{

			var tasks = JSON.parse(sessionStorage.getItem('tasks'));
			var maxId = -1;
			for (let i=0; i<tasks.length; ++i){
				if (maxId < tasks[i].id){
					maxId = tasks[i].id;
				}
			}
			var task = new Task(maxId+1, document.getElementById('taskName').value, 0);
			tasks.push(task);
			sessionStorage.setItem("tasks", JSON.stringify(tasks));
			for (let i=0; i<tasks.length; ++i){
				console.log(tasks[i].taskName);
			}
			fillData();
			
		}
	}


})(this)