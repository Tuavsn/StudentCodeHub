import React, { useEffect, useState } from "react";

const CardBody = ({ post, type, index }) => {
    const [readMore, setReadMore] = useState([])
    const imageApiUrl = process.env.REACT_APP_IMAGE_URL
    useEffect(() => {

    }, [post])
    return (
        type !== "detailPost" ? (
            <div className="card-body" style={{ borderRadius: "1rem", marginTop: "1rem"}}>
                {post.postImage.length > 0 && (
                    <div className="d-flex align-items-center justify-content-center" style={{minHeight: "200px", backgroundColor: "#FFF", marginBottom: "1rem"}}>
                        {post.postImage.length > 1 ? (
                            <div className="w-100">
                                <div id={`carouselExample${index}`} className="carousel carousel-dark slide">
                                    <div className="carousel-inner">
                                        {post.postImage.map((image, index) => (
                                            <div key={index} className={`carousel-item ${index===0 ? 'active' : ''}`} style={{textAlign: "center"}}>
                                                <img src={`${imageApiUrl}/${image.imageUrl}`} style={{maxWidth: "100%", height: "400px", objectFit: "contain"}} alt="..." />
                                            </div>
                                        ))}
                                    </div>
                            <button style={{width: '3rem', position: "absolute", left: 0, top: 0, bottom: 0, border: "none", background: "transparent"}} type="button" data-bs-target={`#carouselExample${index}`} data-bs-slide="prev">
                                <i className="fa-solid fa-arrow-left" style={{fontSize: "1rem", color: "black", padding: '.4rem .5rem', background: "#fff", borderRadius: "50%", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}></i>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button style={{width: '3rem', position: "absolute", right: 0, top: 0, bottom: 0, border: "none", background: "transparent"}} type="button" data-bs-target={`#carouselExample${index}`} data-bs-slide="next">
                                <i className="fa-solid fa-arrow-right" style={{fontSize: "1rem", color: "black", padding: '.4rem .5rem', background: "#fff", borderRadius: "50%", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}></i>
                                <span className="visually-hidden">Next</span>
                            </button>
                            </div>
                    </div>
                    ) : <img src={`${imageApiUrl}/${post.postImage[0].imageUrl}`} style={{maxWidth: "100%", height: "400px", objectFit: "contain"}} />}
                    </div>
                )}
                
                {/* Post content here */}
                {post.content.length < 900 ? 
                    <div dangerouslySetInnerHTML={{__html: post.content}}></div>
                    : readMore.includes(post.id) ? 
                    <div>
                        <div dangerouslySetInnerHTML={{__html: post.content}}></div>
                        <a href="#" onClick={() => setReadMore(readMore.filter(id => id !== post.id))}>Thu gọn</a>
                    </div>
                    : <div>
                        <div dangerouslySetInnerHTML={{__html: post.content.slice(0, 900) + '<br>...</br>'}}></div>
                        <a href="#" onClick={() => setReadMore([...readMore, post.id])}>Xem thêm</a>
                    </div>
                }
            </div>
        ) : (
            <div className="card-body" style={{ borderRadius: "1rem", marginTop: "1rem"}}>
                {post.postImage.length > 0 && (
                    <div className="d-flex align-items-center justify-content-center" style={{minHeight: "200px", backgroundColor: "#FFF", marginBottom: "1rem"}}>
                        {post.postImage.length > 1 ? (
                            <div className="w-100">
                                <div id={`carouselExample${index}`} className="carousel carousel-dark slide">
                                    <div className="carousel-inner">
                                        {post.postImage.map((image, index) => (
                                            <div key={index} className={`carousel-item ${index===0 ? 'active' : ''}`} style={{textAlign: "center"}}>
                                                <img src={`${imageApiUrl}/${image.imageUrl}`} style={{maxWidth: "100%", height: "400px", objectFit: "contain"}} alt="..." />
                                            </div>
                                        ))}
                                    </div>
                            <button style={{width: '3rem', position: "absolute", left: 0, top: 0, bottom: 0, border: "none", background: "transparent"}} type="button" data-bs-target={`#carouselExample${index}`} data-bs-slide="prev">
                                <i className="fa-solid fa-arrow-left" style={{fontSize: "1rem", color: "black", padding: '.4rem .5rem', background: "#fff", borderRadius: "50%", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}></i>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button style={{width: '3rem', position: "absolute", right: 0, top: 0, bottom: 0, border: "none", background: "transparent"}} type="button" data-bs-target={`#carouselExample${index}`} data-bs-slide="next">
                                <i className="fa-solid fa-arrow-right" style={{fontSize: "1rem", color: "black", padding: '.4rem .5rem', background: "#fff", borderRadius: "50%", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}></i>
                                <span className="visually-hidden">Next</span>
                            </button>
                            </div>
                    </div>
                    ) : <img src={`${imageApiUrl}/${post.postImage[0].imageUrl}`} style={{maxWidth: "100%", height: "400px", objectFit: "contain"}} />}
                    </div>
                )}
                
                {/* Post content here */}
                <div dangerouslySetInnerHTML={{__html: post.content}}></div>

            </div>
        )
    )
}

export default CardBody