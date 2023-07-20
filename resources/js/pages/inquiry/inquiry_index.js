const { default: axios } = require("axios")
const { compact } = require("lodash")



void new class BipIndex{

    constructor()
    {
        this.eventHandler()
        this.initialization()
    }

    initialization = () => { 
        this.InquiryBgColor()
        this.InquiryAd()
        this.InquiryLogo()
        // this.getIpAddress()
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

        console.log('inquiryAd')

        axios.get(`/inquiry_ad/`)

        .then((response) => {

            let data  = response.data

            const ad_file = data.file

            const ad_id = data.id

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

            case 'gif':

                $('#ad_media').html(`<img width="100%" src="${imagePath}" alt="advertisement" />`)

                break;

            default:

            const sliderImagePath = `assets/slider_files/${ad_id}/`;
            const adArray = JSON.parse(ad_file);

            const carouselDiv = document.createElement('div');
            carouselDiv.id = "myCarousel";
            carouselDiv.classList.add("carousel", "slide");
            carouselDiv.setAttribute("data-ride", "carousel");
            carouselDiv.setAttribute("data-interval", "3000");

            const olElement = document.createElement('ol');
            olElement.classList.add("carousel-indicators");

            // Generate the carousel indicators dynamically
            for (let i = 0; i < adArray.length; i++) {
                const liElement = document.createElement('li');
                liElement.setAttribute("data-target", "#myCarousel");
                liElement.setAttribute("data-slide-to", i);
                if (i === 0) {
                    liElement.classList.add("active");
                }
                olElement.appendChild(liElement);
            }
            carouselDiv.appendChild(olElement);

            const innerDiv = document.createElement('div');
            innerDiv.classList.add("carousel-inner");

            // Generate the carousel slides dynamically
            for (let i = 0; i < adArray.length; i++) {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add("carousel-item");
                if (i === 0) {
                    itemDiv.classList.add("active");
                }

                const imgElement = document.createElement('img');
                imgElement.src = `${sliderImagePath + adArray[i]}`;
                imgElement.alt = `Slide ${i + 1}`;
                imgElement.style.width = "100%";

                itemDiv.appendChild(imgElement);
                innerDiv.appendChild(itemDiv);
            }

            carouselDiv.appendChild(innerDiv);

            const leftControlLink = document.createElement('a');
            leftControlLink.classList.add("carousel-control-prev");
            leftControlLink.href = "#myCarousel";
            leftControlLink.setAttribute("role", "button");
            leftControlLink.setAttribute("data-slide", "prev");

            const leftControlSpan = document.createElement('span');
            leftControlSpan.classList.add("carousel-control-prev-icon");
            leftControlSpan.setAttribute("aria-hidden", "true");

            leftControlLink.appendChild(leftControlSpan);
            carouselDiv.appendChild(leftControlLink);

            const rightControlLink = document.createElement('a');
            rightControlLink.classList.add("carousel-control-next");
            rightControlLink.href = "#myCarousel";
            rightControlLink.setAttribute("role", "button");
            rightControlLink.setAttribute("data-slide", "next");

            const rightControlSpan = document.createElement('span');
            rightControlSpan.classList.add("carousel-control-next-icon");
            rightControlSpan.setAttribute("aria-hidden", "true");

            rightControlLink.appendChild(rightControlSpan);
            carouselDiv.appendChild(rightControlLink);

            document.getElementById('ad_media').appendChild(carouselDiv);

            const carousel = new bootstrap.Carousel(document.getElementById('myCarousel'), {
                interval: 3000
            });

            carousel.cycle();

                break;
            }


        })
        .catch((err) =>{

            console.log(err)
            
        })
    }

    InquiryLogo = () => {

        console.log('inquiryLogo')

        axios.get(`/inquiry_logo/`)

        .then((response) => {

            let data  = response.data

            const logo_id = data.id

            const imagePath = `assets/logo_files/customer/${logo_id}.png`

            $('#customer_logo').html(`<img width="80%" src="${imagePath}" alt="logo" />`)

        })
        .catch((err) =>{

            console.log(err)
            
        })
    }

    getIpAddress = () => {
        axios.get(`/get_ipaddress/`)

        .then((response) => {

            let data  = response.data

            console.log(data);

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
