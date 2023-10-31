import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
import { uploader } from "../utils.js";
import { socketServer } from "../app.js";

const router = Router()
const productManager = new ProductManager()

router.get('/', async (req, res) => {
    try{
        const limit = parseInt(req.query?.limit)
        const products = await productManager.getProducts(limit)
        res.render('home',{
            style: 'style.css',
            products
        })

    } catch (err) {
        res.status(500).send("Error al obtener los productos" + err)
    }  
})

router.get('/realtimeproducts', async (req, res) => {
    try{
        const limit = parseInt(req.query?.limit)
        const products = await productManager.getProducts(limit)
        res.render('realTimeProducts',{
            style: 'style.css',
            products
        })

    } catch (err) {
        res.status(500).send("Error al obtener los productos" + err)
    }  
})

router.post('/realtimeproducts', uploader.single('thumbnail'), async (req, res) => {
    try{

        const data = req.body
        const filename = req.file.filename

        data.thumbnail = `http://localhost:8080/static/images/${filename}`
        const producto = await productManager.getAddProducts(data)
        socketServer.emit('products', producto.res)
        res.json(producto.res)
        
    } catch (err) {
        console.log("Error al cargar el producto: " + err)
    }

})

export default router