import { useContext } from 'react';
import { PlacementRecordContext } from '../context/PlacementRecordContext';

export const usePlacementRecordContext = () => {
    const context = useContext(PlacementRecordContext);

    if (!context) {
        throw new Error('usePlacementRecordContext must be used within a PlacementRecordContextProvider');
    }

    return context;
};
