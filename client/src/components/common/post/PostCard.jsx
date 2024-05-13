import React from "react";
import CardHeader from "./CardHeader"
import CardBody from "./CardBody"
import CardFooter from "./CardFooter"

const PostCard = ({ post, index, type }) => {
    return (
        <div className="card my-3 p-4" style={{borderLeft: ".3rem solid #2F55A6"}}>
            <CardHeader post={post} type={type} />
            <CardBody post={post} type={type} index={index} />
            <CardFooter post={post} type={type} />
        </div>
    )
}

export default PostCard