package models

import anorm.SqlParser.get
import anorm.{RowParser, SQL, ~}
import javax.inject.{Inject, Singleton}
import org.joda.time.DateTime
import play.api.db.Database

import scala.concurrent.ExecutionContext

@Singleton
class ScheduleRepository @Inject()(db: Database)(implicit ec: ExecutionContext) {

  val parser: RowParser[(Schedule, Option[SimpleUser])] =
    get[Option[Long]]("schedule.id") ~
      get[Boolean]("schedule.is_all_day") ~
      get[DateTime]("schedule.start_date") ~
      get[DateTime]("schedule.end_date") ~
      get[String]("schedule.title") ~
      get[Option[String]]("schedule.note") ~
      SimpleCompany.companyParser ~
      SimplePerson.personParser ~
      SimpleOpportunity.opportunityParser ~
      SimpleUser.userParser map {
      case id ~ isAllDay ~ start ~ end ~ title ~ note ~ company ~ person ~ opportunity ~ member =>
        (Schedule(id, isAllDay, start, end, title, note, company, person, opportunity, Nil), member)
    }

  def find() = {
    db.withConnection {
      implicit conn =>
        SQL(
          """
  SELECT *
    FROM schedule s
    LEFT JOIN company c ON s.company_id = c.id
    LEFT JOIN person p ON s.person_id = p.id
    LEFT JOIN opportunity o ON s.opportunity_id = o.id
    LEFT JOIN schedule_member sm ON s.id = sm.schedule_id
    LEFT JOIN user u ON sm.account_id = u.account_id
  """
        ).as(parser.*)
          .groupBy(_._1)
          .transform((_, list) => list.map(_._2).flatten)
          .toList
          .map { case (schedule, list) => schedule.copy(members = list) }
    }
  }
}
