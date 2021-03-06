import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header({ bare }) {
    const router = useRouter();
    const inquire_path = `${router.pathname}#Inquire`.replace(
        /\[.*?\]/,
        router.query.slug
    );

    React.useEffect(() => {
        const optionsSidenav = {
            edge: "left",
            draggable: true,
            inDuration: 250,
            outDuration: 200,
            onOpenStart: null,
            onOpenEnd: null,
            onCloseStart: null,
            onCloseEnd: null,
            preventScrolling: true,
        };

        const sidenavContainer = document.querySelector(".sidenav");
        window.M.Sidenav.init(sidenavContainer, optionsSidenav);
    }, []);

    return (
        <div className="Header">
            <header>
                <ul id="slide-out" className="sidenav">
                    <li>
                        <a
                            className="sidenav-close"
                            style={{ color: "#1E88E5" }}
                            href="#!"
                        >
                            CLOSE
                        </a>
                    </li>
                    <li>
                        <Link href="/#About">
                            <a className="sidenav-close">ABOUT</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/#Services">
                            <a className="sidenav-close">SERVICES</a>
                        </Link>
                    </li>
                    {bare !== true ? (
                        <li>
                            <Link href={inquire_path}>
                                <a className="sidenav-close">INQUIRE</a>
                            </Link>
                        </li>
                    ) : (
                        <></>
                    )}
                    <li>
                        <Link href="/articles">
                            <a className="sidenav-close">ARTICLES</a>
                        </Link>
                    </li>
                </ul>
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper blue darken-1">
                            <a
                                href="#!"
                                data-target="slide-out"
                                className="sidenav-trigger"
                            >
                                <i className="material-icons left">menu</i>
                            </a>
                            <div className="brand-logo center">
                                <Link href="/#Top">
                                    <a>
                                        <div
                                            style={{
                                                paddingTop: 3,
                                                minWidth: 300,
                                            }}
                                        >
                                            <Image
                                                layout="intrinsic"
                                                src="/headerLogo.png"
                                                alt="OsbornAI logo"
                                                width={345}
                                                height={57.5}
                                            />
                                        </div>
                                    </a>
                                </Link>
                            </div>
                            <div className="hide-on-med-and-down">
                                <div
                                    style={{
                                        paddingLeft: 80,
                                        paddingRight: 80,
                                    }}
                                >
                                    <ul className="left">
                                        <li>
                                            <Link href="/#About">
                                                <a>ABOUT</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/#Services">
                                                <a>SERVICES</a>
                                            </Link>
                                        </li>
                                    </ul>
                                    <ul className="right">
                                        {bare !== true ? (
                                            <li>
                                                <Link href={inquire_path}>
                                                    <a>INQUIRE</a>
                                                </Link>
                                            </li>
                                        ) : (
                                            <></>
                                        )}
                                        <li>
                                            <Link href="/articles">
                                                <a>ARTICLES</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
}
