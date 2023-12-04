"use client";

import Link from "next/link";
import Logo from "../../images/logo.png";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useEffect, useState } from "react";

function Header() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      <header className="header">
        <nav>
          <div>
            <Link href="/">
              <Image
                src={Logo.src}
                alt="Logo du Blog BJ-Treklife"
                className="logo"
                width={50}
                height={50}
              />
            </Link>
            <h1 className="visually-hidden">bj-treklife</h1>
          </div>
          <div className="rightPanel">
            <Link href="/randonnee-trekking">Randonnée & Trekking</Link>
            <Link href="/reviews-materiel">Tests & Avis Matériel</Link>
            <Link href="/a-propos">A Propos</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            {token ? (
              <Link href="/dashboard">Dashboard</Link>
            ) : (
              <Link href="/login">
                <span className="visually-hidden">Se connecter</span>
                <FontAwesomeIcon icon={faUser} />
              </Link>
            )}
          </div>
        </nav>
      </header>
      <HamburgerMenu />
    </>
  );
}

export default Header;
