package models

import anorm.{RowParser, ~}
import anorm.SqlParser._
import play.api.libs.json.JsonNaming.SnakeCase
import play.api.libs.json.{Format, Json, JsonConfiguration}

object Progress {
//  implicit val config = JsonConfiguration(SnakeCase)
  implicit val format: Format[Progress] = Json.format[Progress]
}

object SimpleProgress {
  implicit val format: Format[SimpleProgress] = Json.format[SimpleProgress]
  implicit val progressParser: RowParser[SimpleProgress] =
    get[Option[Long]]("progress.id") ~
      get[String]("progress.name") map {
      case id ~ name => SimpleProgress(id, name)
    }

}

case class Progress(id: Option[Long] = None,
                    orderNumber: Int,
                    name: String) {}

case class SimpleProgress(id: Option[Long] = None,
                          name: String)