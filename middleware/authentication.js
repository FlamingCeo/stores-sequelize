const connectDB = require("../models");
const User = connectDB.staff; // Importing the User model from the connectDB module
const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken module

const authenticateUser = async (req, res, next) => {
  // Check if the request header contains the "Authorization" field
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ msg: "Authentication Invalid" });
  }
  const token = authHeader.split(" ")[1]; // Extract the token from the header

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the JWT_SECRET from the environment variables
    // Attach the user information to the request object
    req.user = { user: payload };
    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ msg: "Authentication Invalid" });
  }
};

const authorizePermissions = (roles) => {
  return (req, res, next) => {
    const setting = roles; // Get the roles object from the input
    const role_access = req.user.user.access; // Get the access information from the authenticated user
    const { role, accessRights } = role_access;
    const access_list = accessRights.map((item) => item.moduleName); // Extract the module names from the access rights

    // Check if the setting name is included in the access list
    if (!access_list.includes(setting.name)) {
      return res.status(403).json({ msg: "Unauthorized to access this route" });
    }

    const data = accessRights.filter((key) => {
      return key["moduleName"] == setting.name; // Filter the access rights based on the setting name
    });

    const filteredData = Object.entries(data[0])
      .filter(([key, value]) => value === true) // Filter the entries where the value is true
      .map(([key]) => key); // Get only the keys from the filtered entries

    console.log(filteredData); // Log the filtered keys

    const setA = new Set(setting.accessRight); // Create a set of access rights from the setting
    const hasCommonValue = filteredData.some((value) => setA.has(value)); // Check if there are common values between the filtered keys and the access rights

    if (!hasCommonValue) {
      return res.status(403).json({ msg: "Unauthorized to access this route" });
    }
    next(); // Proceed to the next middleware
  };
};

module.exports = { authenticateUser, authorizePermissions }; // Export the authenticateUser and authorizePermissions functions as module exports
