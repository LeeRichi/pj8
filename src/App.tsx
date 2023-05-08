import React, {useState, useEffect} from 'react'
import axios from 'axios'

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Home from './components/Home';
import Detail from './components/Detail';
import Brewery from './interface'
import ContactForm from './components/ContactForm';


const App = () =>
{
  const [data, getData] = useState<Brewery[]>([]);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string | null>(null);

  

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home data={data} selectedRowId={selectedRowId} setSelectedRowId={setSelectedRowId} searchText={searchText} setSearchText={setSearchText} />} />
        <Route path={`/${selectedRowId}`} element={<Detail selectedRowId={selectedRowId} />} />
        <Route path="/contactform" element={<ContactForm />} />
      </Routes>
    </Router>
  )
}

export default App;


