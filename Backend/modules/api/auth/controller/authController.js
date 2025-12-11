import statusCode from '../../../../config/statusCode.js';
import gu from '../../../../language/gu/gu.js';
import userModel from '../../../../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterValidation } from './../../validationRules.js';

export const Register = async (req, res) => {
  try {
    const { error } = RegisterValidation.validate(req.body);
    if (error) {
      return res.status(statusCode.VALIDATION_ERROR).json({
        message: 'Validation error',
        error: error.message,
      });
    }

    const { name, email, password,role } = req.body;

    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      return res.status(statusCode.DUPLICATE_VALUE).json({
        message: 'Email Already',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    return res.status(statusCode.SUCCESS).json({
      message: 'Register Successfully!',
      newUser,
    });
  } catch (error) {
    console.log('error', error.message);
    return res.status(statusCode.INTERNAL_SERVER_SERVER).json({
      message: 'register error',
    });
  }
};

// export const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.status(statusCode.NOT_FOUND).json({
//         message: 'user not found',
//       });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(statusCode.UNATHOZIATION).json({
//         message: 'password does not match',
//       });
//     }

//     const token = jwt.sign({ id: user._id,
//       name: user.name,
//       email: user.email
//      }, process.env.JWT_SECRET, {
//       expiresIn: '7d',
//     });

//     return res.status(statusCode.SUCCESS).json({
//       message: 'Login success',
//       token,
//     });
//   } catch (error) {
//     console.log('error', error.message);
//   }
// };

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(statusCode.NOT_FOUND).json({
        message: 'User not found',
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(statusCode.UNATHOZIATION).json({
        message: 'Password does not match',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );

    return res.status(statusCode.SUCCESS).json({
      message: 'Login success',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log('error', error.message);
  }
};
