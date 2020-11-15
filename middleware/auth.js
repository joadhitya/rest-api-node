var connection = require("../connection");
var mysql = require("mysql");
var md5 = require("md5");
var response = require("../res");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");
var ip = require("ip");
var nodemailer = require("nodemailer");

let smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "joadhityah73@gmail.com",
    pass: "qtpynrzngzlorikb",
  },
});

var rand, mailOptions, host, link;

exports.verificationEmail = function (req, res) {
  if (req.protocol + "://" + req.get("host") == "http://" + host) {
    if (req.query.id == rand) {
      connection.query(
        "UPDATE user SET isVerified=? WHERE email=?",
        [1, mailOptions.to],
        function (error, rows, fields) {
          if (error) {
            console.log(error);
            res.end(error);
          } else {
            res.end("<h1>Your Email " + mailOptions.to + " have been verified");
          }
        }
      );
    } else {
      res.end("<h1>Your email " + mailOptions.to + " not verified");
    }
  }
};

// REGISTER CONTROLLER
exports.register = function (req, res) {
  var post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: 3,
    tanggal_daftar: new Date(),
    isVerified: 0,
  };
  var query = "SELECT email FROM ?? WHERE ?? = ?";
  var table = ["user", "email", post.email];
  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 0) {
        var query = "INSERT INTO ?? SET ?";
        var table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, post, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            rand = Math.floor(Math.random() * 100 + 54);
            host = "localhost:5000";
            link = "http://" + host + "/auth/verify?id=" + rand;
            mailOptions = {
              to: post.email,
              subject: "Email Verficiation!",
              html:
                "Hallo, <br> Please click the link to verified your email <br>" +
                "<a href=" +
                link +
                ">Click here!</a>",
            };

            smtpTransport.sendMail(mailOptions, function (error, response) {
              if (error) {
                console.log(error);
                res
                  .json({
                    success: false,
                    isRegistered: false,
                    message: "Verification Email Submitted",
                  })
                  .end();
              } else {
                res
                  .json({
                    success: true,
                    isRegistered: false,
                    message: "Verification Email Error",
                  })
                  .end();
              }
            });
          }
        });
      } else {
        res
        .json({
          success: true,
          isRegistered: true,
          message: "Email Already Exist",
        })
        .end();
        // response.oke("Email Already Exist", res);
      }
    }
  });
};

// LOGIN
exports.login = function (req, res) {
  var post = {
    email: req.body.email,
    password: req.body.password,
  };

  var query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
  var table = ["user", "email", post.email, "password", md5(post.password)];

  query = mysql.format(query, table);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 1) {
        var token = jwt.sign({ rows }, config.secret, {
          expiresIn: 10000,
        });
        id_user = rows[0].id;
        username = rows[0].username;
        role = rows[0].role;

        var expired = 10000;
        var isVerified = rows[0].isVerified;
        var data = {
          id_user: id_user,
          access_token: token,
          ip_address: ip.address(),
        };

        var query = "INSERT INTO ?? SET ?";
        var table = ["akses_token"];

        query = mysql.format(query, table);
        connection.query(query, data, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              success: true,
              message: "Login Success",
              token: token,
              currUser: data.id_user,
              user: username,
              role: role,
              expires: expired,
              isVerified: isVerified,
            });
          }
        });
      } else {
        res.json({
          success: false,
          message: "Login Failed",
        });
      }
    }
  });
};

exports.secretPage = function (req, res) {
  response.oke("Secret Page for User Role 2", res);
};

exports.adminStudents = function (req, res) {
  connection.query("SELECT * FROM mahasiswa", function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.oke(rows, res);
    }
  });
};
