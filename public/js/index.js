const socket=io()

let username

Swal.fire({
    title:'Ingrese su nombre',
    input:'text',
    inputValidator:(value)=>{
        if(!value){return 'ingresa tu usuario'}
    }
})
.then(data=>{
    username=data.value
    socket.emit('newuser', username)
})


const inputData = document.getElementById('inputData')
const outPutData= document.getElementById('outPutData')

inputData.addEventListener('keyup', (event)=>{
    
    if(event.key ==='Enter'){
           
        if(!!inputData.value.trim().length>0){
            //console.log(inputData.value)
            socket.emit('message',{user: username, data : inputData.value})
        }
    }
});


//se conecto
socket.on('notificacion', data=>{
    Swal.fire({
        title:"Notificacion",
        text:`${data} Se conecto `
    })
})

socket.on('messageslogs', data=>{
   
        let messages="";    
        data.forEach(element => {
            messages+=`${element.user}, dice:${element.data} <br />`    
        });
        
        outPutData.innerHTML= messages;

    
})