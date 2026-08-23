import React from "react";

export default function AwarenessVideo({ lang }) {
  return (
    <section className="video-section">
      <div className="video-wrap">
        <div className="video-copy">
          <span className="kicker">WATCH & ACT</span>
          <h2>See it. Understand it. Report it.</h2>
          <p>Watch the cyber safety awareness video, then use the six-step reporting guide above.</p>
          <div className="video-tip"><b>PRO TIP</b><span>Save 1930 and the cybercrime portal in your phone now.</span></div>
        </div>
        <div className="video-box">
          <video
            controls
            playsInline
            preload="metadata"
            style={{ width: "100%", height: "auto" }}
          >
            <source
              src="/cybersos-awareness-video.mp4"
              type="video/mp4"
            />
            Your browser does not support video.
          </video>
          <div className="video-placeholder">Add <b>cybersos-awareness-video.mp4</b> to the <b>public</b> folder.</div>
        </div>
      </div>
    </section>
  );
}
