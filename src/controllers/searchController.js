const connection = require('../config/database');
const {
    getSPSearch
} = require("../services/CRUDDoAn")

// ---------------------------------------------------------------

const hienthiTK = (req, res) => {
   
    res.render("TrangChu/search.ejs")
}


// tìm kiếm sp
const TrangTimKiem_post = async (req, res) => {

    let tenSP = req.body.searchSP

    let timkiemSp = await getSPSearch(tenSP)

    console.log(tenSP);

    //res.redirect("TrangChu/timKiem.ejs")
    res.render("TrangChu/search.ejs", {listSearch: timkiemSp})
}






module.exports = {
    TrangTimKiem_post,
    hienthiTK
}