const {
    getAllSP,
    getAllTrong_Ngoai_Nuoc
} = require("../services/CRUDDoAn")


const homeTrangChu = (req, res) => {
    res.render("TrangChu/home.ejs")
}

const getHomePage = async (req, res) => {
    var sessions = req.session;
    let loggedIn = sessions.loggedIn
    // Hàm để định dạng số tiền thành chuỗi có ký tự VND
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
    let allSP = await getAllSP()                        // lấy dữ liệu tất cả sản phẩm 
    let allTrongNuoc = await getAllTrong_Ngoai_Nuoc(1)  // lấy dữ liệu tất cả sản phẩm là trong nuoc
    let allNgoaiNuoc = await getAllTrong_Ngoai_Nuoc(2)  // lấy dữ liệu tất cả sản phẩm là ngoai nuoc
    return res.render("TrangChu/home.ejs", {
        listSP: allSP, listTC: allTrongNuoc, listNC: allNgoaiNuoc, logIn: loggedIn,formatCurrency:formatCurrency })
}





module.exports = {
    homeTrangChu,
    getHomePage
}