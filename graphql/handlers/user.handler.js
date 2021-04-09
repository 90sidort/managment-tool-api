const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../model/user.model');

async function userAdd(_, { user }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const userExists = await User.findOne({ email: user.email });
    if (userExists) {
      throw new Error('User already exists!');
    }
    const hashedPass = await bcrypt.hash(user.password, 12);
    const newUser = new User({
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      position: user.position,
      email: user.email,
      password: hashedPass,
    });
    return newUser
      .save()
      .then((res) => ({ ...res._doc, password: null }))
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw new Error(err);
  }
}

async function login(_, { password, email }) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User does not exists!');
    }
    const matches = await bcrypt.compare(password, user.password);
    if (!matches) {
      throw new Error('Invalid password.');
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, 'super_secret_821378', {
      expiresIn: '12h',
    });
    return { userId: user._id, token: token, tokenExpiration: 12 };
  } catch (err) {
    throw new Error(err);
  }
}

async function getUsers(_, { _id }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const query = _id ? { _id } : {};
    const usersList = User.find(query)
      .then((users) => users.map((user) => ({ ...user._doc, password: null })))
      .catch((err) => {
        throw err;
      });
    return usersList;
  } catch (err) {
    throw new Error(err);
  }
}

async function updateUser(_, args, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const updates = args.changes;
    const user = await User.findById(args._id);
    user.name = updates.name;
    user.surname = updates.surname;
    user.phone = updates.phone;
    user.position = updates.position;
    user.email = updates.email;
    await user.save();
    return user;
  } catch (err) {
    throw new Error(err);
  }
}

async function deleteUser(_, { _id }, context) {
  if (!context.isAuth) throw new Error('You need to be logged in.');
  try {
    const user = await User.findById(_id);
    if (user) {
      user.remove();
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { userAdd, getUsers, updateUser, deleteUser, login };
