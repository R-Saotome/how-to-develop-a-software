package models

import anorm.SqlParser._
import anorm._
import javax.inject.{Inject, Singleton}
import org.joda.time.DateTime
import play.api.db.Database

import scala.concurrent.ExecutionContext

@Singleton
class ReportRepository @Inject()(db: Database)(implicit ec: ExecutionContext) {

  val parser: RowParser[Option[Report]] =
    get[Option[Long]]("report.id") ~
      get[Option[DateTime]]("report.date") ~
      get[Option[String]]("report.note") ~
      SimpleCompany.companyParser ~
      SimplePerson.personParser ~
      SimpleOpportunity.opportunityParser ~
      SimpleUser.userParser map {
      case id ~ date ~ note ~ company ~ person ~ opportunity ~ reportUser => {
        date match {
          case Some(x) => Some(Report(id, x, note, company, person, opportunity, reportUser))
          case _ => None
        }
      }
    }

  def find() = {
    db.withConnection { implicit conn =>
      SQL(
        """
      SELECT *
         FROM report r
         LEFT JOIN user u ON r.report_user_id = u.account_id
         LEFT JOIN company c ON r.company_id = c.id
         LEFT JOIN person p ON r.person_id = p.id
         LEFT JOIN opportunity o ON r.opportunity_id = o.id
      """
      ).as(parser.*)
    }
  }
}
