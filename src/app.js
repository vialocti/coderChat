import express from 'express'
import {Server} from 'socket.io'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'

//
const PORT = 8080
const app = express()
//
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
//
app.engine('handlebars',handlebars.engine())
app.set('views', 'src/views')
app.set('view engine', 'handlebars')
//
app.use('/', viewsRouter)
//
const httpSever = app.listen(PORT, ()=>{
    console.log('running server')
})

const io = new Server(httpSever)
let messages=[]
io.on('connect', socket=>{
    console.log('Usuario Conectado')

    socket.on('newuser',data=>{
        socket.broadcast.emit('notificacion', data)
    })

    socket.on('message',data=>{
      
        messages.push(data)
        io.emit('messageslogs', messages)
    })

})

