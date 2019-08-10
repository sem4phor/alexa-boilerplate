import i18next from 'i18next'
import i18nextConfig from './i18n'
import * as Alexa from 'ask-sdk-core'
import { CustomSkillRequestInterceptor } from 'ask-sdk-core/dist/dispatcher/request/interceptor/CustomSkillRequestInterceptor'

const getLanguageFromLocale = (locale: string): string => locale.substr(0, 2)

/**
* Initializes i18n and sets the correct locale
* @type {Object}
*/
const I18nRequestInterceptor: CustomSkillRequestInterceptor = {
  async process(handlerInput: Alexa.HandlerInput): Promise<void> {
    await i18next.init(i18nextConfig)
    i18next.changeLanguage(
      getLanguageFromLocale(Alexa.getLocale(handlerInput.requestEnvelope))
    )
  }
}
    
export {
  I18nRequestInterceptor
}
