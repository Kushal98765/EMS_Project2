import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Login from './pages/Login';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import AddSalary from './components/salary/Add'
import ViewSalary from './components/salary/ViewSalary';
import Summary from './components/EmployeeDashboard/Summary';
import LeaveList from './components/leave/List';
import AddLeave from './components/leave/Add';
import Setting from './components/EmployeeDashboard/Setting';
import Table from './components/leave/Table';
import Detail from './components/leave/Detail';
import Attendence from './components/attendence/Attendence';
import AttendenceReport from './components/attendence/AttendenceReport';
import Unauthorized from './pages/Unauthorized';



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/admin-dashboard' />} ></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/unauthorized' element={<Unauthorized />} />


          <Route path='/admin-dashboard' element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }>
            <Route index element={<AdminSummary />}></Route>
            <Route path='/admin-dashboard/departments' element={<DepartmentList />} />
            <Route path='/admin-dashboard/add-department' element={<AddDepartment />} />
            <Route path='/admin-dashboard/department/:id' element={<EditDepartment />} />

            <Route path='/admin-dashboard/employees' element={<List />} />
            <Route path='/admin-dashboard/add-employee' element={<Add />} />
            <Route path='/admin-dashboard/employees/:id' element={<View />} />
            <Route path='/admin-dashboard/employees/edit/:id' element={<Edit />} />
            <Route path='/admin-dashboard/employees/salary/:id' element={<ViewSalary />} />
            <Route path='/admin-dashboard/salary/add' element={<AddSalary />} />
            <Route path='/admin-dashboard/leaves' element={<Table />}></Route>
            <Route path='/admin-dashboard/leaves/:id' element={<Detail />}></Route>
            <Route path='/admin-dashboard/employees/leaves/:id' element={<LeaveList />}></Route>
            <Route path='/admin-dashboard/setting' element={<Setting />}></Route>
            <Route path='/admin-dashboard/attendence' element={<Attendence />}></Route>
            <Route path='/admin-dashboard/attendence-report' element={<AttendenceReport />}></Route>

          </Route>
          <Route
            path='/employee-dashboard'
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["employee"]}>
                  <EmployeeDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<Summary />}></Route>
            <Route path='/employee-dashboard/profile/:id' element={<View />}></Route>
            <Route path='/employee-dashboard/leaves/:id' element={<LeaveList />}></Route>
            <Route path='/employee-dashboard/add-leave' element={<AddLeave />}></Route>
            <Route path='/employee-dashboard/salary/:id' element={<ViewSalary />}></Route>
            <Route path='/employee-dashboard/setting' element={<Setting />}></Route>


          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
