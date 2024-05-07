// import { configureStore } from '@reduxjs/toolkit';
// import { rootReducer } from './reducer';

// const store = configureStore({
//   reducer: rootReducer,
// });

// const { dispatch } = store;

// export { store, dispatch };

import { configureStore } from '@reduxjs/toolkit';
// import registrationReducer from './registrationSlice';
import registrationReducer from './authSlice';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
});
