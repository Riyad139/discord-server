import User from "../Models/User";
import * as argon from "argon2";
import * as json from "jsonwebtoken";
import dayjs from "dayjs";
export const registerUser: Controller = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const check = await User.findOne({ email });

    const hashedPassword = await argon.hash(password);
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
    res.cookie("access-token", token, {
      expires: dayjs().add(30, "day").toDate(),
      sameSite: "lax",
      httpOnly: true,
    });

    res.status(201).json({
      email: user.email,
      username: user.username,
      token: token,
    });
  } catch (error: any) {
    res.status(501).send("internal error");
  }
};

export const loginUser: Controller = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const check = await User.findOne({ email });

    if (!check) {
      return res.status(404).send("user not found");
    }
    const auth = await argon.verify(check.password as string, password);
    if (!auth) return res.status(409).send("email or password does not match");

    const token = json.sign(
      { id: check._id },
      process.env.TOKEN_SECRETKEY as string,
      {
        expiresIn: "30d",
      }
    );
    res.cookie("access-token", token, {
      expires: dayjs().add(30, "day").toDate(),
      sameSite: "lax",
      httpOnly: true,
    });
    res.status(200).json({
      username: check.username,
      email: check.email,
      token,
    });
  } catch (error: any) {
    res.status(501).send("Internal error");
  }
};

export const logedInUser: Controller = async (req, res, next) => {
  try {
    const cookie = req.headers.cookie?.split("=")[1];
    const result = json.verify(
      cookie as string,
      process.env.TOKEN_SECRETKEY as string
    );
    //@ts-ignore
    const id = result.id;
    const resUser = await User.findOne({ _id: id });
    if (!resUser) throw new Error("user not found");

    const token = json.sign(
      { id: resUser._id },
      process.env.TOKEN_SECRETKEY as string,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).send({
      username: resUser?.username,
      email: resUser?.email,
      token,
    });
  } catch (error: any) {
    res.status(404).send("User is not authorized");
  }
};
