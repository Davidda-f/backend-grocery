const express = require("express");
const router = express.Router();
const Brand = require("../models/brand");

router.get("/", async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post("/", async (req, res) => {
    try {
        const {name} = req.body;
        const brandExisting = await Brand.find({name});
        if (!brandExisting) {
            return res.status(400).json({message: "Brand already exists"});
        }
        const newBrand = new Brand(req.body);
        const brand = await newBrand.save();
        res.status(201).json({message: "Brand created successfully", brand: brand});
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const brandExisting = await Brand.findByIdAndDelete(id);
        if(!brandExisting){
            return res.status(404).json({message: "Brand does not exist"});
        }
        res.status(200).json({message: "Brand deleted successfully", brand: brandExisting});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const updatedBrand = await Brand.findByIdAndUpdate({_id: id}, req.body);
        if(!updatedBrand){
            return res.status(404).json({message: "Brand does not exist"});
        }
        res.status(200).json({message: "Brand updated successfully", brand: updatedBrand});
    }catch (error) {
        res.status(500).json({message: error.message});
    }
});
module.exports = router;