import React from 'react';
import { format } from 'date-fns';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { languageOptions } from '../../../constants/languageOptions';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { NormalButton } from '../mui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { approveQueueExercise, deleteExercise } from '../../../redux/action/codeExerciseAction';
import { COLOR_CONST } from '../../../constants/color';
import { useNavigate } from 'react-router-dom';

const CustomRow = ({ row, index, listSelected }) => {
    const { auth, codeExercises } = useSelector(state => state);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleApproveQueueExercise = (event, id) => {
        dispatch(approveQueueExercise({ id: id, token: auth.token }));
    }
    const handleDeleteQueueExercise = (event, id) => {
        dispatch(deleteExercise({ id: id, token: auth.token }));
    }

    const handleRowClick = (event, id) => {
        console.log(event)
        if (!event.target.innerHTML.includes('path'))
            navigate('/exercises/' + id);
        else setOpen(!open);
    };

    React.useEffect(() => {
    }, [codeExercises, listSelected]);
    return (
        <React.Fragment>
            <TableRow
                sx={{ '& > *': { borderBottom: 'solid' }, cursor: 'pointer' }}
                hover
            >
                <TableCell>
                    <IconButton
                        sx={{
                            margin: '5px',
                            cursor: 'pointer',
                            borderRight: '2px solid ' + COLOR_CONST.COLOR_0d6efd,
                        }}
                        aria-label="expand row"
                        size="small"
                        name="expand"
                        onClick={(event) => handleRowClick(event, row.id)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {index}
                </TableCell>
                <TableCell
                    onClick={(event) => handleRowClick(event, row.id)}
                    align="right"
                >
                    {row?.title}
                </TableCell>
                <TableCell
                    onClick={(event) => handleRowClick(event, row.id)}
                    align="right"
                >
                    {row?.author?.fullName}
                </TableCell>
                <TableCell
                    onClick={(event) => handleRowClick(event, row.id)}
                    align="right"
                >
                    {row?.totalScore}
                </TableCell>
                <TableCell
                    onClick={(event) => handleRowClick(event, row.id)}
                    align="right"
                >
                    {row?.tags}
                </TableCell>
                <TableCell
                    onClick={(event) => handleRowClick(event, row.id)}
                    align="right"
                >
                    {format(new Date(row?.createAt), 'dd/MM/yyyy')}
                </TableCell>
            </TableRow>
            <TableRow>
                {listSelected &&
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Lịch sử làm bài
                                </Typography>
                                <Table size="small" aria-label="submit">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Thời gian nộp</TableCell>
                                            <TableCell>Ngôn ngữ</TableCell>
                                            <TableCell align="right">Tổng điểm
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row?.codeSubmissions?.slice(0, 10).map((sub_row) => (
                                            <TableRow key={sub_row.id}>
                                                <TableCell component="th" scope="row">
                                                    {format(new Date(sub_row.createAt), 'dd/MM/yyyy')}
                                                </TableCell>
                                                <TableCell>{languageOptions.find(l => l.id == sub_row.language_id).name}</TableCell>
                                                <TableCell align="right">{sub_row.score}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                }

                {!listSelected &&
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Thao tác
                                </Typography>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell
                                                colSpan={2}
                                                align="center"
                                            >
                                                <NormalButton key={row.id}
                                                    onClick={(event) => handleApproveQueueExercise(event, row.id)}
                                                    children={"Duyệt"}
                                                />
                                            </TableCell>
                                            <TableCell
                                                colSpan={2}
                                                align="center"
                                            >
                                                <NormalButton key={row.id}
                                                    onClick={(event) => handleDeleteQueueExercise(event, row.id)}
                                                    children={"Xóa"}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                }
            </TableRow>
        </React.Fragment>
    );
}

export default CustomRow;