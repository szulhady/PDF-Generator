const express = require('express')
const port = process.env.port || 3000
const path = require('path')
const ejs = require('ejs')
const pdf = require('html-pdf')
const app = express()

// Set the view engine to ejs
app.set('view engine', 'ejs')
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// app.get('/', (req,res)=>{
//   res.json({
//     name:'PDF Generator',
//     description:'Generate pdf file'
//   })
// })

app.get('/',(req,res)=>{
  res.render(path.join(__dirname,'./index.ejs'))
})

app.post('/pdf',(req,res)=>{
  ejs.renderFile(path.join(__dirname, './Borang profile bangunan.ejs'), {name:req.body.name, id:req.body.id}, (err,data)=>{
    if(err){
      console.log(err)
    }else{
      let options = {
        "height": "250mm",
        "width": "170mm",
        "header": {
            "height": "5mm"
        },
        "footer": {
            "height": "5mm",
        },
      }
      pdf.create(data, options).toFile('report.pdf', (err,data)=>{
        if(err){
          res.send(err)
        }else{
          res.download('report.pdf')
        }
      })
    }
  })
})


// app.post('/pdf',(req,res)=>{
//   const {name,id} = req.body
//   // console.log(req.body)
//   res.send('Success')
// })
app.listen(port,()=>{
  console.log(`Server running on port ${port}...`)
})