import { rules, schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(20),
      rules.alphaNum({ allow: ['dash', 'underscore'] }),
    ]),

    password: schema.string({}, [rules.minLength(3), rules.maxLength(32)]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'username.minLength': 'Usuario debe tener mínimo 3 caracteres',
    'username.maxLength': 'Usuario debe tener máximo 20 caracteres',
    'username.required': 'Usuario requerido',
    'username.alphaNum': 'Solo se permiten letras, números y guiones',
    'password.required': 'Contraseña requerida',
    'password.minLength': 'Contraseña debe tener mínimo 3 caracteres',
    'password.maxLength': 'Contraseña debe tener máximo 32 caracteres',
  }
}
