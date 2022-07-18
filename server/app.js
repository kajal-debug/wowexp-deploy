// const express = require('express');
// const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

// app.use(express.static('../../public_html/game/'));
// app.use(express.static('../../public_html/libs'));
// app.use(express.static('../../public_html/game/v3'));
// app.get('/',function(req, res) {
//     res.sendFile(__dirname + '../../public_html/game/v3/index.html');
// });

// io.sockets.on('connection', function(socket){
// 	socket.userData = { x:0, y:0, z:0, heading:0 };//Default values;
 
// 	console.log(`${socket.id} connected`);
// 	socket.emit('setId', { id:socket.id });
	
//     socket.on('disconnect', function(){
// 		socket.broadcast.emit('deletePlayer', { id: socket.id });
//     });	
	
// 	socket.on('init', function(data){
// 		console.log(`socket.init ${data.model}`);
// 		socket.userData.model = data.model;
// 		socket.userData.colour = data.colour;
// 		socket.userData.x = data.x;
// 		socket.userData.y = data.y;
// 		socket.userData.z = data.z;
// 		socket.userData.heading = data.h;
// 		socket.userData.pb = data.pb,
// 		socket.userData.action = "Idle";

// 		console.log(`socket.init ${data.colour}`);
// 	});
	
// 	socket.on('update', function(data){
// 		socket.userData.x = data.x;
// 		socket.userData.y = data.y;
// 		socket.userData.z = data.z;
// 		socket.userData.heading = data.h;
// 		socket.userData.pb = data.pb,
// 		socket.userData.action = data.action;
// 	});
	
// 	socket.on('chat message', function(data){
// 		console.log(`chat message:${data.id} ${data.message}`);
// 		io.to(data.id).emit('chat message', { id: socket.id, message: data.message });
// 	})
// });

// http.listen(2002, function(){
//   console.log('listening on *:2002');
// });

// setInterval(function(){
// 	const nsp = io.of('/');
//     let pack = [];
	
//     for(let id in io.sockets.sockets){
//         const socket = nsp.connected[id];
// 		//Only push sockets that have been initialised
// 		if (socket.userData.model!==undefined){
// 			pack.push({
// 				id: socket.id,
// 				model: socket.userData.model,
// 				colour: socket.userData.colour,
// 				x: socket.userData.x,
// 				y: socket.userData.y,
// 				z: socket.userData.z,
// 				heading: socket.userData.heading,
// 				pb: socket.userData.pb,
// 				action: socket.userData.action
// 			});    
// 		}
//     }
// 	if (pack.length>0) io.emit('remoteData', pack);
// }, 40);
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require("cors");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const User = require('./models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// configure cors
app.use(cors());

// configure express to receive form data
app.use(express.json());

const port = process.env.PORT || 2002;
// configure dotEnv
dotEnv.config({ path: "./.env" });
mongoose.connect(process.env.MONGO_DB_LOCAL_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((response) => {
    console.log("Connected to MongoDB Cloud Successfully......");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

app.use("/api/users", require("./router/userRouter"));
app.use("/api/fetch_user",require("./router/fetch_user"));
app.use("/api/email",require("./router/mailer"));

app.post('/logins', [
    body('email').notEmpty().withMessage('Email is Required'),
    body('password').notEmpty().withMessage('Password is Required'),
], async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() })
    }
    try {
        let { email, password } = request.body;
        let user = await User.findOne({ email: email });
        if (!user) {
            return response.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }
        // check password
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        // create a token
        let payload = {
            user: {
                id: user.id,
                name: user.name
            }
        };
		var user_token ;
        jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 360000000 }, (err, token) => {
            if (err) throw err;
            response.status(200).json({
                msg: 'Login is Success',
                token: token
            });
			 user_token = token
			console.log("token",token)
        })
    }
    catch (error) {
        console.error(error);
        response.status(500).json({ errors: [{ msg: error.message }] });
    }
});
    app.use(express.static('./client/game/'));
    app.use(express.static('./client/libs'));
    app.use(express.static('./client/game/v3'));
    app.get('/',function(req, res) {
        res.sendFile(__dirname + '../../public_html/game/v3/index.html');
    });
    
    io.sockets.on('connection', function(socket){
        socket.userData = { x:0, y:0, z:0, heading:0 };//Default values;
     
        console.log(`${socket.id} connected`);
        socket.emit('setId', { id:socket.id });
        
        socket.on('disconnect', function(){
            socket.broadcast.emit('deletePlayer', { id: socket.id });
        });	
        
        socket.on('init', function(data){
            console.log(`socket.init ${data.model}`);
            socket.userData.model = data.model;
            socket.userData.colour = data.colour;
            socket.userData.x = data.x;
            socket.userData.y = data.y;
            socket.userData.z = data.z;
            socket.userData.heading = data.h;
            socket.userData.pb = data.pb,
            socket.userData.action = "Idle";
    
            console.log(`socket.init ${data.colour}`);
        });
        
        socket.on('update', function(data){
            socket.userData.x = data.x;
            socket.userData.y = data.y;
            socket.userData.z = data.z;
            socket.userData.heading = data.h;
            socket.userData.pb = data.pb,
            socket.userData.action = data.action;
        });
        
        socket.on('chat message', function(data){
            console.log(`chat message:${data.id} ${data.message}`);
            io.to(data.id).emit('chat message', { id: socket.id, message: data.message });
        })
    });
    setInterval(function(){
        const nsp = io.of('/');
        let pack = [];
        
        for(let id in io.sockets.sockets){
            const socket = nsp.connected[id];
            //Only push sockets that have been initialised
            if (socket.userData.model!==undefined){
                pack.push({
                    id: socket.id,
                    model: socket.userData.model,
                    colour: socket.userData.colour,
                    x: socket.userData.x,
                    y: socket.userData.y,
                    z: socket.userData.z,
                    heading: socket.userData.heading,
                    pb: socket.userData.pb,
                    action: socket.userData.action
                });    
            }
        }
        if (pack.length>0) io.emit('remoteData', pack);
    }, 40);

if(process.envNODE_ENV == "production"){
    app.use(express.static("client/user/build"));
}
http.listen(port, function(){
  console.log('listening on *:2002');
});