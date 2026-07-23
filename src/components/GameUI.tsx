import React, { useEffect, useState } from 'react';
import '../styles/game.css';

export const GameUI: React.FC = () => {
  const [htmlMarkup, setHtmlMarkup] = useState<string>('');

  useEffect(() => {
    fetch('/pure_body.html')
      .then((res) => res.text())
      .then((html) => {
        setHtmlMarkup(html);
      })
      .catch((err) => {
        console.error('Failed to load pure_body.html:', err);
      });
  }, []);

  useEffect(() => {
    if (!htmlMarkup) return;

    // Start game engine main() after HTML elements are mounted into DOM
    const timer = setTimeout(() => {
      const startMain = () => {
        if (typeof (window as any).main === 'function') {
          try {
            (window as any).main();
          } catch (err) {
            console.error('Error starting game main():', err);
          }
        } else {
          setTimeout(startMain, 50);
        }
      };
      startMain();
    }, 50);

    return () => clearTimeout(timer);
  }, [htmlMarkup]);

  if (!htmlMarkup) {
    return (
      <div className="w-screen h-screen bg-amber-950 flex flex-col items-center justify-center text-amber-200 font-sans">
        <div className="text-3xl font-bold mb-4">🐝 Bee Swarm Simulator</div>
        <div className="text-lg animate-pulse">Loading world and assets...</div>
      </div>
    );
  }

  return (
    <div
      className="game-ui-root w-full h-full relative overflow-hidden select-none"
      dangerouslySetInnerHTML={{ __html: htmlMarkup }}
    />
  );
};
