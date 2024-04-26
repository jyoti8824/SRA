import React, { useContext, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle"
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
  Table,
  TableBody,
  TableHead,
  Typography,
} from "@mui/material";
import { getUserDetails } from "../../redux/userRelated/userHandle";
import CustomBarChart from "../../components/CustomBarChart";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { StyledTableCell, StyledTableRow } from "../../components/styles";
import StudentContext from "./StudentContext";




const StudentSubjects = () => {
  const dispatch = useDispatch();
  const { subjectsList, sclassDetails } = useSelector( ( state ) => state.sclass );
  const { userDetails, currentUser, loading, response, error } = useSelector(
    ( state ) => state.user
  );
  const [ maximumMarks, setMaximumMarks ] = useState( 0 );
  const [ totalMarksObtained, setTotalMarksObtained ] = useState( 0 );
  const [ studentPercentage, setStudentPercentage ] = useState( 0 );
  const {studentScore, setStudentScore} = useContext(StudentContext)

  useEffect( () => {
    if ( userDetails.examResult ) {
      var maxMarks;
      for ( let i = 1; i < userDetails.examResult.length + 1; i++ ) {
        maxMarks = i * 100;
      }
      setMaximumMarks( maxMarks );
    }

    const totalMarks = userDetails?.examResult?.reduce( ( acc, val ) => {
      return acc + val.marksObtained;
    }, 0 );

    let percentage = ((totalMarks / maxMarks) * 100).toFixed(2);
    setTotalMarksObtained( totalMarks );
    setStudentPercentage( percentage)
    setStudentScore(percentage)
  }, [ userDetails.examResult ] );
  

 
  useEffect( () => {
    dispatch( getUserDetails( currentUser._id, "Student" ) );
  }, [ dispatch, currentUser._id ] );

  if ( response ) {
    console.log( response );
  } else if ( error ) {
    console.log( error );
  }

  const [ subjectMarks, setSubjectMarks ] = useState( [] );
  const [ selectedSection, setSelectedSection ] = useState( "table" );

  useEffect( () => {
    if ( userDetails ) {
      setSubjectMarks( userDetails.examResult || [] );
    }
  }, [ userDetails ] );

  useEffect( () => {
    if ( !subjectMarks ) {
      dispatch( getSubjectList( currentUser.sclassName._id, "ClassSubjects" ) );
    }
  }, [ subjectMarks, dispatch, currentUser.sclassName._id ] );

  const handleSectionChange = ( event, newSection ) => {
    setSelectedSection( newSection );
  };

  const renderTableSection = () => {
    return (
      <>
        <Typography variant='h4' align='center' gutterBottom>
          Grade Card
        </Typography>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Subject</StyledTableCell>
              <StyledTableCell>Marks</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            { subjectMarks.map( ( result, index ) => {
              if ( !result.subName || !result.marksObtained ) {
                return null;
              }
              return (
                <>
                  <StyledTableRow key={ index }>
                    <StyledTableCell>{ result.subName.subName }</StyledTableCell>
                    <StyledTableCell>{ result.marksObtained } out of 100</StyledTableCell>
                  </StyledTableRow>
                </>
              );
            } ) }
            <StyledTableRow>
              <StyledTableCell>Percentage</StyledTableCell>
              <StyledTableCell>{studentPercentage }%</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </>
    );
  };

  const renderChartSection = () => {
    return <CustomBarChart chartData={ subjectMarks } dataKey='marksObtained' />;
  };

  const renderClassDetailsSection = () => {
    return (
      <Container>
        <Typography variant='h4' align='center' gutterBottom>
          Class Details
        </Typography>
        <Typography variant='h5' gutterBottom>
          You are currently in Class { sclassDetails && sclassDetails.sclassName }
        </Typography>
        <Typography variant='h6' gutterBottom>
          And these are the subjects:
        </Typography>
        { subjectsList &&
          subjectsList.map( ( subject, index ) => (
            <div key={ index }>
              <Typography variant='subtitle1'>
                { subject.subName } ({ subject.subCode })
              </Typography>
            </div>
          ) ) }
      </Container>
    );
  };

  return (
    <>
      { loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          { subjectMarks &&
            Array.isArray( subjectMarks ) &&
            subjectMarks.length > 0 ? (
            <>
              { selectedSection === "table" && renderTableSection() }
              { selectedSection === "chart" && renderChartSection() }

              <Paper
                sx={ { position: "fixed", bottom: 0, left: 0, right: 0 } }
                elevation={ 3 }
              >
                <BottomNavigation
                  value={ selectedSection }
                  onChange={ handleSectionChange }
                  showLabels
                >
                  <BottomNavigationAction
                    label='Table'
                    value='table'
                    icon={
                      selectedSection === "table" ? (
                        <TableChartIcon />
                      ) : (
                        <TableChartOutlinedIcon />
                      )
                    }
                  />
                </BottomNavigation>
              </Paper>
            </>
          ) : (
            <>{ renderClassDetailsSection() }</>
          ) }
        </div>
      ) }
    </>
  );
};

export default StudentSubjects;
