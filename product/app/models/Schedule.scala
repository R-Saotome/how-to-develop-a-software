package models

import org.joda.time.DateTime
import play.api.libs.json.{Format, JodaReads, JodaWrites, Json}

object Schedule {
  implicit val dateTimeReads = JodaReads.DefaultJodaDateTimeReads
  implicit val dateTimeWrites = JodaWrites.JodaDateTimeWrites

  implicit val format: Format[Schedule] = Json.format[Schedule]
}

case class Schedule(id:Option[Long]=None,
                   startDate: DateTime,
                   endDate: DateTime,
                   title: String,
                   note: Option[String],
                   company: Option[SimpleCompany],
                   person: Option[SimplePerson],
                   opportunity: Option[SimpleOpportunity],
                   members: List[SimpleUser]) {
  def add = {}

  def update = {}

  def remove = {}

}
