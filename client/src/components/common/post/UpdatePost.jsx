import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { updatePost } from "../../../redux/action/postAction";
import { useDispatch, useSelector } from "react-redux";

const UpdatePost = () => {
    const { auth, homePosts } = useSelector((state) => state)
    const dispatch = useDispatch()
    const editorRef = useRef(null);
    const [editorData, setEditorData] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [oldImagePreviews, setOldImagePreviews] = useState([])
    const [isNewImage, setIsNewImage] = useState(false)
    const imageApiUrl = process.env.REACT_APP_IMAGE_URL

    useEffect(() => {
        const loadOldData = () => {
            const editor = editorRef.current.editor
            if(homePosts.currentPost && editor) {
                editor.setData(homePosts.currentPost.content)
                setEditorData(homePosts.currentPost.content)
                setOldImagePreviews(homePosts.currentPost.postImage)
            }
        }
        loadOldData()

    }, [homePosts.currentPost, editorRef.current])

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => URL.createObjectURL(file));
        setSelectedFiles(files);
        setImagePreviews(previews);
    }

    const handleCancelUploadImage = (e) => {
        e.preventDefault();
        setSelectedFiles([]);
        setImagePreviews([]);
        const fileInput = document.getElementById('fileUpdateInput');
        fileInput.value = '';
    }

    const handleEditorChange = (e, editor) => {
        const data = editor.getData()
        setEditorData(data);
    }

    const handleButtonClick = (e) => {
        e.preventDefault()
        dispatch(updatePost({post: homePosts.currentPost ,postImages: selectedFiles, content: editorData, isNewImage: isNewImage, auth: auth}))
        setSelectedFiles([]);
        setImagePreviews([]);
        const fileInput = document.getElementById('fileUpdateInput');
        const editor = editorRef.current.editor;
        if(fileInput) fileInput.value = '';
        editor.setData('')
        setEditorData('')
        setIsNewImage(false)
    }

    const handleCancelPost = (e) => {
        e.preventDefault()
        setSelectedFiles([]);
        setImagePreviews([]);
        setIsNewImage(false);
        const fileInput = document.getElementById('fileUpdateInput');
        if(fileInput) fileInput.value = '';
        const editor = editorRef.current.editor;
        editor.setData('');
        setEditorData('');
    }

    return (
        <>
            <div className="modal fade" id={`updatePostModal`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title flex-grow-1 text-center" id="exampleModalLongTitle">Bài Post mới</h5>
                        </div>
                        <div className="modal-body">
                            <div>
                                <h4>Ảnh bìa cũ:</h4>
                                {oldImagePreviews && (
                                        <>
                                            {oldImagePreviews.map((preview, index) => (
                                                <img key={index} src={`${imageApiUrl}/${preview.imageUrl}`} style={{maxWidth: "100%", margin: "1rem 0", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}} alt="..." />
                                            ))}
                                        </>
                                )}
                            </div>
                            <button className="btn btn-primary m-2" onClick={() => setIsNewImage(true)}>Thay ảnh bìa</button>
                            {isNewImage &&(
                                <>
                                    <button className="btn btn-danger m-2" onClick={() => setIsNewImage(false)}>Huỷ</button>
                                    <div>
                                        <h4>Ảnh bìa mới:</h4>
                                        <div style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}>
                                            <input
                                                id="fileUpdateInput"
                                                type="file"
                                                accept="image/png, image/jpeg"
                                                multiple
                                                onChange={handleFileChange}
                                                width={90} height={90}
                                                style={{ border: "1px solid black", borderRadius: "1rem" }} />
                                        </div>
                                        {selectedFiles.length > 0 && (
                                            <div>
                                                {imagePreviews.map((preview, index) => (
                                                    <img key={index} src={preview} style={{maxWidth: "100%", margin: "1rem 0", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}} alt="..." />
                                                ))}
                                                        
                                                <div className="text-center">
                                                    <button className="btn btn-danger" onClick={handleCancelUploadImage}>Xoá hình</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                            <h4>Nội dung</h4>
                            <CKEditor
                                editor={ClassicEditor}
                                onChange={handleEditorChange}
                                ref={editorRef}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCancelPost} data-bs-dismiss="modal">Huỷ</button>
                            <button type="button" className="btn btn-primary" onClick={handleButtonClick} data-bs-dismiss="modal">Lưu Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatePost