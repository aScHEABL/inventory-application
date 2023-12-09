const Cloth = require("../models/cloth");
const Category = require("../models/category");
const Gender = require("../models/gender");

const asyncHandler = require("express-async-handler");

exports.main = asyncHandler(async(req, res, next) => {
    const allGenders_array = await Gender.find({}).exec();
    const allCategories_array = await Category.find({}).exec();

    res.render("shop",
        {
            title: 'Shop Page',
            genders_array: allGenders_array,
            categories_array: allCategories_array,
        })
})