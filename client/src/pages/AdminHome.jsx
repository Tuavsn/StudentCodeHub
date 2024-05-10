import React from "react";
import LeftSidebar from "../components/admin/leftSideBar/LeftSideBar"
import { useSelector } from "react-redux";
import Block from "../components/common/block/Block";

const AdminDashboard = () => {
    const { auth } = useSelector((state) => state)
    return (
        <>
            {
                auth.user.status === 0 ? 
                    <div className="d-flex gap-2 vh-100">
                        <LeftSidebar />
                    </div>
                : <Block />
            }
        </>
    )
}

export default AdminDashboard