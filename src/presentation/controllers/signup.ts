import { InvalidParamError, MissingParamError } from '../errors/'
import { type HttpRequest, type HttpResponse, type Controller, type EmailValidator } from '../protocols'
import { badRequest, serverError } from '../helper/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'PasswordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return {
        statusCode: 200,
        body: 'This is the end'
      }
    } catch (error) {
      return serverError()
    }
  }
}
