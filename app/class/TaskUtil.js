const StoreUtil = require('./StoreUtil')

class TaskUtil {

    tasks

    constructor() {
        if (StoreUtil.countItem('tasks') > 0) {
            this.tasks = StoreUtil.getItem('tasks')
        }
        else {
            this.tasks = []
            this.#initDefaultTasks()
            StoreUtil.setItem('tasks', this.tasks)
        }

    }

    getAll() {
        return this.tasks
    }

    addNewTask(task) {
        task.id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1
        this.tasks.push(task)
        StoreUtil.setItem('tasks', this.tasks)
    }

    updateTask(taskUpdated) {
        for (const [i, task] of this.tasks.entries()) {
            if (task.id === taskUpdated.id) {
                this.tasks[i] = taskUpdated
                break
            }
        }
        StoreUtil.setItem('tasks', this.tasks)
    }

    getTask(idTask) {
        return this.tasks.find(t => t.id === idTask)
    }
    removeTask(idTask) {
        this.tasks = this.tasks.filter(t => t.id !== idTask)
        StoreUtil.setItem('tasks', this.tasks)
    }

    #initDefaultTasks() {
        this.addNewTask({
            label: 'Apprendre NodeJs',
            Description: 'Apprendre les base du js',
            status: false
        })
        this.addNewTask({
            label: 'Apprendre Anglais',
            Description: 'Apprendre les bases avec Killian',
            status: true
        })
    }
}

module.exports = new TaskUtil()
