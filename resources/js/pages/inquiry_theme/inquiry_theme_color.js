const { default: axios } = require("axios")
const { compact } = require("lodash")

void new class ThemeColor{

    constructor()
    {
        this.initialization()
        console.log('hahaha')
        this.eventHandler()
    }

    initialization = () => { 
       console.log('test color');
    }
    eventHandler = () => { 
      
    }

}
