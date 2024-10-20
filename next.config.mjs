/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },

  serverExternalPackages: ["@node-rs/argon2"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/*`,
      },
    ],
  },

  rewrites: () => {
    return [
      {
        source: "/hashtag/:tag",
        destination: "/search?q=%23:tag",
      },
    ];
  },

  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.node$/,
      use: 'file-loader',
    });

    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@node-rs/argon2': 'commonjs @node-rs/argon2',
      });
    }

    return config;
  },

  publicRuntimeConfig: {
    uploadThingToken: process.env.UPLOADTHING_TOKEN,
  },
};

export default nextConfig;