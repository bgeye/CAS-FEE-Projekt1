import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';


import {noteRoutes} from './routes/noteRoutes.mjs';


const app = express();
const router = express.Router();
const allowCrossDomain = function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   next();
};

app.use(allowCrossDomain);

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));

app.use(bodyParser.json());

app.get("/", function() {
   res.sendFile("/html/index.html", {root:__dirname + '/public/'});
});

app.use("/notes", noteRoutes);

// app.use(function(err, req, res, next) {
//     if(err.name === '') {
//         res.status(404).send('404 Page not found!');
//     } else {
//         next(err);
//     }
// });

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
});