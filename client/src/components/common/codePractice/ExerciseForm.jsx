import React, { useState } from 'react';
import { IOSSwitch } from '../mui/CustomSwitch';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import InputOutputForm from './InputOutputForm';
import { useDispatch, useSelector } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createCodeExercise } from '../../../redux/action/codeExerciseAction';
import { GLOBALTYPES } from '../../../redux/action/globalTypes';

const ExerciseForm = ({ setNewExercise }) => {
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();
    const [example, setExample] = useState([{ input: '', output: '' }]);
    const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        difficulty: '',
        tags: '',
        totalScore: 0,
        time_limit_enable: false,
        time_limit_value: 2000,
        memory_limit_enable: false,
        memory_limit_value: 128000,
        max_file_size_value: 1024,
        max_file_size_enable: false,
        enable_network: true

    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (example.length < 1) {

            dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: 'Example must be at least 1' });
            setLoading(false);
            return;
        }
        if (example.input === '' || example.output === '') {
            dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: 'Example input and output must not be empty' });
            setLoading(false);
            return;
        }
        if (testCases.length < 4) {
            dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: 'Test cases must be at least 4' });
            setLoading(false);
            return;
        }
        for (let i = 0; i < testCases.length; i++) {
            if (testCases[i].input === '' || testCases[i].output === '') {
                dispatch({ type: GLOBALTYPES.ERROR_ALERT, payload: 'Test case input and output must not be empty' });
                setLoading(false);
                return;
            }
        }
        const formFields = {
            title: formData.title,
            description: formData.description,
            difficulty: formData.difficulty,
            tags: formData.tags,
            totalScore: formData.totalScore,
            otherProps: JSON.stringify({
                time_limit: {
                    enabled: formData.time_limit_enable,
                    value: formData.time_limit_value
                },
                memory_limit: {
                    enabled: formData.memory_limit_enable,
                    value: formData.memory_limit_value
                },
                max_file_size: {
                    enabled: formData.memory_limit_enable,
                    value: formData.max_file_size_value
                }
            }),
            testCases: JSON.stringify(testCases),
            example: JSON.stringify(example),
            author: auth.user
        };

        dispatch(createCodeExercise({ codeExercise: formFields, token: auth.token }));
        setTimeout(() => {
            setLoading(false);
            setNewExercise(false);
        }, 1500);
    };

    return (
        <>
            {loading && <div className="text-center">Loading...</div>}
            <div className="w-[80%] h-max mx-auto p-6 bg-white rounded-md shadow-md">
                <h2 className="text-xl font-bold mb-4">Enter Code Problem Details</h2>
                <form >
                    <div className='mb-4'>
                        <label htmlFor="Title" className="block font-semibold mb-1">Title:</label>
                        <TextField
                            required
                            label="Title"
                            name="title"
                            value={formData.title}
                            fullWidth={true}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="Description" className="block font-semibold mb-1">Description:</label>
                        <TextField
                            required
                            label="Description"
                            name='description'
                            value={formData.description}
                            multiline
                            rows={4}
                            fullWidth={true}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="Difficulty" className="block font-semibold mb-1">Difficulty:</label>
                        <TextField
                            required
                            label="Difficulty"
                            name='difficulty'
                            value={formData.difficulty}
                            fullWidth={true}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="Tags" className="block font-semibold mb-1">Tags:</label>
                        <TextField
                            required
                            label="Tags"
                            name='tags'
                            value={formData.tags}
                            fullWidth={true}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="totalScore" className="block font-semibold mb-1">Total Score:</label>
                        <TextField
                            required
                            label="Total Score"
                            name='totalScore'
                            type='number'
                            value={formData.totalScore}
                            fullWidth={true}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="example" className="block font-semibold mb-1">Example:</label>
                        <InputOutputForm fields={example} setFields={setExample} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="testCases" className="block font-semibold mb-1">Test cases:</label>
                        <InputOutputForm fields={testCases} setFields={setTestCases} />
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center">
                            <FormControlLabel
                                control={
                                    <IOSSwitch sx={{ m: 1 }} type="checkbox" checked={formData.enable_network} onChange={handleChange} name="enable_network" />
                                }
                                label="Enable Network (Optional, default: true):"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center">
                            <FormControlLabel
                                control={
                                    <IOSSwitch sx={{ m: 1 }} type="checkbox" checked={formData.memory_limit_enable} onChange={handleChange} name="memory_limit_enable" />
                                }
                                label="Time limit (Optional, default:2000 miliseconds):"
                            />
                        </div>
                        {
                            formData.memory_limit_enable &&
                            < FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                                <FilledInput
                                    type='number'
                                    name='time_limit_value'
                                    endAdornment={<InputAdornment position="end">miliseconds</InputAdornment>}
                                    aria-describedby="filled-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    value={formData.time_limit_value}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        }
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center">
                            <FormControlLabel
                                control={
                                    <IOSSwitch sx={{ m: 1 }} type="checkbox" checked={formData.memory_limit_enable} onChange={handleChange} name="memory_limit_enable" />
                                }
                                label="FileSize (Optional, default: 1024 kilobytes)"
                            />
                        </div>
                        {formData.memory_limit_enable &&
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                                <FilledInput
                                    type='number'
                                    name='max_file_size_value'
                                    endAdornment={<InputAdornment position="end">kilobytes</InputAdornment>}
                                    aria-describedby="filled-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    value={formData.max_file_size_value}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        }
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center">
                            <FormControlLabel
                                control={
                                    <IOSSwitch sx={{ m: 1 }} type="checkbox" checked={formData.memory_limit_enable} onChange={handleChange} name="memory_limit_enable" />
                                }
                                label="Memory Limit - RAM limit (Optional, default: 128000 kilobytes)"
                            />
                        </div>
                        {formData.memory_limit_enable &&
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                                <FilledInput
                                    type='number'
                                    name='memory_limit_value'
                                    endAdornment={<InputAdornment position="end">kilobytes</InputAdornment>}
                                    aria-describedby="filled-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    value={formData.memory_limit_value}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        }
                    </div>

                    <div className='flex flex-row pb-40'>
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="mx-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                        <button
                            onClick={() => setNewExercise(false)}
                            type="submit"
                            className="mx-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </form >
            </div >
        </>
    );
}

export default ExerciseForm;