'use strict';
const db = require('./db');
const campus = db.models.campus;
const students = db.models.user;

//Create seed data
let data = {
  campusData: [
    {name: 'Terra', imgURL: 'http://i.imgur.com/ME2AX.jpg'},
    {name: 'Luna', imgURL: 'http://i.imgur.com/a2fVF.jpg'},
    {name: 'Mars', imgURL: 'http://i.imgur.com/gFe7R.jpg'},
    {name: 'Titan', imgURL: 'http://i.imgur.com/MsSrb.jpg'},
    {name: 'Phobos', imgURL: 'http://i.imgur.com/MsSrb.jpg'}
  ],
  studentData: [
    {name: 'Ranjeet Sodhi', cohort: '1707-TERA', campusId: 1},
    {name: 'Oscar S', cohort: '1707-TERA', campusId: 1},
    {name: 'Flora Lee', cohort: '1709-LUNA', campusId: 2},
    {name: 'Peter Kang', cohort: '1709-LUNA', campusId: 2},
    {name: 'Afsana Cherian', cohort: '1707-Mars', campusId: 3},
    {name: 'Cindy Ng', cohort: '1708-TITA', campusId: 4},
    {name: 'John Park', cohort: '1708-TITA', campusId: 4},
    {name: 'Forest Hill', cohort: '1708-TITA', campusId: 4},
    {name: 'John Doe', cohort: '1707-TERA', campusId: 1},
    {name: 'Jane Doe', cohort: '1707-TERA', campusId: 5},
    {name: 'Jhonny Cash', cohort: '1707-TERA', campusId: 5},
    {name: 'Janine S', cohort: '1707-TERA', campusId: 5}
  ]
};

//Force sync the db, and then create the data in the two tables.
campus.sync({force:true})
  .then(() => students.sync({force: true}))
  .then(()=>{
    console.log('Dropping data in the database, and re-seeding');
    return Promise.all(
      data['campusData'].map((campuses)=>{
        return campus.create(campuses);
      })
    );
  })
  .then(()=>{
    return Promise.all(
      data['studentData'].map((student)=>{
        return students.create(student);
      })
    );
  })
  .catch((err)=>console.error("There was totally a problem", err, err.stack))
  .finally(()=>{
    db.close();
    console.log('connection closed');
    return null;
  });
