const { configureStore } = require("@reduxjs/toolkit");

import articlesReducer from './reducers/articlesSlice'

const store = configureStore({
	reducer: {
		articles: articlesReducer,
	},
});

export default store;