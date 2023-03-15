import User from "../Models/User";
import * as argon from "argon2";
import * as json from "jsonwebtoken";
export const registerUser: Controller = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const check = await User.findOne({ email });

    const hashedPassword = await argon.hash(password);
    console.log(check);
    if (check !== null) {
      return res.status(409).send("email is already in use");
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    /////tokken

    const token = json.sign(
      { id: user._id },
      process.env.TOKEN_SECRETKEY as string,
      {
        expiresIn: "30d",
      }
    );

    res.status(201).json({
      token,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(501).send("internal error");
  }
};


