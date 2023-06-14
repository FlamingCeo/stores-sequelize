const express = require("express");
const userRouter = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const { getAllUsers,createUsers,updateUsers } = require("../controllers/user.js");

userRouter.route("/").get(
  authenticateUser,
  // authorizePermissions({
  //   name: "Settings",
  //   accessRight: ["view"],
  // }),
  getAllUsers
);



userRouter.route("/create").post(
  authenticateUser,
  authorizePermissions({
    name: "Vendors",
    accessRight: ["fullAccess"],
  }),
  getAllUsers
);

userRouter.route("/update").post(
  authenticateUser,
  authorizePermissions({
    name: "Vendors",
    accessRight: ["update"],
  }),
  getAllUsers
);


module.exports = userRouter;
