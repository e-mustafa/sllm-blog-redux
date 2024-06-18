import { useTranslations } from 'next-intl';
import React from 'react';

const CategoriesCheckbox = ({
	name,
	title,
	uniqueList,
	selectedList,
	onSelectedChange,
}) => {
	const t = useTranslations('HomePage');

	return (
		<div className="mb-4">
			<h3 className="text-lg font-bold bg-blue-600 text-white p-2">{t(title)}</h3>
			{uniqueList.map((category, index) => (
				<div key={`${name}-${index + 1}`} className="flex items-center gap-2 mx-2">
					<input
						type="checkbox"
						id={`${name}-${index + 1}`}
						value={category?.toLowerCase()}
						checked={selectedList.includes(category?.toLowerCase())}
						onChange={(event) =>
							onSelectedChange(category?.toLowerCase(), event.target.checked)
						}
					/>
					<label htmlFor={`${name}-${index + 1}`}>{category}</label>
				</div>
			))}
		</div>
	);
};

export default CategoriesCheckbox;
