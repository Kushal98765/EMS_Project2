import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { columns, AttendenceHelper } from '../../utils/AttendenceHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils';

const Attendence = () => {
  const [attendence, setAttendence] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAttendence, setFilteredAttendence] = useState([]);

  const statusChange = () => {
    fetchAttendence();
  };

  const fetchAttendence = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/attendence`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.attendence.map((att) => ({
          sno: sno++,
          employeeId: att.employeeId.employeeId || "N/A", // Correctly using _id
          name: att.employeeId?.userId?.name || "N/A",
          department: att.employeeId?.department?.dep_name || "N/A",
          action: (
            <AttendenceHelper
              status={att.status}
              employeeId={att.employeeId?._id}
              statusChange={statusChange}
            />
          ),
        }));
        setAttendence(data);
        setFilteredAttendence(data);
      }
    } catch (error) {
      console.error(error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendence();
  }, []);

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const records = attendence.filter((emp) =>
      emp.department.toLowerCase().includes(searchValue)
    );
    setFilteredAttendence(records);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Attendance</h3>
      </div>

      <div className='flex justify-between items-center mt-4'>
        <input
          type="text"
          placeholder='Search By Department'
          onChange={handleFilter}
          className='border' style={{ padding: '4px 12px', cursor: 'pointer' }}
        />
        <p className='text-xl font-medium'>
          Mark Attendance for: <span className='font-bold underline'>{new Date().toISOString().split("T")[0]}</span>
        </p>
        <Link
          to='/admin-dashboard/attendence-report'
          className='bg-teal-600 text-white rounded'
          style={{ padding: '4px 16px' }}
        >
          Attendance Report
        </Link>
      </div>

      <div style={{marginTop:'24px'}}>
        <DataTable
          columns={columns}
          data={filteredAttendence}
          pagination
          progressPending={loading}
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default Attendence;


























// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { columns, AttendenceHelper } from '../../utils/AttendenceHelper';
// import DataTable from 'react-data-table-component';
// import axios from 'axios';

// const Attendence = () => {
//   const [attendence, setAttendence] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filteredAttendence, setFilteredAttendence] = useState([]);

//   const statusChange = () => {
//     fetchAttendence();
//   };

// const fetchAttendence = async () => {
//   setLoading(true);
//   try {
//     const response = await axios.get('http://localhost:5000/api/attendence', {
//       headers: {
//         "Authorization": `Bearer ${localStorage.getItem('token')}`
//       }
//     });

//     if (response.data.success) {
//       let sno = 1;

//       const data = response.data.attendence.map((att) => ({
//           sno: sno++,
//           employeeId: att.employeeId?.employeeId || "N/A",
//           name: att.employeeId?.userId?.name || "N/A",
//           department: att.employeeId?.department?.dep_name || "N/A",
//           action: (
//             <AttendenceHelper
//               status={att.status}
//               employeeId={att.employeeId?.employeeId || ""}
//               statusChange={statusChange}
//             />
//           ),
//         }));

//       setAttendence(data);
//       setFilteredAttendence(data);
//     }
//   } catch (error) {
//     console.error(error);
//     if (error.response && !error.response.data.success) {
//       alert(error.response.data.error);
//     }
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     fetchAttendence();
//   }, []);

//   const handleFilter = (e) => {
//     const searchValue = e.target.value.toLowerCase();
//     const records = attendence.filter((emp) =>
//       emp.department.toLowerCase().includes(searchValue)
//     );
//     setFilteredAttendence(records);
//   };

//   if (!filteredAttendence) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ padding: '24px' }}>
//       <div className='text-center'>
//         <h3 className='text-2xl font-bold'>Manage Attendence</h3>
//       </div>

//       <div className='flex justify-between items-center'>
//         <input
//           type="text"
//           placeholder='Search By Dep Name'
//           onChange={handleFilter}
//           className='border-none'
//           style={{ padding: '2px 16px', backgroundColor: 'white', marginTop: '16px' }}
//         />
//         <p className='text-2xl'>
//           Mark Employees for{" "}
//           <span className='font-bold underline'>
//             {new Date().toISOString().split("T")[0]}{" "}
//           </span>
//         </p>
//         <Link
//           to='/admin-dashboard/attendence-report'
//           className='bg-teal-600 rounded text-white'
//           style={{ padding: '4px 16px' }}
//         >
//           Attendence Report
//         </Link>
//       </div>

//       <div style={{ marginTop: '24px' }}>
//         <DataTable columns={columns} data={filteredAttendence} pagination progressPending={loading} />
//       </div>
//     </div>
//   );
// };

// export default Attendence;



