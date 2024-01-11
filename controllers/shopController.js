const mongoose = require("mongoose");
const Clothing = require("../models/clothing");
const ClothInstance = require("../models/clothInstance");
const Category = require("../models/category");
const Gender = require("../models/gender");
const Size = require("../models/size");

const asyncHandler = require("express-async-handler");

exports.main = asyncHandler(async(req, res, next) => {
    const [
        allGenders_array,
        maleGender,
        femaleGender,
    ] = await Promise.all([
        Gender.find({}).exec(),
        Gender.findOne({ name: "male" }).exec(),
        Gender.findOne({ name: "female" }).exec(),  
    ])

    const [
        maleCategories_array,
        femaleCategories_array,
    ] = await Promise.all([
        Category.find({ gender: maleGender }).sort({ name: 1 }).exec(),
        Category.find({ gender: femaleGender }).sort({ name: 1 }).exec(),
    ])

    const [
        maleClothes_array,
        femaleClothes_array,
    ] = await Promise.all([
        Promise.all(maleCategories_array.map(async (item) => await Clothing.find({ category: item }).exec())),
        Promise.all(femaleCategories_array.map(async (item) => await Clothing.find({ category: item }).exec())),
    ])

    res.render("shop",
        {
            title: 'Shop Page',
            genders_array: allGenders_array,
            maleCategories_array: maleCategories_array,
            femaleCategories_array: femaleCategories_array,
            maleClothes_array: maleClothes_array,
            femaleClothes_array: femaleClothes_array,
        })
})

exports.clothing_details = asyncHandler(async (req, res, next) => {
    const clothingID = req.params.id;

    const [clothing, clothInstance] = await Promise.all([
        Clothing.findById(clothingID).exec(),
        ClothInstance.find({ clothing: clothingID }).populate("size").exec(),
    ])

    // Create an object to store the counts
    const sizeCounts = {};

    // Count the occurrences of each size
    clothInstance.forEach((item) => {
        const sizeName = item.size.name;

        // If the size is not in sizeCounts, initialize it to 1, else increment by 1
        sizeCounts[sizeName] = (sizeCounts[sizeName] || 0) + 1;
    });

    if (clothing === null) {
        // Query returned no result.
        const err = new Error("Cloth not found");
        err.status = 404;
        return (err);
    }

    res.render("clothing_details", {
        test: req.params.id,
        title: clothing.name,
        clothing: clothing,
        clothInstance: clothInstance,
        sizeCounts: sizeCounts,
    })
})

exports.inventory_overview = asyncHandler(async (req, res, next) => {

    function insertIcon(name) {
        switch (name) {
            case 'users':
                return '<span class="material-symbols-outlined scale-[2]">group</span>';
            case 'orders':
                return '<span class="material-symbols-outlined scale-[2]">list_alt</span>';
            case 'sizes':
                return '<span class="material-symbols-outlined scale-[2]">width</span>';
            case 'genders':
                return '<span class="material-symbols-outlined scale-[2]">transgender</span>';
            case 'clothinstances':
                return '<span class="material-symbols-outlined scale-[2]">deployed_code</span>';
            case 'carts':
                return '<span class="material-symbols-outlined scale-[2]">shopping_cart</span>';
            case 'cloths':
                return '<span class="material-symbols-outlined scale-[2]">apparel</span>';
            case 'categories':
                return '<span class="material-symbols-outlined scale-[2]">category</span>';
            case 'reviews':
                return '<span class="material-symbols-outlined scale-[2]">reviews</span>';
            default:
                return 'test';
        }
    }

    // const collection_array = Object.entries(mongoose.connection.collections);
    const db = mongoose.connection.db;
    const collectionRaw_array = await db.listCollections().toArray();
    const collection_array = collectionRaw_array.map((item) => {
        return {
            ...item,
            url: req.originalUrl + "/" + item.name,
            icon: insertIcon(item.name)
        }
    })
    res.render("inventory_overview", {
        title: "Inventory overview",
        collection_array,
    })
})

exports.category_create_get = asyncHandler(async (req, res, next) => {

})

exports.cloth_create_get = asyncHandler(async (req, res, next) => {
    res.render("cloth_create", {
        title: "Create Cloth Page",
    });
})