const fs = require('fs');
const express = require('express');
const morgan= require('morgan')
const app = express();
const port = 3000;
const pool = require('./db');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));





app.get('/',(req,res)=>{ 
    // fs.readFile(`./crud.html`,(data,err)=>{
    //     console.log(data);
    //     res.send(data);
    // })});
  res.send(`<!DOCTYPE html>
   <html lang="en">
   <head>
       <meta m  charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
       <style>
    .text{
        border-radius: 5px;
    }
    .updatebutton{
        background:blue;
        border-radius: 10px;
    }
    .update1{
        width:80px;
        border-radius:5px;
       }
    .text1{
        border-radius: 5px
    }
    .box{
        background: orange;
        width: 450px;
        height: 200px;
    }
    .box2{
        margin-top: 60px;
        width: 450px;
        height: 70px;
        background: blue;
    }
    .get{ 
        background: greenyellow;
    } 
    .add{
        background: yellow;
        border-radius: 10px;
    }
    .update{
        background: blue;
    }
    .delete{
        border-radius: 10px;
        background: red;
    }
    </style>

   </head>
   <body>
    <div class="box">
       <form action="/myschool/get" method="get">
       <input class="get" type="submit" value="get">
       </form>
       <form action="/myschool/create" method="post">
       <label for="add">ADD:</label>
       <input class="text" type="text" name="add" id="add">
        <input class="add" type="submit" value="ADD">
        </form>
        <form action="/myschool/delete" method="delete">
        <label for="delete">DEL:</label>
        <input class="text1" type="text" >
        <input class="delete" type="submit" value="DELETE">
        </form>
        <form action="update" method="put">
        <label for="update">OLD VALUE:</label>
        <input class="update1" type="text" "id"="oldvalue">
        <label for="update">NEW VALUE:</label>
        <input class="update1" type="text" "id"="newvalue">
        <input class="updatebutton" type="submit" value="UPDATE">
        </form>
        <div class="box2"></div>
    </div>
   </body> 
   </html>`);
});

//get all todo
app.get('/myschool/get',async(req,res)=>{
    try{
        const allschool = await pool.query('select * from myschooltable');
        res.json(allschool.rows);
    }catch(err){
        console.log(err.message);
    }
    //res.send('<h1>i am here hello from the server</h1>')
});

//get a todo
app.get('/myschool/:id',async(req,res)=>{
    const {id}= req.params;
    try{
        const school = await pool.query('select * from myschooltable where st_id=$1',[id]);
        res.json(school.rows[0]);
    }catch(err){
        console.log(err.message);
    }
    //res.send('<h1>i am here hello from the server</h1>')
});


//create todo
app.post('/myschool/create', async(req,res)=>{
    try{
        const {description} = req.body.create;
        const newschool= await pool.query('insert into myschooltable (st_age,st_course,st_reg) values ($1,$2,$3) returning *',
        [description]
        );
        res.redirect('/myschool/get');

    }catch(err){
        console.log(err.message)
    }
});
//updata todo
app.put('/myschool/update:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const {description}=req.body;

        const updateschool = await pool.query(`update todotable set  (st_age,st_course,st_reg)= '${req.body.newvalue}' where (st_age,st_course,st_reg)='${req.body.oldvalue}'`
        );
        res.json('myschooltable was updated');

    }catch(err){
         console.log(err.message)
    }
})

//delete todo
 app.delete('/myschool/delete',async(req,res)=>{
    try{
        const {id} = req.params;
        const deleteschool= await pool.query(`delete from myschooltable where st_id=${req.body.delete}`);
        res.redirect('/myschool/get');
        console.log(`data at id:${id} deleted`);
    }catch(err){
        console.log(err.meassage)
    }
 })

app.listen(port,()=>console.log(`running on port ${port}`));