const devConfig = {
  port: process.env.PORT || 4000,
  database: 'mongodb://localhost/expresso-dev',
    secrets: {
      JWT_TOKEN: process.env.JWT_SECRET
    }
}

export default devConfig
