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
                {/* Wellcome div */}
                <div className="card w-100 mt-4">
                    <div className="card-body">
                        <h4 className="card-title" style={{color: "#fff", backgroundColor: "#2F55A6", padding: ".8rem", borderRadius: ".2rem"}}><strong>Chào mừng bạn đến với StudentCodeHub</strong></h4>
                        <p className="card-text"><strong style={{color: "#2F55A6"}}>StudentCodeHub</strong> là nền tảng mạng xã hội học lập trình trực tuyến. Chúng tôi cung một môi trường nơi mọi người có thể chia sẻ những kiến thức về, những bài tập lập trình đi kèm chức năng chấm code trực tuyến giúp mọi người ngay lập tức biết lời giải của mình đúng hay sai.</p>
                        <p>Còn chờ gì nữa, hãy tham khảo lộ trình học tập rồi thử sức với bài tập đầu tiên nhé. <a href="#">Xem lộ trình</a></p>
                    </div>
                </div>

                {homePosts.result === 0 ?
                    <h4 className="text-center w-100 py-4">Không có bài đăng nào</h4>
                    : (
                        <>
                        {homePosts.posts.map((post, index) => (
                            <PostCard key={index} post={post} index={index} />
                        ))}
                        {load && (
                            <img alt="Loading..." />
                        )}
                        </>
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