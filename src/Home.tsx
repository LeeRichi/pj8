import React, { useState, useEffect, useMemo } from 'react'
import { Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef, GridValueGetterParams, GridRowParams } from '@mui/x-data-grid';
import { GridCellParams } from '@mui/x-data-grid';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Brewery from './interface'
import {SearchBar} from './SearchBar'
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  data: Brewery[];
  selectedRowId: number | null;
  setSelectedRowId: Dispatch<SetStateAction<number | null>>;

  searchText: string | null;
  setSearchText: Dispatch<SetStateAction<string | null>>;
}

const Home = (
  { data, selectedRowId, setSelectedRowId, searchText, setSearchText }: HomeProps
) =>
{
  const navigate = useNavigate();

  const updatedData = useMemo(() => {
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    return data.map(row => {
      return {
        ...row,
        avatarColor: getRandomColor(),
      }
    })
  }, [data]);

  const columns: GridColDef[] = [
  {
    field: 'avatar',
    headerName: '',
    width: 100,
    renderCell: (params: GridCellParams) => (
      <Avatar style={{ backgroundColor: params.row.avatarColor }}>{params.row.id.charAt(0)}</Avatar>
    ),
    headerClassName: 'super-app-theme--header'
  },
    { field: 'id', headerName: 'ID', width: 350, headerClassName: 'super-app-theme--header' },
    { field: 'name', headerName: 'Name', width: 200, headerClassName: 'super-app-theme--header' },
    { field: 'brewery_type', headerName: 'Brewery Type', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'city', headerName: 'City', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'state', headerName: 'State', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'postal_code', headerName: 'postal_code', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'longitude', headerName: 'longitude', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'latitude', headerName: 'latitude', width: 150, headerClassName: 'super-app-theme--header' },
  ];

  const handleRowClick = (params: GridRowParams) => {
    const id = params.row.id;
    navigate(`/${id}`);
    setSelectedRowId(id)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' , height: '100vh', marginTop: '10vh' }}>
      <Box sx={{ height: 600, width: '75%' }}>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <DataGrid
          rows={updatedData}
          columns={columns}
          onRowClick={handleRowClick}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
        />
      </Box>
    </div>
  )
}

export default Home;


