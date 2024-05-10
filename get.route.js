const express= require ("express");
const Router= express.Router();
const Get= require('./get.module')
const bodyParser= require('body-parser');
const app = express();
const validator = require('validator');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/Get',Router);
Router.post('/', async(req,res)=>{
    const {firstname,lastname,email,number,message}= req.body;
    if(!firstname || !lastname || !email || !number||!message){
        return res.status(400).json({message:'All fields are require'});    
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
    
      // Additional validation for name (letters and spaces only)
      if (!validator.isAlpha(firstname.replace(/\s/g, '')) || !validator.isAlpha(lastname.replace(/\s/g, ''))) {
        return res.status(400).json({ message: 'Invalid name format' });
      }
if(!validator.isNumeric(number.toString())||(number.toString().length!==10)){
    return res.status(400).json({message:'Invalid number formate. Must be 10 digits'});
}
    const newUser = new Get({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        number:req.body.number,
        message:req.body.message
    });
    try{
const result = await newUser.save();
res.json({message: 'Data saved successfully'});
    } catch (err){
        console.error('error saving user to database :',err);
        res.status(500).json({message:'error saving user to database', error:err});
    }
});
module.exports = Router;