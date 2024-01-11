const Clothing = require("../models/clothing");

const randomModule = require("../utils/randomModule");
const getRandomItemsFromArray = randomModule.getRandomItemsFromArray;

const asyncHandler = require("express-async-handler");

exports.featuredProducts = asyncHandler(async(req, res, next) => {
    const allClothing_array = await Clothing.find({}).exec();

    const featuredProducts_array = getRandomItemsFromArray(allClothing_array, 4);
    res.render("index",
        {
            title: 'Fake Fashion E-Store',
            clothing_array: featuredProducts_array,
        })
})