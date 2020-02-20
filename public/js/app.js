console.log('Client side...')
const weaherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

msg1.textContent = 'From Javascript'
weaherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    fetch('/weather?address=' + location).then((res) => {
    res.json().then((data) => {
        console.log(data)
        if(data.error){
            msg1.textContent = 'From Javascript'
        }else{
        msg1.textContent = data.location
        msg2.textContent = data.forecast 
        }
    })
})
    //console.log(location)
})