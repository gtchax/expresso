const prodConfig = {
  port: process.env.PORT || 8080,
  db: process.env.DATABASE,
    secrets: {
        JWT_TOKEN: process.env.JWT_SECRET
    }
}

export default prodConfig
