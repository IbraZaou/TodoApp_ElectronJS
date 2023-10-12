function generateTaskRow(task) {
    const row = document.createElement('tr')

    const label = document.createElement('td')
    label.id = `label-${task.id}`
    label.textContent = task.label
    row.appendChild(label)

    const description = document.createElement('td')
    description.id = `description-${task.id}`
    description.textContent = task.description
    row.appendChild(description)

    const status = document.createElement('td')
    status.id = `status-${task.id}`
    status.textContent = task.status ? 'Terminée' : 'En cours'
    row.appendChild(status)

    const actions = document.createElement('td')
    const updateBtn = document.createElement('button')
    updateBtn.classList.add('btn', 'btn-warning', 'me-2')
    updateBtn.textContent = 'MODIF.'
    updateBtn.addEventListener('click', () => {
        window.ipcRenderer.sendAskUpdateTask(task.id)
    })
    actions.appendChild(updateBtn)



    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'SUPPR.'
    deleteBtn.classList.add('btn', 'btn-danger')
    deleteBtn.addEventListener('click', () => {
        window.ipcRenderer.invokeAskDeleteTask(task.id, (isDeleted) => {
            if (isDeleted) {
                row.remove()
            }
        })
    })
    actions.appendChild(deleteBtn)
    row.appendChild(actions)

    document.querySelector('#tasks-tbody').appendChild(row)
}


const onceInitDataCb = (e, tasks) => {
    tasks.forEach(generateTaskRow);
}

const onShowNewTask = (e, task) => {
    generateTaskRow(task);
}

const onShowTaskUpdatedCb = (e, taskUpdated) => {
    const label = document.querySelector(`#label-${taskUpdated.id}`)
    label.textContent = taskUpdated.label

    const description = document.querySelector(`#description-${taskUpdated.id}`)
    description.textContent = taskUpdated.description

    const status = document.querySelector(`#status-${taskUpdated.id}`)
    status.textContent = taskUpdated.status ? 'Terminée' : 'En cours'

}

window.ipcRenderer.onceInitData(onceInitDataCb)
window.ipcRenderer.onShowNewTask(onShowNewTask)
window.ipcRenderer.onShowTaskUpdated(onShowTaskUpdatedCb)

document
    .querySelector('#newTaskBtn')
    .addEventListener('click', window.ipcRenderer.sendOpenNewTaskView)

document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    window.ipcRenderer.sendOpenContextMenu()

})
