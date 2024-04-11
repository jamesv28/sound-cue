import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage } from 'vee-validate'
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
  }
}
