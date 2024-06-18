import { languagesData } from '@/configs/siteConfig';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
	local: languagesData[0]?.short,
	allArticles: [],
	articles: [],
	paginatedPosts: [],
	currentPage: 1,
	searchTerm: '',
	selectedCategories: [],
	selectedTags: [],
};

const articlesSlice = createSlice({
	name: 'articles',
	initialState,
	reducers: {
		resetFilter(state) {
			state.searchTerm = '';
			state.selectedCategories = [];
			state.selectedTags = [];
			state.currentPage = 1;
		},
		setLocal(state, action) {
			state.local = action.payload;

			state.searchTerm = '';
			state.selectedCategories = [];
			state.selectedTags = [];
			state.currentPage = 1;
		},
		setAllArticles(state, action) {
			state.allArticles = action.payload;
			state.articles = action.payload;
		},
		updateFilteredArticles(state, action) {
			state.articles = action.payload;
		},
		updatePaginatedArticles(state, action) {
			state.paginatedPosts = action.payload;
		},
		updateCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		updateSearchTerm(state, action) {
			state.searchTerm = action.payload;
			state.currentPage = 1;
		},
		updateSelectedCategories(state, action) {
			state.selectedCategories = action.payload;
			state.currentPage = 1;
		},
		updateSelectedTags(state, action) {
			state.selectedTags = action.payload;
			state.currentPage = 1;
		},
	},
});

export const {
	setAllArticles,
	updateFilteredArticles,
	updatePaginatedArticles,
	updateCurrentPage,
	updateSearchTerm,
	updateSelectedCategories,
	updateSelectedTags,
	setLocal,
	resetFilter,
} = articlesSlice.actions;

export default articlesSlice.reducer;
