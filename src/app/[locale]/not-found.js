import Link from 'next/link';
import LocaleLayout from './layout';
import './globals.css';
import { getTranslations } from 'next-intl/server';

export default async function NotFound({ locale }) {
	const t = await getTranslations({ locale });
	return (
		<LocaleLayout>
			<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
				<div className="text-center">
					<p className="text-base font-semibold text-indigo-600">404</p>
					<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
						{t('title')}
					</h1>
					<p className="mt-6 text-base leading-7 text-gray-600">
						{t('description')}
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link
							href="/"
							className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							{t('back-to-home')}
						</Link>
					</div>
				</div>
			</main>
		</LocaleLayout>
	);
}
