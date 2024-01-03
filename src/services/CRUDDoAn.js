const connection = require("../config/database") 

// hiển thị ra tất cả sp
const getAllSP = async () => {
    let [results, fields] = await connection.query("select * from SanPham")
    return results
}

// hiển thị ra sp nam/nữ 
const getAllTrong_Ngoai_Nuoc = async (IDLoaiSanPham) => {
    let [results, fields] = await connection.query(
        `select * from SanPham where IDLoaiSanPham = ?`
        ,
        [IDLoaiSanPham]
    )
    return results
}

// chức năng search sản phẩm
const getSPSearch = async (tensp) => {
    let [results, fields] = await connection.query(
        `
            select * from SanPham where Ten like ?
        `
        ,
        [`%${tensp}%`]
    )
    return results
}

// lấy id sp khi click
const getUserId = async (spID) => {
    let [results, fields] = await connection.query(
        `select * from SanPham where ID = ?`,
        [spID]
    )

    console.log("check kq: ", results);

    let IDCuaSP = results && results.length > 0 ? results[0] : {}

    return IDCuaSP
}

const hienThiSP_TrangQL = async (req, res) => {

    let allSP = await getAllSP()

    console.log(allSP);

    res.render("TrangAdmin/quanlySanPham.ejs", {QLSP: allSP, logIn: loggedIn, email})
}

// update san pham (Ten, Gia, MoTa, Anh, IDLoaiSanPham)
const updateUserById = async (Ten, Gia, MoTa, Anh, IDLoaiSanPham, ID) => {
    let [results, fields] = await connection.query(
        `
            UPDATE SanPham
            SET Ten = ?, Gia = ?, MoTa = ?, Anh = ?, IDLoaiSanPham = ?
            WHERE ID = ?
        `,
        [Ten, Gia, MoTa, Anh, IDLoaiSanPham, ID]
    )
}

// xoa san pham
const deleteUserById = async (ID) => {

    let [results, fields] = await connection.query(
        `
            DELETE FROM SanPham WHERE ID = ?
        `,
        [ID]
    )
}

module.exports = {
    getAllSP,
    getAllTrong_Ngoai_Nuoc,
    getSPSearch,
    getUserId,
    hienThiSP_TrangQL,
    updateUserById,
    deleteUserById


}