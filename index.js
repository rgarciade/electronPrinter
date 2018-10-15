const { BrowserWindow, ipcMain, Menu } = require('electron')
const { isInConfig } = require('./common')

const createPrintWindow = (args) => {
    const hidden = isInConfig('hiddenWindow', args)

    if (!args.html) throw 'bad Params';
    let windowProps = {
        height: 670,
        minHeight: 340,
        width: 820,
        minWidth: 400
    }
    if (hidden) {
        windowProps.show = false
    }
    if (args.mainWindow) {
        windowProps.parent = args.mainWindow
    }

    let printWindow = new BrowserWindow(windowProps)

    printWindow.on('closed', () => {
        printWindow = null
    })
    printWindow.setMenu(null);
    printWindow.webContents.once('dom-ready', () => {
        printWindow.webContents.send('chargeHtml', { html: args.html, css: args.css, cssUrl: args.cssUrl, config: args.config });

        if (!hidden) {
            printWindow.show()
        }
    })
    ipcMain.on('print-init', async (event, args) => {
        print(printWindow, args.close)
    })

    printWindow.loadFile(`${__dirname}/printer.html`)
    printWindow.on('closed', () => {
        printWindow = null
    })


}

function print(printWindow, close) {
    printWindow.webContents.print({
        printBackground: true,
        printSelectionOnly: true,
    }, () => {
        if (close) printWindow.close()
    })
}
module.exports = { createPrintWindow }