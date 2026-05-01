import React, { useState } from "react";

function UserTeamCalendar() {
  const [currentMonth, setCurrentMonth] = useState("April 2026");

  // Dummy Team Leave Data
  const teamLeaves = [
    { id: 1, name: "Umesh Yadav", date: "2026-04-10", type: "Sick" },
    { id: 2, name: "Shubham Yadav", date: "2026-04-12", type: "Casual" },
    { id: 3, name: "Amit", date: "2026-04-15", type: "Paid" },
    { id: 4, name: "Rahul Kumar", date: "2026-04-20", type: "Casual" },
    { id: 5, name: "Ujjwal Rauniyar", date: "2026-04-21", type: "Casual" },
  ];

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleNextMonth = () => setCurrentMonth("May 2026");
  const handlePrevMonth = () => setCurrentMonth("March 2026");

  return (
    <div className="container-fluid py-4">
      {/* Page Header */}
      <div className="mb-4">
        <h3 className="fw-bold text-dark">Team Attendance</h3>
        <p className="text-muted small">Monitor team availability and plan your leaves better.</p>
      </div>

      <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
        <div className="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-light btn-sm rounded-circle shadow-sm" onClick={handlePrevMonth}>
              <i className="bi bi-chevron-left"></i>
            </button>
            <h5 className="fw-bold text-primary mb-0" style={{ minWidth: "120px", textAlign: "center" }}>
              {currentMonth}
            </h5>
            <button className="btn btn-light btn-sm rounded-circle shadow-sm" onClick={handleNextMonth}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>

          <div className="d-none d-md-flex gap-2">
             <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill">Team Size: 12</span>
          </div>
        </div>

        <div className="card-body p-4">
          {/* Days of Week Header */}
          <div className="row g-2 text-center mb-3">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div className="col fw-bold text-muted small py-2" key={day} style={{ flex: '1 0 14%' }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="row g-2">
            {[1, 2, 3].map(i => <div className="col py-4 border-0" key={`empty-${i}`} style={{ flex: '1 0 14%' }}></div>)}

            {days.map(day => {
              const dateStr = `2026-04-${day < 10 ? '0' + day : day}`;
              const leavesOnThisDay = teamLeaves.filter(l => l.date === dateStr);

              return (
                <div
                  className="col border rounded-4 p-2 position-relative shadow-sm"
                  key={day}
                  style={{
                    flex: '1 0 14%',
                    minHeight: '110px',
                    backgroundColor: leavesOnThisDay.length > 0 ? '#f8f9ff' : 'white',
                    border: day === 27 ? '2px solid #0d6efd' : '1px solid #dee2e6'
                  }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className={`fw-bold small px-2 rounded-pill ${day === 27 ? 'bg-primary text-white' : 'text-secondary'}`}>
                      {day}
                    </span>
                  </div>

                  <div className="overflow-hidden">
                    {leavesOnThisDay.map(leave => (
                      <div
                        key={leave.id}
                        className="badge w-100 mb-1 text-start text-truncate border-0 px-2 py-1 shadow-sm"
                        style={{
                          fontSize: '10px',
                          backgroundColor: leave.type === 'Sick' ? '#ffe8e8' : '#e0eeff',
                          color: leave.type === 'Sick' ? '#dc3545' : '#0d6efd',
                          fontWeight: '600'
                        }}
                      >
                        {leave.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="card-footer bg-light border-0 p-3 d-flex justify-content-center gap-4 flex-wrap">
          <div className="small text-muted d-flex align-items-center">
            <span className="d-inline-block rounded-circle me-2" style={{width:'10px', height:'10px', backgroundColor:'#0d6efd'}}></span>
            Casual/Paid
          </div>
          <div className="small text-muted d-flex align-items-center">
            <span className="d-inline-block rounded-circle me-2" style={{width:'10px', height:'10px', backgroundColor:'#dc3545'}}></span>
            Sick Leave
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserTeamCalendar;
