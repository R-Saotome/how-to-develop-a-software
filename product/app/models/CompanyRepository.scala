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

  def add(company: Company): Option[Long] = {
    db.withConnection { implicit conn =>
      // FIXME SQL Injections occurs at "${progress.name}"
      SQL(
        s"""
      INSERT INTO company
        VALUES ((SELECT COUNT(*) FROM company)+1, '${company.name}', '${company.field.getOrElse("")}', '${
          company.address
            .getOrElse("")
        }', '${company.tel.getOrElse("")}', '${company.fax.getOrElse("")}', '${
          company.email
            .getOrElse("")
        }', '${company.url.getOrElse("")}', '${
          company.correspondence match {
            case Some(x) => x.accountId.getOrElse(null)
            case None => null
          }
        }')
      """
      ).executeInsert()
    }
  }
}
