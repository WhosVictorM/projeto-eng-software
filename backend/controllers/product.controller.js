const Product = require("../modules/product.modules")


exports.getAllProducts = async (req, res) => {

    const product = await Product.find()
    res.status(200).json(product)
}

exports.getProductById = async (req, res) => {

    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: "Product not found."})
    }
}

exports.insertProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.updateById = async (req, res) => {

    try {
        const { id } = req.params

        const product = await Product.findByIdAndUpdate(id, req.body)

        if(!product) {
            return res.status(404).json({message: "Product not found."})
        }

        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)

    } catch (error) {
        req.status(500).json({message: error.message})
    }
}

exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findByIdAndDelete(id)

        const productsGET = await Product.find()

        if(!product) {
            return res.status(404).json({message: "Product not found."})
        }


        res.status(200).json(productsGET)

    } catch (error) {
        req.status(500).json({message: error.message})
    }
}
