package models

import anorm.{RowParser, ~}
import anorm.SqlParser._
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
                       progress: SimpleProgress,
                       company: Option[SimpleCompany],
                       person: Option[SimplePerson],
                       correspondence: Option[SimpleUser]) {
  def add = {}

  def update = {}

  def remove = {}

}

case class SimpleOpportunity(id: Option[Long] = None,
                             name: String,
                            )