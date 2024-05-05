import React from "react";
import CardHeader from "./CardHeader"
import CardBody from "./CardBody"
import CardFooter from "./CardFooter"

const PostCard = ({ post, index, type }) => {
    return (
        <div className="card my-3 outer-shadow p-4 bg-light" style={{borderRadius: "2rem", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}>
            <CardHeader post={post} />
            <CardBody post={post} index={index} />
            <CardFooter post={post} type={type} />
        </div>
    )
}

export default PostCard