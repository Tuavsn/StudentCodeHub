import { useDispatch, useSelector } from "react-redux"
import {
    getTotalPosts,
    getTotalUsers
} from "../../../redux/action/adminAction"
import { useEffect } from "react"
import userlogo from "../../../images/user.png"

const UserManagement = () => {
    const { auth, admin, socket } = useSelector((state) => state)
    const dispatch = useDispatch()

    const isActiveUser = (userId) => {
        return admin.total_active_users.find(user => user.id === userId);
    }

    useEffect(() => {
        dispatch(getTotalUsers(auth.token));
        dispatch(getTotalPosts(auth.token));
        // console.log(admin.total_active_users)
        // dispatch(getTotalComments(auth.token));
        // dispatch(getTotalLikes(auth.token));
        // dispatch(getTotalSpamPosts(auth.token))
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
                        <th scope="col">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admin.total_users ? admin.total_users.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td><img src={user.avatar} style={{width: "3rem", height: "3rem", borderRadius: "10%", objectFit: "cover"}} /></td>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.role.toLowerCase()}</td>
                                <td>{admin.total_active_users && isActiveUser(user.id) ? 
                                    <i className="fa-solid fa-signal" style={{fontSize: "1.2rem", color: "green"}} />
                                    : <i className="fa-solid fa-signal" style={{fontSize: "1.2rem", color: "red"}} />}
                                </td>
                            </tr>
                        )) : <></>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserManagement