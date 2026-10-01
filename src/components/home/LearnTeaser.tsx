import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES, formatDate } from '../../content/articles';
import { PHOTOS, photoSrc, photoSrcSet } from '../../content/images';
import { useReveals } from '../../lib/useReveals';
import Icon from '../ui/Icon';
import { ArrowLink } from '../ui/primitives';

/**
 * Added section ("feel good guidance" in the reference): a bento of Learn
 * articles — one featured, three supporting — each with its topic chip.
 */
export default function LearnTeaser() {
  const ref = useRef<HTMLElement>(null);
  const [feature, ...rest] = ARTICLES;
  const side = rest.slice(0, 3);
  useReveals(ref);

  return (
    <section ref={ref} className="learn-t section" aria-labelledby="learn-t-title">
      <div className="wrap">
        <div className="learn-t__head">
          <h2 id="learn-t-title" className="t-d2" data-split>
            know your body. <em>know the science.</em>
          </h2>
          <ArrowLink to="/ellura/learn" className="learn-t__all">
            View all articles
          </ArrowLink>
        </div>
        <div className="bento" data-stagger>
          <Link to={`/ellura/learn/${feature.slug}`} className="bento__feature">
            <img
              src={photoSrc(PHOTOS[feature.image], true)}
              srcSet={photoSrcSet(PHOTOS[feature.image])}
              sizes="(max-width: 900px) 100vw, 50vw"
              alt=""
              width={1600}
              height={1067}
              loading="lazy"
            />
            <span className="chip">Featured article</span>
            <h3 className="t-d3">{feature.title}</h3>
            <span className="bento__read">
              Read more <Icon name="arrow" size={18} />
            </span>
          </Link>
          {side.map((a, i) => (
            <Link key={a.slug} to={`/ellura/learn/${a.slug}`} className={`bento__item bento__item--${['lilac', 'butter', 'blush'][i]}`}>
              <span className="chip chip--solid">{a.topic}</span>
              <h3 className="t-h4">{a.title}</h3>
              <span className="bento__meta">
                {a.readMins} min read · {formatDate(a.date)}
              </span>
              <img src={photoSrc(PHOTOS[a.image])} alt="" width={800} height={600} loading="lazy" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
