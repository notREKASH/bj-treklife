"use client";

import Link from "next/link";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useEffect } from "react";
import { updateIsAuth } from "@/app/redux/actions/auth.action";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth?.isAuth);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!isAuth && token) {
      dispatch(updateIsAuth(token));
    }
  }, [isAuth, dispatch]);

  return (
    <>
      <header className="header">
        <nav>
          <div>
            <Link href="/">
              <Image
                src="/images/logo.webp"
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
            {isAuth ? (
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
