const { BrowserWindow, ipcMain, Menu } = require('electron')
const { isInConfig } = require('./common')

const createPrintWindow = (args) => {
    if(!args.config) args.config = []
    const hidden = isInConfig('hiddenWindow', args)
    const thermalprinter = isInConfig('thermalprinter', args)

    if (!args.html) throw 'bad Params';
    let windowProps = {
        height: 670,
        minHeight: 340,
        width: 820,
        minWidth: 400
    }
    if (hidden /*|| thermalprinter*/) {
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
        //printWindow.webContents.openDevTools();
        printWindow.webContents.send('chargeHtml', { html: args.html, css: args.css, cssUrl: args.cssUrl, config: args.config });

        if (!hidden && !thermalprinter) {
            printWindow.show()
        }
    })
    ipcMain.on('print-init', async (event, args) => {
        print(printWindow, args.close)
    })
    
    if(thermalprinter){
        printWindow.loadFile(`${__dirname}/views/thermalPrinter.html`)
    }else{
        printWindow.loadFile(`${__dirname}/views/printer.html`) 
    }
    
    printWindow.on('closed', () => {
        printWindow = null
    })

}

function print(printWindow, close) {
    let printers = printWindow.webContents.getPrinters()
    let deviceName = ''
    for (let index = 0; index < printers.length; index++) {
        const element = printers[index];
        if(element.name.includes('tickets')){
            index = printers.length
            deviceName = element.name
        }
    }
    const options = { silent: false, printBackground: false }
    if(deviceName != '') options.deviceName = deviceName
    printWindow.webContents.print(options, (success, errorType) => {
      if (!success) console.log(errorType)
    })
    /*
    printWindow.webContents.print({
        printBackground: true,
        printSelectionOnly: true,
    }, () => {
        if (close) printWindow.close()
    })*/
}
/**
 * 
 * @param {*} principalTitle 
 * @param {*} secundaryTitle 
 * @param {*} date 
 * @param {
 *  [
 *      'quantity'
 *      'product'
 *      'price'
 *  ]
 * } products 
 * @param {*} finalText
 * @param {*} imgUrl
 */
const createTicket = (principalTitle, secundaryTitle, date, products, finalText, imgUrl) =>{
    let ticket = '';
    let img ='';
    if(imgUrl){
        img =`<img src="${imgUrl}" alt="Logotipo">`
    }
    ticket +=`
        <div class="ticket">
            ${img}
            <p class="centrado">${principalTitle}
                <br>${secundaryTitle}
                <br>${date}</p>
            <table>
                <thead>
                    <tr>
                        <th class="cantidad">Cant</th>
                        <th class="producto">Descripción</th>
                        <th class="precio">Precio</th>
                        <th class="precio">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${createProducts(products)}
                </tbody>
            </table>
            <p class="centrado" style="">
                ${finalText}
            </p>
            <p style="padding-top: 8em">.</p>
        </div> `
    return ticket
}
const createProducts = (products) =>{

    let productsHtml = ''
    let totalPrice = 0
    for (let index = 0; index < products.length; index++) {
        const element = products[index];
        totalPrice += element.price
        productsHtml += `
            <tr>
                <td class="cantidad">${element.quantity}</td>
                <td class="producto">${element.product}</td>
                <td class="precio">${element.price}</td>
                <td class="precio">${element.price * element.quantity}</td>
            </tr>
        `
    }

    productsHtml += `
        <tr>
            <td class="cantidad"></td>
            <td class="producto">TOTAL</td>
            <td class="precio"></td>
            <td class="precio">${totalPrice}€</td>
        </tr>`
    return productsHtml
}
module.exports = { createPrintWindow, createTicket }
