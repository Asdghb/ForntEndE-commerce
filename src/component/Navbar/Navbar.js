import React, { useContext, useState } from "react";
import stayle from "./Navbar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { StoryContext } from "../../Context/CounterContext";

const Navbars = () => {
  // Context
  const { UserToken, setUserToken, UserRole } = useContext(StoryContext);

  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("UserToken");
    localStorage.removeItem("RoleUser");
    setUserToken(null);
    navigate("/login");
  }

  return (
    // <Navbar className="bg-dark" data-bs-theme="dark" >
    //   <Container>
    //     <Navbar.Brand className="d-flex align-items-center gap-2 ">
    //       <FontAwesomeIcon icon={faCartShopping} className="Cart_Icon" />
    //       <h4 className="m-0">FreshCart</h4>
    //     </Navbar.Brand>

    //     {UserToken != null ? (
    //       <Nav className="me-auto d-flex gap-3">
    //         <Link to="/" className={stayle.navlinkcustom}>
    //           Home
    //         </Link>
    //         <Link to="/brands" className={stayle.navlinkcustom}>
    //           Brands
    //         </Link>
    //         <Link to="/GetAllOrder" className={stayle.navlinkcustom}>
    //           My Order
    //         </Link>
    //         {UserRole === "admin" ? (
    //           <Link to="/Admin" className={stayle.navlinkcustom}>
    //             My Admin
    //           </Link>
    //         ) : (
    //           ""
    //         )}
    //       </Nav>
    //     ) : (
    //       ""
    //     )}

    //     <Nav className="d-flex align-items-center gap-4 Nav2">
    //       {/* Social Media Icons */}
    //       <div className="d-flex gap-2">
    //         <a
    //           href="https://facebook.com"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           <FontAwesomeIcon
    //             icon={faFacebook}
    //             className={`text-primary fs-6 ${stayle.socialicon}`}
    //           />
    //         </a>
    //         <a
    //           href="https://twitter.com"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           <FontAwesomeIcon
    //             icon={faTwitter}
    //             className={`text-info fs-6 ${stayle.socialicon}`}
    //           />
    //         </a>
    //         <a
    //           href="https://instagram.com"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           <FontAwesomeIcon
    //             icon={faInstagram}
    //             className={`text-danger fs-6 ${stayle.socialicon}`}
    //           />
    //         </a>
    //         <a
    //           href="https://linkedin.com"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           <FontAwesomeIcon
    //             icon={faLinkedin}
    //             className={`text-primary fs-6 ${stayle.socialicon} `}
    //           />
    //         </a>
    //         <a
    //           href="https://youtube.com"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           <FontAwesomeIcon
    //             icon={faYoutube}
    //             className={`text-danger fs-6 ${stayle.socialicon}`}
    //           />
    //         </a>
    //         <a
    //           href="https://wa.me/123456789"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           <FontAwesomeIcon
    //             icon={faWhatsapp}
    //             className={`text-success fs-6 ${stayle.socialicon} `}
    //           />
    //         </a>
    //       </div>

    //       {UserToken != null ? (
    //         <Link to={"/Cart"}>
    //           <FontAwesomeIcon icon={faCartPlus} className="text-white fs-6" />
    //         </Link>
    //       ) : (
    //         ""
    //       )}

    //       {/* Auth Buttons */}
    //       <div className="d-flex gap-3">
    //         {UserToken != null ? (
    //           <Button
    //             type="button"
    //             variant="link"
    //             className="text-white p-0 m-0 LogOut-p text-decoration-none"
    //             onClick={logOut}
    //           >
    //             LogOut
    //           </Button>
    //         ) : (
    //           <>
    //             <Link to={"/Register"} className="text-decoration-none">
    //               <p className="Nva2-p m-0 text-white">Register</p>
    //             </Link>
    //             <Link to={"/Login"} className="text-decoration-none">
    //               <p onClick={logOut} className="Nva2-p m-0 text-white">
    //                 Login
    //               </p>
    //             </Link>{" "}
    //           </>
    //         )}
    //       </div>
    //     </Nav>
    //   </Container>
    // </Navbar>
    <Navbar className="bg-dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand className="d-flex align-items-center gap-2">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="Cart_Icon text-white"
          />
          <h4 className="m-0 text-white">FreshCart</h4>
        </Navbar.Brand>

        {UserToken && (
          <Nav className="me-auto d-flex gap-3">
            <Link to="/" className={stayle.navlinkcustom}>
              Home
            </Link>
            <Link to="/brands" className={stayle.navlinkcustom}>
              Brands
            </Link>
            <Link to="/GetAllOrder" className={stayle.navlinkcustom}>
              My Order
            </Link>
            {UserRole === "admin" && (
              <Link to="/Admin" className={stayle.navlinkcustom}>
                My Admin
              </Link>
            )}
          </Nav>
        )}

        <Nav className="d-flex align-items-center gap-4 Nav2">
          {/* Social Media Icons */}
          <div className="d-flex gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className={`text-primary fs-6 ${stayle.socialicon}`}
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className={`text-info fs-6 ${stayle.socialicon}`}
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className={`text-danger fs-6 ${stayle.socialicon}`}
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className={`text-primary fs-6 ${stayle.socialicon}`}
              />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faYoutube}
                className={`text-danger fs-6 ${stayle.socialicon}`}
              />
            </a>
            <a
              href="https://wa.me/123456789"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                className={`text-success fs-6 ${stayle.socialicon}`}
              />
            </a>
          </div>

          {UserToken && (
            <Link to="/Cart">
              <FontAwesomeIcon icon={faCartPlus} className="text-white fs-6" />
            </Link>
          )}

          {/* Auth Buttons */}
          <div className="d-flex gap-3">
            {UserToken ? (
              <Button
                type="button"
                variant="link"
                className="text-white p-0 m-0 LogOut-p text-decoration-none"
                onClick={logOut}
              >
                LogOut
              </Button>
            ) : (
              <>
                <Link to="/Register" className="text-decoration-none">
                  <p className="Nva2-p m-0 text-white">Register</p>
                </Link>
                <Link to="/Login" className="text-decoration-none">
                  <p className="Nva2-p m-0 text-white">Login</p>
                </Link>
              </>
            )}
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navbars;
