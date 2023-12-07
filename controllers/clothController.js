const Cloth = require("../models/cloth");
const ClothInstance = require("../models/clothInstance");

const getRandom = require("../utils/getRandom");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async(req, res, next) => {
    const allClothes_array = await Cloth.find({}).exec();

    const featuredProducts_array = getRandom(allClothes_array, 4);
    res.render("index",
        {
            title: 'Home Page',
            clothes_Array: featuredProducts_array,
        })
})