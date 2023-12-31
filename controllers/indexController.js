const Cloth = require("../models/cloth");

const randomModule = require("../utils/randomModule");
const getRandomItemsFromArray = randomModule.getRandomItemsFromArray;

const asyncHandler = require("express-async-handler");

exports.featuredProducts = asyncHandler(async(req, res, next) => {
    const allClothes_array = await Cloth.find({}).exec();

    const featuredProducts_array = getRandomItemsFromArray(allClothes_array, 4);
    res.render("index",
        {
            title: 'Fake Fashion E-Store',
            clothes_array: featuredProducts_array,
        })
})