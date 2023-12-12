const Cloth = require("../models/cloth");
const Category = require("../models/category");
const Gender = require("../models/gender");

const asyncHandler = require("express-async-handler");

exports.main = asyncHandler(async(req, res, next) => {
    const allGenders_array = await Gender.find({}).exec();
    const maleGender = await Gender.findOne({ name: "male" }).exec();
    const femaleGender = await Gender.findOne({ name: "female" }).exec();

    const maleCategories_array = await Category.find({ gender: maleGender }).exec();
    const femaleCategories_array = await Category.find({ gender: femaleGender }).exec();

    const maleClothesPromises = maleCategories_array.map(async (item, index) => {
        return await Cloth.find({ category: item }).exec();
    })
    const maleClothes_array = await Promise.all(maleClothesPromises);
    
    const allCategories_array = await Category.find({}).exec();

    res.render("shop",
        {
            title: 'Shop Page',
            genders_array: allGenders_array,
            maleCategories_array: maleCategories_array,
            femaleCategories_array: femaleCategories_array,
            maleClothes_array: maleClothes_array,
            categories_array: allCategories_array,
        })
})