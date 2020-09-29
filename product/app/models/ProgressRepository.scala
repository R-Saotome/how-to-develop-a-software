package models

import anorm.SqlParser._
import anorm._
import javax.inject.{Inject, Singleton}
import play.api.db.Database

import scala.concurrent.ExecutionContext

@Singleton
class ProgressRepository @Inject()(db: Database)(implicit ec: ExecutionContext) {

  val parser: RowParser[Progress] =
    get[Option[Long]]("id") ~
      get[Int]("progress.order_number") ~
      get[String]("progress.name") map {
      case id ~ order ~ name =>
        Progress(id, order, name)
    }

  def find() = {
    db.withConnection { implicit conn =>
      SQL(
        """
      SELECT *
       FROM progress AS p
      """
      ).as(parser.*)
    }
  }
  def add(progress: Progress): Option[Long] = {
    db.withConnection { implicit conn =>
      // FIXME SQL Injections occurs at "${progress.name}"
      SQL(
        s"""
      INSERT INTO progress
        VALUES ((SELECT COUNT(*) FROM progress)+1, ${progress.orderNumber}, '${progress.name}')
      """
      ).executeInsert()
    }
  }
}
