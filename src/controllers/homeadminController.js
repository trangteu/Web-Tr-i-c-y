const {
    getAllSP,
    updateUserById,
    getUserId,
    deleteUserById

} = require("../services/CRUDDoAn")

const connection = require("../config/database") 

const AdminHome = (req, res) => {
    res.render("Admin/adminhome.ejs")

}

const QuanLyTraiCay = (req, res) => {
    res.render("Admin/quanlytraicay.ejs")

}

const ThemTraiCay = (req, res) => {
    res.render("Admin/themtraicay.ejs")

}

const hienThiSP_TrangQL = async (req, res) => {

    let allSP = await getAllSP()

    res.render("Admin/quanlytraicay.ejs", {QLSP: allSP})
}

const themMoiSP = async (req, res) => {
    
    let Ten = req.body.tenSP
    let Gia = req.body.giaSP
    let Mota = req.body.mota
    let Img = req.body.hinhanh
    let IdLoaiSP = req.body.IdLoaiSP


    let [results, fields] = await connection.query(
        `
            INSERT INTO SanPham (Ten, Gia, MoTa, Anh, IDLoaiSanPham)
            VALUES (?, ?, ?, ?, ?)
        `,
        [Ten, Gia, Mota, Img, IdLoaiSP]
    )
    
    res.redirect("/homeAdmin-quanlytraicay")
}

// lay id cua sp de update
const getIDSp_Edit = async (req, res) => {

    const idEdit = req.query.idEDIT 

    let EditID = await getUserId(idEdit)

    res.render("Admin/chinhsuatraicay.ejs", {editID: EditID})

}

// ham nay de update lai sp vua edit
const postUpdateSP = async (req, res) => {

    let idSP = req.body.idSP
    let Ten = req.body.tenSP
    let Gia = req.body.giaSP
    let Mota = req.body.mota
    let Img = req.body.hinhanh
    let IdLoaiSP = req.body.IdLoaiSP


    await updateUserById(Ten, Gia, Mota, Img, IdLoaiSP, idSP )

    res.redirect("/homeAdmin-quanlytraicay")
}

// lay id de xac nhan xoa sp
const postDeleteUser = async (req, res) => {
    const spId = req.query.idDelete

    let sp = await getUserId(spId)

    res.render("Admin/xoatraicay", {spDelete: sp})
}

// xoa sp
// const postHandleRemoveUser = async (req, res) => {
//     let id = req.body.idSPDelete

//     await deleteUserById(id)

//    // res.send("xóa thành công")
//     res.redirect("/homeAdmin-quanlytraicay")
// }

const postHandleRemoveUser = async (req, res) => {
    // try {
    //     let id = req.body.idSPDelete;

    //     console.log("id xóa: ", id);

    //     // Attempt to delete the user by ID
    //     await deleteUserById(id);

    //     // If the deletion is successful, send a success response
    //     res.send("xóa ok");
    // } catch (error) {
    //     // If an error occurs during the deletion process, handle it here
    //     console.error("Error deleting user:", error);
    //     res.status(500).send("Internal Server Error"); // You can customize the error response as needed
    // }

    let id = req.body.idSPDelete;

    console.log("id xóa: ", id);

        // Attempt to delete the user by ID
    await deleteUserById(id);

        // If the deletion is successful, send a success response
    res.redirect("/homeAdmin-quanlytraicay")
}


module.exports = {
    AdminHome,
    QuanLyTraiCay,
    hienThiSP_TrangQL,
    ThemTraiCay,
    themMoiSP,
    postUpdateSP,
    getIDSp_Edit,
    postDeleteUser,
    postHandleRemoveUser
    
    
}