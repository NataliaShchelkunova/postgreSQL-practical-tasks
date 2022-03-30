module.exports = (app) => {
  const tutorialControllers = require("../controller/tutorial.controller");
  const express = require("express");
  const router = express.Router();

  router.post("/", tutorialControllers.create);
  router.get("/getAllTutorial", tutorialControllers.findAll);
  router.get("/findAllWhere", tutorialControllers.findAllWhere);
  router.get("/sortAllEntries", tutorialControllers.sortAllEntries);
  router.get("/findWithPaginations", tutorialControllers.findWithPaginations);
  router.get("/paginationsWithSort", tutorialControllers.paginationsWithSort);
  router.get("/findAllWhereMultiplayFields", tutorialControllers.findAllWhereMultiplayFields);


  router.get(
    "/findAllWhereTwoFields",
    tutorialControllers.findAllWhereTwoFields,
  );

  app.use("/api/tutorial", router);
};
