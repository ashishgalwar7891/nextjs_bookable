import { useState, useEffect } from "react";
import { Col, Dropdown, Space, Menu, Row, Spin, Button,Modal } from "antd";
import { IoIosInformationCircleOutline } from "react-icons/io";
import './style.css';
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiXCircle } from "react-icons/fi";

const Role_Permissions = () =>{
    const [loading, setLoading]= useState(true);
    
    const permissionsData = [
        {
          permission: "User permissions",
          superAdmin: { create: true, update: true, delete: true, read: true },
          manager: { create: false, update: false, delete: false, read: false },
          staff: { create: false, update: false, delete: false, read: false },
        },
        {
          permission: "Manage profile",
          superAdmin: { create: true, update: true, delete: true, read: true },
          manager: { create: true, update: true, delete: true, read: true },
          staff: { create: false, update: false, delete: false, read: false },
        },
        {
          permission: "Manage Locations",
          superAdmin: { create: true, update: true, delete: true, read: true },
          manager: { create: true, update: true, delete: true, read: true },
          staff: { create: false, update: false, delete: false, read: false },
        },
        {
          permission: "User Resources",
          superAdmin: { create: true, update: true, delete: true, read: true },
          manager: { create: true, update: true, delete: true, read: true },
          staff: { create: false, update: false, delete: false, read: false },
        },
        {
          permission: "Manage Services",
          superAdmin: { create: true, update: true, delete: true, read: true },
          manager: { create: true, update: true, delete: true, read: true },
          staff: { create: false, update: false, delete: false, read: false },
        },
        {
          permission: "Manage Appointments",
          superAdmin: { create: true, update: true, delete: true, read: true },
          manager: { create: true, update: true, delete: true, read: true },
          staff: { create: false, update: false, delete: false, read: true },
        },
        {
          permission: "Manage Bookings",
          superAdmin: { create: true, update: true, delete: true, read: true },
          manager: { create: true, update: true, delete: true, read: true },
         staff: { create: false, update: false, delete: false, read: true },
        },
        {
          permission: "Manage Finances",
          superAdmin: { create: true, update: true, delete: true, read: true },
          manager: { create: true, update: true, delete: true, read: true },
         staff: { create: false, update: false, delete: false, read: false },
        },
        {
          permission: "Manage Messages",
          superAdmin: { create: true, update: true, delete: true, read: true },
          manager: { create: true, update: true, delete: true, read: true },
         staff: { create: false, update: false, delete: false, read: false },
        },
        {
          permission: "Manage Setting",
          superAdmin: { create: true, update: true, delete: true, read: true },
          manager: { create: false, update: false, delete: false, read: true },
         staff: { create: false, update: false, delete: false, read: false },
        },
       
      ];
      useEffect(() => {
        const timer=setTimeout(()=>{
          setLoading(false)
        }, 1000)
        return () => clearTimeout(timer);
      },[])
        const renderCheck = (hasPermission) => (
          hasPermission ? <span className="check"><FaRegCircleCheck style={{color:'orange'}} size={20}/></span> : <span className="cross"><FiXCircle size={20}/></span>
        );


    return(
        <>
        {loading?(
          <div style={{display:'flex',justifyContent:'center', alignItems:'center', height:'100vh'}}>
            <Spin size="large" />
          </div>
        ):(
           <Row>
                <Col xl={24} style={{padding:'1rem'}}>
                    <Row style={{padding:'8px'}}>
                        <div style={{display:'block'}}>
                            <h1 style={{fontSize:'1.5rem',color: "#72959A"}}>Role permissions</h1>
                            <p style={{fontSize:'1rem', fontWeight:'450'}}>Manage permissions for different roles.</p>
                        </div>
                    </Row>
                    <Row style={{padding:'8px'}}>
                       <p style={{color:"blue", display:'flex',alignItems:'center',backgroundColor:'#d8d8d8',padding:'5px', borderRadius:'5px'}}><IoIosInformationCircleOutline size={20} style={{marginRight:'5px'}}/> Each manager and staff permissions are restrictes to their selected location only.</p>
                    </Row>
                    <Row>
                    <div className="table-container" style={{width:'100%'}}>
                      <table className="permissions-table">
                        <thead>
                          <tr>
                            <th>Permissions</th>
                            <th colSpan="4">Super Admin</th>
                            <th colSpan="4">Manager</th>
                            <th colSpan="4">Staff</th>
                          </tr>
                          <tr>
                            <th style={{backgroundColor:'#3b8a8a'}}></th>
                            <th>Create</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Read</th>
                            <th>Create</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Read</th>
                            <th>Create</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Read</th>
                          </tr>
                        </thead>
                        <tbody>
                          {permissionsData.map((row, index) => (
                            <tr key={index}>
                              <td className="permission-col">{row.permission}</td>
                              <td>{renderCheck(row.superAdmin.create)}</td>
                              <td>{renderCheck(row.superAdmin.update)}</td>
                              <td>{renderCheck(row.superAdmin.delete)}</td>
                              <td>{renderCheck(row.superAdmin.read)}</td>
                              <td>{renderCheck(row.manager.create)}</td>
                              <td>{renderCheck(row.manager.update)}</td>
                              <td>{renderCheck(row.manager.delete)}</td>
                              <td>{renderCheck(row.manager.read)}</td>
                              <td>{renderCheck(row.staff.create)}</td>
                              <td>{renderCheck(row.staff.update)}</td>
                              <td>{renderCheck(row.staff.delete)}</td>
                              <td>{renderCheck(row.staff.read)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    </Row>
                </Col>
           </Row>
          )}
        </>
    )

}

export default Role_Permissions;