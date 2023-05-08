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
                console.log(this.convertData(upcData));
                const current_date = document.querySelector('#current_date').value;
                console.log(`current date : ${current_date}`); 

                // const today = new Date();
                // const year = today.getFullYear();
                // const month = String(today.getMonth() + 1).padStart(2, '0');
                // const day = String(today.getDate()).padStart(2, '0');
                // const current_date = `${year}-${month}-${day}`;

                this.getItemBySku(this.convertData(upcData),current_date);
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


    getItemBySku = async(barcode,current_date) => {  
        //const {data:result} = await axios.get(`/api/get/item/${barcode}`,{params:{code:this.currentCode.value}})
        const sale_price = document.getElementById("sale_price");
        const sale_term = document.getElementById("sale_term");
        
        $('#price').html('--')
        $('#actual_barcode').html('--')
        document.getElementById("upc_barcode").value = "";
        sale_price.style.display = "none";
        sale_term.style.display = "none";
        
        try{
            const {data:result} = await axios.get(`/api/get/item/${barcode}?current_date=${current_date}`);
            
            this.data = result    
            for(const data of result)
            {   
                console.log(data.short_descr)      
                console.log(`start : ${data.start_date}`)  
                console.log(`end : ${data.stop_date}`)  
                $('#short_descr').html(data.short_descr)
                $('#actual_barcode').html(data.upc)
                
                if(typeof data.start_date === 'undefined'){
                    sale_price.style.display = "none";
                    sale_term.style.display = "none";
                    $('#price').html('P'+ numberWithCommas(parseFloat(data.price).toFixed(2)))
                }else{
                    const p_before = parseFloat(data.before);
                    const num = p_before.toFixed(2);
                    sale_price.style.display = "";
                    sale_term.style.display = "";
                    $('#price').html('P'+ numberWithCommas(num))
                    $('#sale_term').html(`Sale Price : `);
                    $('#sale_price').html(`PHP ${parseFloat(data.price).toFixed(2)}`);
                }
                    
                document.getElementById("upc_barcode").value = "";
            }
            
        }catch({response:err}){
            //showAlert('Warning!', 'Invalid Code', 'warning')
            $('#short_descr').html('Not Found!')
            $('#price').html('--')
            $('#actual_barcode').html('--')
            document.getElementById("upc_barcode").value = "";
            sale_price.style.display = "none";
            sale_term.style.display = "none";
        }
    }
}
