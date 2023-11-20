
const submitButton = document.getElementById('submit-button')
const form = document.getElementById('form1')

form.addEventListener('submit',registerFunction)


async function registerFunction(e){
    e.preventDefault();

    const username = document.getElementById('username-id').value
    const password = document.getElementById('password-id').value
    
    const result =  await fetch('/api/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then(res=> res.json())
    .catch(error=> {
        console.log(error)
    }) 

    if(result.status === 'ok'){
       alert('success')     
       localStorage.setItem(result.data)
       console.log(result.data)
    }
    else{
        alert(result.error)
    }
    
    
}
