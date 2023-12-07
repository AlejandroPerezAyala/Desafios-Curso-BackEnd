import { Router } from "express";
import userModel from "../dao/models/user.model.js";


const router = Router()

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    if(email === "adminCoder@coder.com" && password === "adminCod3r123") {
        
        const user = {
            first_name: "Coder",
            last_name: "House",
            email: email, 
            password: password, 
            rol: "admin"
        }

        req.session.user = user
        res.redirect("/home/products")
    } else {
        const user = await userModel.findOne({email, password})
        if(!user) return res.status(404).send("User not found")
        user.rol = "usuario"
        
        req.session.user = user
        res.redirect("/home/products")
    }
    
})

router.post('/register', async (req, res) => {
    const user = req.body
    await userModel.create(user)
    res.redirect("/home/login")
})

router.get('/logout', async (req,res) => {
    req.session.destroy(err => {
        if(err) return res.send("error al hacer el logout" + err)

        res.redirect("/home/login")
    })
})

export default router