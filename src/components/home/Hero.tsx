import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP, MQ, isTouch } from '../../lib/gsap';
import { introDelay } from '../../lib/intro';
import { PHOTOS, photoSrc, photoSrcSet } from '../../content/images';
import Icon from '../ui/Icon';
import { Clover, Ref } from '../ui/primitives';

/**
 * Homepage hero. Copy is the current US hero (homepage doc: "Hero Section:
 * Same as the present US website"), art-directed as one big rounded colour
 * card with a sticker-style product composition.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const mm = gsap.matchMedia();
      const base = introDelay();

      mm.add(MQ.motion, () => {
        const intro = gsap.timeline({ delay: base, defaults: { ease: 'expo.out' } });
        intro
          .fromTo('.hero__card', { clipPath: 'inset(8% 6% 8% 6% round 60px)', scale: 0.96 }, { clipPath: 'inset(0% 0% 0% 0% round 36px)', scale: 1, duration: 1.4 })
          .fromTo('.hero__disc', { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5 }, 0.15)
          .fromTo('.hero__bottles', { yPercent: 22, rotate: 8, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: 1.6 }, 0.3)
          .fromTo('.hero__title .hero__line > span', { yPercent: 115, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.1 }, 0.25)
          .fromTo('.hero__fade', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power3.out' }, 0.7)
          .fromTo('.hero__sticker', { opacity: 0, scale: 0.3, rotate: -30 }, { opacity: 1, scale: 1, rotate: (i) => [-8, 7, -5][i] ?? 0, duration: 1, stagger: 0.14, ease: 'back.out(2)' }, 1.0)
          .fromTo('.hero__badges img', { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out' }, 1.1);

        gsap.to('.hero__spin', { rotate: 360, duration: 24, repeat: -1, ease: 'none' });

        // Exit: layers drift apart as the hero scrolls away.
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 0.6 } })
          .to('.hero__bottles', { yPercent: -10, rotate: -4, ease: 'none' }, 0)
          .to('.hero__disc', { scale: 1.08, ease: 'none' }, 0)
          .to('.hero__copy', { y: -50, ease: 'none' }, 0);
      });

      mm.add(MQ.desktop, () => {
        if (isTouch()) return;
        const layers = gsap.utils.toArray<HTMLElement>('[data-depth]');
        const setters = layers.map((el) => ({
          x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }),
          d: parseFloat(el.dataset.depth || '0'),
        }));
        const onMove = contextSafe!((e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          setters.forEach((s) => {
            s.x(nx * s.d);
            s.y(ny * s.d);
          });
        });
        window.addEventListener('pointermove', onMove);
        return () => window.removeEventListener('pointermove', onMove);
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero__card">
          <div className="hero__copy">
            <p className="hero__kicker hero__fade">
              <span className="chip chip--lilac">Urinary tract health</span>
              <span className="chip chip--butter">Now in India</span>
            </p>
            <h1 id="hero-title" className="t-hero hero__title">
              <span className="hero__line">
                <span>the UTI struggle</span>
              </span>
              <span className="hero__line">
                <span>is real —</span>
              </span>
              <span className="hero__line">
                <span>
                  <em>we hear you.</em>
                </span>
              </span>
            </h1>
            <p className="hero__lead hero__fade">If you’ve ever had a UTI, you know how frustrating, painful, and disruptive it can be.</p>
            <p className="hero__body hero__fade">
              <strong>ellura®</strong> is a scientifically and clinically backed supplement that helps reduce the ability of certain bacteria to adhere to the urinary
              tract, supporting urinary tract health*
              <Ref n={[1, 2]} />. Each capsule delivers 36 mg of soluble, bioactive A-type PACs from 100% concentrated cranberry fruit juice extract
              <Ref n={[3, 4]} />.
            </p>
            <div className="hero__ctas hero__fade">
              <Link to="/ellura/shop" className="btn btn--lilac btn--lg" data-magnetic>
                Buy now <Icon name="arrow" />
              </Link>
              <Link to="/ellura/how-it-works" className="text-link">
                How it works
              </Link>
            </div>
            <div className="hero__badges" aria-label="Recognition">
              <img src="/images/badge-20.webp" alt="20+ years" width={120} height={112} />
              <span aria-hidden="true" />
              <img src="/images/badge-cgmp.webp" alt="Manufactured in a cGMP compliant facility — cGMP certified" width={112} height={112} />
              <span aria-hidden="true" />
              <img src="/images/badge-award.webp" alt="2026 Mindful Awards" width={112} height={112} />
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="hero__disc" data-depth="12" />
            <div className="hero__bottles-wrap" data-depth="30">
              <img
                className="hero__bottles"
                src={photoSrc(PHOTOS.bottlesDuo)}
                srcSet={photoSrcSet(PHOTOS.bottlesDuo)}
                sizes="(max-width: 900px) 80vw, 44vw"
                alt=""
                width={900}
                height={976}
                // @ts-expect-error — valid HTML attribute, not in React 18 types
                fetchpriority="high"
              />
            </div>
            <div className="hero__sticker hero__sticker--a sticker" data-depth="50">
              <span>
                <b>36 mg</b>
                soluble A-type PACs
              </span>
            </div>
            <div className="hero__sticker hero__sticker--b sticker" data-depth="-36">
              <span>
                <b>1×</b>
                capsule a day
              </span>
            </div>
            <div className="hero__stamp" data-depth="24">
              <svg viewBox="0 0 200 200" className="hero__spin">
                <defs>
                  <path id="heroStamp" d="M100 100 m -78 0 a 78 78 0 1 1 156 0 a 78 78 0 1 1 -156 0" />
                </defs>
                <text>
                  <textPath href="#heroStamp">trusted in the US · now in india · </textPath>
                </text>
              </svg>
              <Clover className="hero__stamp-clover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
