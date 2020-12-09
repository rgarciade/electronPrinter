# lastUpdate
    added template for a ticket printer
## use

    const { createPrintWindow } =  require('simple-electron-printer-and-thermalprinter') 


    createPrintWindow({
    
    html: args.html,
    
    cssUrl:  '../../resources/css/tablas-printer.css',
    
    css: args.css,
    
    mainWindow: win,

    sheetSize:'A3',
    printerName: 'epson'
    
    config: ['timePrinter', 'hiddenWindow']
    
    })
## thermalprinter Use
    if you use config 'thermalprint', It will look for a printer whose name includes 'tickets', if it finds it it will print silently, if not, it will remove the printing menu
    const { createPrintWindow } =  require('simple-electron-printer-and-thermalprinter') 

    createPrintWindow({

        html: createTicket(
            {
                'initial': [
                    'My shop name', 'C.C. LAS ROZAS (MADRID) 28231 ','CIF :G28984567', '03-01-20 HORA: 18:12:15'
                ]
                ,
                'articles': [
                    {
                        'quantity':12,
                        'product':'pantallasxxxxxxxdddddd',
                        'price':148
                    },
                    {
                        'quantity':3,
                        'product':'raton',
                        'price':14
                    },
                    {
                        'quantity':1,
                        'product':'teclado',
                        'price':5
                    }
                ],
                'final': ['Thanks for your visit'],
                'imgUrl': 'imgurl'
            }
        ),
        printerName:'epson',
        config: ['thermalprinter']
        
    })

## config params

- timePrinter: add time to print
- hiddenWindow: do not show print preview
- pdf: print as pdf in the printer folder of my documents "can add name param to de principal json"
- finishFunction : function that launches after printing the pdf
- thermalprinter : the objetive printer is thermalprinter
  
## mandatory parameters

- html
