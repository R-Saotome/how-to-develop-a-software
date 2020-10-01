package models

import anorm.SqlParser._
import anorm.{RowParser, ~}
import play.api.libs.json.JsonNaming.SnakeCase
import play.api.libs.json.{Format, Json, JsonConfiguration}

object Person {
  implicit val config = JsonConfiguration(SnakeCase)
  implicit val format: Format[Person] = Json.format[Person]
}

object SimplePerson {
  implicit val config = JsonConfiguration(SnakeCase)
  implicit val format: Format[SimplePerson] = Json.format[SimplePerson]

  implicit val personParser: RowParser[Option[SimplePerson]] =
    get[Option[Long]]("person.id") ~
      get[Option[String]]("person.first_name") ~
      get[Option[String]]("person.last_name") map {
      case id ~ firstName ~ lastName => {
        firstName -> lastName match {
          case Some(x) -> Some(y) => Some(SimplePerson(id, x, y))
          case _ -> _ => None
        }
      }
    }
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
  def save(pr: PersonRepository): Option[Long] = {
    pr.add(this)
  }

  def edit(pr: PersonRepository) = {
    pr.update(this)
  }

  def remove = {}

}

case class SimplePerson(id: Option[Long] = None,
                        firstName: String,
                        lastName: String)
