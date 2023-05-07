import React, { useState, useEffect } from 'react'
import { Dispatch, SetStateAction } from 'react';

import axios from 'axios'
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef, GridValueGetterParams, GridRowParams } from '@mui/x-data-grid';
import { GridCellParams } from '@mui/x-data-grid';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Brewery from './interface'

import { useNavigate } from 'react-router-dom';


interface HomeProps {
  data: Brewery[];
  selectedRowId: number | null;
  setSelectedRowId: Dispatch<SetStateAction<number | null>>;
}

// interface HomeProps {
//   selectedRowId: number | null;
//   setSelectedRowId: (id: number | null) => void;
// }

const Home = (
  // { data }: { data: Brewery[] },
  // { selectedRowId, setSelectedRowId }: HomeProps
  { data, selectedRowId, setSelectedRowId }: HomeProps
) =>
{
  // const [data, getData] = useState<Brewery[]>([]);
  
  // const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  //fetch dat
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get<Brewery[]>('https://api.openbrewerydb.org/v1/breweries');
  //       getData(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);


  const navigate = useNavigate();


  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const updatedData = data.map(row => {
    return {
      ...row,
      avatarColor: getRandomColor(),
    }
  })


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
    // console.log(selectedRowId)
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center' , height: '100vh', marginTop: '10vh' }}>
      <Box sx={{ height: 600, width: '75%' }}>
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
          // checkboxSelection
          // disableRowSelectionOnClick
        />
      </Box>
      {/* <Route path={`/${selectedRowId}`}>
        <DetailPage updatedData={updatedData}  />
      </Route> */}
    </div>
  )
}

export default Home;


