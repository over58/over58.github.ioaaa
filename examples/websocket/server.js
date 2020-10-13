const express = require('express')
const websocketServer = require('ws').Server

const PORT = process.env.PORT || 3000
const server = express().listen(PORT, () =>{
    console.log(`Listening on ${PORT}`)
}) 

const wsServer = new websocketServer({server})

wsServer.on('connection', (ws) =>{
    console.log('add one connection')
    ws.on('message', (data) =>{
        console.log(wsServer.clients)
        // data 是客户端发过来的信息,单个回复发送者
        console.log('reply from server', data)
        ws.send(data)
    })



    const showNowTime = setInterval(() => {
        ws.send(
            JSON.stringify({
                type: 'time',
                data: Date.now()
            })
        )
    }, 1000);


    ws.on('close', () => {
        console.log('CONNECTION closed')
    })
})