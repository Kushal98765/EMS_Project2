
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './AttendenceReport.css';
import { API_BASE_URL } from '../../../utils';


const AttendenceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState();
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip })
      if (dateFilter) {
        query.append("date", dateFilter);
      }
      const response = await axios.get(`${API_BASE_URL}/api/attendence/report?${query.toString()}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })

      console.log(response);
      if (response.data.success) {
        if (skip == 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prevData) => ({ ...prevData, ...response.data.groupData, }))
        }
      }
      setLoading(false);
    } catch (error) {
      alert(error.message);
    }
  }
  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter]);


  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + limit);
  }

  return (
    <div className='min-h-screen bg-white' style={{padding:'40px'}}>
      <h2 className='text-center text-2xl font-bold'>Attendance Report</h2>
      <div>
        <h2 className='text-xl font-semibold'>Filter by Date</h2>
        <input type="date" 
        onChange={(e) => {setDateFilter(e.target.value);
          setSkip(0);
        }}
        className='border bg-gray-100' />
      </div>
      {loading ? <div>Loading...</div> : Object.entries(report).map(([date, record]) => (
        <div key={date} className='report-section'>
          <h2 className='text-xl font-semibold'>{date}</h2>
          <table className="custom-report-table">
            <thead>
              <tr>
                <th>S No</th>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {record.map((data, i) => (
                <tr key={data.employeeId}>
                  <td>{i + 1}</td>
                  <td>{data.employeeId}</td>
                  <td>{data.employeename}</td>
                  <td>{data.departmentName}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='border bg-gray-100 text-lg font-semibold' style={{padding:'8px 16px'}} onClick={handleLoadMore}>Load More</button>
        </div>
      ))}

    </div>
  )
}

export default AttendenceReport;
