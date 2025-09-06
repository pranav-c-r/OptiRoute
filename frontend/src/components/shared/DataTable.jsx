import React from 'react';
import { 
  DataGrid, 
  GridToolbar,
  gridClasses,
} from '@mui/x-data-grid';
import { Box, useTheme, alpha } from '@mui/material';

const DataTable = ({ 
  rows = [], 
  columns = [], 
  loading = false,
  pageSize = 10,
  checkboxSelection = false,
  disableSelectionOnClick = true,
  autoHeight = true,
  density = 'standard',
  showToolbar = false,
  sx = {},
  ...props 
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      height: autoHeight ? 'auto' : 400, 
      width: '100%',
      '& .MuiDataGrid-root': {
        border: 'none',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 1,
      },
      '& .MuiDataGrid-cell': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 'bold',
      },
      '& .MuiDataGrid-footerContainer': {
        borderTop: `1px solid ${theme.palette.divider}`,
      },
      '& .MuiDataGrid-toolbarContainer': {
        padding: 1,
      },
      '& .MuiDataGrid-virtualScroller': {
        backgroundColor: theme.palette.background.paper,
      },
      '& .MuiDataGrid-row': {
        '&:nth-of-type(even)': {
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
        },
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
        },
      },
      ...sx
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: { pageSize },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick={disableSelectionOnClick}
        autoHeight={autoHeight}
        density={density}
        slots={{
          toolbar: showToolbar ? GridToolbar : null,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        getRowClassName={(params) => {
          return params.indexRelativeToCurrentPage % 2 === 0 ? gridClasses.row : '';
        }}
        {...props}
      />
    </Box>
  );
};

export default DataTable;