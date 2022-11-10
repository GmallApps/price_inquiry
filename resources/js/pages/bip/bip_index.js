const { default: axios } = require("axios")
const { compact } = require("lodash")

void new class BipIndex{

    constructor()
    {
        this.initialization()
        this.eventHandler()
    }

    initialization = () => { 
        this.bipForm = document.querySelector('#kt_form')
        this.currentCode = document.querySelector('#store_code')
        
    }
    eventHandler = () => { 
      
        document.querySelector('#upc_barcode').addEventListener('keydown',(e) => { 
            console.log(e.which)
            let upcData = (e.target.value == null ? '' : e.target.value)
            //this.upcData = upcData
            if(e.which == 13){
                this.upcData = this.passData()
                console.log(upcData)
                this.getItemBySku(upcData)
            }

        })

    }

    passData = ()=> {
        let input2 = document.getElementById("upc_barcode").value;
        $('#upc_dummy').val(input2)
        let input3 = document.getElementById("upc_dummy").value;
        return input3;
    }

    getItemBySku = async(barcode) => { 
        const {data:result} = await axios.get(`/api/get/item/${barcode}`,{params:{code:this.currentCode.value}})
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
