const Buyer = require("../models/Buyer");
const EstateDeveloper = require("../models/EstateDeveloper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  developerRegisterValidator,
  buyerRegisterValidator,
  loginValidator,
} = require("../utils/validation");

////////////////REGISTER///////////////////////

const developerRegister = async (req, res) => {
  const result = await developerRegisterValidator.validateAsync(req.body);
  const {
    firstName,
    lastName,
    companyName,
    registrationId,
    email,
    password,
  } = result;

  const alreadyExists = await EstateDeveloper.findOne({ email });
  if (alreadyExists) {
    res.status(404).json({ message: "Email already exists." });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const estateDeveloper = await EstateDeveloper.create({
    firstName,
    lastName,
    companyName,
    registrationId,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ estateDeveloper });
};

const buyerRegister = async (req, res) => {
  const result = await buyerRegisterValidator.validateAsync(req.body);
  const { firstName, lastName, email, password } = result;

  const alreadyExists = await Buyer.findOne({ email });
  if (alreadyExists) {
    res.status(404).json({ message: "Email already exists." });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const buyer = await Buyer.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ buyer });
};

//////////////LOGIN///////////////////////
const login = async (req, res) => {
  const result = await loginValidator.validateAsync(req.body);
  const { email, password } = result;

  let existedUser = await (Buyer && EstateDeveloper).findOne({ email });
  if (!existedUser) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }

  // check for password
  const isMatch = await bcrypt.compare(password, existedUser.password);
  if (!isMatch) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }

  // generate token
  const token = jwt.sign({ id: existedUser._id }, "543216789", {
    expiresIn: "10000h",
  });

  res.status(200).json({ token });
};

/////////////VERIFY TOKEN/////////////////
const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"] || "";

  token = token.split(" ")[1];
  if (token) {
    const decodedToken = jwt.verify(token, "543216789");
    req.existedUser = decodedToken.id;

    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports = {
  developerRegister,
  buyerRegister,
  login,
  verifyToken,
};
