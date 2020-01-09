# lastUpdate
    added template for a ticket printer
# electronPrinter!
https://www.npmjs.com/package/electronsimpleprinter
## use

    const { createPrintWindow } =  require('electronPrinter') 


    createPrintWindow({
    
    html: args.html,
    
    cssUrl:  '../../resources/css/tablas-printer.css',
    
    css: args.css,
    
    mainWindow: win,
    
    config: ['timePrinter', 'hiddenWindow']
    
    })
## thermalprinter Use

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
        config: ['thermalprinter']
        
    })

## config params

- timePrinter: agregar hora a la impresión
- hiddenWindow: no mostrar vista previa de la impresión
- thermalprinter : the objetive printer is thermalprinter
  
## mandatory parameters

- html
