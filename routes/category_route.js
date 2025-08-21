const express = require('express');
const router = express.Router();
const Category = require('../models/category');


router.get('/', async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);

    }catch(error){
        res.status(500).json({message: error.message});
    
    }
});


router.post('/', async(req, res) => {
    try {
        const {name} = req.body;
        const categoryExists = await Category.find({name});
        if(!categoryExists) {
            return res.status(400).json({message: "Category already exists"});
        }
        const newCategory = new Category(req.body);
        const category = await newCategory.save();
        res.status(201).json({message: "Category created successfully", category: category});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findByIdAndDelete(id);
        if(!category) {
            return res.status(404).json({message: "Category not found"});
        }
        res.status(200).json({message: "Category deleted successfully", category: category});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.put("/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const category  = await Category.findByIdAndUpdate({_id: id}, req.body);
        if(!category) {
            return res.status(404).json({message: "Category not found"});
        }
        res.status(200).json({message: "Category updated successfully", category: category});
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
});

module.exports = router;