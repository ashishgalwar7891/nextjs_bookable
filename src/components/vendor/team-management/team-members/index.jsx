import React, { useEffect, useState } from "react";
import { CustomWhtButton } from "../../styledComponent";
import { Table, Tag, Space, Row, Col, Modal,Button,Spin  } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import "./style.css";
import { useRouter } from "next/navigation";
import {GetVendorTeamMembersByIdService,DeleteTeamMembersByIdService,Update_Staff_Status, Update_Staff_details} from '@/Services/vendorTeamManagement.services'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import InfoModal from "@/lib/commonComponent/ConfirmModal";
import { CloseOutlined } from '@ant-design/icons';
import { BsInfoCircleFill } from "react-icons/bs";

const Team_Members = () => {
  const router = useRouter();
  const [apiData,SetApiData]= useState([]);
  const [userId,SetUserId]= useState();
  const [token,SetToken]= useState();
  const [loading, setLoading]= useState(false);
  const handleAddNewMember = () => {
    router.push("/vendor/team-management/team-members/Create");
  };

  useEffect(()=>{
    (async () => {
      const userId = localStorage.getItem('userId')
      const token = localStorage.getItem('token')
      SetUserId(userId);
      SetToken(token)
      setLoading(true);
      try{
        const res = await GetVendorTeamMembersByIdService({user_id:userId,token});
        console.log("GetVendorTeamMembersByIdService",res)
        if(res !== undefined){
          console.log("GetVendorTeamMembersByIdService==>",res.response.data.staff_members)
          SetApiData(res.response.data.staff_members)
        }
      }
      catch(err){
        console.error("error",err)
      }
      finally{
        setLoading(false);
      }
    })();
  },[])

  const handledeleteAction = (id) =>{
      Modal.confirm({
      title: (
          <div style={{ display: 'flex', marginTop: "10px" }}>
            <span><BsInfoCircleFill size={25}/></span>
              <span style={{ fontSize: '20px', fontWeight: 700, margin: '-5px 0 0 10px' }}>Are you sure</span>
          </div>
      ),
      content: (
          <div style={{ margin: '0px 8px' }}>
              <span style={{ fontSize: '16px', fontWeight: 400 }}>Are you sure you want to delete?</span>
          </div>
      ),
      onOk: () => {
          Modal.destroyAll();
             DeleteTeamMembersByIdService({user_id:userId,token,staff_id:id})
                .then((res)=>{
                  window.location.reload();
                }).catch((err)=>{
                    InfoModal({
                      type: 'error',
                      title: 'Error',
                      text: 'Something went wrong',
                    });
                })
          },
          onCancel: () => {
              Modal.destroyAll();
          },
          okText: 'Confirm',
          cancelText: 'Cancel',
          okButtonProps: { style: { backgroundColor: '#EA8933', color: '#F2F1F0', fontWeight: 600, marginRight: '20px' } },
          cancelButtonProps: { style: { marginRight: '20px' } },
          icon: null,
          closable: true,
          closeIcon: <CloseOutlined style={{ color: '#333' }} />,
      });
  }

  const handleEditAction = (id) =>{
    router.push(`/vendor/team-management/team-members/edit?StaffId=${encodeURIComponent(id)}`)
    // const res = await Update_Staff_details()
    // console.log("handleEditAction===>",res)
  }

  const handleStatus = async(id,status) => {
    if(status===1){
      status=0
    }else{
      status=1
    }
    Modal.confirm({
      title: (
          <div style={{ display: 'flex', marginTop: "10px" }}>
            <span> <BsInfoCircleFill size={25}/> </span>
              <span style={{ fontSize: '20px', fontWeight: 700, margin: '-5px 0 0 10px' }}>Are you sure</span>
          </div>
      ),
      content: (
          <div style={{ margin: '0px 8px' }}>
              <span style={{ fontSize: '16px', fontWeight: 400 }}>Are you sure you want to Change the Status?</span>
          </div>
      ),
      onOk: () => {
          Modal.destroyAll();
             Update_Staff_Status({staff_id:id,user_id:userId,token,active:status })
                .then((res)=>{
                  window.location.reload();
                }).catch((err)=>{
                    InfoModal({
                      type: 'error',
                      title: 'Error',
                      text: 'Something went wrong',
                    });
                })
          },
          onCancel: () => {
              Modal.destroyAll();
          },
          okText: 'Confirm',
          cancelText: 'Cancel',
          okButtonProps: { style: { backgroundColor: '#EA8933', color: '#F2F1F0', fontWeight: 600, marginRight: '20px' } },
          cancelButtonProps: { style: { marginRight: '20px' } },
          icon: null,
          closable: true,
          closeIcon: <CloseOutlined style={{ color: '#333' }} />,
      });
  }


  return (
    <>
    {loading?(
      <div style={{display:'flex',justifyContent:'center', alignItems:'center', height:'100vh'}}>
      <Spin size="large" />
    </div>
    ):(
        <Row>
          <Col xl={24} style={{padding:'2rem'}}>
            <Row>
              <h1 style={{color: "#72959A"}}>Team members</h1>
            </Row>
            <Row>
              <CustomWhtButton
                onClick={handleAddNewMember}
                style={{ color: "red", marginTop: "20px",marginBottom: "20px"}}
              >
                Add new member <PlusSquareOutlined />
              </CustomWhtButton>
            </Row>
            <Row>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Email</th>
                      <th>Staff ID</th>
                      <th>Locations</th>
                      <th>Status</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.role==='1'?<>Manager</>:<>Staff</>}</td>
                        <td>{item.email}</td>
                        <td>{item.staff_id}</td>
                        <td style={{width:"30%"}}>
                          {item.locations.map((location) => (
                            <button key={location.id} className="location-btn">
                              {location.name}
                            </button>
                          ))}
                        </td>
                        {item.status===1?(
                          <td>
                            <Button type="primary" danger onClick={()=>handleStatus(item.id,item.status)}>Active</Button>
                            {/* <button onClick={()=>handleStatus(item.id,item.status)} style={{padding:'5px',backgroundColor:'#0fef66c4',borderRadius:'5px',cursor:'pointer'}}>Active</button> */}
                            </td>
                        ):(
                          <td>
                            <Button type="dashed" danger onClick={()=>handleStatus(item.id,item.status)}>Deactive</Button>
                            {/* <button onClick={()=>handleStatus(item.id,item.status)} style={{padding:'5px',backgroundColor:'#ef0f0fb8',borderRadius:'5px',cursor:'pointer'}}>Deactive</button> */}
                            </td>
                        )}
                        <td>
                          <button className="edit-btn" onClick={()=>handleEditAction(item.id)}><FaEdit size={20} /></button>
                        </td>
                        <td>
                          <button className="delete-btn" onClick={()=>handledeleteAction(item.id)}><RiDeleteBin6Fill size={20} /></button>
                        </td>
                        
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
  );
};

export default Team_Members;
