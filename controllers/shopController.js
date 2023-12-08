const Cloth = require("../models/cloth");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

exports.main = asyncHandler(async(req, res, next) => {
    res.render("shop",
        {
            title: 'Shop Page1',
        })
})