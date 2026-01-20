import { useState, useEffect } from 'react';
import { checkIn, checkOut, getTodayAttendance } from '../../api/attendance.api';

const CheckIn = () => {
  const [todayStatus, setTodayStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodayStatus();
  }, []);

  const fetchTodayStatus = async () => {
    try {
      const data = await getTodayAttendance();
      setTodayStatus(data);
    } catch (err) {
      if (err.response?.status !== 404) {
        setError('Failed to load status');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    setProcessing(true);
    setMessage('');
    setError('');

    try {
      const data = await checkIn();
      setTodayStatus(data);
      setMessage('Successfully checked in!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to check in');
    } finally {
      setProcessing(false);
    }
  };

  const handleCheckOut = async () => {
    setProcessing(true);
    setMessage('');
    setError('');

    try {
      const data = await checkOut();
      setTodayStatus(data);
      setMessage('Successfully checked out!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to check out');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const isCheckedIn = todayStatus && !todayStatus.check_out;
  const hasCompleted = todayStatus && todayStatus.check_out;

  return (
    <div className="check-in-page">
      <h1>Attendance</h1>

      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      <div className="check-in-card">
        <div className="current-time">
          <p className="time">{new Date().toLocaleTimeString()}</p>
          <p className="date">{new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</p>
        </div>

        <div className="status-display">
          {isCheckedIn ? (
            <>
              <div className="status-indicator active"></div>
              <p className="status-text">Currently Checked In</p>
              <p className="status-detail">
                Since {new Date(todayStatus.check_in).toLocaleTimeString()}
              </p>
            </>
          ) : hasCompleted ? (
            <>
              <div className="status-indicator completed"></div>
              <p className="status-text">Session Completed</p>
              <p className="status-detail">
                {new Date(todayStatus.check_in).toLocaleTimeString()} -{' '}
                {new Date(todayStatus.check_out).toLocaleTimeString()}
              </p>
            </>
          ) : (
            <>
              <div className="status-indicator inactive"></div>
              <p className="status-text">Not Checked In</p>
              <p className="status-detail">Ready to start your session?</p>
            </>
          )}
        </div>

        <div className="check-in-actions">
          {isCheckedIn ? (
            <button
              onClick={handleCheckOut}
              disabled={processing}
              className="btn btn-large btn-danger"
            >
              {processing ? 'Processing...' : 'Check Out'}
            </button>
          ) : !hasCompleted ? (
            <button
              onClick={handleCheckIn}
              disabled={processing}
              className="btn btn-large btn-primary"
            >
              {processing ? 'Processing...' : 'Check In'}
            </button>
          ) : (
            <p className="completed-message">
              Great job today! See you next time.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
