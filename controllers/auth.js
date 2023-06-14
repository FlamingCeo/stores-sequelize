const connectDB = require("../models");
const User = connectDB.user;
const access_module = connectDB.module
const { role, user_role, access } = connectDB;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
     if (!email || !password) {
      // Return error if email or password is missing
      return res.status(401).json({ msg: "You must provide email/password" });
    }
  
    const user = await User.findOne({ where: { email: email } });
  
    if (!user) {
      // Return unauthorized if user does not exist
      return res.status(401).json({ msg: "Unauthorized because no email" });
    }
  
    let staffWithAccessRights;
  
    const passwordCheck = user.password;
    if (!bcrypt.compareSync(password, passwordCheck)) {
      // Return unauthorized if password does not match
      return res
        .status(401)
        .json({ msg: "Unauthorized because password does not match" });
    }
  
    try {
      staffWithAccessRights = await getStaffWithAccessRights(user.id);
    } catch (error) {
      // Handle the error
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  
    const id = new Date().getDate();
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  
    return res.status(200).send({
      accessToken: token,
      profile: user,
      access_list: staffWithAccessRights,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send({
     error
    });
  }

 
};

const getStaffWithAccessRights = async (id) => {
  try {
    const user = await User.findOne({
      where: { id: id },
      include: [
        {
          model: user_role,
          attributes: ["role_id"],
          include: [
            {
              model: role,
              attributes: ["roleName", "id"],
              include: [
                {
                  model: access,
                  attributes: [
                    "view",
                    "update",
                    "remove",
                    "fullAccess",
                    "id",
                  ],
                  include: [
                    {
                      model: access_module,
                      attributes: ["name"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    // Process the staff and access rights data as needed
    const staffWithAccessRights = user.toJSON();
    const roleslist = staffWithAccessRights.user_role;
    let accessRights;
    let rolename
    if(roleslist){
      rolename = roleslist.role.roleName;
       accessRights = roleslist.role.accesses.map(
        ({ view, update, remove, fullAccess, access_module }) => ({
          moduleName: access_module.name,
          view,
          update,
          remove,
          fullAccess,
        })
      );

    }


    return {
      role: rolename,
      accessRights,
    };
  } catch (error) {
    // Handle the error
    console.error(error);
    throw error;
  }
};

module.exports = {
  login
};
