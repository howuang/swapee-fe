const bcrypt = require("bcryptjs");
const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const User = require("../models/User");

const userController = {};

function toSlug(str) {
	// Chuyển hết sang chữ thường
	str = str.toLowerCase();     
	// xóa dấu
	str = str
		.normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
		.replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp
	// Thay ký tự đĐ
	str = str.replace(/[đĐ]/g, 'd');
	// Xóa ký tự đặc biệt
	str = str.replace(/([^0-9a-z-\s])/g, '');
	// Xóa khoảng trắng thay bằng ký tự -
	str = str.replace(/(\s+)/g, '-');
	// Xóa ký tự - liên tiếp
	str = str.replace(/-+/g, '-');
	// xóa phần dư - ở đầu & cuối
	str = str.replace(/^-+|-+$/g, '');
	return str;
}


userController.create = catchAsync(async (req, res, next) => {
  let { name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user)
    return next(new AppError(409, "User already exists", "Register Error"));

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  user = await User.create({
    name,
    email,
    password,
    displayName: toSlug(name)
  });

  const accessToken = await user.generateToken();
  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Create user successful"
  );
});

userController.readUser = async (req, res) => {
  const {displayName} = req.params

  const user = await User.findOne({ displayName }).lean();
  if (!user) {
    res.status(404).json({ message: "User not Found" });
  } else {
    return sendResponse(
    res,
    200,
    true,
    user,
    null,
    "Get Single User"
  );
  }
};

userController.getCurrentUser = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId).lean()
  if (!user) {
    res.status(404).json({ message: "User not Found" });
  } else {
    return sendResponse(
    res,
    200,
    true,
    user,
    null,
    "Get Single User"
  );
  }
})

userController.updateProfile = catchAsync(async (req, res, next) => {
  let user;
  const allowOptions = ["name", "email", "password", "avatarUrl", "location", "about"];
  const updateObject = {};
  const salt = await bcrypt.genSalt(10);
  try {
    allowOptions.forEach(async (option) => {
      if (option === "password" && req.body[option] !== "") {
        const salt = await bcrypt.genSalt(10);
        let password = req.body[option];
        password = await bcrypt.hash(password, salt);
        updateObject[option] = password;
      } else if (req.body[option] !== "") {
        updateObject[option] = req.body[option];
      }
    });
    user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      updateObject,
      { new: true });
  
  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    user,
    null,
    "Successfull update user profile"
  );
}
);

userController.destroy = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if (!user) {
    res.status(404).json({ message: "User not Found" });
  } else {
    res.json(user);
  }
};

module.exports = userController;
