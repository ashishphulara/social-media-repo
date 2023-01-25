import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/User.js";

// users register------------------------------------------------------------------------------------------------

 export const Register = async (req, res) => {
  // for registering a new user
  try {
    const {
        firstName,     // to store the first name of the user
      lastName,
      email,
      password,
      imagepath,
      friends,
      location,
      occupation,
    } = req.body;     // to store the data of the user

    const salt = await bcrypt.genSalt(); // salt is used to hash the password
    const hashPassword = await bcrypt.hash(password, salt); // hashPassword is used to hash the password

    const newUser = new user({
        firstName,
      lastName,
      email,
      password: hashPassword, // to store the password of the user

      imagepath,
      friends,
      location,
      occupation,
      impression: Math.floor(Math.random() * 10000), // to store the impression of the user
      viewedprofile: Math.floor(Math.random() * 10000), // to store the viewedprofile of the user
    });
    const savedUser = await newUser.save(); // savedUser is used to save the user in the database
    res.status(201).json(savedUser); // to return the saved user
  } catch (err) {
    // for getting the errors
    res.status(500).json({ error: err.message });
  }
};


// logging in------------------------------------------------------------------------------------------------


export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // to get the data from the request body

    const user = await user.findOne({ email: email }); // to find the user by email

    if (!user) return res.status(500).json({ message: "user not found" }); // if user not found

    const isMatch = await bcrypt.compare(password, user.password); // to compare the password

    if (!isMatch) {
      return res.status(500).json({ message: "Invalid Credentials" }); // if user not found
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // to generate the token
    delete user.password; // to delete the password
    return res.status(200).json(token, user); // return the token and the user
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
