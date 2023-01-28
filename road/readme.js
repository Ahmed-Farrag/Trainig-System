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

! to read db information from config file : to noone change my js files 
> npm i dotenv


    
*/