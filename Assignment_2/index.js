const fs=require('fs');
const http=require('http');

fs.readFile("./index.html", 'utf-8', (err, data)=>{
    const server=http.createServer((req,res)=>{
        res.end(data)
    })
    server.listen(5000, '127.0.0.1', ()=>{
        console.log("listening")
    })
} )

