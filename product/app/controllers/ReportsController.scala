package controllers

import javax.inject.Inject
import models.ReportRepository
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, MessagesAbstractController, MessagesControllerComponents, Request}

import scala.concurrent.{ExecutionContext, Future}

class ReportsController @Inject()(rr: ReportRepository, cc: MessagesControllerComponents)(implicit
                                                                                          ec: ExecutionContext)
  extends MessagesAbstractController(cc) {
  def get() = Action.async { implicit request: Request[AnyContent] =>
    Future {
      val results = rr.find
      Ok(Json.obj("data" -> Json.toJson(results)))
    }(ec)
  }

  def add() = Action.async { implicit request: Request[AnyContent] =>
    Future {
      Ok(Json.toJson("addCompanyCalled"))
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