import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { updatePost } from "../../../redux/action/postAction";
import { useDispatch, useSelector } from "react-redux";

const UpdatePost = () => {
    const { auth, homePosts } = useSelector((state) => state)
    const dispatch = useDispatch()
    const editorRef = useRef(null);
    const [headerInput, setHeaderInput] = useState('');
    const [editorData, setEditorData] = useState('');
    const [errors, setErrors] = useState({});
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
                setHeaderInput(homePosts.currentPost.header)
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

    const handleHeaderInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        setHeaderInput(value)
        setErrors({...errors, [name]: ""})
    }

    const handleEditorChange = (e, editor) => {
        const data = editor.getData()
        setEditorData(data);
    }

    const handleButtonClick = (e) => {
        e.preventDefault()

        let errors  = {}

        // Validate header input
        const headerRegex = /^[a-zA-Z0-9\sàáạãảăắằẵặâấầẩẫậèéẹẻẽêềếểễệđìíịỉĩòóọỏõôốồổỗộơớờởỡợùúụủũưứừửữựỳỹỷỵ]*$/;

        if(!headerInput) {
            errors.headerInput = "Vui lòng nhập tiêu đề cho bài post"
        } else if (!headerRegex.test(headerInput)) {
            errors.headerInput = "Tiêu đề bài post không được chứa ký tự đặc biệt"
        } else if (headerInput.length > 90) {
            errors.headerInput = "Tiêu đề quá dài, vui lòng nhập ít hơn 90 ký tự"
        }
        if (Object.keys(errors).length === 0) {
            dispatch(updatePost({post: homePosts.currentPost, header: headerInput , postImages: selectedFiles, content: editorData, isNewImage: isNewImage, auth: auth}))
        
            setSelectedFiles([]);
            
            setImagePreviews([]);
            
            // Reset input
            const fileInput = document.getElementById('fileUpdateInput');
            const header = document.getElementById('updateHeaderInput');
            const close = document.getElementById('closeUpdatePost')
            const editor = editorRef.current.editor;
            if(fileInput) fileInput.value = '';
            editor.setData('')
            header.value = '';
            setEditorData('')
            setHeaderInput('')
            setIsNewImage(false)
            close.click()
        } else {
            setErrors(errors)
        }
    }

    const handleCancelPost = (e) => {
        e.preventDefault()
        setSelectedFiles([]);
        setImagePreviews([]);
        setIsNewImage(false);
        const fileInput = document.getElementById('fileUpdateInput');
        const header = document.getElementById('updateHeaderInput');
        if(fileInput) fileInput.value = '';
        const editor = editorRef.current.editor;
        editor.setData('');
        header.value = '';
        setEditorData('');
        setHeaderInput('')
    }

    return (
        <>
            <div className="modal fade" id={`updatePostModal`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title flex-grow-1 text-center" id="exampleModalLongTitle">Bài Post mới</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeUpdatePost" onClick={handleCancelPost}></button>
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
                            <h4>Tiêu đề</h4>
                                <input id="updateHeaderInput" className="mb-2 mb-3 p-2 w-100" type="text" onChange={(e) => handleHeaderInputChange(e)} value={headerInput}></input>
                                {errors.headerInput && <small style={{fontWeight: "bold"}} className="text-danger">{errors.headerInput}</small>}
                            <h4>Nội dung</h4>
                                <CKEditor
                                    editor={ClassicEditor}
                                    onChange={handleEditorChange}
                                    ref={editorRef}
                                />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCancelPost} data-bs-dismiss="modal">Huỷ</button>
                            <button type="button" className="btn btn-primary" onClick={handleButtonClick}>Lưu Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatePost