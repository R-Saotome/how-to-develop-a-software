package controllers

import javax.inject.{Inject, Singleton}
import models.{Company, CompanyRepository}
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, MessagesAbstractController, MessagesControllerComponents, Request}

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class CompaniesController @Inject()(cr: CompanyRepository, cc: MessagesControllerComponents)(implicit
                                                                                             ec: ExecutionContext)
  extends MessagesAbstractController(cc) {
  def get() = Action.async { implicit request: Request[AnyContent] =>
    Future {
      val results = cr.find
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
