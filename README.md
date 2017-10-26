# Sol Interplanetary Academy

Make a thing!

## Visual Walkthrough
![alt text](http://sodhi.org/images/seniorEnrichment/seniorEnrichment.gif)

### Campus List
![alt text](http://sodhi.org/images/seniorEnrichment/CampusList.png)

### Campus Detail
![alt text](http://sodhi.org/images/seniorEnrichment/CampusDetail.png)

### Student List
![alt text](http://sodhi.org/images/seniorEnrichment/StudentList.png)

### Student Detail
![alt text](http://sodhi.org/images/seniorEnrichment/StudentDetail.png)


## Getting started

1. `npm install`
2. Start the build process with: `npm run build-watch`
3. In another terminal, start your app with `npm start`

## Requirements

### The Premise

You are the CTO of the Margaret Hamilton Interplanetary Academy of JavaScript. Create a RESTful web platform that allows you to manage your students and campuses.

### DB Design

- Students
  * have profile info
  * must be assigned to a campus

- Campuses
  * have info such as a name and image
  * can have many students assigned (may have none)

### Views and Functionality
#### User Stories

- Navigation: as a user I...
  * will land on **Home** by default
  * can navigate to **Campuses** from **Home**
  * can navigate to **Students** from **Home**
  * can navigate to view a **Single Campus** from **Campuses**
  * can navigate to view a **Single Student** from **Students**
  * can navigate to view a **Single Student** from **Single Campus** (for any student at that campus)
  * can navigate to view that student's **Single Campus** from **Single Student**

- Views: as a user I...
  * see a list of all campuses on the **Campuses** view
  * see a list of all students on the **Students** view
  * see details about a campus on the **Single Campus** view, including that campus's students
  * see details about a student on the **Single Student** view, including that student's campus

- Actions: as a user I...
  * can create a campus
  * can edit a campus's info, including adding/removing a student to/from that campus
  * can delete a campus
  * can create a student
  * can edit a student's info, including the campus that student is assigned to
  * can delete a student

### Routes

```
GET
- all campuses
- a campus by id
- all students
- a student by id
```

```
POST
- new campus
- new student
```

```
PUT
- updated student info for one student
- updated campus info for one campus
```

```
DELETE
- a campus
- a student
```
