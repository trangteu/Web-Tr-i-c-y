const connection = require('../config/database');

// ---------------------------------------------------------------

const loginHomeKH = (req, res) => {
    res.render("TrangChu/adminLogin.ejs")
}

const dangKyKHForm = (req, res) => {
    res.render("TrangChu/DangKy.ejs")
}

// đăng ký
const dangKyKH = async (req, res) => {
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
const dangNhapKH = async (req, res) => {
    let email = req.body.email;
    let password = req.body.matkhau;
    var sessions

    if (email && password) {
        try {
            const [results, fields] = await connection.query('SELECT Email, MatKhau FROM NguoiDung WHERE Email = ? AND MatKhau = ? ',  [email, password])
            
            if (results.length > 0) {
                // Authenticate the user
				req.session.loggedIn = true
				req.session.account = email

                sessions=req.session;
                console.log(sessions);
                //res.cookie('user_account', req.session.account);
                // req.flash('success', 'Đăng nhập thành công')
                // res.locals.message = req.flash();
				//res.redirect('/');
                //res.send('thành công');
                //req.flash('success', 'Đăng nhập thành công')
                res.redirect('/');
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
const dangXuat = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error("Lỗi khi đăng xuất:", err);
        res.status(500).send('Lỗi khi đăng xuất');
      } else {
        res.redirect('/'); // Chuyển hướng về trang chính sau khi đăng xuất
      }
    });

    console.log(req.session.destroy());
}
  


module.exports = {
    loginHomeKH,
    dangKyKH,
    dangNhapKH,
    dangXuat,
    dangKyKHForm
}