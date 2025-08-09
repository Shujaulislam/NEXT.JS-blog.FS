/** @type {import('next').NextConfig} */



module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.aceternity.com',
        },
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',  
        },
        {
          protocol: 'https',
          hostname: 'images.pexels.com',
        },
        {
          protocol: 'https',
          hostname: 'example.com',
        },
        {
          protocol: 'https',
          hostname: 'another-domain.com',
        },
      ],
    },
  }
  
