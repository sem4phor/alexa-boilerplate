import {
    ErrorHandler,
    HandlerInput,
    RequestHandler,
    SkillBuilders,
} from 'ask-sdk-core'
import {
    Response,
    SessionEndedRequest,
} from 'ask-sdk-model'
import {
    DynamoDbPersistenceAdapter
} from 'ask-sdk-dynamodb-persistence-adapter'
import AWS from 'aws-sdk'

let dynamoDBClient = undefined
if (process.env.NODE_ENV === 'development') {
    AWS.config.update({
        region: 'us-east-1'
    })
    console.log('### Using Local Dynamo DB ###')
    dynamoDBClient = new AWS.DynamoDB({
        apiVersion : 'latest',
        region: 'us-west-2',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'fakeMyAccessKeyId',
        secretAccessKey: 'fakeMyAccessKey'
    })
} else {
    dynamoDBClient = new AWS.DynamoDB({
        apiVersion : 'latest'
    })
}

const persistenceAdapter = new DynamoDbPersistenceAdapter({
    tableName: 'HelloWorldSessions',
    createTable: true,
    dynamoDBClient
})

const LaunchRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {
        const persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes()
        console.log(persistentAttributes)
        persistentAttributes.foo = 'bar'
        handlerInput.attributesManager.setPersistentAttributes(persistentAttributes)
  
        await handlerInput.attributesManager.savePersistentAttributes()
        const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!'

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse()
    },
}

const HelloWorldIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent'
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText = 'Hello World!'

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse()
    },
}

const HelpIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText = 'You can say hello to me!'

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse()
    },
}

const CancelAndStopIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText = 'Goodbye!'

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse()
    },
}

const SessionEndedRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest'
    },
    handle(handlerInput: HandlerInput): Response {
        console.log(`Session ended with reason: ${(handlerInput.requestEnvelope.request as SessionEndedRequest).reason}`)

        return handlerInput.responseBuilder.getResponse()
    },
}



const ErrorHandler: ErrorHandler = {
    canHandle(handlerInput: HandlerInput, error: Error ): boolean {
        console.log(handlerInput)
        console.log(error)
        return true
    },
    handle(handlerInput: HandlerInput, error: Error): Response {
        console.log(`Error handled: ${error.message}`)

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse()
    },
}

export const handler = SkillBuilders.custom()
    .withPersistenceAdapter(persistenceAdapter)
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .lambda()