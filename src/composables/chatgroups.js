// src/composables/useSomeComposable.js
import axios from 'axios';
import { buildAuthorizationHeader } from '../services/tokenService';

export default function useSomeComposable() {
  // Use the buildAuthorizationHeader function to generate the Authorization header
  const authorizationHeader = buildAuthorizationHeader();

  // Use the generated authorizationHeader in your Axios requests
  axios.get('/api/user', {
    headers: authorizationHeader
  });

  // Other logic of the composable
}