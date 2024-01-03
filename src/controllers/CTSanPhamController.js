const {
    getUserId,
    getAllSP
} = require("../services/CRUDDoAn")


const CTSanPham = (req, res) => {
    res.render("TrangChu/CTSanPham.ejs")

}

const getChiTietSP = async (req, res) => {
    const spID = req.query.idChiTietSP

    let sanpam = await getUserId(spID)

    let allSPCT = await getAllSP()            // lấy dữ liệu tất cả sản phẩm 

    res.render("TrangChu/CTSanPham.ejs", {CTSanPham: sanpam, listSP: allSPCT})
}


module.exports = {
    CTSanPham,
    getChiTietSP
}