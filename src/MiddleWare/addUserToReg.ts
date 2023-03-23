import * as jwt from "jsonwebtoken";

const addUserToReg: Controller = async (req, res, next) => {
  try {
    const token = req.headers.cookie?.split("=")[1];
    const verification = jwt.verify(
      token as string,
      process.env.TOKEN_SECRETKEY as string
    );
    console.log(verification);
    next();
  } catch (error: any) {
    res.status(404).send("user not authenticated");
  }
};

export default addUserToReg;
