import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';


//variables
const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

//webserver 
app.get('/', (req,res)=> {
    res.send("budget app backend server");
  })

//connection
const CONNECTION_URL = 'mongodb+srv://alvinxjm:Alvin12345@cluster0.7q3iu.mongodb.net/backend?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

//mongodb connection
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));