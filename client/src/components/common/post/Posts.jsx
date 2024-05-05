import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDataAPI } from "../../../utils/fetchData";
import { POST_TYPES } from "../../../redux/action/postAction";
import PostCard from "./PostCard";
import LoadMoreBtn from "./LoadMoreBtn";

const Posts = () => {
    const { homePosts, auth } = useSelector((state) => state)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const handleLoadMore = async () => {
        setLoad(true)
        const res = await postDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token)
        dispatch({ type: POST_TYPES.GET_POSTS, payload: { ...res.data, page: homePosts.page + 1 } })
        setLoad(false)
    }
    return (
        <div className="vh-100 w-100" style={{width: "280px", height: "100%", overflowY: "scroll", scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            <div className="d-flex flex-column" style={{maxWidth: "1200px", margin: "auto"}}>

                {homePosts.posts.map((post, index) => (
                    <PostCard key={index} post={post} index={index} />
                ))}
                {load && (
                    <img alt="Loading..." />
                )}

                <LoadMoreBtn
                    result={homePosts.result}
                    page={homePosts.page}
                    load={load}
                    handleLoadMore={handleLoadMore}
                />
            </div>
        </div>
    )
}

export default Posts