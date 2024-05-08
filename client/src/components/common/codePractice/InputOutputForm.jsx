import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { NormalButton } from '../mui/Button';

const InputOutputForm = ({ fields, setFields }) => {

    const handleChange = (index, field, value) => {
        const updatedFields = [...fields];
        updatedFields[index][field] = value;
        setFields(updatedFields);
    };

    const handleAddField = () => {
        setFields([...fields, { input: '', output: '' }]);
    };

    return (
        <div className='flex flex-col w-full h-max'>
            <div className='flex flex-col p-4 justify-center items-center align-center'>
                {fields.map((field, index) => (
                    <div key={index} className='flex flex-row w-full'>
                        <div className='flex flex-row w-[35%] items-center justify-center'>
                            <TextField
                                label="input"
                                type="text"
                                value={field.input}
                                onChange={(e) => handleChange(index, 'input', e.target.value)}
                            />
                        </div>
                        <div className='flex flex-row w-[35%] items-center justify-center'>
                            <TextField
                                label="output"
                                type="text"
                                value={field.output}
                                onChange={(e) => handleChange(index, 'output', e.target.value)}
                            />
                        </div>
                        <div className='flex flex-row w-[10%] items-center justify-center'>
                            <NormalButton type={'button'} children={"Delete"} onClick={() => setFields(fields.filter((_, i) => i !== index))} />
                        </div>
                    </div>
                ))}
            </div>
            <NormalButton type={'reset'} className={'w-[20%]'} children={"Add more"} onClick={handleAddField} />
        </div>
    );
};

export default InputOutputForm;