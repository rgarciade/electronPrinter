# electronPrinter!
## use

    const { createPrintWindow } =  require('electronPrinter') 


    createPrintWindow({
    
    html: args.html,
    
    cssUrl:  '../../resources/css/tablas-printer.css',
    
    css: args.css,
    
    mainWindow: win,
    
    config: ['timePrinter', 'hiddenWindow']
    
    })
## config params

- timePrinter: agregar hora a la impresión
- hiddenWindow: no mostrar vista previa de la impresión
  
## mandatory parameters

- html