import React, { useEffect, useState } from "react";
import logo from "../../assets/netflix_logo.png";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";
import "./Nav.scss";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigation(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  // navigate to movie or tv
  const navigationHandler = (type) => {
    if (type === "movie") {
      navigation("/explore/movie");
    } else {
      navigation("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <Wrapper>
        <div className='logo' onClick={() => navigation("/")}>
          <img src={logo} alt='' />
        </div>
        <ul className='menuItems'>
          <li className='menuItem' onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className='menuItem' onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className='menuItem'>
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className='mobileMenuItems'>
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </Wrapper>

      {/* when show searchBar true  show*/}
      {showSearch && (
        <div className='searchBar'>
          <Wrapper>
            <div className='searchInput'>
              <input
                type='text'
                placeholder='Search for a movie or tv show....'
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </Wrapper>
        </div>
      )}
    </header>
  );
};

export default Header;