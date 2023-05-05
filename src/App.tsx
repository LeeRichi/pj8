import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { GridCellParams } from '@mui/x-data-grid';



import Avatar from '@mui/material/Avatar';

//interface, later move to other file
interface Brewery {
  id: number;
  name: string;
  brewery_type: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  longitude: string;
  latitude: string;
  phone: string;
  website_url: string;
  avatarColor: string; 
}


const App = () =>
{
  const [data, getData] = useState<Brewery[]>([]);
  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Brewery[]>('https://api.openbrewerydb.org/v1/breweries');
        getData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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

  console.log(updatedData)


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

  return (
    <div style={{ display: 'flex', justifyContent: 'center' , height: '100vh', marginTop: '10vh' }}>
      <Box sx={{ height: 600, width: '75%' }}>
        <DataGrid
          rows={updatedData}
          columns={columns}
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
    </div>
    
  )
}

export default App