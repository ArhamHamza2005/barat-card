'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowDown, ExternalLink, MapPin, Sparkles } from 'lucide-react'

const mapsUrl = 'https://maps.app.goo.gl/6yYWVyn4oyT9vBud6?g_st=aw'
const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function FloralDivider({ light = false }: { light?: boolean }) {
  return (
    <div className={`floral-divider${light ? ' floral-divider-light' : ''}`} aria-hidden="true">
      <span />
      <Sparkles />
      <span />
    </div>
  )
}

function RosePetals({ count }: { count: number }) {
  return (
    <div className="rose-petals" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => {
        const style = {
          '--petal-left': `${(index * 41 + 7) % 100}%`,
          '--petal-delay': `${-((index * 1.37) % 13)}s`,
          '--petal-duration': `${9 + (index % 6) * 1.25}s`,
          '--petal-size': `${8 + (index % 4) * 2}px`,
          '--petal-drift': `${((index % 7) - 3) * 18}px`,
          '--petal-rotate': `${index * 53}deg`,
        } as CSSProperties
        return <span className="rose-petal" style={style} key={index} />
      })}
    </div>
  )
}

function OpeningScreen({ onOpen, onStartOpening }: { onOpen: () => void; onStartOpening: () => void }) {
  const [opening, setOpening] = useState(false)

  return (
    <section className={`opening-screen${opening ? ' opening-screen-opening' : ''}`} aria-label="Wedding invitation cover">
      <div className="opening-grain" aria-hidden="true" />
      <div
        className={`invitation-cover${opening ? ' invitation-cover-opening' : ''}`}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget && opening) onOpen()
        }}
      >
        <div className="cover-content">
          <div className="cover-inner-border" aria-hidden="true" />
          <div className="cover-corner cover-corner-top-left" aria-hidden="true">❧</div>
          <div className="cover-corner cover-corner-top-right" aria-hidden="true">❧</div>
          <div className="cover-corner cover-corner-bottom-left" aria-hidden="true">❧</div>
          <div className="cover-corner cover-corner-bottom-right" aria-hidden="true">❧</div>
          <p className="cover-overline">Together with the blessings of Almighty Allah</p>
          <div className="cover-mark" aria-hidden="true"><span>A</span><i>&amp;</i><span>K</span></div>
          <p className="cover-invitation-label">Wedding invitation</p>
          <FloralDivider light />
          <p className="cover-intro">We joyfully invite you to celebrate the wedding ceremony of</p>
          <h1 className="cover-names"><span className="cover-full-name">Ali Hamza</span><span className="cover-ampersand">&amp;</span><span className="cover-full-name">Komal Saleem</span></h1>
          <button
            className="open-invitation-button"
            type="button"
            onClick={() => {
              setOpening(true)
              onStartOpening()
            }}
            disabled={opening}
            aria-label="Open the wedding invitation"
          >
            <span>{opening ? 'With love…' : 'Open invitation'}</span>
            <ArrowDown aria-hidden="true" />
          </button>
        </div>
        <div className="cover-doors" aria-hidden="true">
          <span className="cover-door-left" />
          <span className="cover-door-right" />
        </div>
      </div>
      <RosePetals count={32} />
      <div className="opening-bottom-note"><span /> An invitation made with love <span /></div>
    </section>
  )
}

function CoupleDateSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeDay, setActiveDay] = useState<number | null>(null)
  const [dateRevealed, setDateRevealed] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setActiveDay(26)
      setDateRevealed(true)
      return
    }

    let selectionInterval: number | undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const randomDays = Array.from({ length: 30 }, (_, index) => index + 1).filter((day) => day !== 26)
      const selectionDurationMs = 3500
      const selectionIntervalMs = 180
      const selectionCycles = Math.ceil(selectionDurationMs / selectionIntervalMs)
      let previousDay = randomDays[Math.floor(Math.random() * randomDays.length)]
      let selectionCount = 0
      setActiveDay(previousDay)
      selectionInterval = window.setInterval(() => {
        selectionCount += 1
        if (selectionCount >= selectionCycles) {
          if (selectionInterval !== undefined) window.clearInterval(selectionInterval)
          setActiveDay(26)
          setDateRevealed(true)
          return
        }
        const nextDays = randomDays.filter((day) => day !== previousDay)
        previousDay = nextDays[Math.floor(Math.random() * nextDays.length)]
        setActiveDay(previousDay)
      }, selectionIntervalMs)
    }, { threshold: 0.2 })

    observer.observe(section)
    return () => {
      observer.disconnect()
      if (selectionInterval !== undefined) window.clearInterval(selectionInterval)
    }
  }, [])

  return (
    <section className="couple-date-section" id="date" ref={sectionRef}>
      <div className="couple-intro" data-reveal>
        <p className="eyebrow">A celebration of love</p>
        <h2 className="couple-names"><span>Ali Hamza</span><i>&amp;</i><span>Komal Saleem</span></h2>
        <FloralDivider />
        <p className="couple-verse">“Two souls, one heart, and a lifetime of memories to make.”</p>
        <span className="event-badge">Wedding · Barat ceremony</span>
      </div>
      <div className="couple-calendar-column" data-reveal>
        <div className="calendar-card">
          <div className="calendar-heading">
            <span className="calendar-flourish" aria-hidden="true">✳</span>
            <div className={`calendar-date${dateRevealed ? ' calendar-date-revealed' : ''}`} aria-live="polite" aria-atomic="true">
              {dateRevealed && (
                <>
                  <h4>26 November</h4>
                  <p>2026</p>
                </>
              )}
            </div>
            <span className="calendar-flourish" aria-hidden="true">✳</span>
          </div>
          <div className="calendar-grid" role="grid" aria-label="November 2026 calendar">
            {weekdays.map((day) => <span className="calendar-weekday" role="columnheader" key={day}>{day}</span>)}
            {Array.from({ length: 35 }, (_, index) => {
              const day = index + 1
              const isDate = day <= 30
              const isActive = day === activeDay
              const isWeddingDay = dateRevealed && day === 26
              return (
                <span
                  className={`calendar-day${isDate ? '' : ' calendar-day-empty'}${isActive ? ' calendar-day-active' : ''}${isWeddingDay ? ' calendar-day-selected' : ''}`}
                  role="gridcell"
                  aria-label={day === 26 ? 'Thursday, November 26, wedding day' : isDate ? `November ${day}, 2026` : undefined}
                  aria-current={isWeddingDay ? 'date' : undefined}
                  key={index}
                >
                  {isDate ? day : ''}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function InvitationContent() {
  const pageRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const sections = pageRef.current?.querySelectorAll('[data-reveal]')
    if (!sections?.length || !('IntersectionObserver' in window)) {
      sections?.forEach((section) => section.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.16 })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="invitation-page invitation-page-arriving" ref={pageRef}>
      <section className="welcome-section" id="top">
        <RosePetals count={26} />
        <div className="welcome-copy" data-reveal>
          <p className="eyebrow">With the blessings of our families</p>
          <h1>With joy in our hearts,<br /><em>we invite you.</em></h1>
          <FloralDivider />
          <p className="welcome-message">With the blessings of Almighty Allah and the love of our families, we cordially invite you to join us in celebrating a beautiful new beginning.</p>
          <p className="welcome-message welcome-message-secondary">Your presence and blessings will make our special day even more memorable.</p>
          <a href="#date" className="text-link">The day &amp; details <ArrowDown aria-hidden="true" /></a>
        </div>
      </section>

      <CoupleDateSection />

      <section className="venue-section" id="venue" data-reveal>
        <div className="venue-copy">
          <p className="eyebrow eyebrow-light"><MapPin aria-hidden="true" /> Celebration venue</p>
          <h2>Where we say<br /><em>“I do.”</em></h2>
          <FloralDivider light />
          <h3>Royal Sangam Banquet</h3>
          <p>We would be delighted to have you with us as we celebrate this beautiful occasion.</p>
          <a className="location-button" href={mapsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin aria-hidden="true" /> Open location <ExternalLink aria-hidden="true" />
          </a>
          <p className="venue-date">Thursday, 26 November 2026</p>
        </div>
      </section>

      <footer className="page-footer">
        <div className="footer-mark">A <span>&amp;</span> K</div>
        <p>We cannot wait to celebrate with you.</p>
        <span>With love, <span className="footer-name">Ali Hamza</span> &amp; <span className="footer-name">Komal Saleem</span></span>
      </footer>
    </main>
  )
}

export default function WeddingInvitation() {
  const [isOpening, setIsOpening] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const completeOpening = useCallback(() => setIsOpen(true), [])

  useEffect(() => {
    document.body.classList.toggle('invitation-locked', !isOpen)
    return () => document.body.classList.remove('invitation-locked')
  }, [isOpen])

  return (
    <>
      {(isOpening || isOpen) && <InvitationContent />}
      {!isOpen && <OpeningScreen onOpen={completeOpening} onStartOpening={() => setIsOpening(true)} />}
    </>
  )
}
