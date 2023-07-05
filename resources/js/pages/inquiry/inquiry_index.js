const { default: axios } = require("axios")
const { compact } = require("lodash")

void new class BipIndex{

    constructor()
    {
        this.initialization()
        this.eventHandler()
    }

    initialization = () => { 
       this.InquiryBgColor()
       this.InquiryAd()
    }
    eventHandler = () => { 
      
        document.querySelector('#upc_barcode').addEventListener('keydown',(e) => { 
            let upcData = (e.target.value == null ? '' : e.target.value)
            if(e.which == 13){
                this.upcData = upcData
                console.log(this.convertData(upcData));
                // const current_date = document.querySelector('#current_date').value;

                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                const current_date = `${year}-${month}-${day}`;
                console.log(`current date : ${current_date}`); 

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

    InquiryBgColor = () => {

        axios.get(`/bg_color/`)

        .then((response) => {

            let data  = response.data

        console.log(data.code);

        $('.bg_gmall').css('background-color', data.code)

        })
        .catch((err) =>{

            console.log(err)

        })
    }

    InquiryAd = () => {

        axios.get(`/inquiry_ad/`)

        .then((response) => {

            let data  = response.data

            const ad_file = data.file

            const imagePath = `assets/ad_files/${ad_file}`

            const split_file = ad_file.split('.')

            const file_ext = split_file[1]

            console.log(`add file : ${ad_file}`)

            console.log(file_ext)

            switch (file_ext) {
            case 'mp4':
                    $('#ad_media').html(`<video width="100%" loop autoplay="autoplay" class="box">
                        <source src="${imagePath}" type="video/mp4">
                    </video>`)
                break;
            case 'jpg':
                
                break;
            
            case 'gif':
                $('#ad_media').html(`<img width="100%" height="550" src="${imagePath}" alt="advertisement" />`)
                break;
            default:
               
                break;
            }


        })
        .catch((err) =>{

            console.log(err)
            
        })
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
