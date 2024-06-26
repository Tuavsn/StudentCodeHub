import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { COLOR_CONST } from '../../../constants/color';
import CustomRow from './CustomRow';
import EnhancedTableHead from './EnhancedTableHead';



const PageableExerciseTable = () => {

    const headers = [
        { id: 'STT', label: 'STT', isAsc: true },
        { id: 'title', label: 'Tiêu đề', isAsc: true },
        { id: 'author', label: 'Tác giả', isAsc: true },
        { id: 'totalScore', label: 'Tổng điểm', isAsc: true },
        { id: 'tags', label: 'Tags', isAsc: true },
        { id: 'createdAt', label: 'Ngày tạo', isAsc: true }
    ];
    const { codeExercises, userType, auth } = useSelector((state) => state);
    const [rows, setRows] = React.useState([]);
    const [headCells, setHeadCells] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selecting, setSelecting] = React.useState({ list: true, yourExercises: false, approve: false });
    React.useEffect(() => {
        setHeadCells(headers);
    }, []);

    React.useEffect(() => {
        if (selecting.list) {
            setRows(codeExercises.codeExercises);
            if (rows.length !== 0) {
                setOrderBy('createdAt');
            }
        }
        else if (selecting.approve && userType === "ADMIN") {
            setRows(codeExercises.queueExercises);
            if (rows.length !== 0) {
                setOrderBy('createdAt');
            }
        } else {
            const AllExercises = codeExercises.codeExercises.concat(codeExercises.queueExercises);
            const yourExercises = AllExercises.filter(exercise => exercise.author.id === auth.user.id);
            setRows(yourExercises);
            if (rows.length !== 0) {
                setOrderBy('createdAt');
            }
        }
    }, [codeExercises, selecting]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangeTable = (value) => {
        switch (value) {
            case "list":
                setSelecting({ list: true, yourExercises: false, approve: false });
                break;
            case "yourExercises":
                setSelecting({ list: false, yourExercises: true, approve: false });
                break;
            case "approve":
                setSelecting({ list: false, yourExercises: false, approve: true });
                break;
        }
    }

    const [visibleRows, setVisibleRows] = React.useState([]);

    React.useEffect(() => {
        const slicedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        setVisibleRows(slicedRows);
    }, [rows, order, orderBy, page, rowsPerPage]);


    return (
        <Box sx={{ width: '80%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        cursor: 'pointer',
                                        backgroundColor: selecting.list ? COLOR_CONST.COLOR_0d6efd : '#fff',
                                        color: selecting.list ? '#fff' : '#000',
                                    }}
                                    onClick={() => { handleChangeTable("list") }}
                                    align='center'
                                >
                                    List Exercise
                                </TableCell>
                                <TableCell
                                    sx={{
                                        cursor: 'pointer',
                                        backgroundColor: selecting.yourExercises ? COLOR_CONST.COLOR_0d6efd : '#fff',
                                        color: selecting.yourExercises ? '#fff' : '#000',
                                    }}
                                    onClick={() => { handleChangeTable("yourExercises") }}
                                    align='center'>
                                    Your Exercise
                                </TableCell>
                                {userType === "ADMIN" && (<TableCell
                                    sx={{
                                        cursor: 'pointer',
                                        backgroundColor: selecting.approve ? COLOR_CONST.COLOR_0d6efd : '#fff',
                                        color: selecting.approve ? '#fff' : '#000',
                                    }}
                                    onClick={() => { handleChangeTable("approve") }}
                                    align='center'>
                                    Queue Exercise
                                </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                    </Table>
                    <Table
                        aria-label="collapsible table"
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            key={'enhancedTableHead'}
                            order={order}
                            setOrder={setOrder}
                            orderBy={orderBy}
                            rowCount={rows?.length || 0}
                            headCells={headCells}
                            setHeadCells={setHeadCells}
                            setOrderBy={setOrderBy}
                            setRows={setRows}
                            rows={rows}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const labelId = `collapsible-custom-row-${index}`;
                                return (
                                    <CustomRow key={labelId} row={row} index={index + 1} selecting={selecting} setRows={setRows} />
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box >
    );
}

export default PageableExerciseTable;