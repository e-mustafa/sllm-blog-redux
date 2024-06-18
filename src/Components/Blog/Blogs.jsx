import BlogCard from './BlogCard';
import { useTranslations } from 'next-intl';
import LoadingComponent from '../Global/LoadingComponent';
import { useSelector } from 'react-redux';

function Blogs() {
	const t = useTranslations('HomePage');

	const { paginatedPosts } = useSelector((state) => state.articles);

	return !paginatedPosts ? (
		<LoadingComponent />
	) : paginatedPosts?.length < 1 ? (
		<div className="text-center">{t('no-search-result')}</div>
	) : (
		<div className="grid gap-4 grid-cols-1 md:grid-cols-2 gap-4">
			{paginatedPosts?.map((article) => (
				<BlogCard key={article?._id} article={article} />
			))}
		</div>
	);
}

export default Blogs;
