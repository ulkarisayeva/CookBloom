require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const User = require("./model/user");
const Recipe = require("./model/recipe");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/register", async (req, res) => {
  try {
    // Get user input
    const { fullname, email, password } = req.body;

    // Validate user input
    if (!(email && password && fullname)) {
      res.status(400).json({
        success: false,
        message: "All input is required",
      });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email: email.toLowerCase() });

    if (oldUser) {
      return res.status(409).json({
        success: false,
        message: "User Already Exist. Please Login",
      });
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      fullname,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email, fullname },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    // return new user
    res.status(201).json({
      user: { user_id: user._id, email, fullname },
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).json({
        success: false,
        message: "All input is required",
      });
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // user
      res.status(200).json({
        user: { user_id: user._id, email: user.email, fullname: user.fullname },
        token: token,
      });
    }
    res.status(400).json({
      success: false,
      message: "Invalid Credentials",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/generate-recipe", auth, async (req, res) => {
  const { meal, ingredients } = req.body;

  // Validate user input
  if (!(meal && ingredients)) {
    res.status(400).json({
      success: false,
      message: "Please, provide meal and what ingredients you have",
    });
  }

  let prompt = `Write a recipe based on these ingredients:

  ${meal}
  
  Ingredients:
  ${ingredients.join(", ")}
  
  Instructions:`;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 2000,
  });

  res.status(200).json({
    instructions: completion.data.choices[0].text,
  });
});

// Save recipe endpoint
app.post("/recipe", auth, async (req, res) => {
  const { name, meal, ingredients, instructions } = req.body;

  // Validate user input
  if (!(name && meal && ingredients && instructions)) {
    res.status(400).json({
      success: false,
      message:
        "Please, provide all the required parameters: name, meal, ingredients and instructions",
    });
  }

  // Create recipe in our database
  const recipe = await Recipe.create({
    name: name,
    meal: meal,
    ingredients: ingredients.join(", "),
    instructions: instructions,
    user_id: req.user.user_id,
  });

  res.status(200).json(recipe);
});

// Delete recipe endpoint
app.delete("/recipe/:recipeID", auth, async (req, res) => {
  Recipe.deleteOne({ _id: req.params.recipeID, user_id: req.user.user_id }, function (err) {
    if (err) return res.status(400).json({message: err});
    res.status(200).json({});
  });
});

// List saved recipe endpoint
app.get("/saved-recipes", auth, async (req, res) => {
  Recipe.find({user_id: { $eq: req.user.user_id }}, function (err, recipes) {
    if (err) {
      res.status(404).json({
        success: "false",
        message: "Something happened wrong",
      });
    } else {
      res.status(200).json({ recipes: recipes });
    }
  });
});

// List  recipes  endpoint
app.get("/recipes", async (req, res) => {
  Recipe.find({}, function (err, recipes) {
    if (err) {
      res.status(404).json({
        success: "false",
        message: "Something happened wrong",
      });
    } else {
      
      res.status(200).json({ recipes: recipes });
    }
  });
});

// all the other endpoints which are not defined will return 404
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
  });
});

module.exports = app;
