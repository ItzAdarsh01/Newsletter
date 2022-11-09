const express=require("express")
const bodyParser=require("body-parser")
const https=require("https")
const app=express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
const fn=req.body.fname;
const ln=req.body.lname;
const email=req.body.uremail; 
const data={
members:[
    {
        email_address:email,status:"subscribed",merge_fields:{
        FNAME:fn,LNAME:ln
    }
        }
]}
const jsonData=JSON.stringify(data);

const url="https://us11.api.mailchimp.com/3.0/lists/e7ab75ff4c";

const options={
    method:"POST",
    auth:"kasaudhan:06976e30aea2653018b7dd1420c8db26-us11"
}

const request=https.request(url,options,function(response){
    if(response.statusCode===200)
    {
       res.sendFile(__dirname+"/success.html")
    }
    else{
        res.sendFile(__dirname+"/failure.html")
    }
    response.on("data",function(data){
        console.log(JSON.parse(data))
    })
})
request.write(jsonData);
request.end();
})
app.listen(process.env.PORT || 5500);
//06976e30aea2653018b7dd1420c8db26-us11  -->API key
//e7ab75ff4c                      --> audience ID