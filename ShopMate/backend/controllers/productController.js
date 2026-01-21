const Product=require('../models/productSchema');

exports.createProduct=async(req,res)=>{
    try {
        let {name,description,price,cate}=req.body;

        // console.log(req.user)

        if(!name || !description || !price || !cate){
            return res.status(400).json({message:"All fields are required"});
        };

        const newProduct=new Product({name,description,price,cate,owner:req.user.id});

        await newProduct.save()

        res.status(200).json({message:"Product created successfully"});
        
    } catch (error) {
        res.status(400).json({message:"Error during create product"})
    }
}

exports.getAllProduct = async (req, res) => {
    try {

        const allProducts=await Product.find()

        res.status(200).json({message:"All product fetched",product:allProducts});

    } catch (error) {
        res.status(400).json({ message: "Error during getAll product" })
    }
}

exports.getProductById = async (req, res) => {
    try {

        let {id}=req.params;

        let product=await Product.findById(id).populate('owner')

        res.status(200).json({message:"Product fetch successfully",product:product})

    } catch (error) {
        res.status(400).json({ message: "Error during get product" })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        let {id}=req.params;

        let { name, description, price, cate } = req.body;

        if (!name || !description || !price || !cate) {
            return res.status(400).json({ message: "All fields are required" });
        };

        if(id !== req.user.id){
            return res.status(400).json({ message: "Only owner can update product" });
        }

        let product=await Product.findOne({owner:id})

        product.name=name
        product.description=description
        product.price=price
        product.cate=cate

        product.save()

        res.status(200).json({message:"Product update successfully"})

    } catch (error) {
        res.status(400).json({ message: "Error during update product" })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        let {id}=req.params

        await Product.findByIdAndDelete(id)

        res.status(200).json({message:"product deleted successfully"})

    } catch (error) {
        res.status(400).json({ message: "Error during delete product" })
    }
}