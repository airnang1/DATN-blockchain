const User = require("../models/User.js");
const Token = require("../models/Token.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEMail = require("../utils/sendMail.js");
const fetch = require("node-fetch");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const authCtrl = {
  register: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      if (!username || !password || !email) {
        return res.status(400).json({
          success: false,
          message: "missing username, password, email!",
        });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "invalid Email!",
        });
      }

      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          success: false,
          message: "this email already exists!",
        });
      }

      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "invalid password!",
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new User({
        username: username,
        email: email,
        password: passwordHash,
      });

      const activation_token = createActivationToken(newUser);

      const url = `${process.env.CLIENT_URL}/activate/${activation_token}`;

      sendEMail(email, url, username, "Please verify your email!");

      res.status(200).json({ msg: "Register success!!" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ msg: error.message });
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;

      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { username, email, password } = user;

      const check = await User.findOne({ email });
      if (check) {
        return res.status(400).json({ msg: "this email already exists" });
      }

      const newUser = new User({
        username,
        email,
        password,
      });

      await newUser.save();

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const newToken = new Token({
        userId: user._id,
        refreshToken: refresh_token,
      });

      await newToken.save();

      return res.status(200).json({ newUser, accessToken: access_token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({
          msg: "This email and/or password does not exists!",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          msg: "This email and/or password does not exists!",
        });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      const newToken = new Token({
        userId: user._id,
        refreshToken: refresh_token,
      });
      await newToken.save();

      res.setHeader("refreshtoken", refresh_token);

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "strict",
        secure: false,
      });

      return res.status(200).json({ user, accessToken: access_token });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  getAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });
      if (rf_token) {
        let tokens = await Token.find();
        const isCheckToken = tokens.some(
          (token) => token.refreshToken === rf_token
        );

        if (!isCheckToken) {
          return res.status(403).json({ msg: "refresh token is not valid!" });
        }

        jwt.verify(
          rf_token,
          process.env.REFRESH_TOKEN_SECRET,
          async (err, user) => {
            if (err) return res.status(400).json({ msg: "Please login now!" });

            const access_token = createAccessToken({ id: user.id });
            const newRefreshToken = createRefreshToken({ id: user.id });

            res.cookie("refreshtoken", newRefreshToken, {
              httpOnly: false,
              maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
              sameSite: "strict",
              secure: false,
              path: "/",
            });

            const newToken = new Token({
              userId: user.id,
              refreshToken: newRefreshToken,
            });

            await newToken.save();

            return res.status(200).json({ access_token });
          }
        );
      } else {
        return res.status(403).json({ msg: "token is invalid!" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "this email does not exists." });
      }
      const access_token = createAccessToken({ id: user._id });

      const url = `${process.env.CLIENT_URL}/reset-password/${access_token}`;

      sendEMail(email, url, user.username, "Please click to reset password");

      res.status(200).json({
        msg: "re-send the password, please check your email!",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password_new } = req.body;
      const verify_account = await User.findOne({ _id: req.user.id });
      if (!verify_account) {
        return res.status(400).json({ msg: "this email does not exists." });
      }

      const passwordHash = await bcrypt.hash(password_new, 12);

      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );
      res.status(200).json({
        msg: "Password successfully changed!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  },
  googleLogin: async (req, res) => {
    try {
      const { tokenId, loginDomain } = req.body;

      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.MAILING_SERVICE_CLIENT_ID,
      });
      const { email, email_verified, name, picture } = verify.payload;

      const password = email + process.env.GOOGLE_SECRET;
      const passwordHash = await bcrypt.hash(password, 12);

      if (!email_verified) {
        return res.status(400).json({ msg: "Email verification failed" });
      }
      const user = await User.findOne({ email, loginDomain });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: "Password is incorrect" });
        }
        const access_token = createAccessToken({ id: user._id });
        const refresh_token = createRefreshToken({ id: user._id });

        const newToken = new Token({
          userId: user._id,
          refreshToken: refresh_token,
        });

        await newToken.save();

        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/auth/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({ user: user, accessToken: access_token });
      } else {
        const newUser = new User({
          username: name,
          password: passwordHash,
          email,
          loginDomain,
          profilePicture: picture,
        });

        await newUser.save();

        const access_token = createAccessToken({ id: newUser._id });
        const refresh_token = createRefreshToken({ id: newUser._id });

        const newToken = new Token({
          userId: newUser._id,
          refreshToken: refresh_token,
        });

        await newToken.save();

        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/auth/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({ newUser, accessToken: access_token });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  },
  facebookLogin: async (req, res) => {
    try {
      const { accessToken, userID, loginDomain } = req.body;

      const URL = `https://graph.facebook.com/v4.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

      const data = await fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          return res;
        });

      const { email, name, picture } = data;

      const password = email + process.env.FACEBOOK_SECRET;
      const passwordHash = await bcrypt.hash(password, 12);

      if (!data) {
        return res.status(400).json({ msg: "Email verification failed" });
      }

      const user = await User.findOne({ email, loginDomain });

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({ msg: "Password is incorrect" });
        }
        const access_token = createAccessToken({ id: user._id });
        const refresh_token = createRefreshToken({ id: user._id });

        const newToken = new Token({
          userId: user._id,
          refreshToken: refresh_token,
        });

        await newToken.save();
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/auth/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({ user: user, accessToken: access_token });
      } else {
        const newUser = new User({
          username: name,
          password: passwordHash,
          email,
          loginDomain,
          profilePicture: picture.data.url,
        });

        await newUser.save();
        const access_token = createAccessToken({ id: newUser._id });
        const refresh_token = createRefreshToken({ id: newUser._id });
        const newToken = new Token({
          userId: newUser._id,
          refreshToken: refresh_token,
        });

        await newToken.save();
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/auth/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({ user: user, accessToken: access_token });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  },
  walletLogin: async (req, res) => {
    try {
      const { name, email, phoneNumber, addressWallet, loginDomain } = req.body;
      const password = email + process.env.GOOGLE_SECRET;
      const passwordHash = await bcrypt.hash(password, 12);
      let user = await User.findOne({ addressWallet, loginDomain });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: "Password is incorrect" });
        }
        const access_token = createAccessToken({ id: user._id });
        const refresh_token = createRefreshToken({ id: user._id });

        const newToken = new Token({
          userId: user._id,
          refreshToken: refresh_token,
        });

        await newToken.save();
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/auth/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({ user: user, accessToken: access_token });
      } else {
        const newUser = new User({
          username: name,
          email,
          phoneNumber,
          addressWallet,
          loginDomain,
          password: passwordHash,
        });
        await newUser.save();

        const access_token = createAccessToken({ id: user._id });
        const refresh_token = createRefreshToken({ id: newUser._id });

        const newToken = new Token({
          userId: newUser._id,
          refreshToken: refresh_token,
        });

        await newToken.save();
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/auth/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({ newUser, accessToken: access_token });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/" });
      return res.status(200).json({ msg: "Logged out." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
};

const createActivationToken = (payload) => {
  return jwt.sign(payload.toJSON(), process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "3d",
  });
};

module.exports = authCtrl;
