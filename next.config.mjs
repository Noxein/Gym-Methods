import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./app/i18n/requests.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack:{},
    experimental:{
        
    },
    // images:{
    //     remotePatterns:[
    //         {
    //             protocol:'https',
    //             hostname:'res.cloudinary.com',
    //         }
    //     ]
    // }
};

export default withNextIntl(nextConfig);
