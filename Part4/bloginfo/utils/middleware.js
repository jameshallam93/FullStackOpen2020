const logger = require("./logger")


const requestLogger = (request, response, next) =>{
    logger.info(`method: ${request.method}`)
    logger.info(`path: ${request.path}`)
    logger.info(`body: ${request.body}`)
    logger.info("----------end of request logger----------")
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "ValidationError"){
        response.status(400).json({error:error.message}.end())
    }else if(error.name === "CastError"){
        response.send({error:"malformatted id"})
    }
    next(error)
}

const unknownEndpoint = (request, response) =>{
    response.status(404).send({error: "unknown endpoint"})}

module.exports = {
    requestLogger,
    errorHandler,
    unknownEndpoint
}