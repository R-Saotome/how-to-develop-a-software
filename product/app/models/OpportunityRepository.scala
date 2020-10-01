package models

import anorm.SqlParser.get
import anorm.{RowParser, SQL, ~}
import javax.inject.{Inject, Singleton}
import play.api.db.Database

import scala.concurrent.ExecutionContext


@Singleton
class OpportunityRepository @Inject()(db: Database)(implicit ec: ExecutionContext) {

  val parser: RowParser[Opportunity] =
    get[Option[Long]]("opportunity.id") ~
      get[String]("opportunity.name") ~
      get[Option[Int]]("opportunity.amount") ~
      SimpleProgress.progressParser ~
      SimpleCompany.companyParser ~
      SimplePerson.personParser ~
      SimpleUser.userParser map {
      case id ~ name ~ amount ~ progress ~ company ~ opportunity ~ correspondence =>
        Opportunity(id, name, amount, progress, company, opportunity, correspondence)
    }

  def find() = {
    db.withConnection { implicit conn =>
      SQL(
        """
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

  def add(opportunity: Opportunity): Option[Long] = {
    db.withConnection { implicit conn =>
      // FIXME SQL Injections could occur"
      SQL(
        s"""
      INSERT INTO opportunity
        VALUES ((SELECT COUNT(*) FROM opportunity)+1,
         '${opportunity.name}',
         ${opportunity.amount.getOrElse(null)},
         ${opportunity.progress.id.getOrElse(null)},
         ${opportunity.company match {
            case Some(x) => x.id.getOrElse(null)
            case None => null
          }},
          ${opportunity.person match {
            case Some(x) => x.id.getOrElse(null)
            case None => null
          }},
          ${opportunity.correspondence match {
            case Some(x) => x.accountId.getOrElse(null)
            case None => null
          }
        })
      """
      ).executeInsert()
    }
  }
}