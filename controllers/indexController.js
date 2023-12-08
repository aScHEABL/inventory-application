const Cloth = require("../models/cloth");

const getRandom = require("../utils/getRandom");

const asyncHandler = require("express-async-handler");

exports.featuredProducts = asyncHandler(async(req, res, next) => {
    const allClothes_array = await Cloth.find({}).exec();

    const featuredProducts_array = getRandom(allClothes_array, 4);
    res.render("index",
        {
            title: 'Fake Fashion E-Store',
            clothes_Array: featuredProducts_array,
        })
})