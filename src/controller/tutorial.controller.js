const db = require("../models");

const Tutorial = db.tutorial;

exports.create = (req, res) => {
  const { title, description, published } = req.body;
  if (title && description && published) {
    const tutorial = {
      title,
      description,
      published,
    };
    Tutorial.create(tutorial).then((result) => {
      res.send(result);
    });
  } else {
    res.send({
      message: `Create new task was failing, becouse body is empty. Please check the data you send.`,
    });
  }
};

exports.findAll = (req, res) => {
  Tutorial.findAll({
    order: ["id"],
  }).then((result) => {
    res.send(result);
  });
};

//задание 1 получение данных по полю и значению от клиента
exports.findAllWhere = (req, res) => {
  const title = req.query;
  for (const field in title) {
    if (Object.hasOwnProperty.call(title, field)) {
      const titleValue = title[field];

      Tutorial.findAll({ where: { [field]: titleValue } })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials.",
          });
        });
    } else {
      res.send({
        message: `check the data you sent.`,
      });
    }
  }
};

//задание 2 получение данных по нескольким полям
exports.findAllWhereTwoFields = (req, res) => {
  const { title, description } = req.query;
  if (body.hasOwnProperty("title") && body.hasOwnProperty("description")) {
    Tutorial.findAll({
      where: { title, description },
      order: ["id"],
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  } else {
    res.send({
      message: `make sure you submit two fields to match`,
    });
  }
};

//задание 3 создание сортировки функционалом sequelize
exports.sortAllEntries = (req, res) => {
  const { field, direction } = req.query;

  const condition = direction ? direction : "ASC";
  const conditionForField = field ? field : "id";

  Tutorial.findAll({
    order: [[conditionForField, condition]],
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while sorting records.",
      });
    });
};

//задание 4 реализовать пагинацию данных (получение данных по частям 1-10, 10-20, .....)

exports.findWithPaginations = (req, res) => {
  const { limit, offset } = req.query;

  const limitCheck = limit ? limit : null;
  const offsetCheck = offset ? offset : null;

  Tutorial.findAll({ limit: limitCheck, offset: offsetCheck, order: ["id"] })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while sorting records.",
      });
    });
};

//задание 5 реализовать сортировку (по полю и направлению) и пагинацию данных одновременно
exports.paginationsWithSort = (req, res) => {
  const { limit, offset, field, direction } = req.query;

  const limitCheck = limit ? limit : null;
  const offsetCheck = offset ? offset : null;
  const condition = direction ? direction : "ASC";
  const conditionForField = field ? field : "id";

  Tutorial.findAll({
    limit: limitCheck,
    offset: offsetCheck,
    order: [[conditionForField, condition]],
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "An error occurred while paginating and sorting records.",
      });
    });
};

//задание 6 получение всех записей, но у записи только несколько полей из всех предоставленных,
//например у поля есть поля: _id, text, age, description, owner, country => получить: _id, text, description

exports.findAllWhereMultiplayFields = (req, res) => {
  const { firstField, secondField } = req.query;
  if (firstField && secondField) {
    Tutorial.findAll({ attributes: [firstField, secondField] })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "An error occurred while getting records ​​by field.",
        });
      });
  } else {
    res.send({
      message: `send the names of the two fields you want to retrieve after the request is completed. in format:
      firstField: name field, secondField: name field `,
    });
  }
};
