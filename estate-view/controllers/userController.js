const Buyer = require("../models/Buyer");
const EstateDeveloper = require("../models/EstateDeveloper");

//////////////////GET / RETRIEVE ALL USERS' INFORMATION////////////////////////
const getAllUsers = async (req, res) => {
  try {
    const users = await (Buyer && EstateDeveloper).find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//////////////////GET / RETRIEVE ALL BUYERS' INFORMATION////////////////////////
const getAllBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.status(200).json({ buyers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllDevelopers = async (req, res) => {
  try {
    const developers = await EstateDeveloper.find();
    res.status(200).json({ developers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//////////////////GET / RETRIEVE A SINGLE USER INFORMATION////////////////////////
const getSingleUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await (Buyer && EstateDeveloper).findById(userId);

    if (!user) {
      res.status(404).send("User with this ID could not be found");
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//////////////////UPDATE USER INFORMATION////////////////////////
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await (Buyer && EstateDeveloper).findByIdAndUpdate(
      userId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//////////////////DELETE USER INFORMATION////////////////////////
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await (Buyer || EstateDeveloper).findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getAllBuyers,
  getAllDevelopers,
  getSingleUser,
  updateUser,
  deleteUser,
};
