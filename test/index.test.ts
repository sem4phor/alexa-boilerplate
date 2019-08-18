import { VirtualAlexa } from 'virtual-alexa'
import i18nextConfig from '@/i18n'
import i18next from 'i18next'
import { getLanguageFromLocale } from '@/service'

const testLocale = 'en-US'

i18next.init(i18nextConfig)
i18next.changeLanguage(
  getLanguageFromLocale(testLocale)
)

const alexa = VirtualAlexa.Builder()
  .handler('dist/index.handler')
  .interactionModelFile('./models/en-US.json')
  .create()
alexa.dynamoDB().mock()

describe('hello world', () => {

  alexa.filter((requestEnvelope) => {
    Object.assign(requestEnvelope.context.System.device.supportedInterfaces, {
      'Alexa.Presentation.APL': {}
    })
    requestEnvelope.request.locale = testLocale
  })

  test('Launch request', async () => {
    const response = await alexa.launch()
    const ssml = response.response.outputSpeech.ssml
    expect(ssml).toContain(i18next.t('SKILL_NAME'))
  })
})
