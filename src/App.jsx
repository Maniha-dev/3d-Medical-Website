import React, { useEffect } from 'react';

const services = [
  {
    title: 'ECG and echocardiography',
    description: 'Resting 12-lead ECG and full echo with colour Doppler for chest pain, breathlessness and murmurs.',
    note: 'Same-day report',
  },
  {
    title: 'Treadmill stress test',
    description: 'Exercise testing to find what triggers chest pain and how the rhythm behaves under load.',
    note: '30 min',
  },
  {
    title: '24-hour Holter and BP',
    description: 'Ambulatory rhythm and blood pressure monitoring for palpitations, dizziness and fainting.',
    note: 'Results in 48 h',
  },
  {
    title: 'Hypertension and cholesterol',
    description: 'Blood pressure, lipids and diabetes risk managed together, with a target you can track at home.',
    note: 'Ongoing',
  },
  {
    title: 'Angiography and stenting',
    description: 'Coronary angiography, with referral for angioplasty or bypass when a blockage needs treating.',
    note: 'Hospital-based',
  },
  {
    title: 'After a heart attack',
    description: 'Medication review, cardiac rehab advice and scheduled follow-up after discharge.',
    note: 'Follow-up plan',
  },
];

const testimonials = [
  {
    quote: '“Dr. Karim explained every result in a way I could understand. I left with my ECG, echo and a plan I knew how to follow.”',
    initials: 'SF',
    name: 'Samina Farooq',
    role: 'Hypertension follow-up',
  },
  {
    quote: '“The appointment was thorough rather than rushed. The Holter showed why I was feeling dizzy, and the next steps were immediate.”',
    initials: 'MH',
    name: 'Mohammad Hamza',
    role: 'Palpitations assessment',
  },
  {
    quote: '“After my heart attack, I needed someone to make the discharge plan simple. The follow-up was practical and genuinely supportive.”',
    initials: 'AK',
    name: 'Ali Khan',
    role: 'Post-heart attack review',
  },
  {
    quote: '“I appreciated being asked about my symptoms before tests were recommended. The results and next steps were explained clearly.”',
    initials: 'RN',
    name: 'Rehana N.',
    role: 'ECG and echo visit',
  },
  {
    quote: '“The appointment felt calm and organized. I left knowing what to monitor at home and when to come back.”',
    initials: 'FK',
    name: 'Faraz K.',
    role: 'Heart health consultation',
  },
];

const packages = [
  {
    label: 'Essential',
    title: 'Heart health check',
    price: 'Consultation-led',
    description: 'For a new concern or a focused cardiovascular review.',
    features: ['Detailed history and examination', 'Resting ECG', 'Risk-factor review', 'Written next steps'],
    cta: 'Request a visit',
  },
  {
    label: 'Comprehensive',
    title: 'Diagnostic review',
    price: 'Most complete',
    description: 'For symptoms that need imaging and rhythm assessment.',
    features: ['All Essential checks', 'Same-day echocardiogram', 'Colour Doppler assessment', 'Medication and follow-up plan'],
    cta: 'Book this pathway',
    featured: true,
  },
  {
    label: 'Follow-up',
    title: 'Ongoing heart care',
    price: 'Progress-focused',
    description: 'For blood pressure, cholesterol or post-procedure care.',
    features: ['Clinical review', 'Report and medication check', 'Home target review', 'Scheduled reassessment'],
    cta: 'Plan a follow-up',
  },
];

function Header() {
  return (
    <>
      <header className="top on-stage" id="top-bar">
        <a className="brand" href="#top">Dr. Ayesha Karim<small>Cardiology</small></a>
        <nav>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#faq">Questions</a>
          <button className="nav-toggle" id="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
            <span />
            <span />
          </button>
          <a className="btn" href="#book">Book a visit</a>
        </nav>
      </header>
      <div className="mobile-nav" id="mobile-nav" aria-hidden="true">
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#faq">Questions</a>
        <a className="btn" href="#book">Book a visit</a>
      </div>
    </>
  );
}

function HeartHero() {
  return (
    <div className="stage" id="stage">
      <div className="pin">
        <div className="cv-wrap" id="cw">
          <canvas id="cv" aria-label="Animated 3D heart that rotates and lights up as you scroll" role="img" />
        </div>
        <div className="vig" />
        <div className="loader" id="loader">LOADING 0%</div>
        <div className="beat l" data-a="0" data-b="0.17">
          <span className="kicker">Consultant cardiologist · Karachi</span>
          <h1>Your heart, <em>understood.</em></h1>
          <p>Careful diagnosis, clear explanations and long-term care for every stage of heart health.</p>
          <div className="row">
            <a className="btn" href="#book">Book a consultation</a>
            <a className="btn quiet" href="#services">What I treat</a>
          </div>
        </div>
        <div className="beat r" data-a="0.2" data-b="0.43">
          <span className="kicker">01 / Structure</span>
          <h2>Four chambers, <em>mapped.</em></h2>
          <p>Echocardiography shows the walls, valves and pumping strength in real time. Nothing hidden behind jargon.</p>
        </div>
        <div className="beat l" data-a="0.46" data-b="0.71">
          <span className="kicker">02 / Circulation</span>
          <h2>Follow the <em>blood.</em></h2>
          <p>From the aorta to the coronary arteries, ECG, stress testing and angiography find blockages before they become emergencies.</p>
        </div>
        <div className="beat r" data-a="0.74" data-b="0.96">
          <span className="kicker">03 / Your plan</span>
          <h2>A plan built <em>around you.</em></h2>
          <p>Medication, lifestyle and follow-up that fit your life, explained in plain words.</p>
          <div className="row"><a className="btn" href="#book">Book a consultation</a></div>
        </div>
        <div className="hint" id="hint">Scroll</div>
        <div className="rail"><i id="bar" /></div>
        <div className="dissolve" id="dis" />
      </div>
    </div>
  );
}

function Practice() {
  return (
    <div className="practice-band">
      <div className="wrap practice-wrap">
        <section className="blk" id="intro">
          <div className="intro">
            <div>
              <span className="kicker">The practice</span>
              <h2 data-r="words">Heart care that begins with listening. <span>Tests are chosen to answer your question, not to fill a report.</span></h2>
            </div>
            <dl data-r="stagger" data-dir="x">
              <div><dt>Same-day ECG and echo</dt><dd>Yes</dd></div>
              <div><dt>First visit</dt><dd><b data-count="45">45</b> min</dd></div>
              <div><dt>Languages</dt><dd>Urdu · English</dd></div>
              <div><dt>Clinic days</dt><dd>Mon – Sat</dd></div>
            </dl>
          </div>
        </section>
        <section className="trust-strip" id="trust" aria-label="Practice highlights" data-r="stagger">
          <div className="trust-item"><strong data-count="15" data-suffix="+">0+</strong><span>Years of clinical practice</span></div>
          <div className="trust-item"><strong data-count="5200">0</strong><span>Patients counselled</span></div>
          <div className="trust-item"><strong data-count="98" data-suffix="%">0%</strong><span>Percent same-day clarity</span></div>
          <div className="trust-item"><strong data-count="48" data-suffix="h">0h</strong><span>Hour Holter reporting</span></div>
        </section>
      </div>
    </div>
  );
}

function Services() {
  return (
    <div className="wrap">
      <section className="blk" id="services" style={{ paddingTop: 0 }}>
        <div className="sh service-heading" data-r="up">
          <div><span className="kicker">Cardiac care</span><h2>Services</h2></div>
          <p>Most patients leave the first visit with a diagnosis, a plan and their questions answered.</p>
        </div>
        <div className="rows service-rows" data-r="stagger" data-dir="x">
          {services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span>{service.note}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="blk" id="about" style={{ paddingTop: 0 }}>
        <div className="about">
          <div className="portrait" data-r="clip">
            <div className="ph" data-par>
              <div className="ph-in">
                <img src="/assets/dr-ayesha-karim.png" alt="Dr. Ayesha Karim, consultant cardiologist" loading="lazy" />
              </div>
            </div>
          </div>
          <div>
            <span className="kicker">About the doctor</span>
            <h2 data-r="words">Calm, thorough and unhurried.</h2>
            <p data-r="up">Dr. Ayesha Karim believes patients should leave every appointment knowing what was found, what it means and what happens next.</p>
            <p data-r="up">Her practice covers coronary artery disease, hypertension, heart failure, rhythm disorders and preventive cardiology.</p>
            <ul className="cred" data-r="stagger">
              <li>MBBS<span>Medical degree</span></li>
              <li>FCPS Cardiology<span>Specialist training</span></li>
              <li>Fellow, American College of Cardiology<span>Fellowship</span></li>
              <li><div><b data-count="15">15</b>+ years in clinical practice</div><span>Experience</span></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function VisitProcess() {
  return (
    <section className="blk band">
      <div className="wrap visit">
        <div className="vis-head"><span className="kicker">How a visit works</span><h2 data-r="words">One appointment, a clear answer.</h2></div>
        <ol data-r="stagger">
          <li><div><h3>Conversation and examination</h3><p>We go through symptoms, family history and medicines before anything else, then examine you.</p></div></li>
          <li><div><h3>Tests the same day</h3><p>ECG and echocardiography are done in the clinic, so you are not sent across the city for results.</p></div></li>
          <li><div><h3>Diagnosis and written plan</h3><p>You leave with a written plan covering medicines, lifestyle changes and when to return.</p></div></li>
        </ol>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="blk testimonials" id="testimonials">
      <div className="wrap">
        <div className="sh" data-r="up">
          <div><span className="kicker">Patient stories</span><h2>Care that feels clear and reassuring</h2></div>
          <p>Sample patient feedback to preview the carousel. Replace it with consented testimonials before publishing.</p>
        </div>
        <div className="testimonial-shell" data-r="up">
          <button className="slider-btn prev" type="button" aria-label="Previous testimonial">←</button>
          <div className="testimonial-viewport">
            <div className="testimonial-track" aria-live="polite">
              {testimonials.map((item) => (
                <article className="testimonial-slide" key={item.initials}>
                  <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <blockquote>{item.quote}</blockquote>
                  <div className="patient">
                    <div className="avatar">{item.initials}</div>
                    <div><strong>{item.name}</strong><span>{item.role}</span></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <button className="slider-btn next" type="button" aria-label="Next testimonial">→</button>
        </div>
        <div className="slider-dots" aria-label="Choose testimonial" />
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section className="blk pricing" id="packages">
      <div className="wrap">
        <div className="sh" data-r="up">
          <div><span className="kicker">Care pathways</span><h2>Choose the depth of assessment you need</h2></div>
          <p>Transparent starting options; any additional test is explained and agreed before it is booked.</p>
        </div>
        <div className="price-grid" data-r="stagger">
          {packages.map((item) => (
            <article className={`price-card${item.featured ? ' featured' : ''}`} key={item.label}>
              {item.featured && <div className="recommended">Recommended</div>}
              <span className="package-label">{item.label}</span>
              <h3>{item.title}</h3>
              <div className="price">{item.price}</div>
              <p>{item.description}</p>
              <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <a className={`btn${item.featured ? '' : ' quiet'}`} href="#book">{item.cta}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Questions() {
  const questions = [
    ['What should I bring to the first visit?', 'Previous ECGs, echo or angiography reports, discharge summaries and every medicine you take, in the original packets if possible.'],
    ['Do I need to fast for the tests?', 'No fasting is needed for an ECG or echo. If blood tests are advised, you will be told how to prepare when you book.'],
    ['How soon will I get my reports?', 'ECG and echo reports are ready the same day. Holter and ambulatory BP results follow within two days.'],
    ['When should I go to the emergency room instead?', 'Go straight to the nearest emergency department for chest pain lasting more than a few minutes, sudden breathlessness, fainting or a racing heart with dizziness.'],
  ];

  return (
    <div className="wrap">
      <section className="blk" id="faq">
        <div className="faq">
          <div><span className="kicker">Questions</span><h2 data-r="words">Before you come in</h2></div>
          <div data-r="stagger">
            {questions.map(([question, answer]) => (
              <details key={question}><summary>{question}</summary><p>{answer}</p></details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Booking() {
  return (
    <section className="blk book" id="book">
      <div className="wrap grid">
        <div>
          <span className="kicker">Appointments</span>
          <h2 data-r="words">Book your consultation.</h2>
          <table className="hours" aria-label="Clinic hours">
            <tbody data-r="stagger" data-dir="x">
              <tr><td>Monday – Thursday</td><td>5:00 pm – 9:00 pm</td></tr>
              <tr><td>Friday</td><td>4:00 pm – 7:00 pm</td></tr>
              <tr><td>Saturday</td><td>10:00 am – 2:00 pm</td></tr>
              <tr><td>Sunday</td><td>Closed</td></tr>
            </tbody>
          </table>
          <div className="contact" data-r="up">
            <span>Clinic: <b>Suite 4, Medical Centre, Clifton, Karachi</b></span>
            <span>Phone / WhatsApp: <b>+92 300 0000000</b></span>
          </div>
          <p className="emerg" data-r="up"><b>Chest pain, sudden breathlessness or fainting?</b> Do not wait for an appointment. Go to the nearest emergency department now.</p>
        </div>
        <form id="bf" data-r="stagger">
          <div className="two">
            <label htmlFor="nm">Full name<input id="nm" required autoComplete="name" /></label>
            <label htmlFor="ph">Phone<input id="ph" type="tel" required autoComplete="tel" /></label>
          </div>
          <div className="two">
            <label htmlFor="dt">Preferred day
              <select id="dt"><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option></select>
            </label>
            <label htmlFor="rs">Reason
              <select id="rs"><option>Chest pain</option><option>Palpitations</option><option>High blood pressure</option><option>Follow-up visit</option><option>Heart check-up</option><option>Other</option></select>
            </label>
          </div>
          <label htmlFor="ms">Anything else I should know<textarea id="ms" rows="4" /></label>
          <button className="btn" type="submit">Request by WhatsApp</button>
          <p className="note" id="fn">This opens WhatsApp with your details filled in. The clinic confirms your slot by reply.</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <div className="wrap">
      <footer>
        <span>© Dr. Ayesha Karim · Consultant Cardiologist</span>
        <nav className="fl" aria-label="Footer">
          <a href="#services">Services</a><a href="#about">About</a><a href="#faq">Questions</a><a href="#book">Book a visit</a>
        </nav>
        <span>Information on this site does not replace medical advice.</span>
      </footer>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    import('../script.js');
  }, []);

  return (
    <>
      <Header />
      <main id="top">
        <HeartHero />
        <Practice />
        <Services />
        <VisitProcess />
        <Testimonials />
        <Packages />
        <Questions />
        <Booking />
        <Footer />
      </main>
    </>
  );
}
