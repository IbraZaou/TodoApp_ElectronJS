
const { BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const TaskUtil = require('./TaskUtil');

const NotificationUtil = require('./NotificationUtil');




class WindowUtil {

    views

    constructor() {
        this.views = {}
    }

    createFormTaskView(initialData) {
        if (this.views.formTaskView) this.views.formTaskView.close()
        this.views.formTaskView = this.#createWindow('form-task', undefined, undefined, initialData)
        this.views.formTaskView.on('closed', () => this.views.formTaskView = undefined)
    }



    createHomeView() {
        const openNewTaskViewCb = () => {
            this.createFormTaskView()
        }

        const addNewTaskCb = (e, newTask) => {

            TaskUtil.addNewTask(newTask)

            this.views.homeView.send('show-new-task', newTask)
            NotificationUtil.showSuccess('Nouvelle Tâche', 'Tâche ajouter avec succès')
            return true
        }

        const askUpdateTaskCb = (e, idTask) => {
            const task = TaskUtil.getTask(idTask)
            this.createFormTaskView(task)
        }

        const updateTaskCb = (e, taskUpdated) => {
            TaskUtil.updateTask(taskUpdated)
            this.views.homeView.send('show-task-updated', taskUpdated)
            NotificationUtil.showSuccess('Tâche Modifier', 'Tâche Modifier avec succès')
            this.views.formTaskView.close()
        }



        const askDeleteTaskCb = (e, idTask) => {
            const choice = dialog.showMessageBoxSync({
                type: 'warning',
                buttons: ['Non', 'Oui'],
                title: 'Comfirmation de suppression',
                message: 'Etes vous sur de vouloir supprimer cette élément ?'
            })

            if (choice) {
                TaskUtil.removeTask(idTask)
                NotificationUtil.showDanger('Tâche Supprimer', 'Tâche supprimer avec succès')

            }
            return choice
        }



        const initListenersFct = () => {
            ipcMain.on('open-new-task-view', openNewTaskViewCb)
            ipcMain.handle('add-new-task', addNewTaskCb)
            ipcMain.on('ask-update-task', askUpdateTaskCb)
            ipcMain.on('task-updated', updateTaskCb)
            ipcMain.handle('ask-delete-task', askDeleteTaskCb)

        }

        const removeListenersFct = () => {

            ipcMain.removeListener('open-new-task-view', openNewTaskViewCb)
            ipcMain.removeHandler('add-new-task')
            ipcMain.removeListener('ask-update-task', askUpdateTaskCb)
            ipcMain.removeListener('task-updated', updateTaskCb)
            ipcMain.removeHandler('ask-delete-task')

        }

        this.views.homeView = this.#createWindow('home', initListenersFct, removeListenersFct, TaskUtil.getAll())
        this.views.homeView.on('closed', () => this.views.homeView = undefined)


    }

    #createWindow(viewName, initListenersFct = undefined, removeListenersFct = undefined, initialData = undefined, width = 1400, height = 1200) {
        // crée un fenetre 
        const win = new BrowserWindow({
            width,
            height,
            // web préference qui nous permet de  dire les sécuriter que l'on veut avoir
            // on ajoute également à l'intérieur un fichier de preload
            webPreferences: {
                // on arrête d'exposer les node_modules côté front
                nodeIntegration: false,
                // on isole tout pour éviter les problèmes
                contextIsolation: true,
                // on arrête d'exposer le module remote d'Electron
                enableRemoteModule: false,
                // on donne à notre vue le fichier preload.js pour qu'elle expose
                // la clé et la méthode loadController
                //permet d'exposer des fonctions spécifique via les outils d'électron notamment le ipc renderer
                // vas permettre de les exposer et de selection coter front . pour choisir ce que l'on donne à la vue
                // chaque vue commence à exposer sa propre fonction pour ça propre window
                preload: path.join(__dirname, '..', 'preloads', `${viewName}.js`)
            }
        })

        const viewPath = path.join(__dirname, '..', '..', 'src', 'views', viewName, `${viewName}.html`)

        win
            //il charge le fichier de la vue donc charge la partie html
            //une fois 
            .loadFile(viewPath)
            //teste si on à les donner et si on les à alors il les renvoies
            .then(() => {
                if (initialData) { win.send('init-data', initialData) }
            })

        // ajoute des listener spécifique à la fenêtre
        // ajoute des action spécifique à la fenêtre
        if (initListenersFct) initListenersFct()
        //supprime une fois utiliser différent de l'action globale qui reste peut importe la fenêtre
        if (removeListenersFct) win.on('close', removeListenersFct)

        return win
    }
}

module.exports = new WindowUtil()


