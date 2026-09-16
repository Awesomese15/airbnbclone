import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { galleryPhotos, listing } from './data';
import airbnbLogo from './assets/airbnb-logo.png';

const icons = {
  search: 'M11 19a8 8 0 1 1 5.657-13.657A8 8 0 0 1 11 19Zm0-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm5.293-.707 4 4-1.414 1.414-4-4 1.414-1.414Z',
  globe: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.92 9h-3.03a15.8 15.8 0 0 0-1.28-5.02A8.04 8.04 0 0 1 18.92 11ZM12 4c.83 1.1 1.52 3.34 1.76 7h-3.52C10.48 7.34 11.17 5.1 12 4ZM9.39 5.98A15.8 15.8 0 0 0 8.11 11H5.08a8.04 8.04 0 0 1 4.31-5.02ZM5.08 13h3.03a15.8 15.8 0 0 0 1.28 5.02A8.04 8.04 0 0 1 5.08 13ZM12 20c-.83-1.1-1.52-3.34-1.76-7h3.52C13.52 16.66 12.83 18.9 12 20Zm2.61-1.98A15.8 15.8 0 0 0 15.89 13h3.03a8.04 8.04 0 0 1-4.31 5.02Z',
  menu: 'M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z',
  heart: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78ZM12 18.41l-7.43-7.43a3.5 3.5 0 1 1 4.95-4.95L12 8.5l2.48-2.47a3.5 3.5 0 0 1 4.95 4.95L12 18.41Z',
  share: 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A2.99 2.99 0 1 0 15 5c0 .24.04.47.09.7L8.04 9.81A3 3 0 1 0 8 14.19l7.12 4.15c-.07.21-.12.43-.12.66a3 3 0 1 0 3-2.92Z',
  arrowLeft: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2Z',
  arrowRight: 'm12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8Z',
  close: 'm18.3 5.71-1.41-1.42L12 9.17 7.11 4.29 5.7 5.71 10.59 10.59 5.7 15.48l1.41 1.41L12 12l4.89 4.89 1.41-1.41-4.89-4.89 4.89-4.88Z',
  grid: 'M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z',
  chevronDown: 'm6 9 6 6 6-6',
  pool: 'M3 17c3.2-3.2 6.4-3.2 9.6 0 3.2 3.2 6.4 3.2 8.4 0M3 12c3.2-3.2 6.4-3.2 9.6 0 3.2 3.2 6.4 3.2 8.4 0',
  snowflake: 'M12 3v18M5.64 6.64l12.72 10.72M18.36 6.64 5.64 17.36M3 12h18',
  key: 'M14.5 9.5a4.5 4.5 0 1 1-8.3 2.4L3 15v3h3v-2h2v-2h2.2a4.5 4.5 0 0 1 4.3-4.5Z',
  bed: 'M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 15h18M5 9V7h6v2',
  wifi: 'M2 8.5a15 15 0 0 1 20 0M5 12a10.5 10.5 0 0 1 14 0M8.5 15.5a5.5 5.5 0 0 1 7 0M12 19h.01',
  car: 'M5 17h14l-1.2-6H6.2L5 17Zm1.5-6 1.3-3h8.4l1.3 3M7 20h2M15 20h2M4 17h16',
};

function Icon({ name, size = 18, stroke = false }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={icons[name]} fill={stroke ? 'none' : 'currentColor'} stroke={stroke ? 'currentColor' : 'none'} strokeWidth={stroke ? 1.8 : 0} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function photoImageProps(photo) {
  return photo.crop ? { style: { objectPosition: photo.crop } } : {};
}

function useDialogAccessibility(isOpen, close, restoreFocus = true) {
  const dialogRef = useRef(null);
  const opener = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    opener.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const focusables = () => [...(dialogRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || [])]
      .filter((el) => !el.disabled && el.offsetParent !== null);

    requestAnimationFrame(() => dialogRef.current?.focus());

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      if (restoreFocus) opener.current?.focus?.();
    };
  }, [isOpen, close, restoreFocus]);

  return dialogRef;
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Airbnb home">
        <img className="brand-logo" src={airbnbLogo} alt="airbnb" />
      </a>
      <button className="search" aria-label="Search stays">
        <span><b>Anywhere</b></span><i /><span><b>Any week</b></span><i /><span className="muted">Add guests</span>
        <strong><Icon name="search" size={17} /></strong>
      </button>
      <nav aria-label="Account navigation">
        <button className="host">Become a host</button>
        <button className="round" aria-label="Choose language"><Icon name="globe" size={18} /></button>
        <button className="menu" aria-label="Open account menu"><Icon name="menu" size={20} /><span className="avatar-dot" aria-hidden="true">•</span></button>
      </nav>
    </header>
  );
}

function Hero({ openTour }) {
  return (
    <section className="hero" aria-label="Property photos">
      {listing.heroPhotos.map((photo, index) => (
        <button
          key={photo.id}
          className={index === 0 ? 'hero-primary' : `hero-tile tile-${index}`}
          onClick={() => openTour(photo.id)}
          aria-label={`Open photo tour at ${photo.label}`}
        >
          <img src={photo.src} alt={photo.alt} {...photoImageProps(photo)} />
        </button>
      ))}
      <button className="show-photos" onClick={() => openTour(listing.heroPhotos[0].id)}>
        <Icon name="grid" size={16} /> Show all photos
      </button>
    </section>
  );
}

function ListingSections({ saved, setSaved }) {
  const amenities = [
    ['wifi', 'Wifi'],
    ['bed', 'Bedroom'],
    ['pool', 'Shared outdoor pool'],
    ['key', 'Self check-in'],
    ['car', 'Free parking on premises'],
    ['snowflake', 'Air conditioning'],
  ];

  return (
    <>
      <section className="content-section sleep-section">
        <div>
          <h2>Where you'll sleep</h2>
          <p>Comfortable spaces designed for a relaxed stay.</p>
        </div>
        <div className="sleep-card">
          <img src={listing.heroPhotos.find((photo) => photo.id === 'bedroom')?.src} alt="Bedroom" />
          <b>Bedroom</b>
          <span>1 double bed</span>
        </div>
      </section>

      <section className="content-section amenities-section">
        <div className="section-heading-row">
          <div><h2>What this place offers</h2><p>Everyday essentials for a comfortable stay.</p></div>
          <button className="outline-button">Show all 50 amenities</button>
        </div>
        <div className="amenities-grid">
          {amenities.map(([icon, label]) => <div key={label} className="amenity-item"><Icon name={icon} size={24} stroke /><span>{label}</span></div>)}
        </div>
      </section>

      <section className="content-section reviews-section">
        <div className="review-heading">
          <span className="review-badge">✦</span>
          <h2>{listing.rating} · {listing.reviews} reviews</h2>
          <p>Guest favourite based on ratings, reviews, and reliability.</p>
        </div>
        <div className="rating-grid">
          {listing.ratingBreakdown.map((item) => (
            <div key={item.label} className="rating-row"><span>{item.label}</span><div><span className="rating-track"><i style={{ width: `${item.value * 20}%` }} /></span><b>{item.value.toFixed(1)}</b></div></div>
          ))}
        </div>
        <div className="review-cards">
          {listing.reviewSnippets.map((review) => <article key={review.name}><div className="review-avatar">{review.initials}</div><b>{review.name}</b><small>{review.meta}</small><p>{review.text}</p></article>)}
        </div>
      </section>

      <section className="content-section location-section">
        <h2>Where you'll be</h2>
        <p>Candolim, Goa, India</p>
        <div className="map-frame">
          <img
            className="map-image"
            src={`https://staticmap.openstreetmap.de/staticmap.php?center=${listing.map.lat},${listing.map.lng}&zoom=13&size=652x300&markers=${listing.map.lat},${listing.map.lng},red`}
            alt="Map showing approximate location in Candolim, Goa"
            loading="lazy"
          />
          <p className="map-caption"><b>{listing.map.label}</b> · Exact location provided after booking</p>
        </div>
        <p className="location-copy">Located in the heart of Candolim, with easy access to beaches, cafés, restaurants, and popular North Goa attractions.</p>
      </section>

      <section className="content-section host-section">
        <h2>Meet your host</h2>
        <div className="host-profile-card">
          <div className="host-profile-avatar">{listing.host.initials}</div>
          <div><h3>{listing.host.name}</h3><p>{listing.host.years} · {listing.host.responseRate} response rate</p><p>Hosting comfortable stays in Goa with a focus on thoughtful hospitality.</p></div>
          <button className="outline-button">Message host</button>
        </div>
      </section>

      <section className="content-section rules-section">
        <h2>Things to know</h2>
        <div className="rules-grid">
          <div><b>House rules</b><span>3 guests maximum</span><span>Check-in after 2:00 pm</span><span>Checkout before 11:00 am</span></div>
          <div><b>Safety &amp; property</b><span>Exterior security cameras on property</span><span>Pool access is shared</span><span>Follow the property's quiet hours</span></div>
          <div><b>Cancellation policy</b><span>Add your dates to see the cancellation policy for this stay.</span></div>
        </div>
      </section>

      <section className="content-section final-cta">
        <div><h2>Ready to stay in Candolim?</h2><p>Save this listing and come back when you're ready to plan your trip.</p></div>
        <button className="outline-button" aria-pressed={saved} onClick={() => setSaved(!saved)}><Icon name="heart" size={17} stroke /> {saved ? 'Saved' : 'Save listing'}</button>
      </section>
    </>
  );
}

function Details({ saved, setSaved }) {
  return (
    <div className="details">
      <section className="summary">
        <h2>{listing.subtitle}</h2>
        <p>{listing.guests} · {listing.bedrooms} · {listing.beds} · {listing.bathrooms}</p>
        <div className="guest-favorite">
          <span className="spark" aria-hidden="true">✦</span>
          <b>Guest favourite</b>
          <p>One of the most loved homes on Airbnb, according to guests</p>
          <strong>{listing.rating}<small>★★★★★</small></strong>
          <b>{listing.reviews}<em>Reviews</em></b>
        </div>
        <hr />
        <div className="host-row"><div className="avatar">{listing.host.initials}</div><div><b>Hosted by {listing.host.name}</b><p>{listing.host.years}</p></div></div>
        <hr />
        {listing.features.map((feature) => (
          <div className="feature" key={feature.title}>
            <span aria-hidden="true"><Icon name={feature.icon} size={24} stroke /></span>
            <div><b>{feature.title}</b><p>{feature.description}</p></div>
          </div>
        ))}
        <hr />
        <p className="description">{listing.description}</p>
        <button className="underlined">Show more <span>›</span></button>
      </section>
      <aside className="booking-card" aria-label="Reservation details">
        <div className="price"><b>{listing.price}</b> night <span>★ {listing.rating} · {listing.reviews} reviews</span></div>
        <div className="date-box">
          <button><small>CHECK-IN</small><b>Add date</b></button>
          <button><small>CHECKOUT</small><b>Add date</b></button>
          <button className="guests"><small>GUESTS</small><b>1 guest</b><Icon name="chevronDown" size={18} stroke /></button>
        </div>
        <button className="reserve">Check availability</button>
        <p>You won't be charged yet</p>
        <div className="charge"><span>{listing.price} × 5 nights</span><span>₹124,000</span><span>Cleaning fee</span><span>₹2,500</span><b>Total before taxes</b><b>₹126,500</b></div>
        <button className="save-inline" aria-pressed={saved} onClick={() => setSaved(!saved)}><Icon name="heart" size={16} stroke /> {saved ? 'Saved' : 'Save listing'}</button>
      </aside>
    </div>
  );
}

function PhotoTour({ initialPhotoId, close, openLightbox }) {
  const dialogRef = useDialogAccessibility(true, close);
  const sectionRefs = useRef({});
  const initialRoomId = useMemo(() => listing.photoToRoom[initialPhotoId] || listing.rooms[0].id, [initialPhotoId]);
  const [selectedRoom, setSelectedRoom] = useState(() => Math.max(0, listing.rooms.findIndex((room) => room.id === initialRoomId)));
  const rooms = listing.rooms;

  useEffect(() => {
    const target = rooms[selectedRoom];
    if (!target) return;
    sectionRefs.current[target.id]?.scrollIntoView({ block: 'start' });
  }, [rooms, selectedRoom]);

  useEffect(() => {
    const nodes = rooms.map((room) => sectionRefs.current[room.id]).filter(Boolean);
    if (!nodes.length) return undefined;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = rooms.findIndex((room) => room.id === visible.target.id);
      if (index >= 0) setSelectedRoom(index);
    }, { root: dialogRef.current, threshold: [0.2, 0.45, 0.7], rootMargin: '-90px 0px -45% 0px' });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [rooms, dialogRef]);

  const jumpTo = (index) => {
    setSelectedRoom(index);
    sectionRefs.current[rooms[index].id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="overlay tour-overlay" role="dialog" aria-modal="true" aria-labelledby="tour-title" ref={dialogRef} tabIndex={-1}>
      <header className="tour-header">
        <button className="back-button" onClick={close} aria-label="Back to listing"><Icon name="arrowLeft" size={20} /> Back</button>
        <h2 id="tour-title">Photo tour</h2>
        <div><button className="text-action"><Icon name="share" size={15} /> <u>Share</u></button><button className="text-action"><Icon name="heart" size={15} stroke /> <u>Save</u></button></div>
      </header>

      <div className="tour-thumbnails" role="tablist" aria-label="Rooms and spaces">
        {rooms.map((room, index) => (
          <button key={room.id} role="tab" aria-selected={index === selectedRoom} className={index === selectedRoom ? 'selected' : ''} onClick={() => jumpTo(index)}>
            <img src={room.photos[0].src} alt="" />
            <span>{room.label}</span>
          </button>
        ))}
      </div>

      <main className="tour-sections">
        {rooms.map((room, roomIndex) => (
          <section key={room.id} id={room.id} ref={(node) => { sectionRefs.current[room.id] = node; }} className="tour-section">
            <div className="room-copy">
              <p className="eyebrow">ROOM &amp; SPACE</p>
              <h1>{room.label}</h1>
              <p>{room.detail}</p>
            </div>
            <div className="tour-grid">
              {room.photos.map((photo) => {
                const globalIndex = galleryPhotos.findIndex((item) => item.id === photo.id);
                return (
                  <button key={photo.id} className="tour-photo" onClick={() => openLightbox(globalIndex)} aria-label={`Open ${photo.label}`}>
                    <img src={photo.src} alt={photo.alt} {...photoImageProps(photo)} />
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

function Lightbox({ initialIndex, close }) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useDialogAccessibility(true, close);
  const photo = galleryPhotos[index];
  const total = galleryPhotos.length;
  const atStart = index === 0;
  const atEnd = index === total - 1;

  const go = useCallback((change) => {
    setIndex((current) => Math.min(total - 1, Math.max(0, current + change)));
  }, [total]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key === 'ArrowLeft' && !atStart) { event.preventDefault(); go(-1); }
      if (event.key === 'ArrowRight' && !atEnd) { event.preventDefault(); go(1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, atStart, atEnd]);

  return (
    <div className="overlay lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" ref={dialogRef} tabIndex={-1}>
      <header>
        <span className="dot-grid" aria-hidden="true"><Icon name="grid" size={20} /></span>
        <h2 id="lightbox-title">{photo.label}</h2>
        <div className="lightbox-meta"><span className="photo-counter" aria-live="polite">{index + 1} of {total}</span><button className="icon-button" onClick={close} aria-label="Close photo viewer"><Icon name="close" size={22} /></button></div>
      </header>
      <button className="light-arrow previous" onClick={() => go(-1)} disabled={atStart} aria-label="Previous photo"><Icon name="arrowLeft" size={22} /></button>
      <figure><img src={photo.src} alt={photo.alt} {...photoImageProps(photo)} /><figcaption>{photo.detail}</figcaption></figure>
      <button className="light-arrow next" onClick={() => go(1)} disabled={atEnd} aria-label="Next photo"><Icon name="arrowRight" size={22} /></button>
    </div>
  );
}

export default function App() {
  const [tour, setTour] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [saved, setSaved] = useState(false);

  const openTour = (photoId) => setTour(photoId);
  const closeTour = () => setTour(null);
  const openLightbox = (index) => setLightbox(index);

  return <>
    <Header />
    <main id="top" className="page">
      <div className="title-row">
        <h1>{listing.title}</h1>
        <div>
          <button className="text-action"><Icon name="share" size={15} /> <u>Share</u></button>
          <button className="text-action" aria-pressed={saved} onClick={() => setSaved(!saved)}><Icon name="heart" size={15} stroke /> <u>{saved ? 'Saved' : 'Save'}</u></button>
        </div>
      </div>
      <Hero openTour={openTour} />
      <Details saved={saved} setSaved={setSaved} />
      <ListingSections saved={saved} setSaved={setSaved} />
    </main>
    {tour !== null && <PhotoTour initialPhotoId={tour} close={closeTour} openLightbox={openLightbox} />}
    {lightbox !== null && <Lightbox initialIndex={lightbox} close={() => setLightbox(null)} />}
  </>;
}
