import React, { useState, useEffect } from "react";
import API from '../components/api';

function UserTeamCalendar() {
  const [teamLeaves, setTeamLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const res = await API.get("api/leaves/team-calendar/");
        setTeamLeaves(res.data);
      } catch (err) {
        console.error("Calendar data error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCalendarData();
  }, []);

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const monthLabel = viewDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const firstDayIndex = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  if (loading) return <div className="text-center py-5"><h5>Loading Team Calendar...</h5></div>;

  return (
    <div className="container-fluid py-4">
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
            <h5 className="fw-bold text-primary mb-0" style={{ minWidth: "150px", textAlign: "center" }}>
              {monthLabel}
            </h5>
            <button className="btn btn-light btn-sm rounded-circle shadow-sm" onClick={handleNextMonth}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
          <span className="badge bg-primary-subtle text-primary border px-3 py-2 rounded-pill">Team Size: {teamLeaves.length} Active Leaves</span>
        </div>

        <div className="card-body p-4">
          <div className="row g-2 text-center mb-3">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div className="col fw-bold text-muted small py-2" key={day} style={{ flex: '1 0 14.28%' }}>{day}</div>
            ))}
          </div>

          <div className="row g-2">
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div className="col py-4 border-0" key={`empty-${i}`} style={{ flex: '1 0 14.28%' }}></div>
            ))}

            {days.map(day => {
              const currentIterationDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
              currentIterationDate.setHours(0, 0, 0, 0); // Time zero kar diya

              const leavesOnThisDay = teamLeaves.filter(leave => {
                const start = new Date(leave.start_date);
                const end = new Date(leave.end_date);
                start.setHours(0, 0, 0, 0);
                end.setHours(0, 0, 0, 0);
                return currentIterationDate >= start && currentIterationDate <= end;
              });

              const isToday = currentIterationDate.toDateString() === new Date().toDateString();

              return (
                <div
                  className="col border rounded-4 p-2 position-relative shadow-sm"
                  key={day}
                  style={{
                    flex: '1 0 14.28%',
                    minHeight: '110px',
                    backgroundColor: leavesOnThisDay.length > 0 ? '#f8f9ff' : 'white',
                    border: isToday ? '2px solid #0d6efd' : '1px solid #dee2e6'
                  }}
                >
                  <span className={`fw-bold small px-2 rounded-pill ${isToday ? 'bg-primary text-white' : 'text-secondary'}`}>
                    {day}
                  </span>

                  <div className="overflow-hidden mt-1">
                    {leavesOnThisDay.map((leave, idx) => (
                      <div
                        key={idx}
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
      </div>
    </div>
  );
}

export default UserTeamCalendar;
