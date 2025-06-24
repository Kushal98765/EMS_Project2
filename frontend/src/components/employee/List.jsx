import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils';


const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // ✅ Move fetchEmployees outside useEffect
  const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/employee`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        let sno = 1;
        const filtered = response.data.employees.filter(emp => emp.userId !== null);

        const data = filtered.map((emp) => ({
          _id: emp._id,
          sno: sno++,
          dep_name: emp.department?.dep_name || 'N/A',
          name: emp.userId?.name || 'N/A',
          dob: new Date(emp.dob).toLocaleDateString(),
          profileImage: emp.userId?.profileImage ? (
            <img width={40} className='rounded-full' src={`${API_BASE_URL}/${emp.userId.profileImage}`} alt="Profile" />
          ) : 'N/A',
          action: (<EmployeeButtons Id={emp._id} refreshData={fetchEmployees} />) // ✅ pass refreshData
        }));

        setEmployees(data);
        setFilteredEmployees(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setEmpLoading(false);
    }
  };

  // ✅ Call once
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchValue)
    );
    setFilteredEmployees(records);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employee</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input
          type="text"
          placeholder='Search By Dep Name'
          onChange={handleFilter}
          className='border-none'
          style={{ padding: '2px 16px', backgroundColor: 'white' }}
        />
        <Link to='/admin-dashboard/add-employee' className='bg-teal-600 rounded text-white' style={{ padding: '4px 16px' }}>Add New Employee</Link>
      </div>
      <div style={{ marginTop: '24px' }}>
        <DataTable
          columns={columns}
          data={filteredEmployees}
          pagination
          progressPending={empLoading}
        />
      </div>
    </div>
  );
};

export default List;

























// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
// import DataTable from 'react-data-table-component';
// import axios from 'axios';

// const List = () => {
//     const [employees, setEmployees] = useState([]);
//     const [empLoading, setEmpLoading] = useState(false);
//     const [filteredEmployees, setFilteredEmployees] = useState([]);

//     useEffect(() => {
//     const fetchEmployees = async () => {
//       setEmpLoading(true);
//       try {
//         const response = await axios.get('http://localhost:5000/api/employee', {
//           headers: {
//             "Authorization": `Bearer ${localStorage.getItem('token')}`
//           }
//         })

//         // console.log(response.data);
//         if (response.data.success) {
//           let sno = 1;
//           const filtered = await response.data.employees.filter(emp => emp.userId !== null);
          
//           const data = filtered.map((emp) => (
//             {
//               _id: emp._id,
//               sno: sno++,
//               dep_name: emp.department?.dep_name || 'N/A',
//               name: emp.userId?.name || 'N/A',
//               dob: new Date(emp.dob).toLocaleDateString(),
//               profileImage: emp.userId?.profileImage ? ( 
//               <img width={40} className='rounded-full' src={`http://localhost:5000/${emp.userId.profileImage}`} alt="Profile" /> ) : (
//                 'N/A'
//               ),
//               action: (<EmployeeButtons Id={emp._id} refreshData={fetchEmployees} />),
//             }));
//           setEmployees(data);
//           setFilteredEmployees(data);
//         }
//       } catch (error) {
//         if (error.response && !error.response.data.success) {
//           alert(error.response.data.error)
//         }
//       } finally {
//         setEmpLoading(false);
//       }
//     }
//     fetchEmployees();
//   }, []);

//   const handleFilter = (e) => {
//     const searchValue = e.target.value.toLowerCase();
//     const records = employees.filter((emp) => (
//       emp.name.toLowerCase().includes(searchValue)
//     ));
//     setFilteredEmployees(records);
//   }

//     return (
//         <div style={{ padding: '24px' }}>
//             <div className='text-center'>
//                 <h3 className='text-2xl font-bold'>Manage Employee</h3>
//             </div>
//             <div className='flex justify-between items-center'>
//                 <input type="text" placeholder='Search By Dep Name' onChange={handleFilter} className='border-none' style={{ padding: '2px 16px', backgroundColor: 'white' }} />
//                 <Link to='/admin-dashboard/add-employee' className='bg-teal-600 rounded text-white' style={{ padding: '4px 16px' }}>Add New Employee</Link>
//             </div>
//             <div style={{marginTop: '24px'}}>
//                 <DataTable columns={columns} data={filteredEmployees} pagination progressPending={empLoading} />
//             </div>
//         </div>
//     )
// }

// export default List;
