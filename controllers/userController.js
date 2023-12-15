const { sign } = require('../utils/jwt');
const Users = require('../models/Users');

// eslint-disable-next-line consistent-return
exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (userName || password) {
      const user = await Users.findOne({
        name: req.body.userName,
        password: req.body.password,
      });
      if (!user) {
        return res.status(404).json('User not found');
      }
      // eslint-disable-next-line no-underscore-dangle
      return res.json(sign(user._id.toString()));
    }
  } catch (err) {
    return res.json('Interval server error');
  }
};
