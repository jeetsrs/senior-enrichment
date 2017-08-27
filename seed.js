'use strict';
const db = require('./db');
const campus = db.models.campus;
const students = db.models.user;

//Create seed data
let data = {
  campusData: [
    {name: 'Terra'},
    {name: 'Luna'},
    {name: 'Mars'},
    {name: 'Titan'}
  ],
  studentData: [
    {name: 'Ranjeet Sodhi', cohort: '1707-TERA', campusId: 1},
    {name: 'Flora Lee', cohort: '1709-LUNA', campusId: 2},
    {name: 'Afsana Cherian', cohort: '1707-Mars', campusId: 3},
    {name: 'Cindy Ng', cohort: '1708-TITA', campusId: 4},
    {name: 'John Doe', cohort: '1707-TERA', campusId: 1}
  ]
};

//Force sync the db, and then create the data in the two tables.
db
  .sync({force: true})
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
