const User = require('../../model/user.model');

async function userAdd(_, { user }) {
  const newUser = new User({
    name: user.name,
    surname: user.surname,
    phone: user.phone,
    position: user.position,
    email: user.email,
    password: user.password,
  });
  return newUser
    .save()
    .then((res) => ({ ...res._doc }))
    .catch((err) => {
      throw err;
    });
}

async function getUsers(_, { _id }) {
  const query = _id ? { _id } : {};
  const usersList = User.find(query)
    .then((users) => users.map((user) => ({ ...user._doc })))
    .catch((err) => {
      throw err;
    });
  return usersList;
}

async function updateUser(_, args) {
  const updates = args.changes;
  const user = await User.findById(args._id);
  user.name = updates.name;
  user.surname = updates.surname;
  user.phone = updates.phone;
  user.position = updates.position;
  user.email = updates.email;
  user.password = updates.password;
  await user.save();
  return user;
}

async function deleteUser(_, { _id }) {
  const user = await User.findById(_id);
  if (user) {
    user.remove();
    return true;
  }
  return false;
}

module.exports = { userAdd, getUsers, updateUser, deleteUser };
