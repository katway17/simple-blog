import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Global Variables
const posts = [];
const currentYear = new Date().getFullYear();

// Routes
// Home route to display all posts
app.get("/", (req, res) => {
  res.render("index", { posts, year: currentYear });
});

// About page route
app.get("/about", (req, res) => {
  res.render("about", { year: currentYear });
});

// Contact page route
app.get("/contact", (req, res) => {
  res.render("contact", { year: currentYear });
});

app.get("/edit/:index", (req, res) => {
    const index = req.params.index;
    const post = posts[index];
    const currentYear = new Date().getFullYear(); // Add the current year
  
    if (post) {
      res.render("edit", { post, index, year: currentYear }); // Pass the year variable
    } else {
      res.redirect("/");
    }
  });

// Route to handle creating a new post
app.post("/submit", (req, res) => {
    const { title, content } = req.body;
    if (title && content) {
      posts.push({ title, content });
      console.log(posts); // Check posts array
    }
    res.redirect("/");
  });

// Route to handle deleting a post
app.post("/delete", (req, res) => {
  const index = req.body.index;
  if (index !== undefined) {
    posts.splice(index, 1);
  }
  res.redirect("/");
});

app.post("/update/:index", (req, res) => {
    const index = req.params.index;
    const { title, content } = req.body;
  
    if (posts[index]) {
      posts[index].title = title;
      posts[index].content = content;
      console.log(`Updated post at index ${index}:`, posts[index]);
    }
    res.redirect("/");
  });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });