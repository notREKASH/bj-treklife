"use client";

import "./HamburgerMenu.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateIsAuth } from "@/app/redux/actions/auth.action";

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
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
      <header className="hamburgerMenu">
        <div className="hamburgerMenu__container">
          <Link href="/">
            <Image
              src="/images/logo.webp"
              alt="Logo du Blog BJ-Treklife"
              className="logo"
              width={50}
              height={50}
              onClick={(e) => setIsOpen(isOpen ? false : "")}
            />
          </Link>
          <h1 className="visually-hidden">bj-treklife</h1>
          <div
            className="hamburgerMenu__container__span show"
            onClick={() => setIsOpen(!isOpen)}>
            <svg className={isOpen ? "opened" : ""} viewBox="0 0 32 32">
              <path
                className="line line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
              <path className="line" d="M7 16 27 16"></path>
            </svg>
          </div>
        </div>
        <nav className={isOpen ? "active" : ""}>
          <ul>
            <li>
              <Link
                href="/randonnee-trekking"
                onClick={(e) => setIsOpen(!isOpen)}>
                Randonnée & Trekking
              </Link>
            </li>
            <li>
              <Link
                href="/reviews-materiel"
                onClick={(e) => setIsOpen(!isOpen)}>
                Tests & Avis Matériel
              </Link>
            </li>
            <li>
              <Link href="/a-propos" onClick={(e) => setIsOpen(!isOpen)}>
                A Propos
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={(e) => setIsOpen(!isOpen)}>
                Contact
              </Link>
            </li>
            <li>
              {isAuth ? (
                <Link href="/dashboard" onClick={(e) => setIsOpen(!isOpen)}>
                  Dashboard
                </Link>
              ) : (
                <Link href="/login" onClick={(e) => setIsOpen(!isOpen)}>
                  <span className="visually-hidden">Se connecter</span>
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default HamburgerMenu;
