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
import { I18nRequestInterceptor } from './interceptors'
import i18n from 'i18next'

const persistenceAdapter = new DynamoDbPersistenceAdapter({
  tableName: 'HelloWorldSessions',
  createTable: true
})

const CanFulfillIntent = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === 'CanFulfillIntentRequest'
  },
  handle(handlerInput: HandlerInput): Response {
    return handlerInput.responseBuilder
      .withCanFulfillIntent({ 'canFulfill': 'YES' })
      .getResponse()
  }
}

const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  async handle(handlerInput: HandlerInput): Promise<Response> {
    const speechText = i18n.t('SKILL_NAME')
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withShouldEndSession(true)
      .withSimpleCard(speechText, speechText)
      .getResponse()
  }
}

const HelpIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = i18n.t('HELP_MESSAGE')

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(i18n.t('SKILL_NAME'), speechText)
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
    const speechText = i18n.t('STOP_MESSAGE')
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(i18n.t('SKILL_NAME'), i18n.t('STOP_MESSAGE'))
      .getResponse()
  },
}

const ErrorHandler: ErrorHandler = {
  canHandle(handlerInput: HandlerInput, error: Error ): boolean {
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

const SessionEndedRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest'
  },
  handle(handlerInput: HandlerInput): Response {
    console.log(`Session ended with reason: ${(handlerInput.requestEnvelope.request as SessionEndedRequest).reason}`)
    return handlerInput.responseBuilder.getResponse()
  },
}

export const handler = SkillBuilders.custom()
  .withPersistenceAdapter(persistenceAdapter)
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    CanFulfillIntent
  )
  .addRequestInterceptors(I18nRequestInterceptor)
  .addErrorHandlers(ErrorHandler)
  .lambda()
