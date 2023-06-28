const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")


// Register the user
const registerUser = asyncHandler(async (req, res) => {
    const { username, firstname, lastname, email, password } = req.body;
    if (!username || !firstname || !lastname || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registerd!");
    }
    // Hashpassword
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    const userCreated = await User.create({ username, firstname, lastname, email, password: hashPassword });
    if (userCreated) {
        res.status(201).json({ _id: userCreated.id, email: userCreated.email });
    }
    else {
        res.status(400);
        throw new Error("User data is not valid.")
    }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All feilds are mandatory.");
    }
    const userVerfied = await User.findOne({ email });
    // Compare
    if (userVerfied && bcrypt.compare(password, userVerfied.password)) {
        const accessToken = jwt.sign({
            userdata: {
                username: userVerfied.username,
                email: userVerfied.email,
                firstname: userVerfied.firstname,
                lastname: userVerfied.lastname,
                id: userVerfied.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60min" })
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Data not valid.")
    }
});



// Current User 
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.userdata);
});


module.exports = { registerUser, loginUser, currentUser };