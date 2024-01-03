const express = require('express');
const {    
    homeTrangChu,
    getHomePage
} = require('../controllers/homeController');

const {    
    hienthiTK,
    TrangTimKiem_post
} = require('../controllers/searchController');

const {    
    CTSanPham,
    getChiTietSP
} = require('../controllers/CTSanPhamController');

const {    
    AdminHome,
    QuanLyTraiCay,
    hienThiSP_TrangQL,
    ThemTraiCay,
    themMoiSP,
    getIDSp_Edit,
    postUpdateSP,
    postDeleteUser,
    postHandleRemoveUser
} = require('../controllers/homeadminController');

const {    
    loginHomeKH,
    dangKyKHForm,
    dangNhapKH,
    dangKyKH,
    dangXuat
} = require('../controllers/dangNhapKHController');

const {    
    dangNhapAdmin,  dangXuatAdmin, loginHomeAdmin
} = require('../controllers/dangNhapAdminController');

const router = express.Router();

// -----------------------------------------------


router.get('/', getHomePage)
router.get('/homeAdmin', AdminHome)
router.get('/loginAdmin', loginHomeAdmin)
router.post('/loginAdmin', dangNhapAdmin)
router.get('/dxuatAdmin', dangXuatAdmin)

// hien thi form 
router.get('/loginKH', loginHomeKH)
router.get('/dang-ky-KH', dangKyKHForm)
router.post('/loginKH', dangNhapKH)
router.post('/dang-ky-KH', dangKyKH)
router.get('/dangxuat', dangXuat)

router.get('/homeAdmin-quanlytraicay', hienThiSP_TrangQL)


router.get('/timkiem', hienthiTK)
router.get('/ctsp', CTSanPham)
router.post('/search-post', TrangTimKiem_post)
router.get('/chitietsp', getChiTietSP)

// hien thi form de them san pham
router.get('/homeAdmin-themtraicay', ThemTraiCay)
// xu ly them sp
router.post('/insert-sp', themMoiSP)


// xu ly lay id edit
router.get('/edit-sp', getIDSp_Edit)

// xu ly save sp
router.post('/edit-sp', postUpdateSP)


// lay ra id can xoa
router.post('/layIDXoaSP/', postDeleteUser)
// xu ly xoa sp
router.post('/xoaSP/', postHandleRemoveUser)



module.exports = router;
