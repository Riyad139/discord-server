import * as jwt from "jsonwebtoken";
import User from "../Models/User";
import updateFriendList from "../Routes/update/updateFriendList";
const addUserToReg: Controller = async (req, res, next) => {
  console.log(req.path);
  if (req.path === "/user/signup" || req.path === "/user/login") return next();
  try {
    const token = req.headers.cookie?.split("=")[1];
    const verification = jwt.verify(
      token as string,
      process.env.TOKEN_SECRETKEY as string
    );
    //@ts-ignore
    const id = verification.id;
    const useRes = await User.findOne({ _id: id });
    if (!useRes) {
      return res.status(403).send("user is not authenticated");
    }
    req.user = useRes;
    next();
  } catch (error: any) {
    res.status(403).send("user is not authenticated");
  }
};

export default addUserToReg;
