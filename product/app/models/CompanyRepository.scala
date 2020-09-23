package models

import anorm.Macro.ColumnNaming

import anorm.SqlParser._
import anorm._
import javax.inject.{Inject, Singleton}
import play.api.db.Database

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class CompanyRepository @Inject()(db: Database)(implicit ec: ExecutionContext) {

  val parser: RowParser[Company] = Macro.namedParser[Company](ColumnNaming.SnakeCase)
  val correspondenceValidation = get[Option[Long]]("correspondence_id")

  def find() = {
    db.withConnection { implicit conn =>
      SQL("""
      SELECT * FROM company AS c
        LEFT JOIN user AS u ON c.correspondence_id = u.account_id
      """
      ).as(parser.*)
    }
  }
}
