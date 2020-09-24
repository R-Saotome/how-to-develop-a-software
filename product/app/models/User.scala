package models

import anorm._
import anorm.RowParser
import anorm.SqlParser._
import play.api.libs.json.{Format, Json}

object User {
  implicit val format: Format[User] = Json.format[User]

//  SimpleUserクラスがあるなら不要
//  implicit val userParser: RowParser[Option[User]] =
//    get[Option[Long]]("account_id") ~
//      get[Option[String]]("first_name") ~
//      get[Option[String]]("last_name") ~
//      get[Option[String]]("department") ~
//      get[Option[String]]("position") ~
//      get[Option[String]]("tel") map {
//      case id ~ firstName ~ lastName ~ department ~ position ~ tel => {
//        firstName -> lastName match {
//          case Some(x) -> Some(y) => Some(User(id, x, y,
//            department,
//            position, tel))
//          case _ -> _ => None
//        }
//      }
//    }

}

object SimpleUser {
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

