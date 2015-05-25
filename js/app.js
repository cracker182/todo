function fetchArray(key){
	if(localStorage.getItem(key)) {
		return JSON.parse(localStorage.getItem(key));
	}
	return [];
}

function saveArray(key, value){
	localStorage.setItem(key, JSON.stringify(value));
}

app = new Vue({

    el: '#tasks',

    data: {
        tasks: fetchArray("tasks"),

        newTask: '',

        filters: {
            inProcess: function(task) {
                return ! task.completed;
            },

            completed: function(task) {
                return task.completed;
            }
        }
    },

    ready: function() {
    	this.$watch("tasks", function(value){
    		saveArray("tasks", value);
    	});
    },

    computed: {
        completions: function() {
            return this.tasks.filter(this.filters.completed);
        },

        remaining: function() {
            return this.tasks.filter(this.filters.inProcess);
        }
    },

    methods: {
        addTask: function(e) {
            e.preventDefault();

            if ( ! this.newTask) return;

            this.tasks.push({
                body: this.newTask,
                completed: false
            });

            this.newTask = '';
        },

        editTask: function(task) {
            this.removeTask(task);
            this.newTask = task.body;

            this.$$.newTask.focus();
        },

        toggleTaskCompletion: function(task) {
            task.completed = ! task.completed;
        },

        completeAll: function() {
            this.tasks.forEach(function(task) {
                task.completed = true;
            });
        },

        clearCompleted: function() {
            this.tasks = this.tasks.filter(this.filters.inProcess);
        },

        removeTask: function(task) {
            this.tasks.$remove(task);
        }
    }

});