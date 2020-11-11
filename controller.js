"use strict";

var response = require("./res");
var connection = require("./connection");

exports.index = function (req, res) {
  response.oke("REST API WORK", res);
};

// GET ROUTE
exports.getAllData = function (req, res) {
  connection.query("SELECT * FROM mahasiswa", function (error, rows, field) {
    if (error) {
      console.log(error);
    } else {
      response.oke(rows, res);
    }
  });
};

exports.gettDataById = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM mahasiswa WHERE id_mahasiswa = ?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.oke(rows, res);
      }
    }
  );
};

// ADD DATA
exports.addData = function (req, res) {
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;

  connection.query(
    "INSERT INTO mahasiswa  (nim, nama, jurusan) VALUES (?, ? , ?)",
    [nim, nama, jurusan],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.oke("INSERT BERHASIL", res);
      }
    }
  );
};

// Update Data
exports.updateData = function (req, res) {
  var id = req.params.id;
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;

  connection.query(
    "UPDATE mahasiswa SET nim = ? , nama = ? , jurusan = ? WHERE id_mahasiswa = ?",
    [nim, nama, jurusan, id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.oke("UPDATE BERHASIL", res);
      }
    }
  );
};

// Delete Data
exports.deleteData = function (req, res) {
  var id = req.params.id;

  connection.query(
    "DELETE FROM mahasiswa WHERE id_mahasiswa = ?",
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.oke("DELETE BERHASIL", res);
      }
    }
  );
};



// SHOW Matakuliah GROUP
exports.showGroupMatakuliah = function (req, res) {
  connection.query(
    "SELECT mhs.*, mtk.`matakuliah`, mtk.`sks` FROM krs k JOIN matakuliah mtk JOIN mahasiswa mhs WHERE k.`id_matakuliah` = mtk.`id_matakuliah` AND k.`id_mahasiswa` = mhs.`id_mahasiswa` ORDER BY mhs.`nama`",
    function (error, rows, fields) {
      if (error) { 
        console.log(error);
      } else {
        response.nested(rows, res);
      }
    }
  );
};
