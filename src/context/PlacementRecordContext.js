import { createContext, useReducer } from 'react';

export const PlacementRecordContext = createContext();

export const PlacementReducer = (state, action) => {
    switch(action.type) {
        case 'SET_PLACEMENT_RECORD':
            return {
                placementRecords: action.payload
            };
        case 'CREATE_PLACEMENT_RECORD':
            return {
                placementRecords: [action.payload, ...state.placementRecords]
            };
        case 'DELETE_PLACEMENT_RECORD':
            return {
                placementRecords: state.placementRecords.filter(record => record.id !== action.payload)
            };
        default:
            return state;
    }
};

export const PlacementRecordContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PlacementReducer, {
        placementRecords: []
    });

    return (
        <PlacementRecordContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PlacementRecordContext.Provider>
    );
};
