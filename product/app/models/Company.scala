package models

import play.api.libs.json.{Format, Json}

object Company {
  implicit val format: Format[Company] = Json.format[Company]
}

case class Company(id: Option[Long] = None,
                   name: String,
                   address: String = "",
                   tel: String = "",
                   fax: String = "",
                   email: String = "",
                   url: String = "") {

  def add = {}

  def update = {}

  def remove = {}
}
