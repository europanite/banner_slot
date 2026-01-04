// example/app.config.js
export default ({ config }) => {
  const basePath = process.env.BASE_PATH ?? ""; // e.g. "/your-repo"
  return {
    ...config,
    name: "banner-slot-example",
    slug: "banner-slot-example",
    version: "1.0.0",
    platforms: ["web"],
    web: {
      bundler: "metro"
    },
    experiments: {
      // GitHub Pages subpath support
      baseUrl: basePath
    }
  };
};
