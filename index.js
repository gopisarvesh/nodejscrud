var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mysql=require('mysql');
var port=4000;

app.use(bodyParser());

var pool=mysql.createPool({
    connectionLimit:10,
    host:"localhost",
    username:"root",
    password:"root",
    database:"nodejscrud"

})
//fetching all records
app.get('/users',(req,res)=>{
    pool.query("select * from users order by id desc",(error,results)=>{
        if(error) return error;
        res.send(results);
    })
})
//fetching single record
app.get('/users/:id',(req,res)=>{
    pool.query("select * from users where id=?",[req.params.id],(error,results)=>{
        if(error) return error;
        res.send(results);
    })
})

//save records
app.post('/users',(req,res)=>{
    pool.query("insert into users SET ?",req.body,(error,results)=>{
        if(error) return error;
        res.send("Data inserted"+results.insertedId);
    })
})

//update records
app.put('/users/:id',(req,res)=>{
    pool.query("update users SET ? where id=?",[req.body,id],(error,results)=>{
        if(error) return error;
        res.send("Data updated"+id);
    })
})

//delete records
app.delete('/users/:id',(req,res)=>{
    pool.query("delete from users where id=?",[req.params,id],(error,results)=>{
        if(error) return error;
        res.send("Data deleted");
    })
})

app.listen(port,()=>{
    console.log("Server is running on port no "+port);
})
