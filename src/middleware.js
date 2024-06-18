import createMiddleware from 'next-intl/middleware';
import { defaultLocales, locales } from './configs/siteConfig';

export default createMiddleware({
	locales: locales,
	defaultLocale: defaultLocales,
});

export const config = {
	// Match only internationalized pathnames
	matcher: ['/', '/(ar|en)/:path*'],
};
