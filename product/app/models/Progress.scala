package models

import anorm.SqlParser._
import anorm.{RowParser, ~}
import play.api.libs.json.JsonNaming.SnakeCase
import play.api.libs.json.{Format, Json, JsonConfiguration}

object Progress {
  implicit val config = JsonConfiguration(SnakeCase)
  implicit val format: Format[Progress] = Json.format[Progress]
}

object SimpleProgress {
  implicit val config = JsonConfiguration(SnakeCase)
  implicit val format: Format[SimpleProgress] = Json.format[SimpleProgress]
  implicit val progressParser: RowParser[Option[SimpleProgress]] =
    get[Option[Long]]("progress.id") ~
      get[Option[String]]("progress.name") map {
      case id ~ name => name match {
        case Some(x) => Some(SimpleProgress(id, x))
        case _ => None
      }
    }

}

case class Progress(id: Option[Long] = None,
                    orderNumber: Int,
                    name: String) {
  def save(repository: ProgressRepository): Option[Long] = {
    repository.add(this)
  }

  def edit(repository: ProgressRepository): Unit = {
    this.id match {
      case Some(_) => {
        repository.update(this)
      }
      case None => throw new Exception("data not found")
    }
  }

  def remove = {}

}

case class SimpleProgress(id: Option[Long] = None,
                          name: String)