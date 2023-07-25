import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./AdminLayout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { alertSuccess, warningSignout } from "../../apis/sweetAlert2";
import { signout } from "../../slices/userSlice";

function AdminLayout() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignout = () => {
    warningSignout()
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(signout());
          localStorage.removeItem("user");
          alertSuccess("Bạn đã đăng xuất thành công!");
        }
      })
      .catch((error) => console.log(error));
  };
  // state dùng để set class active
  const [activeUser, setActiveUser] = useState(false);
  const [activeMovie, setActiveMovie] = useState(false);

  return (
    <div className={styles.theme}>
      <div className="d-flex">
        <div className={`col-sm-2 text-center ${styles.background}`}>
          <a onClick={() => navigate("/")}>
            <img
              className={styles.logo} style={{padding: "0", margin: "auto", position: "relative", top: "44px"}}
              src="https://img.freepik.com/premium-vector/click-movie-logo-vector_18099-258.jpg"
              alt=""
            />
          </a>

          <button
            className={`${styles.user} btn ${
              activeUser ? styles.activeClass : "null"
            }`}
            onClick={() => {
              setActiveUser(true);
              setActiveMovie(false);
              navigate("/admin");
            }}
          >
            <i className="fa-solid fa-user me-2 mt-5"></i>
            Quản lí người dùng
          </button>
          <button
            className={`${styles.movie} btn ${
              activeMovie ? styles.activeClass : "null"
            }`}
            onClick={() => {
              setActiveUser(false);
              setActiveMovie(true);
              navigate("admin/films");
            }}
          >
            <i className="fa-solid fa-film me-2"></i>
            Quản lí Phim
          </button>
        </div>
        <div className="col-sm-10 bg-light px-3 rounded">
          <div className="d-flex justify-content-between me-3">
            <p
              className={`${styles.backToHome} mt-3 ms-2`}
              onClick={() => navigate("/")}
            >
              <i className="fa-solid fa-house"></i> Home
            </p>
            <div className="d-flex justify-content-end me-3">
              <img
                className={styles.avatarUser}
                src="https://png.pngtree.com/png-vector/20190629/ourmid/pngtree-office-work-user-icon-avatar-png-image_1527655.jpg"
                alt={user.taiKhoan}
              />
              <span className={styles.accountUser}>{user.taiKhoan}</span>
              <p
                className={`${styles.userLogOut} mt-3 ms-2`}
                onClick={handleSignout}
              >
                <i className="fa-solid fa-arrow-right-from-bracket mt-2 me-2"></i>
                <span>Đăng xuất</span>
              </p>
            </div>
          </div>
          <div className="bg-white mt-2 pt-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
