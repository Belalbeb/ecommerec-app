import { ProductModel } from "../../db/Models/Product.model.js";



const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({ message: "Done", products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};


const addProduct = async (req, res) => {
  try {
    const product = await ProductModel.insertMany(req.body);
    res.status(201).json({ message: "Added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};
const getbyid=async(req,res)=>{
  const id=req.params.id;
  const product = await ProductModel.findById(id);

  res.json({product});

}

export {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getbyid
};
