const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'ipcRenderer',
    {
        onceInitData: (cb) => {
            ipcRenderer.once('init-data', cb)
        },
        sendOpenNewTaskView: () => {
            ipcRenderer.send('open-new-task-view')
        },
        onShowNewTask: (cb) => {
            ipcRenderer.on('show-new-task', cb)
        },

        sendAskUpdateTask: (idTask) => {
            ipcRenderer.send('ask-update-task', idTask)

        },
        onShowTaskUpdated: (cb) => {
            ipcRenderer.on('show-task-updated', cb)
        },
        invokeAskDeleteTask: (idTask, cb) => {
            ipcRenderer.invoke('ask-delete-task', idTask)
                .then(cb)
        },
        sendOpenContextMenu: () => {
            ipcRenderer.send('open-context-menu', undefined)
        }
    }


)