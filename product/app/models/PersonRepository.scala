package models

import anorm.SqlParser._
import anorm._
import javax.inject.{Inject, Singleton}
import play.api.db.Database

import scala.concurrent.ExecutionContext

@Singleton
class PersonRepository @Inject()(db: Database)(implicit ec: ExecutionContext) {

  val parser: RowParser[Person] =
    get[Option[Long]]("person.id") ~
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

  def add(person: Person): Option[Long] = {
    db.withConnection { implicit conn =>
      // FIXME SQL Injections could occur"
      SQL(
        s"""
      INSERT INTO person
        VALUES ((SELECT COUNT(*) FROM person)+1, ${
          person.company match {
            case Some(x) => x.id.getOrElse(null)
            case None => null
          }
        }, '${person.firstName}', '${person.lastName}',
         '${
          person.department
            .getOrElse("")
        }', '${person.position.getOrElse("")}', '${person.tel.getOrElse("")}', '${
          person.email
            .getOrElse("")
        }', ${
          person.correspondence match {
            case Some(x) => x.accountId.getOrElse(null)
            case None => null
          }
        })
      """
      ).executeInsert()
    }
  }

  def update(person: Person) = {
    db.withConnection { implicit conn =>
      // FIXME SQL Injections could occur"
      person.id match {
        case Some(x) => SQL(
          f"""
      UPDATE person
        SET company_id = ${
            person.company match {
              case Some(c) => c.id.getOrElse(null)
              case None => null
            }
          },
            first_name = '${person.firstName}',
            last_name = '${person.lastName}',
            department = '${person.department.getOrElse("")}',
            position = '${person.position.getOrElse("")}',
            tel = '${person.tel.getOrElse("")}',
            email = '${person.email.getOrElse("")}',
            correspondence_id = ${
            person.correspondence match {
              case Some(x) => x.accountId.getOrElse(null)
              case None => null
            }
          }
        WHERE id = ${x}
      """
        ).executeUpdate()

        case None => Error
      }
    }
  }
}
