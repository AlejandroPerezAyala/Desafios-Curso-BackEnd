//creo la clase 
class ProductManager {
    constructor (){
        this.products = []
    }

    //Validacion para que el codigo no se repita
    validateCode = (code) => {
        const productos = this.products

        if(productos.find((producto) => producto.code == code)){
            return true
        } else {
            return false
        }
    }

    //muestro los priductos
    getProducts = () => {
        console.log(this.products)
    }

    //agrego 1 producto
    getAddProducts = (title, description, price, thumbnail, code, stock) => {

        //Valido que no se repita el codigo
        if (this.validateCode(code)){
            return console.log("El producto ya existe")
        } 

        //Valido que haya ingresado todos los campos ya que son obligatorios
        if(!title || !description || !price || !thumbnail || !code || !stock) {
            return console.log("Te falto algun dato")
        }
        
        //creo el producto
        const product = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        //Agrego el producto al array
        this.products.push(product)
        
        
    }

    //Muestro 1 producto buscando el id dentro del array
    getProductById = (id) => {
        const producto = this.products.find((producto) => producto.id == id);

        if(producto){
            return console.log(producto)
        } else {
            return console.log("Not Found")
        }
    }
}

//creo la instancia de la clase
const productManager = new ProductManager()

//Realizo las pruebas
productManager.getProducts()
productManager.getAddProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
productManager.getProducts()
productManager.getAddProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
productManager.getAddProducts("producto prueba", "", 200, "Sin imagen", "abc124", 25)
productManager.getAddProducts("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc124", 25)
productManager.getProducts()
productManager.getProductById(2)
productManager.getProductById(4)