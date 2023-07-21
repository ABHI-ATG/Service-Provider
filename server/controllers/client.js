const User = require("../models/user");
const Pro = require("../models/provider");
const Message = require("../models/message");

const signup = async (req, res) => {
  try {
    const { fname, lname, email, mobile, password } = req.body;
    if (!fname || !lname || !email || !mobile || !password) {
      return res.json({ status: false, msg: "Enter all detials" });
    }
    const userExist = await User.findOne({ email });
    //console.log(userExist);
    if (userExist) {
      return res.json({ status: false, msg: "User already exists!" });
    }
    const data = await User.create({ fname, lname, email, mobile, password });
    res.json({ status: true, msg: "Account created" });
  } catch (error) {
    return res.json({ status: false, msg: error });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ status: false, msg: "Fill all details" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      const isMatch = await userExist.matchPassword(password);
      if (isMatch) {
        const token = await userExist.generateToken();
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 1000000000000),
        });
        res.json({
          status: true,
          token: token,
          id: userExist._id,
          name: userExist.fname,
        });
      } else {
        return res.json({ status: false, msg: "Credentials do not match" });
      }
    } else {
      return res.json({ status: false, msg: "User does not exists" });
    }
  } catch (error) {
    return res.json({ status: false, msg: error });
  }
};

const signout = async (req, res) => {
  try {
    console.log("Logout Client");
    console.log(req.userId);
    res.clearCookie("jwt");
    const data = await User.findOne({ _id: req.userId });
    await User.updateOne(
      { _id: req.userId },
      {
        tokens: [],
      }
    );
    return res.json({ status: true, msg: "successfully log out" });
  } catch (err) {
    return res.json({ status: false, msg: "error logging out" });
  }
};

const service = async (req, res) => {
  try {
    const state = req.query.state;
    const city = req.query.city;
    const pincode = req.query.pincode;
    const work = req.query.work;

    const data = await Pro.find({
      profession: { $regex: new RegExp(work, "i") },
      state: { $regex: new RegExp(state, "i") },
      $or: [
        { pincode: { $regex: new RegExp(pincode, "i") } },
        { city: { $regex: new RegExp(city, "i") } },
      ],
    });
    console.log(data);

    res.status(200).send(data);
  } catch (error) {
    res.status(401).send("Failed to Search");
  }
};

const create = async (req, res) => {
  try {
    const { user, provider } = req.body;
    console.log(req.body);
    const userExist = await Message.findOne({
      $and: [{ user: user }, { provider: provider }],
    }).populate("provider");
    if (userExist) {
      return res.status(200).send(userExist);
    }
    const data = await Message.create({ user, provider });
    return res.status(200).send(data);
  } catch (error) {
    res.status(401).send("Error in create");
  }
};

const messageUpdate = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await Message.find({ user: id });
    console.log(data);
    return res.status(200).send(data);
  } catch (error) {
    res.status(401).send("Error in messageUpdate");
  }
};

const send = async (req, res) => {
  try {
    const { chatId, sender, content } = req.body;
    console.log(req.body);
    const data = await Message.findOneAndUpdate(
      { _id: chatId },
      { $push: { message: { sender, content } } },
      { new: true }
    );
    return res.status(200).send(data);
  } catch (error) {
    res.status(401).send("Error in messageUpdate");
  }
};

module.exports = {
  signin,
  signup,
  signout,
  service,
  create,
  messageUpdate,
  send,
};
