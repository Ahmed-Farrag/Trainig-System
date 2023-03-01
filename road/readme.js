/*

HEADLINE : make stracture
* make folders: models - routes  - startup

HEADLINE : models
$ 1. file in models : branch.js
      * npm init --y
      * install to express joi and mongoose
      * make schema in branch
      * time stamp to record
    $ mongoose sequence to add simple id make autoencrement
      * add record => branchid case in front end can use it
      * npm i mongoose-sequence
      * require it and function after schema
      * make creation to my model
      *  validate finction and export it
      * export branch 


$ 2. file in models : employee.js
      * make schema in branch
      * time stamp to record
      * require it and function after schema
      * put data=collections in schema
         * when i put it : we have city =>
             install full-countries-cities
             > npm i full-countries-cities
             require it
      * make relation between emploee and branchID : 
              embded to document or refrence to model
      * then create model
      *  validate finction and export it
      * export employee and empolyeesSchema

$ 3. file in models : student.js
      * same thing in employee but : 
            * in mobile make custem function : i wanna local in spsefic country
            npm i validator
            require it
            * and write function
    
$ 4. file in models : course.js
      * same thing in student  
            
$ 5. file in models : group.js => group to all thing about course
      * same thing in student  
      * put course and employee refernce
      * make group Schedule prop  => array : case group of c# have spicific time in week
      * and validate it by Joi.arry().items({Joi.object()})


$ 6. Assign students =>  assing all files in file and payments to all 
 * same thing in student  




HEADLINE: server file
    * require express 
    * port
    * require startup/db  and  startup/routes


HEADLINE: in startup 
    *make file to db.js : 
    *  and routes.js


$ 1 in db.js 
    * make connect and mongoose.set('usefinAndModify', false)


! 1. to read db information from config file : to noone change my js files 
npm i config 
make folder => confige  and make file to db and server db.json and put :
{
    "server":{
        "host":"localhost",
        "database" :"itShare"
    }
}
and import int in db.js
const config = require('config');

! 2. to read db from .env file
> npm i dotenv
make file : .env
put => PORT=3000 and DB=mongdb://127.0.0.1:27017//dbname and JWTSECURTY
then in db concction file:
mongoose.connect(process.env.DB)

! 3. malik : 
require('dotenv').config();
const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;

const connectToDB = async () =>{
    try {
        await mongoose.connect(MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        })
        console.log("✅ Database Connection Verified");
    } catch(error) {
        console.log(error);
        }
};
connectToDB();





$ 2 in routes.js
make routes
and require express
then path app from server.js to routes.js
and create all parses


HEADLINE : create controlers = routes
in routes folder make branch.js:
1. useing to express
2. crud operations
3. in post make validate
4. install lodash to mentain mycode : >npm i lodash     - const _ = requie('lodash')
5. //* take the repete validation and put it in middleware:
     make middlewre folder and create vaildate.js: cut function from branch and put it 
     and in branch model remove function and rplace it to Schema and requre it in branch router:
     router.post("/", validationMiddleware(Schema),async (req, res, next) => {}

6. repet it in employee and studet file



 HEADLINE SECURTY
*  1. Identification  = register 
*  2. Authontication  = login 
*  3. Authorization   = permissons

http stateless  didn't remember -->  solve it :
                                         state managment
                                          ex: session 
                                              token  = JWT


* 1. for securty make this in models/employee
password:{
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 1024, // to any one open db can't read password
      },
      * Authorization
      role:{
        type: String,
        enum:['admin', 'manager'],
        default: 'manager'
      }
* 2. make refrance : app.use to .. in startup/routes.js
  app.use("/branch", branch)
  app.use("/students", student);
  app.use("/employee", employee);
  app.use("/auth", auth);

* 3. make routes to Authontication => make middleware to Authontication

in routes make file : auth.js
make post route
      
any password stored in db it's encrbted
password --> compare --> password in db
* install packge: >npm i bcrypt  to encribt data
const bcrypt = require('bcrypt')
const validPassword = await bcrypt.compare(req.body.password, user.password)


* 4.write token method in model/employee.js it's single responseplty
empolyeesSchema.methods.generateToken = function(){
  //JWT = json web token
}
>npm install jsonwebtoken
const jwt = require('jsonwebtoken')

* we have private key to tokens : to can read tokens
>npm i config    
$ to put variables in config and config read from .env

* in route/employee.js send password and role
* make to it encribtion : by bcrybt


HEADLINE: config file
default.json:
     {
    "jwtprivatekey": "users-jwtprivatekey"
}
and pas it to env file




$ Authentication
$ Authorization
>set users-jwtprivatekey=ahmed
* make middleware/auth.js and adminAuthorization.js and make functions and call it in route/employee


HEADLINE: loging error
make file in startup folder -> handlerror.js
>npm i http-errors
var createError = require('http-errors')
write function 
call it in routes.js

HEADLINE: log errors
$ winston
create file in config folder -> winston.js and write functions
* in winston file
>npm i winston
>npm i app-root-pass
var appRoot = require('app-root-path')


* in handlerror.js use logger :
var logger = require("../config/winston");
  appuse((err, req, res, next) => {
    logger.debug(err.message);
    res.status(500).json(err.message);
  });

* مورجن اللي يحط في الاستريم اللي عندي 
>npm i morgan
in routers.js : var morgan = require('morgan')
const winston = require("../config/winston");
app.use(morgan('combind', {stream: winston.stream}))



* handle jwt in config file: 
make file in startup folder -> config.js and make function if it her okay if not show error msg
and call it in server.js  : require('./startup/config');


HEADLINE : CORS to solve ports issuse 
>npm i cors
const cors = require('cors')
app.use(cors())
*/