import React, {useState, useEffect} from 'react'
import Brewery from './interface'
import axios from 'axios'
import { Box, List, ListItem, ListItemText } from "@mui/material";



interface DetailPageProps {
  selectedRowId: number | null;
}


export default function Detail(selectedRowId: DetailPageProps): JSX.Element
{
  const [detail, setDetail] = useState<Brewery>({ 
    id: 0,
    name: '',
    brewery_type: '',
    address_1: '',
    address_2: null,
    address_3: null,
    city: '',
    state_province: '',
    postal_code: '',
    country: '',
    longitude: '',
    latitude: '',
    phone: '',
    website_url: '',
    state: '',
    street: '',
    avatarColor: ''
  });  
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get<Brewery>(`https://api.openbrewerydb.org/v1/breweries/${selectedRowId.selectedRowId}`);
      setDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
  }, [selectedRowId]);


  const renderMap = () => {
    if (detail && detail.latitude && detail.longitude) {
      return (
        <div style={{ height: "400px", width: "30%" }}>
          <iframe
            title="brewery-map"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={`https://maps.google.com/maps?q=${detail.latitude},${detail.longitude}&z=15&output=embed`}
          ></iframe>
        </div>
      );
    } else {
      return null;
    }
  };


  return (
    <div>
      {detail && (
        <Box sx={{ width: "100%" }}>
          <List>
            <ListItem>
              <ListItemText sx={{ width: '25%' }} primary="Name" secondary={detail.name} />
              <ListItemText sx={{ width: '25%' }} primary="Brewery Type" secondary={detail.brewery_type} />
              <ListItemText sx={{ width: '25%' }} primary="Phone" secondary={detail.phone} />
              <ListItemText sx={{ width: '25%' }}
                primary="Website"
                secondary={
                  <a href={detail.website_url} target="_blank" rel="noopener noreferrer">
                    {detail.website_url}
                  </a>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ width: '25%' }} primary="City" secondary={detail.city} />
              <ListItemText sx={{ width: '25%' }} primary="State/Province" secondary={detail.state_province} />
              <ListItemText sx={{ width: '25%' }} primary="Postal Code" secondary={detail.postal_code} />
              <ListItemText sx={{ width: '25%' }} primary="Country" secondary={detail.country} />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ width: '25%' }} primary="Longitude" secondary={detail.longitude} />
              <ListItemText sx={{ width: '25%' }} primary="Latitude" secondary={detail.latitude} />
              <ListItemText sx={{ width: '25%' }} primary="State" secondary={detail.state} />
              <ListItemText sx={{ width: '25%' }} primary="Street" secondary={detail.street} />
            </ListItem>
            <ListItem>
              <ListItemText sx={{ width: '25%' }} primary="Address 1" secondary={detail.address_1} />
              <ListItemText sx={{ width: '25%' }} primary="Address 2" secondary={detail.address_2 || "N/A"} />
              <ListItemText sx={{ width: '25%' }} primary="Address 3" secondary={detail.address_3 || "N/A"} />
              <ListItemText sx={{ width: '25%' }} primary="" secondary="" />
            </ListItem>
            <ListItem>{renderMap()}</ListItem>
          </List>
        </Box>
      )}
    </div>
  );

};
