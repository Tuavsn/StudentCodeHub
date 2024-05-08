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
    const { codeExercises, userType } = useSelector((state) => state);
    const [rows, setRows] = React.useState([]);
    const [headCells, setHeadCells] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [listSelected, setListSelected] = React.useState(true);


    React.useEffect(() => {
        setRows(codeExercises.codeExercises);
        setHeadCells(headers);

        if (!listSelected && userType === "ADMIN") {
            setRows(codeExercises.queueExercises);
            if (rows.length !== 0) {
                setOrderBy('createdAt');
            }
        }
    }, [rows, codeExercises]);

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
        setListSelected(value);
        if (!value) {
            setRows(codeExercises.queueExercises);
        } else {
            setRows(codeExercises.codeExercises);
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
                    <Table
                        aria-label="collapsible table"
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        {userType === "ADMIN" && (<TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        cursor: 'pointer',
                                        borderRight: '2px solid ' + COLOR_CONST.COLOR_0d6efd,
                                        backgroundColor: listSelected ? COLOR_CONST.COLOR_0d6efd : '#fff',
                                        color: listSelected ? '#fff' : '#000'
                                    }}
                                    onClick={() => { handleChangeTable(true) }}
                                    align='center'
                                    colSpan={4}>
                                    List Exercise
                                </TableCell>
                                <TableCell
                                    sx={{
                                        cursor: 'pointer',
                                        backgroundColor: !listSelected ? COLOR_CONST.COLOR_0d6efd : '#fff',
                                        color: !listSelected ? '#fff' : '#000',
                                    }}
                                    onClick={() => { handleChangeTable(false) }}
                                    colSpan={3}
                                    align='center'>
                                    Queue Exercise
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        )}
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
                                    <CustomRow key={labelId} row={row} index={index + 1} listSelected={listSelected} setRows={setRows} />
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