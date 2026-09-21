import React from "react";

// Splits the statement into word spans; the client script lights them up while scrolling.
function splitStatement(parts) {
  let index = 0;
  const words = [];
  for (const part of parts) {
    const accent = typeof part === "object";
    for (const word of (accent ? part.accent : part).split(" ")) {
      words.push(
        <span key={index} className={accent ? "w accent" : "w"} style={{ "--i": index }}>
          {word}
        </span>,
        " ",
      );
      index += 1;
    }
  }
  return { words, count: index };
}

export function About({ t }) {
  const about = t.about;
  const { words, count } = splitStatement(about.statement);

  return (
    <section id="about" className="section sheet theme-light">
      <div className="shell">
        <div className="section-label">
          <span className="num">01</span>
          <span className="bar" aria-hidden="true" />
          <h2 className="t-label">{about.label}</h2>
        </div>

        <p className="about-statement" style={{ "--n": count }} data-words>
          {words}
        </p>

        <div className="pillars">
          {about.pillars.map((pillar, index) => (
            <div key={pillar.title} className="pillar" data-reveal style={{ "--d": `${index * 120}ms` }}>
              <span className="pillar-num">0{index + 1}</span>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-text">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
