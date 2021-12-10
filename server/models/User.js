const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
  {
    name: { type: String, required: false, unique: false, default: "" },
    displayName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false, unique: false },
    avatarUrl: { type: String, required: false, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" },
    about: { type: String, default: "" },
    location: { type: String, default: "" },
    googleId: { type: String, required: false, default: "" },
    facebookId: { type: String, required: false, default: "" },
    role: { type: String, enum: ["user", "admin"], required: true, default: "user" }
  },
  {
    timestamps: true,
  }
);

userSchema.statics.findOrCreate = async (profile) => {
  try {
    let user = await User.findOne({ email: profile.email });
    if (!user) {
      let newPassword = profile.password || "123";
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(newPassword, salt);
      user = await User.create({
        name: profile.name,
        email: profile.email,
        password: newPassword,
        avatarUrl: profile.avatarUrl,
        googleId: profile.googleId,
        facebookId: profile.facebookId,
        displayName: profile.displayName,
      })
    }
    return user
  } catch (error) {
    console.log(error)
  }
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj._id;
  delete obj.__v;
  delete obj.googleId;
  delete obj.password;
  delete obj.createdAt;
  delete obj.updatedAt;  
  delete obj.facebookId;
  return obj;
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password, function (_, isMatch) {
    return isMatch;
  });
};

userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "365d",
  });
  return accessToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
