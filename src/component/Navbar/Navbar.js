// import React, { useContext, useState } from "react";
// import styles from "./Navbar.module.css";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Button from "react-bootstrap/Button";
// import Navbar from "react-bootstrap/Navbar";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartShopping, faCartPlus } from "@fortawesome/free-solid-svg-icons";
// import {
//   faFacebook,
//   faTwitter,
//   faInstagram,
//   faLinkedin,
//   faYoutube,
//   faWhatsapp,
// } from "@fortawesome/free-brands-svg-icons";
// import { Link, useNavigate } from "react-router-dom";
// import { StoryContext } from "../../Context/CounterContext";

// const Navbars = () => {
//   const { UserToken, setUserToken, UserRole } = useContext(StoryContext);
//   const navigate = useNavigate();
//   const [expanded, setExpanded] = useState(false);

//   function logOut() {
//     localStorage.removeItem("UserToken");
//     localStorage.removeItem("RoleUser");
//     setUserToken(null);
//     setExpanded(false);
//     navigate("/login");
//   }

//   const closeMenu = () => setExpanded(false);

//   return (
//     <Navbar
//       className="bg-dark"
//       data-bs-theme="dark"
//       expand="md"
//       collapseOnSelect
//       sticky="top"
//       expanded={expanded}
//       onToggle={setExpanded}
//     >
//       <Container>
//         <Navbar.Brand className="d-flex align-items-center gap-2">
//           <FontAwesomeIcon
//             icon={faCartShopping}
//             className="Cart_Icon text-white"
//           />
//           <h4 className="m-0 text-white">FreshCart</h4>
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse
//           id="basic-navbar-nav"
//           className="justify-content-between w-100"
//         >
//           {UserToken && (
//             <Nav className="d-flex gap-3 flex-column flex-md-row me-auto mb-3 mb-md-0">
//               <Link to="/" onClick={closeMenu} className={styles.navlinkcustom}>
//                 Home
//               </Link>
//               <Link
//                 to="/brands"
//                 onClick={closeMenu}
//                 className={styles.navlinkcustom}
//               >
//                 Brands
//               </Link>
//               <Link
//                 to="/GetAllOrder"
//                 onClick={closeMenu}
//                 className={styles.navlinkcustom}
//               >
//                 My Order
//               </Link>
//               {UserRole === "admin" && (
//                 <Link
//                   to="/Admin"
//                   onClick={closeMenu}
//                   className={styles.navlinkcustom}
//                 >
//                   My Admin
//                 </Link>
//               )}
//             </Nav>
//           )}

//           <Nav className="d-flex flex-column flex-md-row align-items-center gap-3 text-center ms-md-auto">
//             {/* Social Icons */}
//             <div className="d-flex gap-2 justify-content-center mb-2 mb-md-0">
//               {[
//                 faFacebook,
//                 faTwitter,
//                 faInstagram,
//                 faLinkedin,
//                 faYoutube,
//                 faWhatsapp,
//               ].map((icon, idx) => (
//                 <a
//                   key={idx}
//                   href="#!"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={styles.socialicon}
//                 >
//                   <FontAwesomeIcon icon={icon} className="fs-6" />
//                 </a>
//               ))}
//             </div>

//             {/* Cart */}
//             {UserToken && (
//               <Link to="/Cart" onClick={closeMenu} className="text-white">
//                 <FontAwesomeIcon
//                   icon={faCartPlus}
//                   style={{ fontSize: "1.7rem" }}
//                 />
//               </Link>
//             )}

//             {/* Auth Buttons */}
//             <div className="d-flex flex-column flex-md-row gap-2 align-items-center">
//               {UserToken ? (
//                 <Button
//                   type="button"
//                   variant="link" // عشان يخلي الزر شكل رابط نصي
//                   size="lg"
//                   onClick={logOut}
//                   className="text-white px-3 py-1"
//                   style={{ textDecoration: "none" }} // لو مش عايز underline
//                 >
//                   Log Out
//                 </Button>
//               ) : (
//                 <>
//                   <Link
//                     to="/Register"
//                     onClick={closeMenu}
//                     className="text-decoration-none"
//                   >
//                     <p className="m-0 text-white">Register</p>
//                   </Link>
//                   <Link
//                     to="/Login"
//                     onClick={closeMenu}
//                     className="text-decoration-none"
//                   >
//                     <p className="m-0 text-white">Login</p>
//                   </Link>
//                 </>
//               )}
//             </div>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Navbars;
// ________________________________________________________________________________________________

import React, { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCartPlus } from "@fortawesome/free-solid-svg-icons";

import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { StoryContext } from "../../Context/CounterContext";

const Navbars = () => {
  
  const { UserToken, setUserToken, UserRole } = useContext(StoryContext);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  function logOut() {
    localStorage.removeItem("UserToken");
    localStorage.removeItem("RoleUser");
    setUserToken(null);
    setExpanded(false);
    navigate("/login");
  }

  const closeMenu = () => setExpanded(false);
  const isAdmin = UserRole?.toLowerCase() === "admin"; 

  return (
    <Navbar
      className="bg-dark"
      data-bs-theme="dark"
      expand="md"
      collapseOnSelect
      sticky="top"
      expanded={expanded}
      onToggle={(isExpanded) => setExpanded(isExpanded)} // ✅ تصحيح هذا السطر
    >
      <Container>
        <Navbar.Brand className="d-flex align-items-center gap-2">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="Cart_Icon text-white"
          />
          <h4 className="m-0 text-white">FreshCart</h4>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between w-100"
        >
          {UserToken && (
            <Nav className="d-flex gap-3 flex-column flex-md-row me-auto mb-3 mb-md-0">
              <Link to="/" onClick={closeMenu} className={styles.navlinkcustom}>
                Home
              </Link>
              <Link
                to="/brands"
                onClick={closeMenu}
                className={styles.navlinkcustom}
              >
                Brands
              </Link>
              <Link
                to="/GetAllOrder"
                onClick={closeMenu}
                className={styles.navlinkcustom}
              >
                My Order
              </Link>
              {isAdmin && (
                <Link
                  to="/Admin"
                  onClick={closeMenu}
                  className={styles.navlinkcustom}
                >
                  My Admin
                </Link>
              )}
            </Nav>
          )}

          <Nav className="d-flex flex-column flex-md-row align-items-center gap-3 text-center ms-md-auto">
            {/* Social Icons */}
            {/* <div className="d-flex gap-2 justify-content-center mb-2 mb-md-0">
              {[
                faFacebook,
                faTwitter,
                faInstagram,
                faLinkedin,
                faYoutube,
                faWhatsapp,
              ].map((icon, idx) => (
                <a
                  key={idx}
                  href="#!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialicon}
                >
                  <FontAwesomeIcon icon={icon} className="fs-6" />
                </a>
              ))}
            </div> */}

            {/* Cart */}
            {UserToken && (
              <Link to="/Cart" onClick={closeMenu} className="text-white">
                <FontAwesomeIcon
                  icon={faCartPlus}
                  style={{ fontSize: "1.7rem" }}
                />
              </Link>
            )}

            {/* Auth Buttons */}
            <div className="d-flex flex-column flex-md-row gap-2 align-items-center">
              {UserToken ? (
                <Button
                  type="button"
                  variant="link"
                  size="lg"
                  onClick={logOut}
                  className="text-white px-3 py-1"
                  style={{ textDecoration: "none" }}
                >
                  Log Out
                </Button>
              ) : (
                <>
                  <Link
                    to="/Register"
                    onClick={closeMenu}
                    className="text-decoration-none"
                  >
                    <p className="m-0 text-white">Register</p>
                  </Link>
                  <Link
                    to="/Login"
                    onClick={closeMenu}
                    className="text-decoration-none"
                  >
                    <p className="m-0 text-white">Login</p>
                  </Link>
                </>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
