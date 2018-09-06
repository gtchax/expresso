/* Not found error handler */
export const notFound = (req, res, next) => {
  const error = new Error('404, Page not found.')
  error.status = 404
  next(error)
}

/* Catch errors */
export const catchErrors = fn => {
  return async (req, res, next) => {
    try {
      await fn(req, res)
    } catch (error) {
      next(error)
    }
  }
}

/* Default error handler */
export const logErrors = (error, req, res) => {
  res.status(error.status || 500)
  res.send(error.message)
}
