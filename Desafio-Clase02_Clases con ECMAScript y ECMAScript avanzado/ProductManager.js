class ProductManager {
    constructor (){
        this.products = []
    }

    validateCode = (code) => {
        const productos = this.products

        if(productos.find((producto) => producto.code == code)){
            return true
        } else {
            return false
        }
    }


    getProducts = () => {
        console.log(this.products)
    }

    getAddProducts = (title, description, price, thumbnail, code, stock) => {

        if (this.validateCode(code)){
            return console.log("El producto ya existe")
        } 

        if(!title || !description || !price || !thumbnail || !code || !stock) {
            return console.log("Te falto algun dato")
        }
        
        const product = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(product)
        
        
    }

    getProductById = (id) => {
        const producto = this.products.find((producto) => producto.id == id);

        if(producto){
            return console.log(producto)
        } else {
            return console.log("Not Found")
        }
    }
}

const productManager = new ProductManager()

productManager.getProducts()
productManager.getAddProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
productManager.getProducts()
productManager.getAddProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
productManager.getAddProducts("producto prueba", "", 200, "Sin imagen", "abc124", 25)
productManager.getAddProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc124", 25)
productManager.getProducts()
productManager.getProductById(2)
productManager.getProductById(4)