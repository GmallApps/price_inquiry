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

    getClarionDate = () => {
        // Get the current date
        const currentDate = new Date();
        
        // Calculate the number of days since the Clarion epoch (December 28, 1800)
        const daysSinceClarionEpoch = Math.floor((currentDate.getTime() - new Date(1800, 11, 28).getTime()) / (24 * 60 * 60 * 1000))
        
        // Convert the number of days to a Clarion date format (YYYYMMDD)
        const clarionDate = (daysSinceClarionEpoch + 657072).toString()
        


        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let day = currentDate.getDate();
        day = day < 10 ? '0' + day : day;
        let formattedDate = year.toString() + month.toString() + day.toString();

        let dateString = "20230322"; // YYYYMMDD format
        let year2 = parseInt(dateString.substring(0, 4));
        let month2 = parseInt(dateString.substring(4, 6));
        let day2 = parseInt(dateString.substring(6, 8));
        let clarionDate2 = (year2 - 1800) * 10000 + month2 * 100 + day2 - 1;


        // Clarion date value
        const clarionDate3 = 81167;

        // Add the number of days to December 28th, 1800
        const baseDate = new Date("1800-12-28");
        const clarionDate4 = new Date(baseDate.getTime() + clarionDate3 * 86400000);

        // Format as YYYY-MM-DD
        const formattedDate3 = clarionDate4.toISOString().slice(0, 10);



        return clarionDate
    }

    getItemBySku = async(barcode) => { 
        //const {data:result} = await axios.get(`/api/get/item/${barcode}`,{params:{code:this.currentCode.value}})
        try{
            const {data:result} = await axios.get(`/api/get/item/${barcode}`)
            this.data = result    
            for(const data of result)
            {   
                console.log(data.short_descr)      
                console.log(`start : ${data.start_date}`)  
                console.log(`end : ${data.stop_date}`)  
                console.log(`current date clarion : ${this.getClarionDate()}`) 
                $('#short_descr').html(data.short_descr)
                $('#price').html('P'+ numberWithCommas(parseFloat(data.price).toFixed(2)))
                $('#actual_barcode').html(data.upc)
                if(typeof data.start_date === 'undefined'){
                    const price_before = document.getElementById("price_before");
                    price_before.style.display = "none";
                }else{
                    const p_before = parseFloat(data.before);
                    const num = p_before.toFixed(2);
                    const price_before = document.getElementById("price_before");
                    price_before.style.display = "";
                    $('#price_before').html(`BEFORE : PHP ${num}`)
                }
                    
                document.getElementById("upc_barcode").value = "";
            }
            
        }catch({response:err}){
            //showAlert('Warning!', 'Invalid Code', 'warning')
            $('#short_descr').html('Not Found!')
            $('#price').html('--')
            $('#actual_barcode').html('--')
            document.getElementById("upc_barcode").value = "";
        }
    }
}
