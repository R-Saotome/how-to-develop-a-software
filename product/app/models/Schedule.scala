package models

import org.joda.time.DateTime
import play.api.libs.json.JsonNaming.SnakeCase
import play.api.libs.json._

object Schedule {
  implicit val config = JsonConfiguration(SnakeCase)
  implicit val dateTimeReads = JodaReads.DefaultJodaDateTimeReads
  implicit val dateTimeWrites = JodaWrites.JodaDateTimeWrites

  implicit val format: Format[Schedule] = Json.format[Schedule]
}

case class Schedule(id: Option[Long] = None,
                    isAllDay: Boolean,
                    startDate: DateTime,
                    endDate: DateTime,
                    title: String,
                    note: Option[String],
                    company: Option[SimpleCompany],
                    person: Option[SimplePerson],
                    opportunity: Option[SimpleOpportunity],
                    members: List[SimpleUser]) {
  def save(sr: ScheduleRepository) = {
    sr.add(this)
  }

  def edit(sr: ScheduleRepository) = {
    sr.update(this)
  }

  def remove = {}

}
