import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import React from 'react';

// interface CredentialResponse {
//   accessToken: string;
//   idToken: string;
//   scope: string;
//   expiresIn: number;
//   firstIssued_at: number;
//   expires_at: number;
// }

const ContactForm: React.FC = () => {
  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
  };

  const handleLoginError = () => {
    console.log('Login failed');
  };

  return (
    <GoogleOAuthProvider clientId="544670836146-92cqn6p5s1pmnnp34lftmivds7oq2ct0.apps.googleusercontent.com">
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
    </GoogleOAuthProvider>
  );
};

export default ContactForm;
