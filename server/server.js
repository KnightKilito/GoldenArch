const express=require('express')
const bodyParser =require('body-parser')
const app=express()
const mysql = require('mysql')
app.use(bodyParser.json())

//处理post请求
app.post('/getGoods',(req,res)=>{
  //console.log(req.body)	// 客户端请求的传参data数据
  //const openid=req.body.openid
  var connection=mysql.createConnection({
    host:'localhost',
    port: 3306,		//端口号
    user:'root',
    password:'123456',
    database:'wx_goldenarch'
  })
  connection.connect();
  //where openid='"+openid+"'"
  connection.query("select * from goods ",function(error,results,fields){
    if(error) console.log(error);
    res.json(results)
    console.log(results)
    
  })
  connection.end();
  
})

app.get('/',(req,res)=>{
  var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'wx_goldenarch'
  });
  connection.connect();
  connection.query('select * from goods',function(error,results,fields){
   if(error) console.log(error);
   res.json(results)
  })
  connection.end();
})

app.listen(3000,()=>{
  console.log('server running at http://127.0.0.1:3000')
})
