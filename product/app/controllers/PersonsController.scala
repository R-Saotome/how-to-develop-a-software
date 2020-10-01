package controllers

import javax.inject.Inject
import models.{Person, PersonRepository}
import play.api.libs.json.{JsError, Json}
import play.api.mvc.{AnyContent, MessagesAbstractController, MessagesControllerComponents, Request}

import scala.concurrent.{ExecutionContext, Future}

class PersonsController @Inject()(pr: PersonRepository, cc: MessagesControllerComponents)(implicit
                                                                                          ec: ExecutionContext)
  extends MessagesAbstractController(cc) {
  def get() = Action.async { implicit request: Request[AnyContent] =>
    Future {
      val results = pr.find
      Ok(Json.obj("data" -> Json.toJson(results)))
    }(ec)
  }

  def add() = Action.async(parse.json) { implicit request =>
    Future {
      val personResult = request.body.validate[Person]
      personResult.fold(
        errors => BadRequest(JsError.toJson(errors)),
        person => {
          val generatedId: Option[Long] = person.save(pr)
          Created(Json.obj("data" -> Json.toJson(person.copy(id = generatedId))))
        }
      )
    }(ec)
  }

  def update(updateId: Long) = Action.async(parse.json) { implicit request =>
    Future {
      val companyResult = request.body.validate[Person]
      companyResult.fold(
        errors => BadRequest(JsError.toJson(errors)),
        person => {
          person.copy(id = Some(updateId)).edit(pr)
          NoContent
        }
      )
    }
  }

  def remove(deleteId: Long) = Action.async(parse.json) { implicit request =>
    Future {
      pr.remove(deleteId)
      NoContent
    }(ec)
  }
}
