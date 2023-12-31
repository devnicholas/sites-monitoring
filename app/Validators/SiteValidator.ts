import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Site from 'App/Models/Site'

export default class SiteValidator {
  constructor(protected ctx: HttpContextContract, protected site: Site | null) { }

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
    name: schema.string(),
    url: schema.string({}, [
      rules.url(),
      rules.unique(
        this.site ?
          { table: 'sites', column: 'url', whereNot: { id: this.site.id } } :
          { table: 'sites', column: 'url' }
      )
    ]),
    interval: schema.number()
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
    'name.required': 'O campo nome é obrigatório.',
    'url.unique': 'A URL que está tentando adicionar já existe.',
    'url': 'O campo URL deve conter uma URL válida.',
    'interval.*': 'O campo intervalo deve conter um valor válido.',
  }
}
