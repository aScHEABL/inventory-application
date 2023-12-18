const Cloth = require("../models/cloth");
const ClothInstance = require("../models/clothInstance");
const Category = require("../models/category");
const Gender = require("../models/gender");

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
        Promise.all(maleCategories_array.map(async (item) => await Cloth.find({ category: item }).exec())),
        Promise.all(femaleCategories_array.map(async (item) => await Cloth.find({ category: item }).exec())),
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

exports.cloth_details = asyncHandler(async (req, res, next) => {
    const [cloth, clothInstance] = await Promise.all([
        Cloth.findById(req.params.id).exec(),
        // ClothInstance.find({ Cloth: req.params.id }).exec(),
        ClothInstance.find().exec(),
    ])

    if (cloth === null) {
        // Query returned no result.
        const err = new Error("Cloth not found");
        err.status = 404;
        return (err);
    }

    res.render("cloth_detail", {
        test: req.params.id,
        title: cloth.name,
        cloth: cloth,
        clothInstance: clothInstance,
    })
})