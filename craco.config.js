// craco.config.js
module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
    resolve: {
      fallback: { "path": require.resolve("path-browserify") }
  }
  }