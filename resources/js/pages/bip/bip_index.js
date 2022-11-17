const { default: axios } = require("axios")
const { compact } = require("lodash")

void new class BipIndex{

    constructor()
    {
        this.initialization()
        this.eventHandler()
    }

    initialization = () => { 
       
    }
    eventHandler = () => { 
      
        document.querySelector('#upc_barcode').addEventListener('keydown',(e) => { 
            console.log(e.which)
            let upcData = (e.target.value == null ? '' : e.target.value)
            if(e.which == 13){
                this.upcData = upcData
                console.log(this.convertData(upcData))
                this.getItemBySku(this.convertData(upcData))
            }

        })

    }


    convertData = (upcData) => {
        this.upcDataLength = upcData.length
        let addLeadingZeros = ''
        switch(this.upcDataLength) {
            case 7: {
                addLeadingZeros=upcData.padStart(9, '0')
               break;
            }
            case 8: {
                addLeadingZeros=upcData.padStart(18, '0')
               break;
            }
            case 12: {
                addLeadingZeros=upcData.padStart(18, '0')
                break;
             }
             case 13: {
                addLeadingZeros=upcData.padStart(18, '0')
                break;
             }
            default: {
               //statements;
               break;
            }
         }

         return addLeadingZeros
    }

    getItemBySku = async(barcode) => { 
        //const {data:result} = await axios.get(`/api/get/item/${barcode}`,{params:{code:this.currentCode.value}})
        const {data:result} = await axios.get(`/api/get/item/${barcode}`)
        this.data = result 
        if(result == ''){
            $('#short_descr').html('Not Found!')
            $('#price').html('--')
            $('#actual_barcode').html('--')
            document.getElementById("upc_barcode").value = "";
        }else{
            for(const data of result)
            {   
                console.log(data.short_descr)      
                $('#short_descr').html(data.short_descr)
                $('#price').html('P'+ numberWithCommas(parseFloat(data.price).toFixed(2)))
                $('#actual_barcode').html(data.upc)
                document.getElementById("upc_barcode").value = "";
            }
        }
    }
}
