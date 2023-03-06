import { MissingParamError } from '../errors/missing-param-error'
import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { badRequest } from '../helper/http-helper'
import { type Controller } from '../protocols/controller'
export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'PasswordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      statusCode: 200,
      body: 'Success'
    }
  }
}
