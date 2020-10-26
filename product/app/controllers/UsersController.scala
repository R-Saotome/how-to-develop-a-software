package controllers

import javax.inject.{Inject, Singleton}
import models.UserRepository
import play.api.libs.json.Json
import play.api.mvc.{AnyContent, MessagesAbstractController, MessagesControllerComponents, Request}

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class UsersController @Inject()(ur: UserRepository, cc: MessagesControllerComponents)(implicit
                                                                                         ec: ExecutionContext)
  extends MessagesAbstractController(cc) {
  def get() = Action.async { implicit request: Request[AnyContent] =>
    Future {
      val results = ur.find
      Ok(Json.obj("data" -> Json.toJson(results)))
    }(ec)
  }

}
