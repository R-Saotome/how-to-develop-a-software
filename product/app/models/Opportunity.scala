package models

import anorm.SqlParser._
import anorm.{RowParser, ~}
import play.api.libs.json.JsonNaming.SnakeCase
import play.api.libs.json.{Format, Json, JsonConfiguration}

object Opportunity {
  implicit val config = JsonConfiguration(SnakeCase)
  implicit val format: Format[Opportunity] = Json.format[Opportunity]
}

object SimpleOpportunity {
  implicit val config = JsonConfiguration(SnakeCase)
  implicit val format: Format[SimpleOpportunity] = Json.format[SimpleOpportunity]

  implicit val opportunityParser: RowParser[Option[SimpleOpportunity]] =
    get[Option[Long]]("opportunity.id") ~
      get[Option[String]]("opportunity.name") map {
      case id ~ name => name match {
        case Some(x) => Some(SimpleOpportunity(id, x))
        case _ => None
      }
    }
}

case class Opportunity(id: Option[Long] = None,
                       name: String,
                       amount: Option[Int] = None,
                       progress: Option[SimpleProgress],
                       company: Option[SimpleCompany],
                       person: Option[SimplePerson],
                       correspondence: Option[SimpleUser]) {
  def save(or: OpportunityRepository) = {
    or.add(this)
  }

  def edit(or: OpportunityRepository) = {
    or.update(this)
  }

  def remove = {}

}

case class SimpleOpportunity(id: Option[Long] = None,
                             name: String,
                            )