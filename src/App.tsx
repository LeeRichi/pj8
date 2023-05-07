import React, {useState, useEffect} from 'react'
import axios from 'axios'

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Home from './Home';
import Detail from './Detail';
import Brewery from './interface'

const App = () =>
{
  const [data, getData] = useState<Brewery[]>([]);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string | null>(null);

  console.log(searchText + ' in app')

  //fetch data
  useEffect(() => {
    if (!searchText) {
      const fetchData = async () => {
        try {
          const response = await axios.get<Brewery[]>('https://api.openbrewerydb.org/v1/breweries');
          getData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get<Brewery[]>(`https://api.openbrewerydb.org/v1/breweries?by_name=${searchText}`);
          getData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [searchText]);

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

  // console.log(selectedRowId)


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home data={data} selectedRowId={selectedRowId} setSelectedRowId={setSelectedRowId} searchText={searchText} setSearchText={setSearchText} />} />
        <Route path={`/${selectedRowId}`} element={<Detail selectedRowId={selectedRowId} />} />
      </Routes>
    </Router>
       
  )
}

export default App;


