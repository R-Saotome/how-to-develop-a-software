package models

import org.joda.time.DateTime
import play.api.libs.json.{Format, JodaReads, JodaWrites, Json}

object Report {

  implicit val dateTimeReads = JodaReads.DefaultJodaDateTimeReads
  implicit val dateTimeWrites = JodaWrites.JodaDateTimeWrites

  implicit val format: Format[Report] = Json.format[Report]
}

case class Report(id: Option[Long] = None,
                  date: DateTime,
                  note: Option[String],
                  company: Option[SimpleCompany],
                  person: Option[SimplePerson],
                  opportunity: Option[SimpleOpportunity],
                  reportUser: Option[SimpleUser]) {

  def save(rr: ReportRepository) = {
    rr.add(this)
  }

  def edit(rr: ReportRepository) = {
    rr.update(this)
  }

  def remove = {}

}
