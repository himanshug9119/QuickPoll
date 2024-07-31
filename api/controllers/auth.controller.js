import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
const hash_password_times = 10;
console.log(SECRET_KEY)

// signup controller
export const signup = async (req, res, next) => {
    const { firstName, lastName, username, email, password } = req.body;

    // Validate input
    if (!firstName || !username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, hash_password_times);

    try {
        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();
        // console.log(newUser)
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Handle errors
        if (error.code === 11000) {
            // Duplicate key error
            const field = error.keyValue.username ? 'Username' : 'Email';
            return res.status(400).json({ message: `${field} already exists` });
        }
        next(error);
    }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
      // Find user by email
      const validUser = await User.findOne({ email });
      if (!validUser) {
          return next(errorHandler(404, 'User not found'));
      }

      // Compare password
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
          return next(errorHandler(401, 'Invalid credentials'));
      }

      // Generate JWT token
      const token = jwt.sign({ id: validUser._id }, SECRET_KEY, { expiresIn: '1h' });

      // Exclude password from response
      const { password: pass, ...userWithoutPassword } = validUser._doc;

      // Set token in cookies and send response
      res.cookie('access_token', token, { httpOnly: true, maxAge: 3600000 }); // Cookie expires in 1 hour
      return res.status(200).json(userWithoutPassword);
  } catch (err) {
      next(err);
  }
};

export const google = async (req , res, next)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(user){
            const token = jwt.sign({ id: user._id }, SECRET_KEY);
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token , {httpOnly:true}).status(200).json(rest);
        }else{
            const generatedPassword =
              Math.random().toString(36).slice(-8) +
              Math.random().toString(36).slice(-8);
            const hasedPassword = bcryptjs.hashSync(
                generatedPassword,
                hash_password_times
                );  
            const newUser = new User({
              username:
                req.body.name.split(" ").join("").toLowerCase() +
                Math.random().toString(36).slice(-8),
              email: req.body.email,
              password: hasedPassword,
              avatar:req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token , {httpOnly:true}).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
}

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out successfull");
  } catch (error) {
    next(errorHandler(401, error));
  }
};