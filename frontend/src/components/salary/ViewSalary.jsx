import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import { API_BASE_URL } from '../../../utils';

const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;
  const {user} = useAuth();

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/salary/${id}/${user.role}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (q) => {
    const filteredRecords = salaries.filter((leave) =>
      leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  }

  return (
    <>
      {filteredSalaries === null ? (
        <div>Loading ...</div>
      ) : (
        <div className="overflow-x-auto" style={{ padding: '20px' }}>
          <div className="text-center">
            <h2 className='text-2xl font-bold'>Salary History</h2>
          </div>
          <div className="flex justify-end" style={{ margin: '0px 2px' }}>
            <input type="text" placeholder='Search By Emp ID'
              className='border rounded-md border-gray-300' style={{ padding: '8px 2px' }}
              onChange={filterSalaries} />
          </div>

          {filteredSalaries.length > 0 ? (
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gary-200'>
                <tr>
                  <th style={{ padding: '24px 12px' }}>SNO</th>
                  <th style={{ padding: '24px 12px' }}>Emp ID</th>
                  <th style={{ padding: '24px 12px' }}>Salary</th>
                  <th style={{ padding: '24px 12px' }}>Allowance</th>
                  <th style={{ padding: '24px 12px' }}>Deduction</th>
                  <th style={{ padding: '24px 12px' }}>Total</th>
                  <th style={{ padding: '24px 12px' }}>Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary) => (
                  <tr
                    key={salary.id}
                    className='bg-white border-b dark:bg-gray-800 dark:border-gary-700'>
                    <td style={{ padding: '24px 12px' }}>{sno++}</td>
                    <td style={{ padding: '24px 12px' }}>{salary.employeeId.employeeId}</td>
                    <td style={{ padding: '24px 12px' }}>{salary.basicSalary}</td>
                    <td style={{ padding: '24px 12px' }}>{salary.allowances}</td>
                    <td style={{ padding: '24px 12px' }}>{salary.deductions}</td>
                    <td style={{ padding: '24px 12px' }}>{salary.netSalary}</td>
                    <td style={{ padding: '24px 12px' }}>{new Date(salary.payDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <div>No Records</div>}
        </div>
      )}
    </>
  )
}

export default ViewSalary;
