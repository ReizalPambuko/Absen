const fs = require("fs");

//cek ada foldernyanya tidak
const filesFolder = "./data";
if (!fs.existsSync(filesFolder)) {
  fs.mkdirSync(filesFolder);
}
//cek jika tidak ad file
const files = "./data/hadir.json";
if (!fs.existsSync(files)) {
  fs.writeFileSync(files, "[]", "utf-8");
}
//cari data Contact json
const loadHadirs = () => {
  const hadirs = fs.readFileSync("./data/hadir.json", "utf-8");
  return JSON.parse(hadirs);
};

const saveMurid = (nama) => {
  fs.writeFileSync("./data/hadir.json", JSON.stringify(nama));
};

const muridDetail = (nama) => {
  const murids = loadHadirs();
  return murids.find((murid) => murid.nama === nama);
};

const setDuplikat = (nama) => {
  const murid = loadHadirs();
  murid.find((murids) => murids.nama === nama);
};

const tambahMurid = (namaBaru) => {
  const murids = loadHadirs();
  murids.push(namaBaru);
  saveMurid(murids);
};

const hapusMurid = (nama) => {
  const murids = loadHadirs();
  const deletes = murids.filter((murid) => murid.nama !== nama);
  saveMurid(deletes);
};

module.exports = {
  loadHadirs,
  muridDetail,
  setDuplikat,
  tambahMurid,
  hapusMurid,
};
