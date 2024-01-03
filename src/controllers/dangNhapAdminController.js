const connection = require('../config/database');

// ---------------------------------------------------------------

const loginHomeAdmin = (req, res) => {
    res.render("Admin/adminLogin.ejs")
}

// đăng ký
const dangKyAdmin = async (req, res) => {
    let username = req.body.name;
    let password = req.body.pass;
    let email = req.body.email;
  
    if (username && password && email) {
        try {
            const [results, fields] = await connection.query('SELECT Email FROM NguoiDung WHERE Email = ?', [email])
            
            if (results.length > 0) {

                res.status(400).send('Tài khoản đã tồn tại!')

            } else {

                const [insertResults, insertFields] = await connection.query(
                    `INSERT INTO NguoiDung(Email, Ten, MatKhau) VALUES(?,?,?)`,
                    [email, username, password]
                )
    
                if (insertResults.affectedRows === 1) {
                    res.status(200).send('Đăng ký thành công!')

                } else {
                    res.status(500).send('Lỗi trong quá trình xử lý đăng ký.')
                }
            }

        } catch (error) {
            console.error("Lỗi truy vấn:", error)
            res.status(500).send('Lỗi trong quá trình xử lý đăng ký.')

        } finally {
            res.end()
        }

    } else {
        res.status(400).send('Hãy nhập tài khoản và mật khẩu!')
        res.end()
    }
}

// đăng nhập
const dangNhapAdmin = async (req, res) => {
    let userAdmin = req.body.userAdmin;
    let passwordAdmin = req.body.passwordAdmin;
    var sessions

    if (userAdmin && passwordAdmin) {
        try {
            const [results, fields] = await connection.query(
                `
                SELECT TaiKhoan, MatKhau, PhanQuyenID FROM NguoiDung WHERE TaiKhoan = ? AND MatKhau = ? AND PhanQuyenID = 1              
                `,  [userAdmin, passwordAdmin])

            if (results.length > 0) {
                // Authenticate the user
				req.session.loggedIn = true
				req.session.userAdmin = userAdmin
                sessions=req.session;


                res.redirect('/homeAdmin');
            } else {
                res.send('Tài khoản hoặc mật khẩu không chính xác!');
            }

        } catch (error) {
            console.error("Lỗi truy vấn:", error)
            res.status(500).send('Lỗi trong quá trình xử lý đăng ký.')

        } finally {
            res.end()
        }

    } else {
        res.status(400).send('Hãy nhập tài khoản và mật khẩu!')
        res.end()
    }
  
}

// dang xuat
const dangXuatAdmin = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error("Lỗi khi đăng xuất:", err);
        res.status(500).send('Lỗi khi đăng xuất');
      } else {
        res.redirect('/loginAdmin'); // Chuyển hướng về trang chính sau khi đăng xuất
      }
    });

    console.log(req.session.destroy());
}
  


module.exports = { 
    dangNhapAdmin,  dangXuatAdmin, loginHomeAdmin
}