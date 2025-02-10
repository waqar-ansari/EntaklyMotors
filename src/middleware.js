import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {

  // matcher: ['/', '/(ar|en)/:path*']
  matcher: ['/((?!api|_next|.*\\..*).*)'], // Matches non-static files only
};