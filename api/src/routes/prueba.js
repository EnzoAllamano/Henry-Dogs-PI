const axios = require('axios')

async function traer(){
    let data = await axios.get("https://api.thedogapi.com/v1/breeds/")
    let perros = data.data
    let result = perros.map(p => p.image.width / p.image.height)
    let contC=0, contG=0
    result.forEach(element => {
if(element > 1) contG++
else contC++
    });
    console.log(result + "grandes " + contG + " chicos " + contC)
}

traer()