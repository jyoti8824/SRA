import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  // Check if studentScore exists in localStorage
  const savedStudentScore = localStorage.getItem('studentScore');
  // Initialize studentScore state with the stored value or 0
  const [studentScore, setStudentScore] = useState(savedStudentScore ? parseInt(savedStudentScore) : 0);

  // Update localStorage whenever studentScore changes
  useEffect(() => {
    localStorage.setItem('studentScore', studentScore.toString());
  }, [studentScore]);

  return (
    <StudentContext.Provider value={{ studentScore, setStudentScore }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContext;