const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'ipcRenderer',
    {
        onceInitData: (cb) => {
            ipcRenderer.once('init-data', cb)
        },
        invokeAddNewTask: (newTask, cb) => {
            ipcRenderer
                .invoke('add-new-task', newTask)
                .then(cb)

        },
        sendTaskUpdated: (taskUpdated) => {
            ipcRenderer.send('task-updated', taskUpdated)
        }

    }


)