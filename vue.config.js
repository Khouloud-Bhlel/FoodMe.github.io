module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/FoodMe.github.io/'
      : '/',
    outputDir: 'docs'  // This will output the build to a 'docs' folder
  }