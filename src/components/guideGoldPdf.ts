// Gold "1% Audition Guide" PDF mockup for /guide and /guide/download (2026-10-18).
// Shows the title only; the contents are drawn as blank lines so nothing in the
// guide is readable before sign-up. Pure CSS animation: rays turn behind it,
// the sheet floats and a light sweep crosses it. Respects reduced motion.

export const goldPdfCss = `
.gold-stage {
    position: relative; width: 100%; max-width: 420px; aspect-ratio: 1 / 1.05;
    margin: 0 auto; display: flex; align-items: center; justify-content: center;
}
.gold-rays {
    position: absolute; inset: -8%; border-radius: 50%;
    background: repeating-conic-gradient(from 0deg, rgba(240, 196, 92, 0.20) 0deg 7deg, transparent 7deg 20deg);
    -webkit-mask-image: radial-gradient(circle, #000 18%, transparent 68%);
    mask-image: radial-gradient(circle, #000 18%, transparent 68%);
    animation: gold-spin 40s linear infinite;
}
.gold-glow {
    position: absolute; width: 70%; height: 70%; border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 196, 80, 0.45), rgba(255, 107, 53, 0.12) 55%, transparent 72%);
    filter: blur(10px); animation: gold-pulse 4.5s ease-in-out infinite;
}
.gold-spark {
    position: absolute; width: 6px; height: 6px; border-radius: 50%;
    background: #ffe7a6; box-shadow: 0 0 10px 3px rgba(255, 214, 120, 0.8);
    opacity: 0; animation: gold-twinkle 3.6s ease-in-out infinite;
}
.gold-spark.s1 { top: 14%; left: 18%; animation-delay: 0.2s; }
.gold-spark.s2 { top: 22%; right: 14%; animation-delay: 1.4s; }
.gold-spark.s3 { bottom: 18%; left: 12%; animation-delay: 2.3s; }
.gold-spark.s4 { bottom: 12%; right: 20%; animation-delay: 0.9s; }

.gold-doc {
    position: relative; width: 62%; aspect-ratio: 1 / 1.36;
    border-radius: 6px; overflow: hidden; text-align: left;
    background: linear-gradient(145deg, #fbe6a2 0%, #e6bb57 28%, #c58f2c 55%, #f1cf78 78%, #a9741f 100%);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 236, 180, 0.55) inset,
                0 0 40px rgba(255, 190, 80, 0.25);
    padding: 11% 10% 0;
    animation: gold-float 6s ease-in-out infinite;
    transform-origin: 50% 60%;
}
.gold-doc::before {
    /* folded corner */
    content: ""; position: absolute; top: 0; right: 0; width: 16%; aspect-ratio: 1;
    background: linear-gradient(225deg, #1A1D24 50%, #f7dc93 50%, #b98329 100%);
    box-shadow: -3px 3px 6px rgba(0, 0, 0, 0.25);
}
.gold-doc::after {
    /* light sweep */
    content: ""; position: absolute; top: -20%; bottom: -20%; width: 40%; left: -60%;
    background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    transform: skewX(-18deg); animation: gold-sweep 4.8s ease-in-out infinite;
}
.gold-doc .g-eyebrow {
    font-family: "Space Grotesk", Helvetica, Arial, sans-serif;
    font-size: 8px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
    color: #5a3c0c; opacity: 0.8;
}
.gold-doc .g-title {
    font-family: "Cormorant Garamond", Georgia, serif; font-weight: 700;
    font-size: clamp(22px, 5.4vw, 36px); line-height: 0.98; color: #3b2606;
    margin-top: 8%; letter-spacing: -0.3px;
}
.gold-doc .g-rule { height: 2px; background: rgba(59, 38, 6, 0.55); margin: 9% 0 8%; width: 40%; }
.gold-doc .g-line { height: 6px; border-radius: 3px; background: rgba(59, 38, 6, 0.22); margin-bottom: 7%; }
.gold-doc .g-line.w90 { width: 90%; } .gold-doc .g-line.w75 { width: 75%; }
.gold-doc .g-line.w82 { width: 82%; } .gold-doc .g-line.w60 { width: 60%; }
.gold-doc .g-badge {
    position: absolute; left: 10%; bottom: 8%;
    font-family: "Space Grotesk", Helvetica, Arial, sans-serif; font-weight: 700; font-size: 10px;
    letter-spacing: 0.16em; color: #fff3cf; background: #3b2606; padding: 5px 9px; border-radius: 3px;
}

@keyframes gold-spin { to { transform: rotate(360deg); } }
@keyframes gold-pulse { 0%, 100% { opacity: 0.75; transform: scale(0.96); } 50% { opacity: 1; transform: scale(1.06); } }
@keyframes gold-float {
    0%, 100% { transform: translateY(0) rotate(-3deg); }
    50% { transform: translateY(-12px) rotate(-1deg); }
}
@keyframes gold-sweep { 0%, 55% { left: -60%; } 100% { left: 130%; } }
@keyframes gold-twinkle { 0%, 100% { opacity: 0; transform: scale(0.4); } 50% { opacity: 1; transform: scale(1); } }
@media (prefers-reduced-motion: reduce) {
    .gold-rays, .gold-glow, .gold-doc, .gold-doc::after, .gold-spark { animation: none; }
    .gold-spark { opacity: 0.8; }
}`;

export const goldPdfHtml = `<div class="gold-stage" role="img" aria-label="The 1% Audition Guide, free PDF">
    <div class="gold-rays"></div>
    <div class="gold-glow"></div>
    <span class="gold-spark s1"></span><span class="gold-spark s2"></span>
    <span class="gold-spark s3"></span><span class="gold-spark s4"></span>
    <div class="gold-doc" aria-hidden="true">
        <div class="g-eyebrow">Free guide</div>
        <div class="g-title">The 1% Audition Guide</div>
        <div class="g-rule"></div>
        <div class="g-line w90"></div>
        <div class="g-line w75"></div>
        <div class="g-line w82"></div>
        <div class="g-line w60"></div>
        <div class="g-badge">PDF</div>
    </div>
</div>`;
