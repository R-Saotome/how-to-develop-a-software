package models

import anorm.SqlParser.get
import anorm.{RowParser, ~}
import play.api.libs.json.{Format, Json}

object Company {
  implicit val format: Format[Company] = Json.format[Company]

//  SimpleCompanyクラスがあるから不要
//  implicit val companyParser : RowParser[Option[Company]] =
//    get[Option[Long]]("id") ~
//      get[Option[String]]("name") ~
//      get[Option[String]]("field") ~
//      get[Option[String]]("address") ~
//      get[Option[String]]("tel") ~
//      get[Option[String]]("fax") ~
//      get[Option[String]]("email") ~
//      get[Option[String]]("url") ~
//      User.userParser map {
//      case id ~ name ~ field ~ address ~ tel ~ fax ~ email ~ url ~ correspondence => {
//        name match {
//          case Some(x) => Some(Company(id, x, field,
//            address, tel, fax, email, url, correspondence))
//          case _ => None
//        }
//      }
//    }
}

object SimpleCompany{
  implicit val format: Format[SimpleCompany] = Json.format[SimpleCompany]

    implicit val companyParser : RowParser[Option[SimpleCompany]] =
      get[Option[Long]]("company.id") ~
        get[Option[String]]("company.name") map {
        case id ~ name => {
          name match {
            case Some(x) => Some(SimpleCompany(id, x))
            case _ => None
          }
        }
      }
}

case class Company(id: Option[Long] = None,
                   name: String,
                   field: Option[String],
                   address: Option[String],
                   tel: Option[String],
                   fax: Option[String],
                   email: Option[String],
                   url: Option[String],
                   correspondence: Option[SimpleUser]) {

  def add = {}

  def update = {}

  def remove = {}

}

case class SimpleCompany(id: Option[Long]=None, name: String)
