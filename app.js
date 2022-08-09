//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const PORT = process.env.PORT || 5000

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static('public'))
mongoose.connect('mongodb+srv://amit:amit123@cluster0.mdmlped.mongodb.net/blogpostdb');

const blogschema = {
  
    posttitle: String,
    postdesc: String
  
}

const Blog = mongoose.model('Blog', blogschema);

let blogs = [];


app.get('/', function (req, res) {
  //  let amit = date();
  Blog.find({}, function (err, foundblogs) {
    res.render('home', { home: homeStartingContent, newposts: foundblogs })

  })
});
app.get('/about', function (req, res) {
  //  let amit = date();
  res.render('about', { about: aboutContent })
});
app.get('/contact', function (req, res) {
  //  let amit = date();
  res.render('contact', { contact: contactContent })
});
app.get('/compose', function (req, res) {
  //  let amit = date();
  res.render('compose', { contact: contactContent })
});
app.get('/post/:postname', function (req, res) {
  //  let amit = date();
  const reqtitle = _.lowerCase(req.params.postname);
  posts.forEach(element => {
    const storedtitle = _.lowerCase(element.title);

    if (reqtitle === storedtitle) {
      res.render('post', { reqpost: posts, reqtitle1: reqtitle })
    }

  });
});

app.post('/', function (req, res) {

  const s = req.body.search;
  const reqstitle = _.lowerCase(s);
  Blog.find({posttitle: reqstitle}, function (err, foundblogs) {

    if(err){
      console.log(err);
    }
    else{

      console.log(foundblogs);
      console.log(reqstitle);
      res.render('spost', { reqspost: foundblogs, reqstitle1: reqstitle })
      // res.rawListeners('/')
        // const storedstitle = _.lowerCase(foundblogs.posttitle);
      // console.log(foundblogs[0].posttitle);
      // res.render('home', { home: homeStartingContent, newposts: foundblogs })
      // foundblogs.forEach(element => {
      //   let storedstitle = _.lowerCase(element.posttitle);
      
      //   if (reqstitle === storedstitle) {
      //     res.render('spost', { reqspost: foundblogs, reqstitle1: reqstitle })
      //   }
      //   else {
      //     res.render('spost', { reqspost: foundblogs, reqstitle1: reqstitle })
      //   }
        
      // });
    }

  })


})




app.post('/compose', function (req, res) {
  // const post = {
   const  title= req.body.posttitle;
   const content= req.body.postbody;
  // }
  const Newb = new Blog({
    
      posttitle: title,
      postdesc: content
    
  })
  Newb.save();
  // posts.push(post)
  // console.log(posts);
  // res.render('home' , {home: homeStartingContent});
  res.redirect('/')

});





// if(process)





app.listen(PORT, function () {
  console.log("Server started on port 3000");
});


// heroku commands
//heroku login
//heroku create appname
//git init
//git status
//git add .
//git commit -m 'gg'
//git push heroku master
//if fatal repo error occured: heroku git:remote -a appname
//heroku local
//heroku open
//