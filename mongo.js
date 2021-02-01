const Student = require('./models/student');
const Course = require('./models/course');
const Teacher = require('./models/teacher');
let allStudents = [{
        name: "Renaldo",
        age: 22,
        courses: []
    },
    {
        name: "Rafaela",
        age: 22,
        courses: []
    },
    {
        name: "Ana",
        age: 18,
        courses: []
    }
]
let allCourses = [{
        name: "Java",
        description: "Intro to java",
        hours: 30,
        students: []
    },
    {
        name: "PHP",
        description: "Web development with php",
        hours: 35,
        students: []
    },
    {
        name: "Javascript",
        description: "Intro to javascript",
        hours: 20,
        students: []
    },
    {
        name: "MERN",
        description: "MERN stack introduction",
        hours: 40,
        students: []
    },
]
let allTeachers = [{
        name: "John Doe",
        subject: "Java",
        contact: "069123123",
        courses: []
    },
    {
        name: "Jane Doe",
        subject: "Javascript",
        contact: "069123123",
        courses: []
    },
    {
        name: "Ana",
        subject: "Php",
        contact: "069123123",
        courses: []
    }
]

Student.insertMany(allStudents, function(error, docs) {
    if (error) {
        console.log(error)
    }
    console.log('students saved!')
});

Course.insertMany(allCourses, function(error, docs) {
    if (error) {
        console.log(error)
    }
    console.log('courses saved!')
});

Teacher.insertMany(allTeachers, function(error, docs) {
    if (error) {
        console.log(error)
    }
    console.log('teachers saved!')
});
Teacher.findOne({ name: "Jane Doe" }, function(err, obj) {
    console.log(obj);
    obj.courses.push("601867b8c785383208771877");
    obj.courses.push("601867b8c785383208771878");
    console.log(obj, 'After push');
    obj.save()
});
Teacher.findOne({ name: "Ana" }, function(err, obj) {
    console.log(obj);
    obj.courses.push("601867b8c785383208771876");
    console.log(obj, 'After push');
    obj.save()
});
Teacher.findOne({ name: "John Doe" }, function(err, obj) {
    console.log(obj);
    obj.courses.push("601867b8c785383208771875");
    console.log(obj, 'After push');
    obj.save()
});
const studentsList = []
Student.find({}, function(err, students) {
    students.forEach(element => {
            studentsList.push(element._id)
        },
        console.log(err));
});
Course.findOne({ name: "Java" }, function(err, obj) {
    console.log(obj);
    obj.students.push(studentsList[0]);
    obj.students.push(studentsList[2]);
    obj.students.push(studentsList[3]);
    console.log(obj, 'After push');
    obj.save();
});


Course.findOne({ name: "Javascript" }, function(err, obj) {
    for (let st of obj.students) {
        if (st != null) {
            Student.findById(st, function(err, obj) {
                obj.courses.push("601867b8c785383208771875");
                obj.save();
                console.log(obj);
            });
        }
    }
    console.log(err);

});