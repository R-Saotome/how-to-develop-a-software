package models

import anorm.SqlParser._
import anorm._
import javax.inject.{Inject, Singleton}
import play.api.db.Database

import scala.concurrent.ExecutionContext

@Singleton
class UserRepository @Inject()(db: Database)(implicit ec: ExecutionContext) {

  val parser: RowParser[User] =
    get[Option[Long]]("user.account_id") ~
      get[String]("user.first_name") ~
      get[String]("user.last_name") ~
      get[Option[String]]("user.department") ~
      get[Option[String]]("user.position") ~
      get[Option[String]]("user.tel") map {
      case id ~ firstName ~ lastName ~ department ~ position ~ tel => User(id, firstName,
        lastName,
        department, position, tel)
    }

  def find() = {
    db.withConnection { implicit conn =>
      SQL(
        """
      SELECT * FROM user AS u
      """
      ).as(parser.*)
    }
  }

}
