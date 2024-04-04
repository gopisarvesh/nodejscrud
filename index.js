var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mysql=require('mysql');
var port=4000;

app.use(bodyParser.json());

var pool=mysql.createPool({
    connectionLimit:10,
    host:"localhost",
    user:"root",
    password:"root",
    database:"nodejscrud"

})
pool.getConnection((err,connection)=> {
    if(err)
    throw err;
    console.log('Database connected successfully');
    connection.release();
  });
//fetching all records
app.get('/users',(req,res)=>{
    
    pool.query("select * from users",(error,results)=>{
        if(error) return error;    
        res.send(results);
        
    })
})
//fetching single record
app.get('/singleusers/:id',(req,res)=>{
    pool.query("select * from users where id=?",[req.params.id],(error,results)=>{
        if(error) return error;
        res.send(results);
    })
})

//save records
app.post('/saveusers',(req,res)=>{
    pool.query("insert into users SET ?",req.body,(error,results)=>{
        if(error) return error;
        res.send("Data inserted");
    })
})

//update records
app.put('/updateusers/:id',(req,res)=>{
    pool.query("update users SET ? where id=?",[req.body,req.params.id],(error,results)=>{
        if(error) return error;
        res.send("Data updated");
    })
})

//delete records
app.delete('/deleteusers/:id',(req,res)=>{
    pool.query("delete from users where id=?",[req.params.id],(error,results)=>{
        if(error) return error;
        res.send("Data deleted");
    })
})

app.listen(port,()=>{
    console.log("Server is running on port no "+port);
})
