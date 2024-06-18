'use client';

import { useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { FaCheck, FaGlobe } from 'react-icons/fa';
import { languagesData } from '@/configs/siteConfig';

export default function LocalSwitcher() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isPending, startTransition] = useTransition();

	const router = useRouter();
	const pathname = usePathname();
	const localActive = useLocale();

	const onSelectChange = (newLocale) => {
		const slicePath = pathname.split('/').slice(2).join('/');

		startTransition(() => {
			router.replace(`/${newLocale}`);
			// router.push(`/${newLocale}/${slicePath}`);
		});
		setIsDropdownOpen(!isDropdownOpen);
	};

	const t = useTranslations('HomePage');

	return (
		<div className="relative ml-4 z-50">
			<button
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				type="button"
				className="inline-flex gap-1 items-center p-2 text-sm text-gray-500 rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
			>
				<FaGlobe className="w-5 h-5" />
				<span className="ml-2">{t('language')}</span>
			</button>
			{isDropdownOpen && (
				<div
					className={`absolute ${
						localActive == 'ar' ? 'left-0' : 'right-0'
					} mt-2 w-36 bg-white border rounded shadow-lg cursor-pointer`}
				>
					{languagesData?.map((lang, index) => (
						<div
							key={`langs-${index}`}
							className={`flex gap-2 items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
								lang?.short == localActive && 'bg-gray-100'
							}`}
							onClick={() => onSelectChange(lang?.short)}
						>
							<Image
								src={lang?.img}
								alt={lang?.title}
								className="w-5 h-5 mr-2"
								width={20}
								height={20}
							/>
							<span>{lang?.title}</span>

							{lang?.short == localActive && <FaCheck />}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
