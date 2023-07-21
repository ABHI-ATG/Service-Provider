const Pro = require("../models/provider");
const Message = require("../models/message");

const signup = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      mobile,
      state,
      city,
      pincode,
      profession,
      password,
    } = req.body;
    if (
      !fname ||
      !lname ||
      !email ||
      !mobile ||
      !password ||
      !state ||
      !pincode ||
      !city
    ) {
      return res.json({ status: false, msg: "Enter all detials" });
    }
    const userExist = await Pro.findOne({ email });
    console.log(userExist);
    if (userExist) {
      return res.json({ status: false, msg: "User already exists!" });
    }
    const data = await Pro.create({
      fname,
      lname,
      email,
      mobile,
      state,
      city,
      pincode,
      profession,
      password,
    });
    res.json({ status: true, data });
  } catch (error) {
    return res.json({ status: false, msg: error });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ status: false, msg: "Enter all details" });
    }

    let userExist = await Pro.findOne({ email });
    if (userExist) {
      const isMatch = await userExist.matchPassword(password);
      if (isMatch) {
        const token = await userExist.generateToken();
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 10000000000),
        });
        return res.json({
          status: true,
          id: userExist._id,
          token: token,
          email: userExist.email,
          fname: userExist.fname,
          lname: userExist.lname,
          city: userExist.city,
          mobile: userExist.mobile,
          pincode: userExist.pincode,
          state: userExist.state,
        });
      } else {
        return res.json({ status: false, msg: "Invalid credentials" });
      }
    } else {
      return res.json({ status: false, msg: "User do not exist" });
    }
  } catch (error) {
    return res.json({ status: false, msg: "Enter all detials" });
  }
};

const signout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    const data = await Pro.findOne({ _id: req.userId });
    await Pro.updateOne(
      { _id: req.userId },
      {
        tokens: [],
      }
    );
    return res.status(200).json({ messege: "successfully log out" });
  } catch (err) {
    return res.status(400).send({ error: "Credentials does not Match" });
  }
};

const messageUpdate = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.body;
    const data = await Message.find({ provider: id }).populate("user");
    console.log(data);
    return res.status(200).send(data);
  } catch (error) {
    res.status(401).send("Error in messageUpdate");
  }
};

module.exports = { signin, signup, signout, messageUpdate };
