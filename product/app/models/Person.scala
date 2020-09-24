package models

import play.api.libs.json.{Format, Json}

object Person {
  implicit val format: Format[Person] = Json.format[Person]
}

case class Person(id: Option[Long] = None,
                  firstName: String,
                  lastName: String,
                  department: Option[String],
                  position: Option[String],
                  tel: Option[String],
                  email: Option[String],
                  company: Option[SimpleCompany],
                  correspondence: Option[SimpleUser]
                 ) {
  def add = {}

  def update = {}

  def remove = {}

}
