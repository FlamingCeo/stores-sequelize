const connectDB = require("../models");
const  User  = connectDB.user;

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ users });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error });

        
    }

};

const createUsers = async (req, res) => {
   
  const users = await User.findAll();
  res.status(200).json({ users });
};

const updateUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({ users });
};

module.exports = {
  getAllUsers,
  createUsers,
  updateUsers,
};
