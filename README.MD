# Learning Sequelize in Node.js Project

This project serves as a learning resource for using Sequelize in a Node.js project. Sequelize is an Object-Relational Mapping (ORM) library that allows you to interact with relational databases using JavaScript.

## Resources

To enhance your understanding of Sequelize and its usage in Node.js, refer to the following resources:

- [Sequelize Documentation](https://sequelize.org/master/)
- [Sequelize GitHub Repository](https://github.com/sequelize/sequelize)
- [Node.js Documentation](https://nodejs.org/en/docs/)


#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Update .env file with correct value

#### Routers

- auth.js

#### Register User

- Validate - name, email, password - with Sequelize
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit
