import React, { useRef, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { createPost } from "../../../redux/action/postAction";
import { useDispatch, useSelector } from "react-redux";

const InputPost = () => {
    const { auth, socket } = useSelector((state) => state)
    const dispatch = useDispatch()
    const editorRef = useRef(null);
    const [editorData, setEditorData] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => URL.createObjectURL(file));
        setSelectedFiles(files);
        setImagePreviews(previews);
    };

    const handleCancelUploadImage = (e) => {
        e.preventDefault();
        setSelectedFiles([]);
        setImagePreviews([]);
        const fileInput = document.getElementById('fileInput');
        fileInput.value = '';
    }

    const handleEditorChange = (e, editor) => {
        const data = editor.getData()
        setEditorData(data);
    };

    const handleButtonClick = (e) => {
        e.preventDefault()
        dispatch(createPost({postImages: selectedFiles, content: editorData, auth: auth}))
        setSelectedFiles([]);
        setImagePreviews([]);
        const fileInput = document.getElementById('fileInput');
        const editor = editorRef.current.editor;
        fileInput.value = '';
        editor.setData('')
        setEditorData('')
    }

    const handleCancelPost = (e) => {
        e.preventDefault()
        setSelectedFiles([]);
        setImagePreviews([]);
        const fileInput = document.getElementById('fileInput');
        fileInput.value = '';
        const editor = editorRef.current.editor;
        editor.setData('')
        setEditorData('')
    }

    return (
        <>
            <div style={{
                padding: "1.1rem 1.4rem",
                borderRadius: "10%",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                position: "fixed",
                right: "2rem",
                bottom: "2rem",
                backgroundColor: "#0D6EFD",
                cursor: "pointer"
            }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModalCenter">
                <i className="fa-solid fa-plus" style={{ color: "#fff" }}></i>
            </div>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title flex-grow-1 text-center" id="exampleModalLongTitle">Bài Post mới</h5>
                        </div>
                        <div className="modal-body">
                            <h4>Ảnh bìa:</h4>
                            <div style={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}>
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    multiple
                                    onChange={handleFileChange}
                                    width={90} height={90}
                                    style={{ border: "1px solid black", borderRadius: "1rem" }} />
                            </div>
                            {selectedFiles.length > 0 && (
                                <div>
                                    {
                                    imagePreviews.map((preview, index) => (
                                        <img key={index} src={preview} style={{maxWidth: "100%", margin: "1rem 0", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}} alt="..." />
                                    ))
                                    }
                                            
                                    <div className="text-center">
                                        <button className="btn btn-danger" onClick={handleCancelUploadImage}>Xoá hình</button>
                                    </div>
                                </div>
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
                            <button type="button" className="btn btn-primary" onClick={handleButtonClick} data-bs-dismiss="modal">Tạo Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InputPost
