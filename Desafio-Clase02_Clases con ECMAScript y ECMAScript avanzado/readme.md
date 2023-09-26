# Clases con ECMAScript y ECMAScript avanzado

## Consigna
- Realizar una clase “ProductManager” que gestione un conjunto de productos.

## Aspectos

1. Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.
2. Cada producto que gestione debe contar con las propiedades:
    - title (nombre del producto)
    - description (descripción del producto)
    - price (precio)
    - thumbnail (ruta de imagen)
    - code (código identificador)
    - stock (número de piezas disponibles)
3. Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
4. Validar que no se repita el campo “code” y que todos los campos sean obligatorios
5. Al agregarlo, debe crearse con un id autoincrementable
6. Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento
7. Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
8. En caso de no coincidir ningún id, mostrar en consola un error “Not found”