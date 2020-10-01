package models

import anorm.SqlParser._
import anorm._
import javax.inject.{Inject, Singleton}
import org.joda.time.DateTime
import play.api.db.Database

import scala.concurrent.ExecutionContext

@Singleton
class ReportRepository @Inject()(db: Database)(implicit ec: ExecutionContext) {

  val parser: RowParser[Report] =
    get[Option[Long]]("report.id") ~
      get[DateTime]("report.date") ~
      get[Option[String]]("report.note") ~
      SimpleCompany.companyParser ~
      SimplePerson.personParser ~
      SimpleOpportunity.opportunityParser ~
      SimpleUser.userParser map {
      case id ~ date ~ note ~ company ~ person ~ opportunity ~ reportUser =>
        Report(id, date, note, company, person, opportunity, reportUser)
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

  def add(report: Report): Option[Long] = {
    db.withConnection { implicit conn =>
      // FIXME SQL Injections could occur"
      SQL(
        s"""
      INSERT INTO report
        VALUES ((SELECT COUNT(*) FROM report)+1,
         '${report.date}',
          '${report.note.getOrElse("")}',
          ${
          report.company match {
            case Some(c) => c.id.getOrElse(null)
            case None => null
          }
        },
          ${
          report.person match {
            case Some(p) => p.id.getOrElse(null)
            case None => null
          }
        },
          ${
          report.opportunity match {
            case Some(o) => o.id.getOrElse(null)
            case None => null
          }
        },
          ${
          report.reportUser match {
            case Some(x) => x.accountId.getOrElse(null)
            case None => null
          }
        })
      """
      ).executeInsert()
    }
  }

  def update(report: Report) = {
    db.withConnection { implicit conn =>
      // FIXME SQL Injections could occur"
      report.id match {
        case Some(x) => SQL(
          f"""
      UPDATE report
        SET date = '${report.date}',
        note = '${report.note.getOrElse(null)}',
        company_id = ${
            report.company match {
              case Some(c) => c.id.getOrElse(null)
              case None => null
            }
          },
        person_id = ${
            report.person match {
              case Some(p) => p.id.getOrElse(null)
              case None => null
            }
          },
        opportunity_id = ${
            report.opportunity match {
              case Some(o) => o.id.getOrElse(null)
              case None => null
            }
          },
        report_user_id = ${
            report.reportUser match {
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

  def remove(reportId: Long): Unit = {
    db.withConnection { implicit conn =>
      SQL(
        f"""
      DELETE FROM report
        where id = ${reportId}
      """
      ).executeUpdate()
    }
  }
}
