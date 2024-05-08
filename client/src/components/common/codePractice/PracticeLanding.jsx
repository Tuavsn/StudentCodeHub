import React from "react";
import PageableExerciseTable from "./PageableExerciseTable";
import ExerciseForm from "./ExerciseForm";
import { NormalButton } from "../mui/Button";
import { loadCSS } from 'fg-loadcss';
import Icon from '@mui/material/Icon';
const PracticeLanding = () => {

    React.useEffect(() => {
        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
            // Inject before JSS
            document.querySelector('#font-awesome-css') || document.head.firstChild,
        );

        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const [newExercise, setNewExercise] = React.useState(false);

    const icon = <Icon baseClassName="fas" className="fa-plus-circle" sx={{ fontSize: 30 }} />
    const child = (
        <div className="flex flex-row items-center w-full h-auto">
            <div className="mr-4">
                Tạo bài code mới
            </div>
            {icon}
        </div>
    )

    return (
        <div className="w-full h-full flex flex-col p-2">
            <div className="flex flex-col w-full h-auto items-center p-4">
                <div className="text-4xl flex flex-row w-full h-auto">
                    <div className="flex flex-row align-center w-[70%] h-auto">
                        <h1 className="font-bold">Luyện code</h1>
                    </div>
                    <div className="text-xl">
                        <NormalButton onClick={() => setNewExercise(true)} children={child}>
                        </NormalButton>
                    </div>
                </div>
            </div>
            <hr />
            {
                !newExercise && (
                    <div className="flex flex-row w-[98%] h-full justify-center overflow-y-auto">
                        <PageableExerciseTable />
                    </div>)
            }
            {
                newExercise && (<div className="flex flex-row w-[98%] h-auto justify-center overflow-y-auto">
                    <ExerciseForm setNewExercise={setNewExercise} />
                </div>)
            }
        </div>
    );

}

export default PracticeLanding;
