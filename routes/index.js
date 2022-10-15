import express from "express";
import productCatlog from "../model/index.js";
const router = express.Router();

//----------add products--------------------

router.post("/add_product", async (req, res) => {
  try {
    const AddProduct = await productCatlog.create(req.body);

    console.log(`AddProduct log---->`, AddProduct);

    res.send("product added sucssesfully");
  } catch (error) {
    console.log(`add product catch error--->`, error);

    res.status(500);
  }
});

//---------edit products----------------------

router.put("/edit_product/:ProductId", async (req, res) => {
  const ProductId = req.params.ProductId;
  try {
    const ProductIdd = await productCatlog.findById(ProductId);

    console.log(`productidd log--->`, ProductIdd);

    const updatedProduct = await productCatlog.updateOne(
      { _id: ProductId },
      req.body
    );

    console.log(`updatedProduct log---->`, updatedProduct);

    if (ProductIdd) {
      res.json({ updatedProduct });
    } else {
      res.status(404).send("Product Not Found for update");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(`edit product error : `, err);
  }
});

//---------delete products--------------------

router.delete("/delete_product/:ProductId", async (req, res) => {
  const ProductId = req.params.ProductId;
  try {
    const ProductIdd = await productCatlog.findById(ProductId);
    console.log(`ProductIdd------>`, ProductIdd);
    const ProductDeleted = await productCatlog.deleteOne({ _id: ProductId });

    console.log(`ProductDeleted`, ProductDeleted);

    if (ProductIdd) {
      res.send(`Product Deleted`);
    } else {
      res.status(404).send(`Product Not Deleted`);
    }
  } catch (err) {
    console.log(`delete product error------->`, err);
    res.status(500);
  }
});

//---------list of all products----------------

router.get("/list_all_products", async (req, res) => {
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  try {
    const filter = {
      isDeleted: false,
    };

    if (minPrice && maxPrice) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }

    console.log(`filter`, filter);

    const allProduct = await productCatlog.find(filter);

    res.send(allProduct);
  } catch (err) {
    console.log(`list_all_product`, err);
    res.status(500).json(err);
  }
});

//----------product details by id------------

router.get("/product_details/:ProductId", async (req, res) => {
  const ProductId = req.params.ProductId;
  try {
    const GetProductById = await productCatlog.findById(ProductId);
    console.log(`GetProductById---->`, GetProductById);

    if (GetProductById) {
      res.json(GetProductById);
    } else {
      res.status(404).send("product not found");
    }
  } catch (err) {
    console.log(`product detail catch log----->`, err);
    res.status(500).json(err);
  }
});

//-----------is deleted true------------------------
router.delete("/isDelete/:ProductId", async (req, res) => {
  const ProductId = req.params.ProductId;
  try {
    const Product = await productCatlog.findById(ProductId);
    console.log(`Product--->`, Product);
    const FoundDeletedProduct = await productCatlog.findOne({
      _id: Product.id,
      isDeleted: true,
    });
    console.log(`Found Deleted Product:-`, FoundDeletedProduct);
    if (FoundDeletedProduct) {
      res.status(400).send("product already deleted");
    } else {
      const isDeleted = await productCatlog.updateOne(
        { _id: Product.id },
        { isDeleted: true }
      );
      console.log(`isDeleted`, isDeleted);
      res.send(`product is deleted`);
    }
  } catch (error) {
    console.log(`is delete catch-`, error);
    res.status(500).send(error);
  }
});

//---------------------------min max soring-------------------

export default router;
