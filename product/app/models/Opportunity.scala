package models

import play.api.libs.json.{Format, Json}

object Opportunity {
  implicit val format: Format[Opportunity] = Json.format[Opportunity]

}

case class Opportunity(id: Option[Long]=None,
                      name: String,
                      amount: Option[Int]=None,
                      progress: SimpleProgress,
                      company: Option[SimpleCompany],
                      person: Option[SimplePerson],
                      correspondence: Option[SimpleUser]) {
  def add = {}

  def update = {}

  def remove = {}

}
