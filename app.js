const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
const {
  loadHadirs,
  muridDetail,
  setDuplikat,
  tambahMurid,
  hapusMurid,
} = require("./utills/index");
const { body } = require("express-validator");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const murid = loadHadirs();
  res.render("index", {
    layout: "layouts/main-layout",
    title: "Home",
    murid,
  });
});

//proses menambahkan kehadiran murid
app.post(
  "/hadir",
  [
    body("nama").custom((value) => {
      const duplikat = setDuplikat(value);
      if (duplikat) {
        throw new Error("Nama Telah digunakan");
      }
    }),
  ],
  (req, res) => {
    tambahMurid(req.body);
    res.redirect("/");
  }
);

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "About",
  });
});

//Menghapus murid
app.get("/delete/:nama", (req, res) => {
  const murid = hapusMurid(req.params.nama);
  if (!murid) {
    console.log("berhasil dihapus");
    res.redirect("/");
  }
});

//detail murid
app.get("/detail/:nama", (req, res) => {
  const murid = muridDetail(req.params.nama);
  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Detail",
    murid,
  });
});

//form input
app.get("/absen/add", (req, res) => {
  res.render("absensi", {
    layout: "layouts/main-layout",
    title: "Absensi",
  });
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
