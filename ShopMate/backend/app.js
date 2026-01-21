const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT;
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const cors=require('cors')

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/adi')
}
main().then(()=>console.log("Connect to DB"))


app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))

const userRouter=require('./routes/user.route')
const productRouter=require('./routes/product.route')


app.get('/', (req, res) => {
    res.send("Hi i am Root");
    
});

app.use('/api/auth',userRouter)
app.use('/api/product', productRouter)


app.listen(port, () => {
    console.log("Server start at 8080 port");
})