import axios from 'axios';

const API = axios.create({
  baseURL: 'https://minimate-5d1818d6ac3c.herokuapp.com/api/v1',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

API.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

// ((req) => {
//   if (token) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem('profile')).token
//     }`;
//   }
//   return req;
// });

export const signIn = (formData) => API.post('/users/login', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
// export const googleSignIn = (result) => API.post('/users/googleSignIn', result);
export const getMe = () => API.get('/users/me');

export const getUsers = () => API.get('/users');

// export const createTour = (tourData) => API.post("/tour", tourData);
// export const getTour = (id) => API.get(`/tour/${id}`);
// export const deleteTour = (id) => API.delete(`/tour/${id}`);
// export const updateTour = (updatedTourData, id) =>
//   API.patch(`/tour/${id}`, updatedTourData);
// export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);
