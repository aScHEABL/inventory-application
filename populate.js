#! /usr/bin/env node

console.log(
    'This script populates data to mongoDB for inventory app.'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Cart = require("./models/cart");
  const Category = require("./models/category");
  const Cloth = require("./models/cloth");
  const ClothInstance = require("./models/clothInstance");
  const Color = require("./models/color");
  const Size = require("./models/size");
  const Gender = require("./models/gender");
  const Order = require("./models/order");
  const Review = require("./models/review");
  const User = require("./models/user");
  
  const cartArray = [];
  const categoryArray = [];
  const clotheArray = [];
  const clothInstanceArray = [];
  const colorArray = [];
  const sizeArray = [];
  const genderArray = [];
  const orderArray = [];
  const reviewArray = [];
  const userArray = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategory();
    await createColor();
    await createGender();
    await createSize();
    await createClothes();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }

  async function NewUser(index, username, email, password, address, cart, order) {
    const user = new User({ 
      username, 
      email, 
      password, 
      address, 
      cart,
      order, 
    })

    await user.save();
    userArray[index] = user;
    console.log(`Added user: ${user.username}`);
  }

  async function NewCloth(
    index,
    nameValue, 
    priceValue, 
    descriptionValue, 
    genderValue, 
    sizeValue, 
    colorValue, 
    categoryValue, 
  ) {

    const cloth = new Cloth({
      name: nameValue, 
      price: priceValue, 
      description: descriptionValue, 
      gender: genderValue, 
      size: sizeValue, 
      color: colorValue, 
      category: categoryValue, 
    });

    await cloth.save();
    clotheArray[index] = cloth;
    console.log(`Added cloth: ${cloth}`);
  }

  async function NewSize(index, sizeValue) {
    const size = new Size({
      name: sizeValue,
    });

    await size.save();
    sizeArray[index] = size;
    console.log(`Added size: ${size}`);
  }

  async function NewColor(index, colorValue) {
    const color = new Color({
        name: colorValue,
    });

    await color.save();
    colorArray[index] = color;
    console.log(`Added color: ${color}`);
}

  async function NewClothInstance(index, cloth, size, color) {
    const clothInstance = new ClothInstance({
      cloth,
      size,
      color,
    });

    await clothInstance.save();
    clothInstanceArray[index] = clothInstance;
    console.log(`Added cloth instance: ${clothInstance}`);
  }

  async function NewGender(index, nameValue) {
    const gender = new Gender({
      name: nameValue,
    })

    await gender.save();
    genderArray[index] = gender;
    console.log(`Added gender: ${gender.name}`);
  }

  async function NewCart(index, user) {
    const cart = new Cart({
      user,
    })

    await cart.save();
    cartArray[index] = cart;
    console.log(`Added cart: ${cart.user}`);
  }

  async function NewCategory(index, nameValue) {
    const category = new Category({
      name: nameValue,
    })

    await category.save();
    categoryArray[index] = category;
    console.log(`Added category: ${category}`);
  }

  async function NewOrder(index, date, status, items, user, reviews) {
    const order = new Order({
      date,
      status,
      items,
      user,
      reviews,
    })

    await order.save();
    orderArray[index] = order;
    console.log(`Added order: ${order}`);
  }

  async function NewReview(index, rating, comment, user, cloth) {
    const review = new Review({
      rating,
      comment,
      user,
      cloth,
    })

    await review.save();
    reviewArray[index] = review;
    console.log(`Added review: ${review}`);
  }

  // Creation of database entries

  async function createClothes() {
    console.log("Adding clothes...");
    await Promise.all([
        NewCloth(
          0,
          "Essential White T-shirt", 
          400, 
          "Experience the epitome of simplicity with our Essential White T-shirt. Meticulously crafted from high-quality fabric, it offers a touch of luxury to your everyday style. Whether you're layering or wearing it solo, this tee effortlessly embodies casual elegance.",
          genderArray[0],
          sizeArray,
          colorArray[0],
          categoryArray[0],
        ),
        NewCloth(
          1,
          "White Tight Fit Premium T-shirt",
          600,
          "Experience the epitome of style and precision with our White Tight Fit Premium T-shirt. Tailored to perfection, it hugs your curves while maintaining an airy feel. Elevate your wardrobe with this sleek and modern essential for those who appreciate both style and comfort.",
          genderArray[0],
          sizeArray,
          colorArray[0],
          categoryArray[0],
        ),
        NewCloth(
          2,
          "Essential Red Polo-shirt",
          450,
          "Make a bold statement with our Essential Red Polo-shirt. The rich red color adds a touch of vibrancy to the classic polo silhouette, creating a versatile garment that transitions seamlessly from day to night. Crafted for comfort and designed for style, this polo is a must-have for the modern wardrobe.",
          genderArray[0],
          sizeArray,
          colorArray[3],
          categoryArray[1],
        ),
        NewCloth(
          3,
          "Essential Blue Premium T-shirt",
          600,
          "Elevate your wardrobe with our Essential Blue Premium T-shirt – a beacon of luxury and style. Meticulously crafted from premium materials, this shirt offers a level of comfort that complements its rich blue hue. Redefine casual elegance with this essential addition to your collection.",
          genderArray[0],
          sizeArray,
          colorArray[3],
          categoryArray[1],
        ),
        NewCloth(
          4,
          "Essential Yellow T-shirt",
          400,
          "Brighten up your wardrobe with our Essential Yellow T-shirt, a burst of sunshine in every stitch. Crafted from soft, breathable fabric, this shirt brings warmth and style to your everyday look. Embrace the joy of easygoing fashion with this essential piece.",
          genderArray[0],
          sizeArray,
          colorArray[3]
        )
    ])
  }

  async function createGender() {
    console.log("Adding genders...");
    await Promise.all([
      NewGender(0, "male"),
      NewGender(1, "female"),
    ])
  }

  async function createSize() {
    console.log("Adding sizes...");
    await Promise.all([
      NewSize(0, "small"),
      NewSize(1, "medium"),
      NewSize(2, "large"),
      NewSize(3, "xl"),
    ])
  }

  async function createColor() {
    console.log("Adding colors...");
    await Promise.all([
      NewColor(0, "white"),
      NewColor(1, "black"),
      NewColor(2, "grey"),
      NewColor(3, "red"),
      NewColor(4, "blue"),
      NewColor(5, "yellow"),
    ])
  }

  async function createCategory() {
    console.log("Adding category...");
    await Promise.all([
      NewCategory(0, "t-shirt"),
      NewCategory(1, "polo"),
      NewCategory(2, "sweater"),
      NewCategory(3, "jacket"),
    ])
  }