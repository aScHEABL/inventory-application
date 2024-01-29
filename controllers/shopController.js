const mongoose = require("mongoose");
const Clothing = require("../models/clothing");
const ClothInstance = require("../models/clothInstance");
const Category = require("../models/category");
const Gender = require("../models/gender");
const Size = require("../models/size");

const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

exports.main = asyncHandler(async(req, res, next) => {
    const [
        allGenders_array,
        maleGender,
        femaleGender,
    ] = await Promise.all([
        Gender.find({}).sort({ name: -1 }).exec(),
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

exports.overview = asyncHandler(async (req, res, next) => {

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
            case 'clothInstances':
                return '<span class="material-symbols-outlined scale-[2]">deployed_code</span>';
            case 'carts':
                return '<span class="material-symbols-outlined scale-[2]">shopping_cart</span>';
            case 'clothings':
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
    const collection_array = collectionRaw_array.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map((item) => {
        return {
            ...item,
            url: req.originalUrl + "/" + item.name,
            icon: insertIcon(item.name)
        }
    })
    res.render("overview", {
        title: "Inventory overview",
        collection_array,
    })
})

exports.overview_clothings = asyncHandler(async (req, res, next) => {
    const clothingRaw_array = await Clothing.find({}).sort({ name: 1 }).populate("category gender").exec()

    // Add the count of ClothInstances for each Clothing
    const clothing_array = await Promise.all(clothingRaw_array.map(async (clothing) => {
        const clothInstanceCount = await ClothInstance.countDocuments({ clothing: clothing._id });
        return {
            ...clothing.toObject(),
            clothInstanceCount,
        };
    }));

    res.render("overview_clothings", {
        title: "Clothings Overview",
        clothing_array,
    })
})

exports.create_clothing_get = asyncHandler(async (req, res, next) => {

    const [
        genders_array,
        maleGender,
        femaleGender,
    ] = await Promise.all([
        Gender.find({}).sort({ name: -1 }).exec(),
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


    res.render("create_clothings", {
        title: "Creating Clothing Page",
        genders_array,
        maleCategories_array,
        femaleCategories_array,
    })
})

exports.create_clothing_post = [
    body("clothing-name", "Please fill out this field.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

    body("clothing-price", "Please fill out this field.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

    body("clothing-description", "Please fill out this field.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

    
]


exports.update_clothings_get = asyncHandler(async (req, res, next) => {
    const clothingID = req.params.id;

    const [
        clothingDetails,
        genders_array,
        maleGender,
        femaleGender,
    ] = await Promise.all([
        Clothing.findById(clothingID).exec(),
        Gender.find({}).sort({ name: -1 }).exec(),
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


    res.render("update_clothings", {
        title: "Updating Clothing Page",
        clothingDetails,
        genders_array,
        maleCategories_array,
        femaleCategories_array,
    })
})

exports.update_clothings_post = [
    body("clothing-name", "Please fill out this field.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

    body("clothing-price", "Please fill out this field.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

    body("clothing-description", "Please fill out this field.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

    
    asyncHandler(async (req, res, next) => {
        const errors_array = validationResult(req);

        const clothingID = req.params.id;
        
        if (!errors_array.isEmpty()) {
            const [
                clothingDetails,
                genders_array,
                maleGender,
                femaleGender,
            ] = await Promise.all([
                Clothing.findById(clothingID).exec(),
                Gender.find({}).sort({ name: -1 }).exec(),
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

            res.render("update_clothings", {
                title: "Updating Clothing Page",
                clothingDetails,
                genders_array,
                maleCategories_array,
                femaleCategories_array,
                errors_array: errors_array.array(),
            })
        } else {
            const newClothingObject = new Clothing({
                    ...clothingDetails,
                    name: req.body['clothing-name'],
                    price: req.body['clothing-price'],
                    description: req.body['clothing-description'],
                    gender: req.body['gender-select'],
                    category: req.body['category-select'],
                })
            
            // Can't delete object property because it's a Mongoose model, need to convert it to a plain Javascript object.
            const newClothing = new Clothing(newClothingObject).toObject();
            delete newClothing._id;
            
            const updatedClothing = await Clothing.findByIdAndUpdate(clothingID, newClothing, { new: true });
            res.redirect(updatedClothing.url);
        }
    })
]

exports.delete_clothings_post = asyncHandler(async (req, res, next) => {
    const clothingID = req.params.id;

    const [clothing, clothingInstances_array] = await Promise.all([
        Clothing.findById(clothingID).exec(),
        ClothInstance.find({ clothing: clothingID }).exec(),
    ])

    if (clothingInstances_array.length > 0) {
        // There are still clothing instances belong to this clothing, must delete them before attempting to delete the clothing itself.

    } else if (clothingInstances_array.length === 0) {
        // There's no clothing instance belongs to this clothing, proceed to delete the clothing.
    }

})

exports.category_create_get = asyncHandler(async (req, res, next) => {

})

exports.cloth_create_get = asyncHandler(async (req, res, next) => {
    res.render("cloth_create", {
        title: "Create Cloth Page",
    });
})

exports.post_test = asyncHandler(async (req, res , next) => {
    res.render("test", {
        title: "test page",
        id: req.params.id,
    })
})