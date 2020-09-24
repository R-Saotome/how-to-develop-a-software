package models

import anorm.Macro.ColumnNaming
import anorm.SqlParser._
import anorm._
import javax.inject.{Inject, Singleton}
import play.api.db.Database

import scala.concurrent.ExecutionContext

@Singleton
class PersonRepository @Inject()(db: Database)(implicit ec: ExecutionContext) {

  val parser: RowParser[Person] =
    get[Option[Long]]("id") ~
      get[String]("person.first_name") ~
      get[String]("person.last_name") ~
      get[Option[String]]("person.department") ~
      get[Option[String]]("person.position") ~
      get[Option[String]]("person.tel") ~
      get[Option[String]]("person.email") ~
      SimpleCompany.companyParser ~
      SimpleUser.userParser map {
      case id ~ firstName ~ lastName ~ department ~ position ~ tel ~ email ~ company ~ correspondence =>
        Person(id, firstName, lastName, department, position, tel, email, company, correspondence)
    }

  def find() = {
    db.withConnection { implicit conn =>
      SQL(
        """
      SELECT *
       FROM person AS p
       LEFT JOIN user AS u ON p.correspondence_id = u.account_id
       LEFT JOIN company AS c ON p.company_id = c.id
      """
      ).as(parser.*)
    }
  }
}
