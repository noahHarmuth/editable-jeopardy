const path = require('path');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
let questions = {
   1: {
      1: "What is frog",
      2: "What is frog2",
      3: "What is frog3",
      4: "What is frog4",
      5: "What is frog5",
   },
   2: {
      1: "What is frog",
      2: "What is frog2",
      3: "What is frog3",
      4: "What is frog4",
      5: "What is frog5",
   },
   3: {
      1: "What is frog",
      2: "What is frog2",
      3: "What is frog3",
      4: "What is frog4",
      5: "What is frog5",
   },
   4: {
      1: "What is frog",
      2: "What is frog2",
      3: "What is frog3",
      4: "What is frog4",
      5: "What is frog5",
   },
   5: {
      1: "What is frog",
      2: "What is frog2",
      3: "What is frog3",
      4: "What is frog4",
      5: "What is frog5",
   },
}
let answers = {
   1: {
      1: "What is test",
      2: "What is test2",
      3: "What is test3",
      4: "What is test4",
      5: "What is test5",
   },
   2: {
      1: "What is test",
      2: "What is test2",
      3: "What is test3",
      4: "What is test4",
      5: "What is test5",
   },
   3: {
      1: "What is test",
      2: "What is test2",
      3: "What is test3",
      4: "What is test4",
      5: "What is test5",
   },
   4: {
      1: "What is test",
      2: "What is test2",
      3: "What is test3",
      4: "What is test4",
      5: "What is test5",
   },
   5: {
      1: "What is test",
      2: "What is test2",
      3: "What is test3",
      4: "What is test4",
      5: "What is test5",
   },
}
let categories = {
   1: "Suff",
   2: "thing",
   3: "asdf",
   4: "foo",
   5: "bar",
}
app.get('/', (req, res, next) => {
   res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
app.get('/questions', (req, res) => {
   console.log("questions get")
   res.send(questions);
})
app.post('/questions', (req, res) => {
   questions = req.body.questions;
   console.log("sending back res");
   res.send("updated backend");
});
app.get('/answers', (req, res) => {
   console.log("answers get")
   res.send(answers);
})
app.post('/answers', (req, res) => {
   answers = req.body.answers;
   console.log("sending back answers");
   res.send("updated backend answers");
});
app.get('/categories', (req, res) => {
   console.log("categories get")
   res.send(categories);
})
app.post('/categories', (req, res) => {
   categories = req.body.categories;
   console.log("sending back categories");
   res.send("updated backend categories");
});
// app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname,'public', 'index.html'));
// });
app.listen(port, () => {
   console.log('Server is up!');
});