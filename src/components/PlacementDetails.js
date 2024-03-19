import React, { useEffect } from 'react';
import { usePlacementRecordContext } from '../hooks/usePlacementRecordContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/components/PlacementDetails.css';

const PlacementDetails = ({ studentId }) => {
    const { placementRecords, dispatch } = usePlacementRecordContext();

    useEffect(() => {
        fetchRecords();
    }, [dispatch]);

    const fetchRecords = async () => {
        try {
            const response = await axios.get('/api/placement_record/');
            const data = response.data;
            dispatch({ type: 'SET_PLACEMENT_RECORD', payload: data });
        } catch (error) {
            console.error('Error fetching placement records:', error);
        }
    };

    const handleDelete = async (placementId) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await axios.delete(`/api/placement_record/${placementId}`);
                toast.success('Record deleted successfully!');
                dispatch({ type: 'DELETE_PLACEMENT_RECORD', payload: placementId });
                fetchRecords();
            } catch (error) {
                console.error('Error deleting placement record:', error);
            }
        }
    };

    // Filter placementRecords based on studentId
    const filteredRecords = placementRecords.filter(record => record.studentId === studentId);

    return (
        <>
            <div style={{ overflowX: 'auto' }}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="row-border">#</th>
                            <th className="row-border">Company Name</th>
                            <th className="row-border">CTC (in LPA)</th>
                            <th className="row-border"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredRecords.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', fontSize:'x-large'}}><strong>Status:</strong> Unplaced</td>
                            </tr>
                        ) : (
                            filteredRecords.map((record, index) => (
                                <tr key={record.id}>
                                    <td className="row-border">{index + 1}</td>
                                    <td className="row-border">{record.companyName}</td>
                                    <td className="row-border">{record.ctc}</td>
                                    <td className="row-border" style={{ textAlign: 'center' }}>
                                        <i className="fa-solid fa-trash delete-icon" onClick={() => handleDelete(record._id)}></i>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={1100}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default PlacementDetails;
