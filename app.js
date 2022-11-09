//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");

const homeStartingContent = "Writing something every day?” I speculated. “I’d rather go play!” The following week, my teacher reminded us every day to log in our journals. All of the elation about journaling eventually led me to believe that maybe this was worth a try. (Journaling is different from keeping a diary. Diaries are for logging your daily activities. Journaling involves recording your daily activities along with your correlating emotions; it is much more personal than a diary. I keep a journal Do YOU!!!!.";
const aboutContent = "Sometimes, just allowing yourself to write whatever wants to come out is enough to get the words flowing, and daily journaling provides the perfect outlet for this.But there are times when your brain goes as blank as the page in front of you. It happens.This is why it helps to have a list of creative journal ideas handy .the next time you find yourself looking for some journal entry ideas, I hope you’ll give this article another look (after enjoying it today).With a list of journaling ideas at your disposal, you’re sure to find something to shake down whatever is blocking your writing flow.Sometimes, it’s as easy as reminding yourself why you’re looking for things to journal about in the first place";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req,res){
  res.render("home", {StartingContent: homeStartingContent ,
    posts: posts
  });
  
});

app.get("/about", function(req,res){
  res.render("about", {About: aboutContent });
});

app.get("/contact", function(req,res){
  res.render("contact", {Contact: contactContent });
});


app.get("/compose", function(req,res){
  res.render("compose", {Contact: contactContent });
});
app.post("/compose", function(req,res){
  const post ={
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req,res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestedTitle){
      res.render("post",{
      title: post.title,
      content: post.content  
      });
    }
  });
});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
