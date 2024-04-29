const Course = require( '../models/courseSchema.js' );
const Student = require( '../models/studentSchema.js' );
const Subject = require( '../models/subjectSchema.js' );

//course create api logic
const courseCreate = async ( req, res ) => {
    try {
        const course = new Course( req.body );
        await course.save();
        res.status( 201 ).send( course );
    } catch ( error ) {
        res.status( 400 ).send( error );
    }
};



const getallCourse = async ( req, res ) => {
    try {
        // Query the database to fetch all courses
        const courses = await Course.find();
        res.json( courses ); // Return the fetched courses as JSON response
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: 'Internal Server Error' } );
    }
};



const getCourse = async ( req, res ) => {
    try {
        const studentId = req.params.studentId;
        // Find the student by ID
        const student = await Student.findById( studentId ).populate( 'examResult.subName' );

        if ( !student ) {
            return res.status( 404 ).json( { message: "Student not found" } );
        }

        let courseTitles = [];

        // Iterate through the exam results
        for ( const result of student.examResult ) {
            // Check if marks obtained are less than 40
            if ( result.marksObtained < 40 ) {
                // Get the subject associated with the low marks
                const subject = result.subName;
                // Find the course related to this subject
                const course = await Course.findOne( { school: student.school, 'subjects': subject } );
                if ( course ) {
                    courseTitles.push( course.coursetitle );
                }
            }
        }

        // Send the course titles as response
        res.status( 200 ).json( { courseTitles } );
    } catch ( err ) {
        console.error( err );
        res.status( 500 ).json( { message: "Server Error" } );
    }
};



module.exports = { courseCreate, getCourse, getallCourse };