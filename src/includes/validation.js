import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as MinValue,
  max_value as maxValue,
  confirmed,
  not_one_of as excluded
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('min_value', MinValue)
    defineRule('max_value', maxValue)
    defineRule('email', email)
    defineRule('confirmed', confirmed)
    defineRule('excluded', excluded)
    defineRule('passwords_mismatch', confirmed)
    defineRule('country_excluded', excluded)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too small`,
          max: `The field ${ctx.field} is too long`,
          alpha_spaces: `The field ${ctx.field} must only contain alphabetic letters`,
          email: `The field ${ctx.field} must be a valid email`,
          min_value: `The field ${ctx.field} is too small`,
          max_value: `The field ${ctx.field} is too high`,
          excluded: `You are not allowed to use the value ${ctx.field}`,
          country_excluded: `Due to restrictions, you are not allowed to register in this country`,
          passwores_mismatch: 'The passwords do not match',
          tos: 'You must accept the Terms of Service.'
        }
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`

        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    })
  }
}
