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
  const Gender = require("./models/gender");
  const Order = require("./models/order");
  const Review = require("./models/review");
  const User = require("./models/user");
  const Size = require("./models/size");
  
  const sizeArray = [
    { type: 'small' },
    { type: 'medium' },
    { type: 'large' },
    { type: 'extra-large' },
  ];
  const cartArray = [];
  const categoryArray = [];
  const clotheArray = [];
  const clothInstanceArray = [];
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

    const result = await Size.insertMany(sizeArray);
    console.log("Sizes inserted successfully:", result);

    await createCategory();
    await createGender();
    await createCloth();
    await createClothInstance();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }

  async function NewUser(index, usernameValue, emailValue, passwordValue, addressValue, cartRef, orderRef) {
    const user = new User({ 
      username: usernameValue,
      email: emailValue,
      password: passwordValue, 
      address: addressValue, 
      cart: cartRef,
      order: orderRef, 
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
    imageValue,
    categoryValue, 
  ) {

    const cloth = new Cloth({
      name: nameValue, 
      price: priceValue, 
      description: descriptionValue, 
      gender: genderValue, 
      imageURL: imageValue,
      category: categoryValue, 
    });
    try {
      await cloth.save();
      clotheArray[index] = cloth;
      console.log(`Added cloth: ${cloth}`);
    } catch(error) {
      console.error(error.message);
    }
  }

  async function NewClothInstance(index, clothReference, sizeType) {
    const size = await Size.findOne({ type: sizeType });
    console.log(size);

    const clothInstance = new ClothInstance({
      cloth: clothReference,
      size: size,
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

  async function NewCart(index, userRef) {
    const cart = new Cart({
      user: userRef,
    })

    await cart.save();
    cartArray[index] = cart;
    console.log(`Added cart: ${cart.user}`);
  }

  async function NewCategory(index, nameValue) {
    const category = new Category({
      name: nameValue,
    })

    try {
      await category.save();
      categoryArray[index] = category;
      console.log(`Added category: ${category}`);
    } catch (error) {
      console.error(error.message);
    }
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

  async function createCloth() {
    console.log("Adding clothes...");
    await Promise.all([
        NewCloth(
          0,
          "Essential White T-Shirt", 
          399, 
          "Experience the epitome of simplicity with our Essential White T-shirt. Meticulously crafted from high-quality fabric, it offers a touch of luxury to your everyday style. Whether you're layering or wearing it solo, this tee effortlessly embodies casual elegance.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/6bf50448-af78-4e38-847a-056c2fdf3bfc.jpeg",
          categoryArray[0],
        ),
        NewCloth(
          1,
          "White Tight Fit Premium T-Shirt",
          599,
          "Experience the epitome of style and precision with our White Tight Fit Premium T-shirt. Tailored to perfection, it hugs your curves while maintaining an airy feel. Elevate your wardrobe with this sleek and modern essential for those who appreciate both style and comfort.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/7e47f4b0-7a29-4ede-80ff-837acef60dd0.jpeg",
          categoryArray[0],
        ),
        NewCloth(
          2,
          "Essential Red Polo-Shirt",
          449,
          "Make a bold statement with our Essential Red Polo-shirt. The rich red color adds a touch of vibrancy to the classic polo silhouette, creating a versatile garment that transitions seamlessly from day to night. Crafted for comfort and designed for style, this polo is a must-have for the modern wardrobe.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/2a5612cc-ae06-48ec-aae7-32d10084f22a.jpeg",
          categoryArray[1],
        ),
        NewCloth(
          3,
          "Essential Blue Premium T-Shirt",
          599,
          "Elevate your wardrobe with our Essential Blue Premium T-shirt – a beacon of luxury and style. Meticulously crafted from premium materials, this shirt offers a level of comfort that complements its rich blue hue. Redefine casual elegance with this essential addition to your collection.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/2d43964c-1062-48a6-abb3-59dcbe4b7c40.jpeg",
          categoryArray[1],
        ),
        NewCloth(
          4,
          "Essential Yellow T-shirt",
          399,
          "Brighten up your wardrobe with our Essential Yellow T-shirt, a burst of sunshine in every stitch. Crafted from soft, breathable fabric, this shirt brings warmth and style to your everyday look. Embrace the joy of easygoing fashion with this essential piece.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/650e1b8b-8798-4b16-a970-5be728d534bc.jpeg",
          categoryArray[0],
        ),
        NewCloth(
          5,
          "Essential Red T-shirt",
          399,
          "Elevate your wardrobe with our Essential Red T-shirt – a bold yet simple statement piece. The vibrant red hue adds a touch of excitement to the classic T-shirt design. Embrace timeless charm with this essential addition to your collection.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/0157e95a-2038-4c0b-9652-e0810b5e6b3c.jpeg",
          categoryArray[0],
        ),
        NewCloth(
          6,
          "White Short-Sleeves Shirt",
          599,
          "Elevate your everyday style with our White Short-sleeve Shirt. Crafted for comfort and designed for elegance, this shirt seamlessly transitions from casual to polished. Embrace the ease of dressing well with this versatile wardrobe staple.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/fa4e72e4-c3f2-4125-8f0b-67a8e68fb09f.jpeg",
          categoryArray[4],
        ),
        NewCloth(
          7,
          "Light Grey Long-Sleeves Shirt",
          699,
          "Transition seamlessly through the seasons with our Light Grey Long-Sleeve Shirt. The versatile shade and long sleeves offer a perfect balance of elegance and comfort. Make a statement with this wardrobe staple that adapts to your style effortlessly.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/c68b9618-c602-4709-8442-2d36fbcad500.jpeg",
          categoryArray[4],
        ),
        NewCloth(
          8,
          "White Long-Sleeves Shirt",
          699,
          "Unveil versatile elegance with our Long-sleeve White Shirt. The enduring white color serves as a canvas for your personal style, while the long sleeves provide an extra layer of refinement. Make a lasting impression with this essential piece for any fashion-forward individual.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/0e708db1-e827-4821-b5e0-e29ad8799e23.jpeg",
          categoryArray[4],
        ),
        NewCloth(
          9,
          "Crimson Short-Sleeves Shirt",
          699,
          "Introducing our Crimson Short-sleeve Shirt—a burst of vivid charm that seamlessly blends comfort with chic style. The breathable fabric ensures a comfortable fit, while the striking crimson color makes it a standout piece for any casual occasion.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/dc946b00-9a27-45cd-a471-edb2a0785247.jpeg",
          categoryArray[4],
        ),
        NewCloth(
          10,
          "White Sweater",
          1499,
          "Step into a winter wonderland with our White Sweater—a cozy companion for the colder season. The intricate knit details and pure white shade create a charming and stylish look. Stay snug and fashionable with this must-have winter essential.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/50931893-937c-48ff-8ac5-8e2457fb264e.jpeg",
          categoryArray[2]
        ),
        NewCloth(
          11,
          "Black Sweater",
          1499,
          "Introducing the Black Edition of our timeless sweater. The rich black hue and classic knit pattern make it a must-have for the colder months. Stay warm in style with this effortlessly elegant addition to your closet.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/31ebe3fb-0a36-4ab6-a120-390f09f36526.jpeg",
          categoryArray[2],
        ),
        NewCloth(
          12,
          "Blue Sweater",
          1499,
          "Embrace the winter blues in a whole new way with our Blue Sweater. The soft, knitted fabric and soothing blue hues create a cozy and stylish piece for the colder season. Stay warm while making a fashion statement with this essential addition to your wardrobe.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/7a2cbff1-bdc7-4e5e-931e-5d114c960863.jpeg",
          categoryArray[2],
        ),
        NewCloth(
          13,
          "Red Sweater",
          1499,
          "Experience fireside warmth with our Red Sweater. The cozy knit fabric and rich red color create a perfect blend of comfort and style. Elevate your winter wardrobe with this vibrant and essential piece.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/1591dd29-a800-4cef-8a3f-7ee85b8de8f8.jpeg",
          categoryArray[2],
        ),
        NewCloth(
          14,
          "Green Hood Parka",
          2299,
          "Unleash your adventurous spirit with our Forest Green Hooded Parka. This versatile outerwear combines the rich green hue of a forest canopy with the practicality of a hood, creating the perfect companion for your outdoor escapades. Stay warm and stylish on your next adventure.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/c38b66ab-8c67-4c21-9446-1ac6b555d22e.jpeg",
          categoryArray[3],
        ),
        NewCloth(
          15,
          "Blue Jeans Jacket",
          2299,
          "Elevate your casual chic with our Blue Jeans Jacket. The deep blue color and stylish denim design create a fashionable statement piece. Whether layered or worn solo, this jacket adds a touch of sophistication to your everyday look.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/f551c8b7-7533-4acb-a063-5d8fbb342e78.jpeg",
          categoryArray[3],
        )
    ])
  }

  async function createClothInstance() {
    console.log("Adding cloth instances");
    await Promise.all([
      NewClothInstance(0, clotheArray[0], "small"),
      NewClothInstance(1, clotheArray[0], "small"),
      NewClothInstance(2, clotheArray[0], "medium"),
      NewClothInstance(3, clotheArray[0], "large"),
      NewClothInstance(4, clotheArray[0], "extra-large"),
      NewClothInstance(5, clotheArray[1], "medium"),
      NewClothInstance(6, clotheArray[1], "medium"),
      NewClothInstance(7, clotheArray[1], "medium"),
      NewClothInstance(8, clotheArray[1], "large"),
      NewClothInstance(9, clotheArray[1], "large"),
      NewClothInstance(10, clotheArray[1], "medium"),
    ])
  }

  async function createGender() {
    console.log("Adding genders...");
    await Promise.all([
      NewGender(0, "male"),
      NewGender(1, "female"),
    ])
  }

  async function createCategory() {
    console.log("Adding category...");
    await Promise.all([
      NewCategory(0, "t-shirt"),
      NewCategory(1, "polo"),
      NewCategory(2, "sweater"),
      NewCategory(3, "jacket"),
      NewCategory(4, "shirt"),
    ])
  }