const Cloth = require("../models/cloth");
const ClothInstance = require("../models/clothInstance");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async(req, res, next) => {
    const allClothes_array = await Cloth.find({}).exec();

    res.render("index",
        {
            title: 'Home Page',
            clothesArray: allClothes_array,
        })
})