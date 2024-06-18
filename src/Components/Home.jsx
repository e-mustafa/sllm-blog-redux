'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';

import { useTranslations } from 'next-intl';
import Pagination from './Global/Pagination';
import dynamic from 'next/dynamic';
import LoadingComponent from './Global/LoadingComponent';
import Blogs from './Blog/Blogs';
import { setAllArticles, setLocal } from '@/redux/reducers/articlesSlice';
import { useDispatch } from 'react-redux';

function Home({ allData, local }) {
	const t = useTranslations('HomePage');

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setAllArticles(allData));
	}, [allData, dispatch]);

	useEffect(() => {
		dispatch(setLocal(local));
	}, [local, dispatch]);

	// const Blogs = dynamic(() => import('./Blog/Blogs'), {
	// 	loading: () => <LoadingComponent />,
	// });

	return (
		<section className="container px-4 my-5 grid grid-cols-1 md:grid-cols-3 gap-8">
			<div className="md:col-span-2 p-4 h-full flex flex-col justify-between">
				<Blogs />
				<Pagination />
			</div>
			<aside>
				<Sidebar local={local} />
			</aside>
		</section>
	);
}

export default Home;
