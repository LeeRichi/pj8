import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" style={{ background: '#57b7da' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Lee Chi.io
        </Typography>
        <Button sx={{ color: 'white', fontWeight: 'bold' }} color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button sx={{ color: 'white', fontWeight: 'bold' }} color="inherit" component={Link} to="/contactform">
          Contact
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
