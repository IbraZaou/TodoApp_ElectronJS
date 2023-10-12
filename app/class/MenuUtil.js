const { Menu, MenuItem } = require('electron')
const WindowUtil = require('./WindowUtil')

class MenuUtil {
    initApplicationMenu() {
        const template = [
            {
                label: 'Classique',
                submenu: [
                    { role: 'reload' },
                    { role: 'toggledevtools' },
                    { type: 'separator' },
                    { role: 'close' }
                ]
            },
            {
                label: 'Custom',
                submenu: [
                    {
                        label: 'Nouvelle tâche',
                        accelerator: 'CmdOrCtrl+N',
                        click() {
                            WindowUtil.createFormTaskView()
                        }
                    }

                ]


            }
        ]

        const menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
    }
    createContextMenu() {
        const menu = new Menu()
        const menuItem = new MenuItem(
            {
                label: 'Nouvelle tâche',
                accelerator: 'Cmd0rCtrl+N',
                click() {
                    WindowUtil.createFormTaskView()
                }
            }
        )
        menu.append(menuItem)
        menu.popup()
    }
}

module.exports = new MenuUtil()