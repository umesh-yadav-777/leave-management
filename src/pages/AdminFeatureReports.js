import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function AdminReports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLeave, setSelectedLeave] = useState(null); // Modal ke liye state

    const API_URL = 'http://127.0.0.1:8000/accounts/leave-reports/';

    const fetchReports = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            const response = await axios.get(API_URL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setReports(response.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch reports.");
            setLoading(false);
        }
    };

    useEffect(() => { fetchReports(); }, []);

    const handleDownloadPDF = () => {
        if (reports.length === 0) return alert("No data!");
        const doc = new jsPDF();
        doc.text('Leave Analytics Report', 14, 20);
        const tableRows = reports.map(item => [item.employee_name, item.department, item.leave_type, item.duration, item.status]);
        autoTable(doc, {
            head: [["Employee", "Dept", "Type", "Duration", "Status"]],
            body: tableRows,
            startY: 25,
        });
        doc.save('Leave_Report.pdf');
    };

    const getStatusBadge = (status) => {
        const s = status.toLowerCase();
        if (s === 'approved') return 'bg-success text-white';
        if (s === 'rejected') return 'bg-danger text-white';
        return 'bg-warning text-dark';
    };

    return (
        <div className="container-fluid p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-navy">Leave Analytics Report</h2>
                <button className="btn btn-primary shadow-sm" onClick={handleDownloadPDF}>
                    Download PDF Report
                </button>
            </div>

            {loading ? (
                <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
            ) : (
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4">Employee Name</th>
                                <th>Department</th>
                                <th>Leave Type</th>
                                <th>Duration</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((item) => (
                                <tr key={item.id}>
                                    <td className="ps-4 fw-bold">{item.employee_name}</td>
                                    <td>{item.department}</td>
                                    <td>{item.leave_type}</td>
                                    <td>{item.duration}</td>
                                    <td><span className={`badge rounded-pill px-3 ${getStatusBadge(item.status)}`}>{item.status}</span></td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#leaveDetailModal"
                                            onClick={() => setSelectedLeave(item)}
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* --- BOOTSTRAP MODAL --- */}
            <div className="modal fade" id="leaveDetailModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow" style={{ borderRadius: '15px' }}>
                        <div className="modal-header bg-primary text-white" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                            <h5 className="modal-title">Leave Application Details</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body p-4">
                            {selectedLeave && (
                                <div>
                                    <div className="row mb-3">
                                        <div className="col-6"><strong>Employee:</strong> <p>{selectedLeave.employee_name}</p></div>
                                        <div className="col-6"><strong>Status:</strong> <p>{selectedLeave.status}</p></div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-6"><strong>From:</strong> <p>{selectedLeave.start_date}</p></div>
                                        <div className="col-6"><strong>To:</strong> <p>{selectedLeave.end_date}</p></div>
                                    </div>
                                    <div className="mb-3">
                                        <strong>Reason for Leave:</strong>
                                        <div className="p-3 bg-light rounded mt-2" style={{ borderLeft: '4px solid #0d6efd' }}>
                                            {selectedLeave.reason || "No reason provided."}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminReports;
