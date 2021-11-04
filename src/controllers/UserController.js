const User = require("../models/User");

module.exports = {
  async store(req, res) {
    try {
      console.log(req.body);
      const { firstName, lastName, password, email } = req.body;

      const existentUser = await Usser.findOne({ email });

      if (existentUser) {
        const user = await User.create({
          firstName: firstName,
          lastName: lastName,
          password: password,
          email: email,
        });
        return res.json(user);
      }

      return res.status(400).json({
        message:
          "Email or user has been registered. Do you want to login instead? ",
      });
    } catch (error) {
      throw Error(`Error while registering a new user ${error}`);
    }
  },
};
