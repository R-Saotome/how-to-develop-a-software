package models


import anorm.SqlParser._
import anorm._
import javax.inject.{Inject, Singleton}
import play.api.db.Database

import scala.concurrent.ExecutionContext

@Singleton
class CompanyRepository @Inject()(db: Database)(implicit ec: ExecutionContext) {

  val parser: RowParser[Company] =
    get[Option[Long]]("company.id") ~
      get[String]("company.name") ~
      get[Option[String]]("company.field") ~
      get[Option[String]]("company.address") ~
      get[Option[String]]("company.tel") ~
      get[Option[String]]("company.fax") ~
      get[Option[String]]("company.email") ~
      get[Option[String]]("company.url") ~
      SimpleUser.userParser map {
      case id ~ name ~ field ~ address ~ tel ~ fax ~ email ~ url ~ correspondence => Company(id, name, field,
        address, tel, fax, email, url, correspondence)
    }

  def find() = {
    db.withConnection { implicit conn =>
      SQL(
        """
      SELECT * FROM company AS c
        LEFT JOIN user AS u ON c.correspondence_id = u.account_id
      """
      ).as(parser.*)
    }
  }
}
