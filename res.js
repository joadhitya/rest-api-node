"use strict";

const { response } = require("express");
const { createConnection } = require("mysql");

exports.oke = function (values, res) {
  var data = {
    status: 200,
    value: values,
  };

  res.json(data);
  res.end();
};

// RESPONSE NESTED DATA
exports.nested = function (values, res) {
  const hasil = values.reduce((accumulation, item) => {
    if (accumulation[item.nama]) {
      // CREATE VARIABLE GROUP
      const group = accumulation[item.nama];

      // CEK Matakuliah
      if (Array.isArray(group.matakuliah)) {
        // ADD VALUE TO GROUP
        group.matakuliah.push(item.matakuliah);
      } else {
        group.matakuliah = [group.matakuliah, item.matakuliah];
      }
    } else {
      accumulation[item.nama] = item;
    }

    return accumulation;
  }, {});
  var data = {
    status: 200,
    value: hasil,
  };

  res.json(data);
  res.end();
};