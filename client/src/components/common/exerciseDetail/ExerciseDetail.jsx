import React from "react";
import ShowCode from "../codeEditor/ShowCode";
import { useNavigate } from "react-router-dom";

export const ExerciseDetail = ({ exercise }) => {

    const navigate = useNavigate()
    if (!exercise) return navigate("/")
    try {
        exercise.sample = JSON.parse(exercise.example)
    }
    catch (e) {
        console.error(e)

    }

    return exercise ? (
        <div className="w-full h-full">
            <div className="w-full h-auto bg-white p-4 border border-2 border-gray-400 rounded-lg overflow-y-auto overflow-hidden">
                <div className="w-full h-auto flex flex-col items-center border-b-2 border-gray-400 px-10 pb-4 sticky top-0">
                    <div className="w-full h-auto flex flex-col items-center">
                        <h1 className="text-3xl font-bold"> {exercise.title} </h1>
                    </div>
                </div>
                <div className="w-full h-auto flex flex-col items-center mt-2">
                    <div className="w-full h-auto flex flex-col items-center">
                        <p className="text-base text-gray-500"> {exercise.description} </p>
                    </div>
                    <div className="w-full h-auto flex flex-col items-center">
                        <h2 className="text-xl font-bold"> Sample </h2>
                        {exercise.sample.map((item, index) => (
                            <div key={index} className="flex flex-col w-full h-auto bg-sky-500/10 p-4 rounded-lg shadow-md mt-2 content-start items-start ">
                                <h3 className="text-lg font-bold"> Input </h3>
                                <ShowCode code={item.input} />
                                <h3 className="text-lg font-bold"> Output </h3>
                                <ShowCode code={item.output} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    ) : null
}