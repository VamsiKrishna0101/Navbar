import React, { useEffect, useRef, useState } from "react";
import "./hero.css";

export default function Hero({
  videoSrc,
  heading = "Welcome to IMG",
  tagline = "// We power the world's passion for sport",
}) {
  const videoRef = useRef(null);
  const [useVideo, setUseVideo] = useState(Boolean(videoSrc));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const hasVideo = Boolean(videoSrc);
    setUseVideo(hasVideo);
    setLoaded(!hasVideo);
  }, [videoSrc]);

  return (
    <section
      className={`hero ${!useVideo ? "hero-novideo" : ""} ${loaded ? "hero-ready" : ""}`}
      aria-label="Hero"
    >
      {useVideo && (
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setLoaded(true)}
          onError={() => { setUseVideo(false); setLoaded(true); }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      <div className="hero-scrim" />

      <div className="hero-content">
        <p className="hero-tag">{tagline}</p>
        <h1 className="hero-title">{heading}</h1>
      </div>
    </section>
  );
}
