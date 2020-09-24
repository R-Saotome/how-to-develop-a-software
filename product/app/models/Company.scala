package models

import play.api.libs.json.{Format, Json}

object Company {
  implicit val format: Format[Company] = Json.format[Company]
}

case class Company(id: Option[Long] = None,
                   name: String,
                   field: Option[String],
                   address: Option[String],
                   tel: Option[String],
                   fax: Option[String],
                   email: Option[String],
                   url: Option[String],
                   correspondence: Option[SimpleUser]) {

  def add = {}

  def update = {}

  def remove = {}

}
