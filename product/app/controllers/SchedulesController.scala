package controllers

import javax.inject.{Inject, Singleton}
import models.{Schedule, ScheduleRepository}
import play.api.libs.json.{JsError, Json}
import play.api.mvc.{AnyContent, MessagesAbstractController, MessagesControllerComponents, Request}

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class SchedulesController @Inject()(sr: ScheduleRepository, cc: MessagesControllerComponents)(implicit
                                                                                              ec: ExecutionContext)
  extends MessagesAbstractController(cc) {
  def get() = Action.async { implicit request: Request[AnyContent] =>
    Future {
      val results = sr.find
      Ok(Json.obj("data" -> Json.toJson(results)))
    }(ec)
  }

  def add() = Action.async(parse.json) { implicit request =>
    Future {
      val scheduleResult = request.body.validate[Schedule]
      scheduleResult.fold(
        errors => BadRequest(JsError.toJson(errors)),
        schedule => {
          val generatedId: Option[Long] = schedule.save(sr)
          Created(Json.obj("data" -> Json.toJson(schedule.copy(id = generatedId))))
        }
      )
    }(ec)
  }

  def update() = Action.async { implicit request: Request[AnyContent] =>
    Future {
      Ok(Json.toJson("updateCompanyCalled"))
    }(ec)
  }

  def remove() = Action.async { implicit request: Request[AnyContent] =>
    Future {
      Ok(Json.toJson("removeCompanyCalled"))
    }(ec)
  }
}
