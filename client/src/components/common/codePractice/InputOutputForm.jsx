import React, { useState } from 'react';
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
                <h6 className='italic'>(Seperate with multi-line)</h6>
                {fields.map((field, index) => (
                    <div key={index} className='flex flex-row w-full'>
                        <div className='flex flex-row w-[35%] items-center justify-center border border-1 h-[10dvh] mx-5'>
                            <textarea
                                className='w-full h-full'
                                label="input"
                                multiline="true"
                                value={field.input}
                                onChange={(e) => handleChange(index, 'input', e.target.value)}
                            />
                        </div>
                        <div className='flex flex-row w-[35%] items-center justify-center border border-1 h-[10dvh] mx-5'>
                            <textarea
                                className='w-full h-full'
                                label="output"
                                multiline="true"
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
        </div >
    );
};

export default InputOutputForm;