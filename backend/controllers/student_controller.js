const bcrypt = require( 'bcrypt' );
const Subject = require( '../models/subjectSchema.js' );
const Teacher = require( '../models/teacherSchema.js' );
const Student = require( '../models/studentSchema.js' );
const Course = require( '../models/courseSchema.js' );


// const getCourseAccordingMarks = async ( req, res ) => {
//     try {
//         const studentId = req.params.studentId;
//         const student = await Student.findById( studentId ).select( 'examResult' ).lean();

//         if ( !student ) {
//             return res.status( 404 ).json( { message: "Student not found" } );
//         }

//         const coursesToDisplay = [];
//         const { examResult } = student;
//         // Iterate through each exam result
//         for ( const result of examResult ) {
//             const subject = result.subName;
//             console.log( 'chekf subj here 😀😀😀', result );


//             // Check if marks obtained are below 40 for this subject
//             if ( result.marksObtained < 40 ) {
//                 console.log( "less than 40 marks subject is found" );
//                 const relatedCourses = await Course.find( {
//                     subId: subjectId, school: student.school,
//                 } ).lean().exec();
//                 console.log( "yeh related course hai", relatedCourses );
//                 for ( const course of relatedCourses ) {
//                     if ( !coursesToDisplay.some( c => c._id.equals( course._id ) ) ) {
//                         coursesToDisplay.push( course );
//                     }
//                 }
//             }
//         }
//         console.log( "yeh related course hai", relatedCourses );
//         console.log( "yeh related course dikhana hai", coursesToDisplay );
//         res.json( coursesToDisplay );



//     }
//     catch ( error ) {
//         res.status( 500 ).json( error );

//     }
// };

const getCourseAccordingMarks = async ( req, res ) => {
    try {
        const studentId = req.params.studentId;
        const student = await Student.findById( studentId ).select( 'examResult' ).lean();
        if ( !student ) {
            return res.status( 404 ).json( { message: "Student not found" } );
        }
        const coursesToDisplay = [];
        const { examResult } = student;
        for ( const result of examResult ) {
            if ( result.marksObtained < 40 ) {
                console.log( "Marks below 40 found for subject" );

                // Find related courses for this subject
                const subject = await Subject.findById( result.subName._id );
                const course = await Course.findOne( { subId: subject._id } );
                coursesToDisplay.push( course );
            }
        }

        console.log( "Courses to display:", coursesToDisplay );
        res.json( coursesToDisplay );
    } catch ( error ) {
        console.error( "Error fetching courses:", error );
        res.status( 500 ).json( { message: "Internal server error" } );
    }
};


const studentRegister = async ( req, res ) => {
    try {
        const salt = await bcrypt.genSalt( 10 );
        const hashedPass = await bcrypt.hash( req.body.password, salt );

        const existingStudent = await Student.findOne( {
            rollNum: req.body.rollNum,
            school: req.body.adminID,
            sclassName: req.body.sclassName,
        } );

        if ( existingStudent ) {
            res.send( { message: 'Roll Number already exists' } );
        }
        else {
            const student = new Student( {
                ...req.body,
                school: req.body.adminID,
                password: hashedPass
            } );

            let result = await student.save();

            result.password = undefined;
            res.send( result );
        }
    } catch ( err ) {
        res.status( 500 ).json( err );
    }
};

const studentLogIn = async ( req, res ) => {
    try {
        let student = await Student.findOne( { rollNum: req.body.rollNum, name: req.body.studentName } );
        if ( student ) {
            const validated = await bcrypt.compare( req.body.password, student.password );
            if ( validated ) {
                student = await student.populate( "school", "schoolName" );
                student = await student.populate( "sclassName", "sclassName" );
                student.password = undefined;
                student.examResult = undefined;
                student.attendance = undefined;
                res.send( student );
            } else {
                res.send( { message: "Invalid password" } );
            }
        } else {
            res.send( { message: "Student not found" } );
        }
    } catch ( err ) {
        res.status( 500 ).json( err );
    }
};

const getStudents = async ( req, res ) => {
    try {
        let students = await Student.find( { school: req.params.id } ).populate( "sclassName", "sclassName" );
        if ( students.length > 0 ) {
            let modifiedStudents = students.map( ( student ) => {
                return { ...student._doc, password: undefined };
            } );
            res.send( modifiedStudents );
        } else {
            res.send( { message: "No students found" } );
        }
    } catch ( err ) {
        res.status( 500 ).json( err );
    }
};

const getStudentDetail = async ( req, res ) => {
    try {
        let student = await Student.findById( req.params.id )
            .populate( "school", "schoolName" )
            .populate( "sclassName", "sclassName" )
            .populate( "examResult.subName", "subName" )
            .populate( "attendance.subName", "subName sessions" );
        if ( student ) {
            student.password = undefined;
            res.send( student );
        }
        else {
            res.send( { message: "No student found" } );
        }
    } catch ( err ) {
        res.status( 500 ).json( err );
    }
};

const deleteStudent = async ( req, res ) => {
    try {
        const result = await Student.findByIdAndDelete( req.params.id );
        res.send( result );
    } catch ( error ) {
        res.status( 500 ).json( err );
    }
};

const deleteStudents = async ( req, res ) => {
    try {
        const result = await Student.deleteMany( { school: req.params.id } );
        if ( result.deletedCount === 0 ) {
            res.send( { message: "No students found to delete" } );
        } else {
            res.send( result );
        }
    } catch ( error ) {
        res.status( 500 ).json( err );
    }
};

const deleteStudentsByClass = async ( req, res ) => {
    try {
        const result = await Student.deleteMany( { sclassName: req.params.id } );
        if ( result.deletedCount === 0 ) {
            res.send( { message: "No students found to delete" } );
        } else {
            res.send( result );
        }
    } catch ( error ) {
        res.status( 500 ).json( err );
    }
};

const updateStudent = async ( req, res ) => {
    try {
        if ( req.body.password ) {
            const salt = await bcrypt.genSalt( 10 );
            res.body.password = await bcrypt.hash( res.body.password, salt );
        }
        let result = await Student.findByIdAndUpdate( req.params.id,
            { $set: req.body },
            { new: true } );

        result.password = undefined;
        res.send( result );
    } catch ( error ) {
        res.status( 500 ).json( error );
    }
};

const updateExamResult = async ( req, res ) => {
    const { subName, marksObtained, subId } = req.body;

    try {
        const student = await Student.findById( req.params.id );

        if ( !student ) {
            return res.send( { message: 'Student not found' } );
        }

        const existingResult = student.examResult.find(
            ( result ) => result.subName.toString() === subName
        );

        if ( existingResult ) {
            existingResult.marksObtained = marksObtained;
        } else {
            student.examResult.push( { subName, marksObtained, subId } );
        }

        const result = await student.save();
        return res.send( result );
    } catch ( error ) {
        res.status( 500 ).json( error );
    }
};

const studentAttendance = async ( req, res ) => {
    const { subName, status, date } = req.body;

    try {
        const student = await Student.findById( req.params.id );

        if ( !student ) {
            return res.send( { message: 'Student not found' } );
        }

        const subject = await Subject.findById( subName );

        const existingAttendance = student.attendance.find(
            ( a ) =>
                a.date.toDateString() === new Date( date ).toDateString() &&
                a.subName.toString() === subName
        );

        if ( existingAttendance ) {
            existingAttendance.status = status;
        } else {
            // Check if the student has already attended the maximum number of sessions
            const attendedSessions = student.attendance.filter(
                ( a ) => a.subName.toString() === subName
            ).length;

            if ( attendedSessions >= subject.sessions ) {
                return res.send( { message: 'Maximum attendance limit reached' } );
            }

            student.attendance.push( { date, status, subName } );
        }

        const result = await student.save();
        return res.send( result );
    } catch ( error ) {
        res.status( 500 ).json( error );
    }
};

const clearAllStudentsAttendanceBySubject = async ( req, res ) => {
    const subName = req.params.id;

    try {
        const result = await Student.updateMany(
            { 'attendance.subName': subName },
            { $pull: { attendance: { subName } } }
        );
        return res.send( result );
    } catch ( error ) {
        res.status( 500 ).json( error );
    }
};

const clearAllStudentsAttendance = async ( req, res ) => {
    const schoolId = req.params.id;

    try {
        const result = await Student.updateMany(
            { school: schoolId },
            { $set: { attendance: [] } }
        );

        return res.send( result );
    } catch ( error ) {
        res.status( 500 ).json( error );
    }
};

const removeStudentAttendanceBySubject = async ( req, res ) => {
    const studentId = req.params.id;
    const subName = req.body.subId;

    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $pull: { attendance: { subName: subName } } }
        );

        return res.send( result );
    } catch ( error ) {
        res.status( 500 ).json( error );
    }
};


const removeStudentAttendance = async ( req, res ) => {
    const studentId = req.params.id;

    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $set: { attendance: [] } }
        );

        return res.send( result );
    } catch ( error ) {
        res.status( 500 ).json( error );
    }
};


module.exports = {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance,
    getCourseAccordingMarks
};