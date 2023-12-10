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
    
    const allCategories_array = await Category.find({}).exec();

    res.render("shop",
        {
            title: 'Shop Page',
            genders_array: allGenders_array,
            maleCategories_array: maleCategories_array,
            femaleCategories_array: femaleCategories_array,
            categories_array: allCategories_array,
        })
})