import { useDispatch, useSelector } from "react-redux"
import {
    getAllUsers,
    blockUser,
    unblockUser
} from "../../../redux/action/adminAction"
import { useEffect, useState } from "react"
import userlogo from "../../../images/user.png"
import UpdateInfo from "../../common/updateInfo/UpdateInfo"

const UserManagement = () => {
    const { auth, admin, socket } = useSelector((state) => state)
    const dispatch = useDispatch()
    const imageApiUrl = process.env.REACT_APP_IMAGE_URL
    const [user, setUser] = useState(auth.user)

    const isActiveUser = (userId) => {
        return admin.total_active_users.find(user => user.id === userId);
    }

    const handleBlockUser = (user) => {
        dispatch(blockUser(user, auth.token))
    }

    const handleUnblockUser = (user) => {
        dispatch(unblockUser(user, auth.token))
    }

    // useEffect(() => {

    // }, [user])

    useEffect(() => {
        
    }, [admin.all_users])

    useEffect(() => {
        dispatch(getAllUsers(auth.token));
    }, [dispatch, auth.token, socket, auth])
    return (
        <div className="p-4 d-flex flex-column gap-5" style={{width: "100%", overflowY: "scroll", scrollbarWidth: 'thin', msOverflowStyle: 'thin'}}>
            <div className="">
                <h5><img style={{width: "2.5rem"}} src={userlogo}/> Tài khoản</h5>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Tên người dùng</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Online</th>
                        <th scope="col">Status</th>
                        <th scope="col">Chỉnh sửa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admin.all_users ? admin.all_users.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td><img src={`${imageApiUrl}/${user.avatar}`} style={{width: "3rem", height: "3rem", borderRadius: "10%", objectFit: "cover"}} /></td>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.role.toLowerCase()}</td>
                                <td>{admin.total_active_users && isActiveUser(user.id) ? 
                                    <i className="fa-solid fa-signal" style={{fontSize: "1.2rem", color: "green"}} />
                                    : <i className="fa-solid fa-signal" style={{fontSize: "1.2rem", color: "red"}} />}
                                </td>
                                <td>{user.status == 0 ?
                                    <i className="fa-solid fa-user-check" style={{fontSize: "1.2rem", color: "green"}} />
                                    : <i className="fa-solid fa-user-lock" style={{fontSize: "1.2rem", color: "red"}} />}
                                </td>
                                <td>
                                    <i id={`editUserInfo${user.id}`} className="fa-solid fa-pen-to-square" style={{fontSize: "1.2rem", color: "green", marginRight: "1rem", cursor: "pointer"}} 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#updateInfoModal"
                                    onClick={() => setUser(user)}/>
                                    {user.status == 0 ?
                                    <i className="fa-solid fa-ban" style={{fontSize: "1.2rem", color: "red", cursor: "pointer"}} onClick={() => handleBlockUser(user)}/>
                                    : <i className="fa-solid fa-lock-open" style={{fontSize: "1.2rem", color: "red", cursor: "pointer"}} onClick={() => handleUnblockUser(user)}/>
                                    }
                                </td>
                            </tr>
                        )) : <></>}
                    </tbody>
                </table>
                <UpdateInfo user={user} />
            </div>
        </div>
    )
}

export default UserManagement