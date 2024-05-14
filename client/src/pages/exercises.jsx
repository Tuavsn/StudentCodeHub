import React from "react";
import { useSelector } from "react-redux";
import Logo from "../images/icon.png"
import { ExerciseDetail } from "../components/common/exerciseDetail/ExerciseDetail";
import Ranking from "../components/common/exerciseDetail/Ranking";
import { NormalButton } from "../components/common/mui/Button";
import { NotFoundPage } from "./NotFoundPage";
import CodeEditorLanding from "../components/common/codeEditor/CodeEditorLanding";
import ExerciseForm from "../components/common/codePractice/ExerciseForm";
import { useNavigate } from "react-router-dom";


const ExerciseDetailPage = ({ id, action }) => {
    const { codeExercises } = useSelector((state) => state)
    const navigate = useNavigate()
    let exercise
    const AllExercises = codeExercises.codeExercises.concat(codeExercises.queueExercises)
    if (AllExercises.length) {
        exercise = AllExercises.find(exercise => exercise.id == id)
        if (!exercise) return <NotFoundPage />
    }
    if (action == 'do') {
        return <CodeEditorLanding exercise={exercise} />
    }

    if (action == 'update') {
        return <ExerciseForm exercise={exercise} />
    }

    const handleDoExerciseClick = () => {
        navigate(`/exercises/${id}/do`);
    }

    return (
        <div className="flex flex-row w-full max-h-[100dvh] p-2">
            <div className="w-[20%] d-flex h-full flex-column flex-shrink-0 p-3 bg-light rounded-r-lg sticky top-0">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <img src={Logo} className="bi me-2" width="80" />
                    <span className="fs-5" style={{ color: "#2F56A6", fontWeight: "bold" }}>
                        StudentCodeHub
                    </span>
                </a>
                <hr />
            </div>
            <div className="left-container flex flex-col items-center w-[60%] max-h-[100dvh] ">
                <div className="w-[95%] h-[90%] overflow-y-auto overflow-hidden">
                    <ExerciseDetail exercise={exercise} />
                </div>
                <div className="flex flex-row pt-4 w-full h-auto justify-center sticky bottom-0">
                    <NormalButton onClick={handleDoExerciseClick} children={'Làm bài'} />
                </div>
            </div>
            <hr />
            <div className="right-container flex flex-col items-center w-[30%] h-full sticky top-0">
                <div className="w-[95%] h-auto">
                    <Ranking submissions={exercise?.codeSubmissions} />
                </div>
            </div>
        </div >
    )
}
export default ExerciseDetailPage