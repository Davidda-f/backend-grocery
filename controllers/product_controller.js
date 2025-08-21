const Product = require("../models/product");
const router = require("../routes/product_route");

exports.getProducts = async (req, res) => {
  
  try {
    
    // Pagination logic
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { category, brand, minPrice, maxPrice, search, sort} = req.query;

    // Filtering logic
    const filter = {};
    if (category) {
      filter.category = category;
    }
    if (brand) {
      filter.brand = brand;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) {
        filter.price.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        filter.price.$lte = parseFloat(maxPrice);
      }
    }
    if (search) {
      filter.name = { $regex: search, $options: "i" }; // Case-insensitive search
    }


    // Sorting logic
    let sortOption = {}
    if(sort === "price_asc") sortOption.price = 1;
    else if(sort === "price_desc") sortOption.price = -1;
    else if(sort === "newest") sortOption.price = -1;
    else if(sort === "best_selling") sortOption.price.sold = -1;
    else if(sort === "top_rated") sortOption.price = -1;

    const skip = (page - 1) * limit;
    const products = await Product.find(filter)
      .populate("category", "name")
      .populate("brand", "name")
      .skip(skip)
      .sort(sortOption)
      .limit(limit);
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      page,
      totalProducts: Math.ceil(totalProducts / limit),
      totalProducts,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: "Error" + error.message });
  }
};
