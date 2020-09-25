package models

import anorm._
import anorm.RowParser
import anorm.SqlParser._
import play.api.libs.json.JsonNaming.SnakeCase
import play.api.libs.json.{Format, Json, JsonConfiguration}

object User {
  implicit val config = JsonConfiguration(SnakeCase)
  implicit val format: Format[User] = Json.format[User]
}

object SimpleUser {
  implicit val config = JsonConfiguration(SnakeCase)
  implicit val format: Format[SimpleUser] = Json.format[SimpleUser]
  implicit val userParser: RowParser[Option[SimpleUser]] =
    get[Option[Long]]("user.account_id") ~
      get[Option[String]]("user.first_name") ~
      get[Option[String]]("user.last_name") map {
      case id ~ firstName ~ lastName => {
        firstName -> lastName match {
          case Some(x) -> Some(y) => Some(SimpleUser(id, x, y))
          case _ -> _ => None
        }
      }
    }

}

case class User(accountId: Option[Long] = None,
                firstName: String,
                lastName: String,
                department: Option[String],
                position: Option[String],
                tel: Option[String]) {
}


case class SimpleUser(accountId: Option[Long] = None, firstName: String, lastName: String)

