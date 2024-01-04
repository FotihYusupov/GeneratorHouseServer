/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const { sign } = require('../utils/jwt');
const Users = require('../models/Users');

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

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.headers;
    if (!userId) {
      return res.status(404).json('User not found');
    }
    const findUser = await Users.findOne({ _id: userId });
    if (!findUser) {
      return res.json('User not found');
    }
    findUser.name = req.body.userName;
    findUser.password = req.body.password;
    await findUser.save();
    return res.json(sign(findUser._id.toString()));
  } catch (err) {
    return res.json('Interval server error');
  }
};
