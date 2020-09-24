package models

import anorm.SqlParser.get
import anorm.{RowParser, SQL, ~}
import javax.inject.{Inject, Singleton}
import play.api.db.Database

import scala.concurrent.ExecutionContext


@Singleton
class OpportunityRepository @Inject()(db: Database)(implicit ec: ExecutionContext) {

  val parser: RowParser[Option[Opportunity]] =
    get[Option[Long]]("id") ~
      get[Option[String]]("opportunity.name") ~
      get[Option[Int]]("opportunity.amount") ~
      SimpleProgress.simpleProgressParser ~
      SimpleCompany.companyParser ~
      SimplePerson.personParser ~
      SimpleUser.userParser map {
      case id ~ name ~ amount ~ progress ~ company ~ person ~ correspondence => {
        name match {
          case Some(x) => Some(Opportunity(id, x, amount,
            progress, company, person, correspondence))
          case _ => None
        }
      }
    }
  def find() = {
    db.withConnection { implicit conn =>
      SQL("""
       SELECT *
         FROM opportunity o
         LEFT JOIN user u ON o.correspondence_id = u.account_id
         LEFT JOIN progress pr ON o.progress_id = pr.id
         LEFT JOIN company c ON o.company_id = c.id
         LEFT JOIN person p ON o.person_id = p.id
      """
      ).as(parser.*)
    }
  }
}