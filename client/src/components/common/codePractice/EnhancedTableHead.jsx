import React from 'react';
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const EnhancedTableHead = (props) => {
    const { order, setOrder, orderBy, headCells, setHeadCells, setOrderBy, rows, setRows } = props;
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        let stabilizedThis
        if (array) {
            stabilizedThis = array.map((el, index) => [el, index]);
            stabilizedThis.sort((a, b) => {
                const order = comparator(a[0], b[0]);
                if (order !== 0) {
                    return order;
                }
                return a[1] - b[1];
            });
        }
        else {
            return [];
        }
        return stabilizedThis.map((el) => el[0]);
    }

    const handleRequestSort = ({ isAsc, orderBy, index }) => {
        setOrder(isAsc ? 'asc' : 'desc');
        setOrderBy(orderBy);
        let array = stableSort(rows, getComparator(order, orderBy));
        setRows(array);
        let new_headers = headCells;
        new_headers[index].isAsc = !isAsc;
        setHeadCells(new_headers);
    };

    return (
        <TableHead>
            <TableRow >
                <TableCell key='emptyHeader' />
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={headCell.id}
                        align={'center'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={() => handleRequestSort({ isAsc: headCell.isAsc, orderBy: headCell.id, index: index })}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead;