const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const User = require('./Models/User')
const port = 3001
const jwt = require('jsonwebtoken')
require('dotenv').config()
const compression = require('compression')
const cloudinary = require('./cloudinary.js')
const bodyParser = require('body-parser')

app.use(compression())
app.use(cors())
// app.use(express.json())
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://sgurarpit:gurarpitsingh@cluster0.mb8t4k0.mongodb.net/?retryWrites=true&w=majority',() => {
    console.log("Connected to DB")
})

var jsonParser = bodyParser.json({limit:1024*1024*10, type:'application/json'}); 
var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*10,type:'application/x-www-form-urlencoded' });
app.use(jsonParser);
app.use(urlencodedParser);







app.post('/api/updateInfo', async (req, res) => {
    const [name, lastName, phone, token] = [req.body.name, req.body.lastName, req.body.phone, req.body.token]
    if(!name || !lastName) {
        console.log("Please fill Mandate Fields");
        res.status(400).json({
            message: "Please fill Mandate Fields"
        })
    }else{
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // console.log(decoded);
            const user = await User.findOne({_id: decoded._id})
            if(user) {
                user.name = name
                user.lastName = lastName
                user.phone = phone
                user.save()
                res.status(200).json({
                    message: "User updated successfully"
                })
            }else{
                res.status(400).json({
                    message: "User does not exist"
                })
            }

        }
        catch(err) {
            console.log(err);
    }
}
})

 

app.post('/api/register', async (req, res) => {
    
        const [name, email, password, dob, username] = [req.body.name, req.body.email, req.body.password, req.body.dob, req.body.username]
        if(!name || !email || !password || !dob || !username) {
            // console.log("Please fill all the fields");
            res.status(400).json({
                message: "Please fill all the fields"
            })
        }else{
        try{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob,
        username: req.body.username
    })

    user.save()
    res.status(200).json({
        message: "User registered successfully"
    })
} catch(err) {
    res.status(400).json({
        message: "User already exists"
    })}
}

})


app.post('/api/login', async (req, res) => {
    const [username, password] = [req.body.username, req.body.password]
    if(!username || !password) {
        // console.log("Please fill all the fields");
        res.status(400).json({
            message: "Please fill all the fields"
        })
    }else{
        try {
            // console.log(username);
            const user = await User.findOne({username: username})
            // console.log(user);
            if(password === user.password) {
                // console.log('han han');
                const token = jwt.sign({_id: user._id}, 'secretkey12345')
                res.status(200).json({
                    message: "User logged in successfully", status: true, token: token, username: user.username
                })
            }else{
                // console.log('try1');
                res.status(400).json({
                    message: "Invalid Credentials", status: false
                })
            }
        } catch (error) {
            // console.log('try2');
            res.status(400).json({
                message: "Invalid Credentials", status: false
            }) 
        }}})


app.post('/api/verify', async (req, res) => {
    const token = req.body.token
    try {
        const verified = await jwt.verify(token, "secretkey12345")
        if(verified) {
            // console.log(verified);
            const user = await User.findOne({_id: verified._id})
            res.status(200).json({
                message: "User verified successfully",
                user: user
            })
        }
        else{
            res.status(400).json({
                message: "User not verified"
            })
        }

    } catch (error) {
        
    }
})

app.post('/api/updateAbout', async (req, res) => {
    const [token, about] = [req.body.token, req.body.about]
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        const update = await User.findOneAndUpdate({_id: decoded._id}, {about: about})
        res.status(200).json({
            message: "About updated successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "About not updated"
        })
    }
})
app.post('/api/updateWebLinks', async (req, res) => {
    const [token, linkedin, github, twitter, instagram, facebook, website] = [req.body.token, req.body.linkedin, req.body.github, req.body.twitter, req.body.instagram, req.body.facebook, req.body.website]
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        const update = await User.findOneAndUpdate({_id: decoded._id}, {linkedin, github, twitter, instagram, facebook, website})
        res.status(200).json({
            message: "About updated successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "About not updated"
        })
    }
})


app.post('/api/updateProfessionalInfo', async (req, res) => {
    const [token, highestEducation, job] = [req.body.token, req.body.highestEducation, req.body.job]
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        const update = await User.findOneAndUpdate({_id: decoded._id}, {highestEducation, job})
        res.status(200).json({
            message: "Professional Info updated successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "Professional Info not updated"
        })
    }
})

app.post('/api/updatePassword', async (req, res) => {
    const [token, password] = [req.body.token, req.body.password]
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);

        const update = await User.findOneAndUpdate({_id: decoded._id}, {password: password})
        res.status(200).json({
            message: "Password updated successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: "Password not updated"
        })
    }
})



app.post('/api/updateProfilePic', async (req, res) => {
    const [token, profilePic] = [req.body.token, req.body.profilePic]
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        console.log(profilePic);
        const result = await cloudinary.uploader.upload(profilePic, {   
            folder: "profilePic"
        })

        const update = await User.findOneAndUpdate({_id: decoded._id}, {image: {public_id: result.public_id , url: result.secure_url}})
        res.status(200).json({
            message: "Profile Pic updated successfully"
        })
    }
    catch(err) {
        console.log(err);
        res.status(400).json({
            message: "Profile Pic not updated"
        })

    }
})




app.listen(port, () => {
    console.log(`App listening at Port: ${port}`)
})