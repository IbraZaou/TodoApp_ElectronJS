const newTaskForm = document.querySelector('#newTaskForm')

const successMsgDiv = document.querySelector('#successMsg')

const labelInput = document.querySelector('#label')
const descriptionInput = document.querySelector('#description')
const statusInput = document.querySelector('#status')

let isUpdateView = false
let id

window.ipcRenderer.onceInitData((e, data) => {
    console.log(data)
    id = data.id
    labelInput.value = data.label
    descriptionInput.value = data.description
    statusInput.value = data.status
    isUpdateView = true
})

const addNewTaskCb = (res) => {
    successMsgDiv.hidden = false
    newTaskForm.reset()
    setTimeout(() => {
        successMsgDiv.hidden = true
    }, 5000)
}

newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const task = Object.fromEntries(formData.entries())

    if (isUpdateView) {
        task.id = id
        window.ipcRenderer.sendTaskUpdated(task)
    } else {
        window.ipcRenderer.invokeAddNewTask(task, addNewTaskCb)
    }



})