#! /usr/bin/env node

const randomModule = require("./utils/randomModule");
const getRandomIntFromRange = randomModule.getRandomIntFromRange;
const getRandomItemsFromArray = randomModule.getRandomItemsFromArray;

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
    { name: 'small' },
    { name: 'medium' },
    { name: 'large' },
    { name: 'extra-large' },
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

    await createGender();
    await createCategory();
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
    const size = await Size.findOne({ name: sizeType });

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

  async function NewCategory(index, nameValue, genderRef) {
    const category = new Category({
      name: nameValue,
      gender: genderRef,
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
          "Plush Supima® cotton means exceptional comfort in laid-back undershirts with versatile appeal.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/6bf50448-af78-4e38-847a-056c2fdf3bfc.jpeg",
          categoryArray[0],
        ),
        NewCloth(
          1,
          "White Tight Fit Premium T-Shirt",
          599,
          "Soft, stretchy cotton means all-day comfort in a classic undershirt built for versatile utility.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/7e47f4b0-7a29-4ede-80ff-837acef60dd0.jpeg",
          categoryArray[0],
        ),
        NewCloth(
          2,
          "Essential Red Polo-Shirt",
          449,
          "Cut from pure cotton, this breathable polo features a signature spread collar and short sleeves as a timeless staple for your collection.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/2a5612cc-ae06-48ec-aae7-32d10084f22a.jpeg",
          categoryArray[1],
        ),
        NewCloth(
          3,
          "Essential Blue T-Shirt",
          599,
          "Moisture-wicking fabric means easy comfort on the trails in this endlessly wearable T-shirt designed with plenty of stretch for ease of movement.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/2d43964c-1062-48a6-abb3-59dcbe4b7c40.jpeg",
          categoryArray[1],
        ),
        NewCloth(
          4,
          "Dri-FIT Legend Yellow T-shirt",
          399,
          "Soft, sweat-wicking fabric keeps you all-activity comfortable in a T-shirt that's great for working out, going out or just hanging out.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/650e1b8b-8798-4b16-a970-5be728d534bc.jpeg",
          categoryArray[0],
        ),
        NewCloth(
          5,
          "Essential Red T-shirt",
          399,
          "Moisture-wicking fabric means easy comfort on the trails in this endlessly wearable T-shirt designed with plenty of stretch for ease of movement.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/0157e95a-2038-4c0b-9652-e0810b5e6b3c.jpeg",
          categoryArray[0],
        ),
        NewCloth(
          6,
          "White Short-Sleeves Shirt",
          599,
          "Tropical flowers bloom in soft, tonal jacquard on a shirt woven from pure silk in a fit that's perfect for catching breezes in the sun or shade.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/fa4e72e4-c3f2-4125-8f0b-67a8e68fb09f.jpeg",
          categoryArray[4],
        ),
        NewCloth(
          7,
          "Generation Herringbone Stretch Button-Up Shirt",
          699,
          "Stretch-blend construction means a flexible fit in a hearty shirt stamped with a handsome herringbone texture.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/c68b9618-c602-4709-8442-2d36fbcad500.jpeg",
          categoryArray[4],
        ),
        NewCloth(
          8,
          "White Long-Sleeves Shirt",
          699,
          "Wrinkle-resistant cotton keeps you crisp and comfortable in an all-occasion dress shirt styled simply with a classic fit and button-down collar.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/0e708db1-e827-4821-b5e0-e29ad8799e23.jpeg",
          categoryArray[4],
        ),
        NewCloth(
          9,
          "Crimson Short-Sleeves Shirt",
          699,
          "Laid-back style is the calling card of this casual camp shirt done with a convertible collar and a subtly embroidered ramskull.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/dc946b00-9a27-45cd-a471-edb2a0785247.jpeg",
          categoryArray[4],
        ),
        NewCloth(
          10,
          "Merrick Bay Quarter Zip Sweater",
          1499,
          "This midweight layering sweater with an embroidered chest logo is made from soft cotton yarn that is comfortable and naturally breathable.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/50931893-937c-48ff-8ac5-8e2457fb264e.jpeg",
          categoryArray[2]
        ),
        NewCloth(
          11,
          "Washable Black Merino Crewneck Sweater",
          1499,
          "The only thing more wonderful than a smooth and polished-looking merino wool sweater is the fact that it's washable—your life just got easier!",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/31ebe3fb-0a36-4ab6-a120-390f09f36526.jpeg",
          categoryArray[2],
        ),
        NewCloth(
          12,
          "Washable Blue Merino Crewneck Sweater",
          1499,
          "The only thing more wonderful than a smooth and polished-looking merino wool sweater is the fact that it's washable—your life just got easier!",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/7a2cbff1-bdc7-4e5e-931e-5d114c960863.jpeg",
          categoryArray[2],
        ),
        NewCloth(
          13,
          "Cashmere Red Crewneck Sweater",
          1499,
          "Knit from soft cashmere yarns, a lightweight, refined crewneck sweater is a luxe layering option when the temperature starts to drop.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/1591dd29-a800-4cef-8a3f-7ee85b8de8f8.jpeg",
          categoryArray[2],
        ),
        NewCloth(
          14,
          "Green Hood Parka",
          2299,
          "Weather any storm in this down-filled, water-resistant quilted parka equipped with a removable hood finished with optional faux-fur trim and warm ribbed cuffs.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/c38b66ab-8c67-4c21-9446-1ac6b555d22e.jpeg",
          categoryArray[3],
        ),
        NewCloth(
          15,
          "Blue Jeans Jacket",
          2299,
          "Plenty of pockets lend workwear detail to a 13.5-ounce denim jacket completed by a heart-bedecked logo patch.",
          genderArray[0],
          "https://n.nordstrommedia.com/id/sr3/f551c8b7-7533-4acb-a063-5d8fbb342e78.jpeg",
          categoryArray[3],
        ),
        NewCloth(
          16,
          "Satin Button-Up Shirt",
          1440,
          "This polished button-up is crafted from rich satin with a drapey, relaxed fit that'll keep your look on point.",
          genderArray[1],
          "https://n.nordstrommedia.com/id/sr3/42ee1026-1d1a-41b2-a1ce-4f8490098fd1.jpeg",
          categoryArray[5],
        ),
        NewCloth(
          17,
          "Colt Long Sleeve Waffle Knit Henley",
          1779,
          "A cozy thermal knit textures a long-sleeve cotton henley constructed with frayed seams, raw cuffs and a curved back hem.",
          genderArray[1],
          "https://n.nordstrommedia.com/id/sr3/cce5a28d-2b22-4850-aed9-422eed13309a.jpeg",
          categoryArray[7],
        ),
        NewCloth(
          18,
          "Gold Rush Sequin Top",
          2499,
          "Steal the show in this in figure-skimming top covered in lustrous sequins.",
          genderArray[1],
          "https://n.nordstrommedia.com/id/sr3/0e5baa9c-73d1-43d8-8e5b-97fe79f6f0e4.jpeg",
          categoryArray[9],
        ),
        NewCloth(
          19,
          "Sequin Wrap Top",
          2399,
          "Glittery sequins cover this flattering wrap top framed by lightly billowed sleeves.",
          genderArray[1],
          "https://n.nordstrommedia.com/id/sr3/94a7f426-226b-44d1-8da3-7efd6b5fd132.jpeg",
          categoryArray[9],
        ),
        NewCloth(
          20,
          "Sequin Long Sleeve Top",
          2799,
          "Starlight sprinkles a night-out top fixed with billowed balloon sleeves.",
          genderArray[1],
          "https://n.nordstrommedia.com/id/sr3/1b0d76fe-b32b-4645-8417-8c7dc4c7dc69.jpeg",
          categoryArray[9],
        ),
        NewCloth(
          21,
          "Long Sleeve Crushed Velvet Blazer Dress",
          3399,
          "A menswear-inspired blazer silhouette lends versatile styling options to this long-sleeve dress made of ultrasoft crushed velvet.",
          genderArray[1],
          "https://n.nordstrommedia.com/id/sr3/2b65daba-ec6b-402b-b886-454ed55f6413.jpeg",
          categoryArray[6],
        ),
        NewCloth(
          22,
          "Axel Sequin Embellished Cocktail Dress",
          6999,
          "A soaring slit lends sultry appeal to this sequin-embellished cocktail dress.",
          genderArray[1],
          "https://n.nordstrommedia.com/id/sr3/f62056bc-98db-4dac-a67b-95312d6ec19d.jpeg",
          categoryArray[6],
        ),
        NewCloth(
          23,
          "Rib Three-Quarter Sleeve Sweater Dress",
          3499,
          "Cool-weather ensembles are easy in this sultry sweater-dress texturized by slender ribbing and perfected by a slightly flared skirt.",
          genderArray[1],
          "https://n.nordstrommedia.com/id/sr3/b3421168-d181-4e9e-b5e4-38614cdaca65.jpeg",
          categoryArray[6],
        ),
        NewCloth(
          24,
          "Solid Button-Up Shirt",
          1199,
          "A solid hue creates easy pairing when you sport this button-up shirt that's an essential garment in your rotation.",
          genderArray[1],
          "https://n.nordstrommedia.com/id/sr3/9de6c1c8-04fc-429c-95df-70473f684c41.jpeg",
          categoryArray[5]
        ),
        NewCloth(
          25,
          "Mandarin Collar Silk Blouse",
          4999,
          "Silk georgette lends luxurious softness to this easy-fitting button-up shirt topped with a mandarin collar.",
          genderArray[1],
          "https://n.nordstrommedia.com/id/sr3/83f1c17e-869a-4a8c-96eb-995e18d037b7.jpeg",
          categoryArray[5],
        ),
        NewCloth(
          26,
          "Dalby Leather Biker Jacket",
          1699,
          "Smooth, rich leather secures the style-staple status of this biker jacket in a classic silhouette.",
          genderArray[1],
          "https://n.nordstrommedia.com/id/sr3/8c4d4da9-3820-4ad0-999a-da03ced9cd78.jpeg",
          categoryArray[8],
        ),
        NewCloth(
          27,
          "Onion Quilted Bomber Jacket",
          1199,
          "Traditional quilting and plush high-pile-fleece lining bring the cozy vibes to this classic bomber jacket designed in a roomy fit for comfortable layering.",
          genderArray[1],
          "https://n.nordstrommedia.com/id/sr3/46f968ad-f26f-49a0-9c28-584abcf1918d.jpeg",
          categoryArray[8],
        ),
        NewCloth(
          28,
          "Kyra Corduroy Trucker Jacket",
          1399,
          "This version of the beloved trucker jacket is cut from stretchy cotton corduroy and rendered with puffed shoulders in a modern shade.",
          genderArray[1],
          "https://n.nordstrommedia.com/id/sr3/e1304c18-93a2-44a8-ad64-9a575ff3375d.jpeg",
          categoryArray[8],
        )
    ])
  }

  async function createClothInstance() {
    console.log("Adding cloth instances");
  
    // Create an array to store promises for cloth instances
    const clothInstancePromises = [];
  
    // Iterate over each cloth item
    for (const item of clotheArray) {
      const randomInt = getRandomIntFromRange(3, 15);
  
      // Create an array to store promises for each cloth instance of the current item
      const promises = Array.from({ length: randomInt }, (_, index) => {
        const sizes = ["small", "medium", "large", "extra-large"];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        console.log(randomSize);
        return NewClothInstance(index, item, randomSize);
      });
  
      // Concatenate the promises to the outer array
      clothInstancePromises.push(...promises);
    }
  
    // Wait for all cloth instances to be created
    await Promise.all(clothInstancePromises);
  
    console.log("All cloth instances added");
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
      NewCategory(0, "t-shirt", genderArray[0]),
      NewCategory(1, "polo", genderArray[0]),
      NewCategory(2, "sweater", genderArray[0]),
      NewCategory(3, "jacket", genderArray[0]),
      NewCategory(4, "shirt", genderArray[0]),
      NewCategory(5, "shirt", genderArray[1]),
      NewCategory(6, "dress", genderArray[1]),
      NewCategory(7, "sweater", genderArray[1]),
      NewCategory(8, "jacket", genderArray[1]),
      NewCategory(9, "top", genderArray[1]),
    ])
  }