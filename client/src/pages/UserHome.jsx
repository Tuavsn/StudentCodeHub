import React from "react";
import LeftSideBar from "../components/user/LeftSideBar";
import { useSelector } from "react-redux";
import Block from "../components/common/block/Block";

const Home = () => {
    const { auth } = useSelector((state) => state)
    return (
        <>
            {
                auth.user.status === 0 ? 
                    <div className="d-flex gap-2 vh-100">
                        <LeftSideBar />
                    </div>
                : <Block />
            }
        </>
    )
}

export default Home