//Importamos FS
const fs = require('fs')

//creo la clase 
class ProductManager {
    constructor (){
        this.path = "./productos/productos.json"
        this.products = []
    }

    //Validacion para que el codigo no se repita
    validateCode = async (code) => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        this.products = JSON.parse(data)

        return this.products.some((producto) => producto.code == code)

    }

    //muestro los priductos
    getProducts =  async () => {
        try{
            if(!fs.existsSync(this.path)) return this.products

            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)
            return this.products

        } catch (err) {
            return err
        }
        
    }

    //agrego 1 producto
    getAddProducts = async (producto) => {

        try{ 
            if(!fs.existsSync(this.path)) {
            //Valido que haya ingresado todos los campos ya que son obligatorios
                if(!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
                    return "Te falto algun dato"
                }
                
                //creo el producto
                const product = {
                    id: this.products.length + 1,
                    title: producto.title,
                    description: producto.description,
                    price: producto.price,
                    thumbnail: producto.thumbnail,
                    code: producto.code,
                    stock: producto.stock
                }

                this.products.push(product)

                await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,'\t'))
                return "Se Creo el producto correctamente"
            } 

            //Tomo los datos del .JSON
            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)

            //Valido que no se repita el codigo
            const validacion = await this.validateCode(producto.code)
            if (validacion){
                return "El producto ya existe"
            } 

            //Valido que haya ingresado todos los campos ya que son obligatorios
            if(!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
                return "Te falto algun dato"
            }
            
            //creo el producto
            const product = {
                id: this.products.length + 1,
                title: producto.title,
                description: producto.description,
                price: producto.price,
                thumbnail: producto.thumbnail,
                code: producto.code,
                stock: producto.stock
            }

            //Agrego el producto al array
            this.products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,'\t'))
            return "Se Creo el producto correctamente"
        }catch (err) {
            return err
        }
        
        
    }

    //Muestro 1 producto buscando el id dentro del array
    getProductById = async (id) => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        this.products = JSON.parse(data)
        const producto = this.products.find(product => product.id === id)

        if(producto){
            return producto
        } else {
            return "Not Found"
        }
    }

    //Modifico 1 producto
    updateProduct = async (id, update) => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        this.products = JSON.parse(data)
        let producto = this.products.find(product => product.id === id)

        for(let propiedad in update){
            if(producto.hasOwnProperty(propiedad)){
                producto[propiedad] = update[propiedad]
            }
        }
        
        await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,'\t'))
        return "Se modifico el producto correctamente"
    }

    deleteProduct = async (id) => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        this.products = JSON.parse(data)
        const productos = this.products.filter(product => product.id !== id)

        await fs.promises.writeFile(this.path, JSON.stringify(productos,null,'\t'))
        return "Se elimino el producto correctamente"
    }
}

//creo la instancia de la clase
const productManager = new ProductManager()

const env = async () => {
    const result = await productManager.getProducts();
    console.log(result)
    const producto = await productManager.getAddProducts({title:"producto prueba", description:"Este es un producto prueba",price:200, thumbnail:"Sin imagen", code:"abc243", stock:25})
    console.log(producto)
    const productofiltrado = await productManager.getProductById(5)
    console.log(productofiltrado)
    const productoModificado = await productManager.updateProduct(1, {title: "producto modificado", description: "descripcion modificada"})
    console.log(productoModificado)
    const productoEliminado = await productManager.deleteProduct(2)
    console.log(productoEliminado)
}

env()