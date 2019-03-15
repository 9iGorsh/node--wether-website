console.log('Client side Javascript is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })

const submit =document.querySelector('form')
const search =document.querySelector('input')
const msgeOne =document.querySelector('#msge-1')
const msgeTwo =document.querySelector('#msge-2')

submit.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location =search.value

    msgeOne.textContent ='Loading ...'
    msgeTwo.textContent =''
    const url =`http://localhost:3000/weather?address=${location}`
    fetch(url).then((response) =>{
        response.json().then((data) =>{
            //console.log(data)
            if(data.error){
                //console.log(data.error)
                msgeOne.textContent =data.error
            }else{
                // console.log(data.location)
                // console.log(data.forecast)
                msgeOne.textContent =data.location
                msgeTwo.textContent =data.forecast
            }
        })
    })
})