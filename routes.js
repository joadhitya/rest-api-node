"use strict";

module.exports = function (app) {
  var json = require("./controller");
  app.route("/").get(json.index);

  app.route("/getMahasiswa").get(json.getAllData);
  app.route("/getMahasiswa/:id").get(json.gettDataById);
  app.route("/addData").post(json.addData);
  app.route("/updateData/:id").put(json.updateData);
  app.route("/deleteData/:id").delete(json.deleteData);

  // NESTED DATA
  app.route("/showGroupMatakuliah").get(json.showGroupMatakuliah);
};
