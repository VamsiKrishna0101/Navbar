import React, { useEffect, useRef, useState } from "react";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Navbar.css";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [panelReady, setPanelReady] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("has-fixed-nav");
    return () => document.body.classList.remove("has-fixed-nav");
  }, []);

  useEffect(() => {
    document.body.style.overflow = mounted ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mounted]);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const onEnd = (e) => {
      if (e.propertyName !== "transform") return;
      if (open && !closing) setPanelReady(true);
      if (closing) {
        setClosing(false);
        setOpen(false);
        setMounted(false);
        setPanelReady(false);
      }
    };
    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, [open, closing]);

  const startOpen = () => {
    setPanelReady(false);
    setSvcOpen(false);
    setNewsOpen(false);
    setMounted(true);
    requestAnimationFrame(() => {
      panelRef.current?.scrollTo(0, 0);
      requestAnimationFrame(() => setOpen(true));
    });
  };

  const startClose = () => {
    if (!mounted || closing) return;
    setPanelReady(false);
    setSvcOpen(false);
    setNewsOpen(false);
    setClosing(true);
  };

  const toggle = () => {
    if (closing) return;
    if (mounted && open) startClose();
    else startOpen();
  };

  const classes = [
    "overlay",
    mounted && "overlay-mounted",
    open && "overlay-open",
    panelReady && "overlay-ready",
    closing && "overlay-closing",
  ].filter(Boolean).join(" ");

  const buttonLabel = mounted ? "close" : "menu";
  const buttonClass =
    "nav-toggle " + (mounted ? "nav-toggle--close" : "nav-toggle--menu");

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo" aria-label="Home">NW</a>
          <button
            className={buttonClass}
            onClick={toggle}
            aria-expanded={open}
            aria-controls="nav-overlay"
            aria-label={buttonLabel === "menu" ? "Open menu" : "Close menu"}
          >
            <span className="slashes">//</span>&nbsp;{buttonLabel}
          </button>
        </div>
      </header>

      <div
        id="nav-overlay"
        className={classes}
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
      >
        <button className="overlay-backdrop" onClick={startClose} aria-label="Close" />

        <div className="overlay-social">
          <a href="#" className="icon-box" aria-label="LinkedIn"><FaLinkedinIn /></a>
          <a href="#" className="icon-box" aria-label="X"><FaXTwitter /></a>
          <a href="#" className="icon-box" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" className="icon-box" aria-label="Facebook"><FaFacebookF /></a>
        </div>

        <a href="#" className="overlay-cta">Join our mailing list</a>

        <div className="overlay-panel" ref={panelRef}>
          <nav className="overlay-menu">
            <a href="#" className="menu-item">About us</a>

            <button
              className={`menu-item menu-btn ${svcOpen ? "is-open" : ""}`}
              aria-expanded={svcOpen}
              onClick={() => setSvcOpen(v => !v)}
            >
              <span>Services</span>
              <span className="chev" aria-hidden>▾</span>
            </button>
            <ul className={`submenu ${svcOpen ? "submenu-open" : ""}`}>
              <li><a href="#">Rights</a></li>
              <li><a href="#">Channels</a></li>
              <li><a href="#">Digital</a></li>
              <li><a href="#">Global brand partnerships</a></li>
              <li><a href="#">Event management</a></li>
              <li><a href="#">Consulting</a></li>
              <li><a href="#">Studios</a></li>
            </ul>

            <a href="#" className="menu-item">Portfolio</a>

            <button
              className={`menu-item menu-btn ${newsOpen ? "is-open" : ""}`}
              aria-expanded={newsOpen}
              onClick={() => setNewsOpen(v => !v)}
            >
              <span>News &amp; insights</span>
              <span className="chev" aria-hidden>▾</span>
            </button>
            <ul className={`submenu ${newsOpen ? "submenu-open" : ""}`}>
              <li><a href="#">Latest news</a></li>
              <li><a href="#">Insights</a></li>
              <li><a href="#">Press releases</a></li>
            </ul>

            <a href="#" className="menu-item">Careers</a>
            <a href="#" className="menu-item">Contact</a>
          </nav>
        </div>
      </div>
    </>
  );
}
