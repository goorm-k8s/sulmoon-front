module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'url-loader', // url 로더를 설정한다
        },
      },
    ],
  },
};
