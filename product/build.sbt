name := """product"""
organization := "com.dev-mgr"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.3"

libraryDependencies ++= Seq(
  guice,
  "com.h2database" % "h2" % "1.4.200" ,
  evolutions,
  jdbc,
  "com.typesafe.play" %% "play-json-joda" % "2.8.1",
  "org.playframework.anorm" %% "anorm" % "2.6.7",
  "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test
)
// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.example.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.example.binders._"
