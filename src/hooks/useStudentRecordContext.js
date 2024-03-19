import { useContext } from 'react';
import { StudentRecordContext } from '../context/StudentRecordContext';

export const useStudentRecordContext = () => {
    const context = useContext(StudentRecordContext);

    if (!context) {
        throw new Error('UseStudentRecordContext must be used within a StudentRecordContextProvider');
    }

    return context;
};
