import React, { useEffect, useState } from 'react'
import './styles.css'
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import logo from '../assets/logo.svg'
import { getAllUsers } from '../api/user';
import Loader from './Loader';

const Users = () => {
    const [usersListDesign, setUsersListDesign] = useState({});
    let [userDesign, setUserDesign] = useState({});
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [aUser, setAUser] = useState({});

    const viewUser = (id) => {
        const result = users.find(user => user.id === id);
        console.log(result);
        setAUser(result)
        setUsersListDesign({
            width: "72%"
        })
        setUserDesign({
            width: "28%",
            height: "75vh",
            display: "block"
        })
    }

    const hideUser = () => {
        setUsersListDesign({})
        setUserDesign({})
        setAUser({})
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getAllUsers();
                if (response.data !== "Not found") {
                    setUsers(response.data)
                }
                setIsLoading(false)
            } catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false); // Set loading to false regardless of success or failure
            }
        }
        fetchUser();
    }, [])

    return (
        <div className='main_container'>
            <div className="design_container"></div>
            <div className="content_container">
                <div className="header_container">
                    <img src={logo} alt="logo" className='logo_img' />
                    <input type='search' placeholder='Search...' />
                    <div className="adminInfo">
                        <div className="admin_img">
                            <img src="https://i.pinimg.com/originals/06/07/8f/06078f8518eadd99c4df820a03960092.jpg" alt="adminImg" />
                        </div>
                        <div className="admin_details">
                            <p className='admin_name'><b>Admin Name</b></p>
                            <p className='admin_designation'>User Admin</p>
                        </div>
                    </div>
                </div>

                <div className="users_details_container">
                    <div className="details_header">
                        <h4 className='details_header_heading'>Users</h4>
                        <p className='total_users'>Total Users: <span className='total_users_count'>{users.length}</span></p>
                    </div>

                    {/* Check if users has element or not? */}
                    {
                        (users.length === 0 && !isLoading) ? (<p style={{ color: "red", marginLeft: "1rem", fontWeight: "bold" }}>No data to show...</p>) : (
                            <div className="users_container">
                                {isLoading ? (<div className='content'>
                                    <Loader />
                                </div>) : (
                                    <>
                                        <div className="usersContainer" style={usersListDesign}>
                                            <div className='users_container_list'>
                                                <p className='column avatar_header'>Avatar</p>
                                                <p className='column username_header'>Username</p>
                                                <p className='column userEmail_header'>User Email</p>
                                                <p className='column operations_header'>Operations</p>
                                            </div>
                                            {
                                                users.map(user => {
                                                    return (
                                                        <div className='users_container_list users_list' key={user.id}>
                                                            <div className='column'>
                                                                <img src="https://www.hdwallpaperslife.com/wp-content/uploads/2017/02/mi_vr_headset-wide-1920x1080.jpg" alt='userImg' className='column_img' />
                                                            </div>
                                                            <p className='column'>{user.profile.username}</p>
                                                            <p className='column'>{user.profile.email}</p>
                                                            <div className='column'>
                                                                <button onClick={() => viewUser(user.id)}><FaEye /></button>
                                                                <button><FaRegEdit /></button>
                                                                <button><MdDelete /></button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div >
                                        <div className="profile_container" style={userDesign}>
                                            {
                                                Object.keys(aUser).length !== 0 &&
                                                <div className='particular_user'>
                                                    <div className='userImg'>
                                                        <img src="https://www.hdwallpaperslife.com/wp-content/uploads/2017/02/mi_vr_headset-wide-1920x1080.jpg" alt="userImg" />
                                                    </div>
                                                    <div className="userdetails">
                                                        <p><b>Username:</b> {aUser.profile.username}</p>
                                                        <p><b>Firstname:</b> {aUser.profile.firstName}</p>
                                                        <p><b>Lastname:</b> {aUser.profile.lastName}</p>
                                                        <p><b>Email:</b> {aUser.profile.email}</p>
                                                        <p><b>Bio:</b> {aUser.Bio}</p>
                                                        <p><b>Job Title:</b> {aUser.jobTitle}</p>
                                                    </div>
                                                    <button onClick={hideUser} className='hideUser'>Hide User</button>
                                                </div>
                                            }
                                        </div>
                                    </>
                                )
                                }
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Users