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
        if(this.upcDataLength<=14){
            addLeadingZeros=upcData.padStart(18, '0')
        }else{
            console.log('upc exceeds 13digits')
        }
          
         return addLeadingZeros
    }

    getItemBySku = async(barcode) => { 
        //const {data:result} = await axios.get(`/api/get/item/${barcode}`,{params:{code:this.currentCode.value}})
        try{
            const {data:result} = await axios.get(`/api/get/item/${barcode}`)
            this.data = result    
            for(const data of result)
            {   
                console.log(data.short_descr)      
                $('#short_descr').html(data.short_descr)
                $('#price').html('P'+ numberWithCommas(parseFloat(data.price).toFixed(2)))
                $('#actual_barcode').html(data.upc)
                document.getElementById("upc_barcode").value = "";
            }
            
        }catch({response:err}){
            showAlert('Warning!', 'Invalid Code', 'warning')
            $('#short_descr').html('Not Found!')
            $('#price').html('--')
            $('#actual_barcode').html('--')
            document.getElementById("upc_barcode").value = "";
        }
    }
}
