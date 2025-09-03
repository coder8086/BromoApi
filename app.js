const express = require('express')

const app = express();

//midele ware 

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Hello express")
})

app.post('/register',(req,res)=>{
    const {username,email,password} = req.body
    console.log(req.body)
    res.send("data send")
})

app.listen(3000,()=>{
    console.log("Server listing at port 3000");
})