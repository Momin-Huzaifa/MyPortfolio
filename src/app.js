import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
import express from "express";
import Hold from "./db/conn.js";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import hbs from "hbs";
import User from "./models/usermessage.js";
import bcrypt from "bcrypt";
import passport from "passport";
import initializePassport from "../passport-config.js";
import flash from "express-flash";
import session from "express-session";
import methodoverride from "method-override";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import AuthUser from "./models/Registeruser.js";
import RegisterUser from "./models/Registeruser.js";

const app = express();

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const users = [];

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticpath = path.join(__dirname, "../public");
const templatespath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

app.use(express.static(staticpath));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", templatespath);
hbs.registerPartials(partialspath);

// Sample services data

const services = [
  {
    id: 1,
    serviceicon: "fa-solid fa-pen-nib",
    servicename: "Web",
    servicenamesec: "Designer",
    servicepara:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate quo dignissimos",
  },
  {
    id: 2,
    serviceicon: "fa-solid fa-code",
    servicename: "Web",
    servicenamesec: "Developer",
    servicepara:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate quo dignissimos",
  },
  {
    id: 3,
    serviceicon: "fa-solid fa-pen-fancy",
    servicename: "Frontend",
    servicenamesec: "Developer",
    servicepara:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate quo dignissimos",
  },
  {
    id: 4,
    serviceicon: "fa-solid fa-database",
    servicename: "backend",
    servicenamesec: "Developer",
    servicepara:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate quo dignissimos",
  },
];

// Sample skills data

const skills = [
  {
    id: 1,
    name: "HTML5",
    icon: "./img/html-1.svg",
    level: "Intermediate",
  },
  {
    id: 2,
    name: "CSS3",
    icon: "./img/css-3.svg",
    level: "Intermediate",
  },
  {
    id: 3,
    name: "JavaScript",
    icon: "./img/logo-javascript.svg",
    level: "Intermediate",
  },
  {
    id: 4,
    name: "Sass",
    icon: "./img/sass-1.svg",
    level: "Intermediate",
  },
  {
    id: 5,
    name: "Bootstrap",
    icon: "./img/bootstrap-5-1.svg",
    level: "Intermediate",
  },
  {
    id: 6,
    name: "ReactJS",
    icon: "./img/react-2.svg",
    level: "Intermediate",
  },
  {
    id: 7,
    name: "Material ui",
    icon: "./img/material-ui-1.svg",
    level: "Intermediate",
  },
  {
    id: 8,
    name: "jQuery",
    icon: "./img/jquery-6.svg",
    level: "Intermediate",
  },
  {
    id: 9,
    name: "GitHub",
    icon: "./img/git-icon.svg",
    level: "Intermediate",
  },
];

// Sample Educationcard data

const Educationcard = [
  {
    id: 1,
    Educationcardimage: "./img/YCMOU.jpg",
    Educationcardh3: "Bachelor Of Computer Application",
    Educationcardpara:
      " Yashwantrao Chavan Maharashtra Open University | YCMOU",
    Educationcardh4: "2022-2024 | Pursuing",
    Educationclass: "Educationcardinner Educationcardinner1",
  },
  {
    id: 2,
    Educationcardimage: "./img/B.n.n.jpg",
    Educationcardh3: "HSC Commerce",
    Educationcardpara:
      " Padmashri Annasaheb Jadhav Bharatiya Samaj Unnati Mandal's B.N.N. College, Bhiwandi",
    Educationcardh4: "2018-2020 | Completed",
    Educationclass: "Educationcardinner Educationcardinner2",
  },
];

app.use(flash());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-default-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodoverride("_method"));

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return next(); // No token, proceed without user

  jwt.verify(
    token,
    process.env.JWT_SECRET || "your-default-secret",
    (err, decoded) => {
      if (err) return next(); // Invalid token, proceed without user
      req.user = decoded; // Attach user information to request
      next();
    }
  );
};

// Use the middleware
app.use(verifyToken);

// Existing login route
// Existing login route
app.post("/login", (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/Login");
    }

    req.logIn(user, async (err) => {
      if (err) return next(err);

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || "your-default-secret",
        { expiresIn: "30d" }
      );

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      return res.redirect("/");
    });
  })(req, res, next);
});

app.post("/Register", checkNotAuthenticated, async (req, res) => {
  try {
    // Create a new user instance using the Mongoose model
    const newUser = new AuthUser({
      name: req.body.FullName, // Store the full name
      email: req.body.email,
      password: req.body.password, // The pre-save hook will handle password hashing
    });

    // Save the new user to the database
    await newUser.save();

    // Redirect to the login page after successful registration
    res.redirect("/Login");
  } catch (error) {
    console.error("Error during registration:", error);

    // Handle specific errors such as duplicate email
    if (error.code === 11000) {
      req.flash("error", "Email is already in use");
      return res.redirect("/Register");
    }

    // For any other errors, redirect back to the register page
    req.flash("error", "Registration failed");
    res.redirect("/Register");
  }
});

//Routes
// Endpoint for services
app.get("/services", (req, res) => {
  res.json(services);
});

// Endpoint for skills
app.get("/skills", (req, res) => {
  res.json(skills);
});

// Endpoint for Educationcard
app.get("/Educationcard", (req, res) => {
  res.json(Educationcard);
});

app.get("/", checkAuthenticated, (req, res) => {
  res.render("index");
});

app.get("/Login", checkNotAuthenticated, (req, res) => {
  const errorMessages = req.flash("error"); // Fetch error messages
  res.render("Login", { messages: { error: errorMessages } });
});

app.get("/Register", checkNotAuthenticated, (req, res) => {
  res.render("Register");
});

// app.post("/", async (req, res) => {
//   try {
//     console.log(req.body); // Log the incoming form data
//     const userData = new User(req.body);
//     await userData.save();
//     res.status(201).render("index");
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.post("/", async (req, res) => {
  try {
    // console.log(req.body); // Log the incoming form data
    const userData = new User(req.body);
    await userData.save();
    // res.status(201).render("/");
    // Redirect to the homepage or a success page after saving data
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error);
  }
});
//Routes

// console.log(users);

app.delete("/logout", (req, res) => {
  res.clearCookie("jwt"); // Clear the JWT cookie
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/Login");
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated() || req.user) {
    // Check if user is authenticated
    return next();
  }
  res.redirect("/Login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
