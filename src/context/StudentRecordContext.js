import {createContext, useReducer} from 'react'

export const StudentRecordContext=createContext()

export const UserReducer=(state,action)=>{
    switch(action.type){
        case 'SET_STUDENT_RECORD':
            return{
                students:action.payload
            }
        case 'CREATE_STUDENT_RECORD':
            return{
                students:[action.payload, ...state.students]
            }
        case 'DELETE_STUDENT_RECORD':
            return{
                students: state.students.filter(student => student.id !== action.payload)
            }    
         default:
            return state   

    }
}

export const StudentRecordContextProvider=({children})=>{

    const [state,dispatch]=useReducer(UserReducer,{
        students:[]
    })

    return(
        <StudentRecordContext.Provider value={{...state,dispatch}} >
           {children}
        </StudentRecordContext.Provider>
    )
}