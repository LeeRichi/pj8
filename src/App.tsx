import React, {useState, useEffect} from 'react'
import axios from 'axios'

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import Home from './Home';
import Detail from './Detail';
import Brewery from './interface'

const App = () =>
{
  const [data, getData] = useState<Brewery[]>([]);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

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

  // console.log(selectedRowId)


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home data={data} selectedRowId={selectedRowId} setSelectedRowId={setSelectedRowId}/>} />
        <Route path={`/${selectedRowId}`} element={<Detail selectedRowId={selectedRowId} />} />
      </Routes>
    </Router>
       
  )
}

export default App;


