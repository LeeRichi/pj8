import { GoogleOAuthProvider, GoogleLogin, CredentialResponse, GoogleCredentialResponse } from '@react-oauth/google';
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import Navbar from './Navbar';
import jwt_decode from "jwt-decode";

// require('dotenv').config();

const ContactForm: React.FC = () => {
const [user, setUser] = useState<GoogleCredentialResponse | null>(null);
const [name, setName] = useState<string | null>(null);
const [email, setEmail] = useState<string | null>(null);

interface GoogleCredentialResponse {
  credential?: string;
}
  
interface JwtPayload {
  name: string;
  email: string;
}


function handleLoginSuccess(credentialResponse: GoogleCredentialResponse) {
  const credential = credentialResponse.credential;
  console.log(credential)
  if (credential) {
    const userObject: JwtPayload = jwt_decode(credential)
    console.log(userObject)
    setName(userObject.name)
    setEmail(userObject.email)
  }
}

// In the render function
console.log(name);
console.log(email);


  const handleLoginError = () => {
    console.log('Login failed');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
    // console.log(user?.profileObj.name); // Example usage of user object
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', marginTop:'-10vh' }}>
        <form onSubmit={handleSubmit}>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID!}>
            <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
          </GoogleOAuthProvider> 
          <TextField label="Name" fullWidth sx={{ width: '50vw' }} margin="normal" value={name || ''}/><br />
          <TextField label="Email" fullWidth sx={{ width: '50vw' }} margin="normal" value={email || ''}/><br />
          <TextField label="Message" fullWidth sx={{ width: '50vw' }} margin="normal" multiline rows={4} /><br />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
