package controllers

import javax.inject.Inject
import models.{Opportunity, OpportunityRepository}
import play.api.libs.json.{JsError, Json}
import play.api.mvc.{AnyContent, MessagesAbstractController, MessagesControllerComponents, Request}

import scala.concurrent.{ExecutionContext, Future}

class OpportunitiesController @Inject()(or: OpportunityRepository, cc: MessagesControllerComponents)(implicit
                                                                                                     ec: ExecutionContext)
  extends MessagesAbstractController(cc) {
  def get() = Action.async { implicit request: Request[AnyContent] =>
    Future {
      val results = or.find
      Ok(Json.obj("data" -> Json.toJson(results)))
    }(ec)
  }

  def add() = Action.async(parse.json) { implicit request =>
    Future {
      val personResult = request.body.validate[Opportunity]
      personResult.fold(
        errors => BadRequest(JsError.toJson(errors)),
        opportunity => {
          val generatedId: Option[Long] = opportunity.save(or)
          Created(Json.obj("data" -> Json.toJson(opportunity.copy(id = generatedId))))
        }
      )
    }(ec)
  }

  def update(updateId: Long) = Action.async(parse.json) { implicit request =>
    Future {
      val companyResult = request.body.validate[Opportunity]
      companyResult.fold(
        errors => BadRequest(JsError.toJson(errors)),
        opportunity => {
          opportunity.copy(id = Some(updateId)).edit(or)
          NoContent
        }
      )
    }
  }

  def remove(deleteId: Long) = Action.async(parse.json) { implicit request =>
    Future {
      or.remove(deleteId)
      NoContent
    }(ec)
  }
}