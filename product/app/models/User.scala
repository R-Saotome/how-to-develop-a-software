package models
import anorm._
import anorm.RowParser
import anorm.SqlParser._
import play.api.libs.json.{Format, Json}

object User {
  implicit val format: Format[User] = Json.format[User]
}

case class User(accountId: Option[Long] = None,
                firstName: String,
                lastName: String,
                department: Option[String],
                position: Option[String],
                tel: Option[String]) {
}

