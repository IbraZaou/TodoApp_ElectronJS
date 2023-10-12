const { Notification } = require('electron')
const path = require('path')

class NotificationUtil {

    showSuccess(title, body) {
        const icon = path.join(__dirname, '..', '..', 'asset', 'valid.png')
        this.#show(title, body, icon)
    }
    showDanger(title, body) {
        const icon = path.join(__dirname, '..', '..', 'asset', 'error.png')
        this.#show(title, body, icon)
    }
    #show(title, body, icon) {
        const notification = new Notification({
            title,
            body,
            icon
        })
        notification.show()
    }


}

module.exports = new NotificationUtil()