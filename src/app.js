
import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import session from "express-session";
import cookieParser from "cookie-parser";
import user_router from "./routes/user-routes.js";
import site_router from "./routes/site-routes.js";
import path from "path";
import auth from "./middlewars/user-middleware.js";
import blockAuthRoutes from "./middlewars/blockAuthRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});


app.use(session({
  secret: process.env.SECRET_KEY || 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join("src", "views"));


app.use(blockAuthRoutes);


app.use(auth);


app.use("/user", user_router);
app.use(site_router);

app.listen(PORT, () => {
  console.log(`Server is running ... http://localhost:${PORT}`);
});
