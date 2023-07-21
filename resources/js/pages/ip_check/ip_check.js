const { default: axios } = require("axios")
const { compact } = require("lodash")



void new class IpCheck{

    constructor()
    {
        this.ip= document.querySelector('#ip')

        this.initialization()

    }

    initialization = () => { 
        
        this.getIpAddress()

    }

    getIpAddress = () => {

        axios.get(`/get_ipaddress/`)

        .then((response) => {

            let data  = response.data

            console.log(data);

            this.ip.innerHTML = data

        })
        .catch((err) =>{

            console.log(err)
            
        })
    }

}
