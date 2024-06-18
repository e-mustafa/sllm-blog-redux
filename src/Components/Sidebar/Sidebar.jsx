import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import CategoriesCheckbox from './CategoriesCheckbox';
import { useSelector, useDispatch } from 'react-redux';
import {
	resetFilter,
	updateFilteredArticles,
	updateSelectedCategories,
	updateSelectedTags,
} from '@/redux/reducers/articlesSlice';
import { useTranslations } from 'next-intl';

const Sidebar = () => {
	const t = useTranslations('HomePage');
	const dispatch = useDispatch();
	const { allArticles, searchTerm, selectedCategories, selectedTags, local } =
		useSelector((state) => state.articles);

	// extract unique categories form articles ---------
	const uniqueCategories = [
		...new Set(allArticles?.map((article) => article?.categories?.[local])?.flat()),
	].sort((a, b) => a.localeCompare(b, local));

	// extract unique tags form articles ---------
	const uniqueTags = [
		...new Set(allArticles?.map((article) => article?.tags?.[local])?.flat()),
	].sort((a, b) => a.localeCompare(b, local));

	useEffect(() => {
		const applyFilter = (data) => {
			let filtered = data;

			// search term filter in title and content
			if (searchTerm) {
				filtered = filtered.filter(
					(article) =>
						article.title?.[local]
							.toLowerCase()
							.includes(searchTerm.toLowerCase()) ||
						article.content?.[local]
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
				);
			}

			// categories filter
			if (selectedCategories?.length > 0) {
				filtered = filtered.filter((article) => {
					const articleCategories = article.categories?.[local] || [];
					const lowercaseArticleCategories = articleCategories.map((category) =>
						category.toLowerCase()
					);
					return selectedCategories.some((category) =>
						lowercaseArticleCategories.includes(category.toLowerCase())
					);
				});
			}

			// tags filter
			if (selectedTags?.length > 0) {
				filtered = filtered?.filter((article) => {
					const articleTags = article?.tags?.[local] || [];
					const lowercaseArticleTags = articleTags?.map((tag) => tag?.toLowerCase());
					return selectedTags?.some((tag) =>
						lowercaseArticleTags?.includes(tag?.toLowerCase())
					);
				});
			}

			dispatch(updateFilteredArticles(filtered));
		};
		applyFilter(allArticles);
	}, [allArticles, searchTerm, selectedCategories, selectedTags, local, dispatch]);

	const handleCategoryChange = (categoryName, isChecked) => {
		let updatedCategories = [...selectedCategories];
		if (isChecked) {
			updatedCategories.push(categoryName);
		} else {
			updatedCategories = updatedCategories.filter((c) => c !== categoryName);
		}
		dispatch(updateSelectedCategories(updatedCategories));
	};

	const handleTagChange = (tagId, isChecked) => {
		let updatedTags = [...selectedTags];
		if (isChecked) {
			updatedTags.push(tagId);
		} else {
			updatedTags = updatedTags.filter((t) => t !== tagId);
		}
		dispatch(updateSelectedTags(updatedTags));
	};

	return (
		<div className="h-full bg-gray-200 p-4 capitalize">
			<SearchBar />
			<CategoriesCheckbox
				name="category"
				title="categories"
				uniqueList={uniqueCategories}
				selectedList={selectedCategories}
				onSelectedChange={handleCategoryChange}
			/>
			<CategoriesCheckbox
				name="tag"
				title="tags"
				uniqueList={uniqueTags}
				selectedList={selectedTags}
				onSelectedChange={handleTagChange}
			/>
			<button
				onClick={() => dispatch(resetFilter())}
				className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
			>
				{t('reset-filter')}
			</button>
		</div>
	);
};

export default Sidebar;
