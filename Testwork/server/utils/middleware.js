const logger = require("./logger")

const requestLogger = (request, response, next) =>{
    logger.info(`Body: ${request.body}`)
    logger.info(`Method: ${request.method}`)
    logger.info(`Path: ${request.path}`)
    logger.info("____________________")
    next()
}

const unknownEndpoint = (request, response) =>{
    response.status(404).send({error: "unknown endpoint"})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "ValidationError"){
        response.status(400).json({error:error.message})
    }else if(error.name === "CastError"){
        response.send({error:"malformatted id"})
    }
    next(error)
}






module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
  }