import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const copy = {
  zh: {
    navAbout: '关于我', navJourney: '经历', navContact: '联系', lang: 'EN',
    label: '个人作品集 · 2026', title: '把复杂的产品，\n做成自然的体验。',
    intro: '我是杨雯杰，一名专注于复杂业务场景的高级前端工程师。过去 5 年，我在字节跳动、ThoughtWorks 与阿里巴巴，把想法变成可靠、可持续的产品。',
    resume: '下载简历', explore: '查看经历', available: 'OPEN TO OPPORTUNITIES',
    role: '高级前端工程师', location: '成都 / 上海 · 中国',
    selected: '职业轨迹', journeyTitle: '从业务问题出发，\n在工程与体验之间找到答案。',
    journeyText: '我喜欢站在产品、设计与技术的交叉点工作：拆解问题，建立系统，再把每一个细节打磨到位。',
    now: '现在', present: '至今', education: '教育背景', skills: '常用技术', contact: '让我们聊聊',
    contactText: '如果你正在做一件值得认真完成的事，欢迎联系我。', mail: '发送邮件',
    footer: '© 2026 JasonYoge. Designed & built with curiosity.'
  },
  en: {
    navAbout: 'About', navJourney: 'Journey', navContact: 'Contact', lang: '中',
    label: 'PERSONAL PORTFOLIO · 2026', title: 'Turning complex products\ninto natural experiences.',
    intro: 'I’m Yang Wenjie, a senior frontend engineer focused on complex business systems. Over the past 5 years, I’ve turned ideas into reliable, lasting products at ByteDance, ThoughtWorks, and Alibaba.',
    resume: 'Download résumé', explore: 'Explore journey', available: 'OPEN TO OPPORTUNITIES',
    role: 'Senior Frontend Engineer', location: 'Chengdu / Shanghai · China',
    selected: 'Career journey', journeyTitle: 'Starting from the problem,\nI find the answer between craft and code.',
    journeyText: 'I enjoy working where product, design, and engineering meet: breaking down complexity, building systems, and polishing every detail.',
    now: 'NOW', present: 'PRESENT', education: 'Education', skills: 'Toolkit', contact: 'Let’s talk',
    contactText: 'If you’re building something worth doing well, I’d love to hear from you.', mail: 'Send an email',
    footer: '© 2026 JasonYoge. Designed & built with curiosity.'
  }
};

const jobs = [
  { years: ['2021.04', '2026'], company: '字节跳动 · 商业化技术', en: 'ByteDance · Commercial Technology', role: '高级前端工程师', enRole: 'Senior Frontend Engineer', current: true },
  { years: ['2019.09', '2021.04'], company: 'ThoughtWorks', en: 'ThoughtWorks', role: 'Developer', enRole: 'Developer' },
  { years: ['2018.04', '2019.08'], company: '阿里巴巴 · 国际站', en: 'Alibaba · Alibaba.com', role: '前端工程师', enRole: 'Frontend Engineer' }
];

function Icon({ name }) {
  const paths = { arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>, download: <><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></>, mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></> };
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function App() {
  const [locale, setLocale] = useState('zh');
  const [scrollProgress, setScrollProgress] = useState(0);
  const t = copy[locale];
  const en = locale === 'en';
  useEffect(() => {
    const onScroll = () => setScrollProgress(Math.min(window.scrollY / 180, 1));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="site">
    <header className={`topbar${scrollProgress > 0.02 ? ' is-scrolled' : ''}`} style={{ '--scroll-progress': scrollProgress }}>
      <a className="wordmark" href="#top" aria-label="JasonYoge home"><span>J</span>JasonYoge</a>
      <nav className="nav" aria-label="Primary navigation">
        <a href="#about">{t.navAbout}</a><a href="#journey">{t.navJourney}</a><a href="#contact">{t.navContact}</a>
        <button className="lang" onClick={() => setLocale(en ? 'zh' : 'en')} aria-label="Switch language">{t.lang}</button>
      </nav>
    </header>

    <main id="top">
      <section className="hero" id="about">
        <div className="hero-photo" role="img" aria-label={en ? 'JasonYoge outdoors' : '杨雯杰在户外的照片'} />
        <div className="hero-gradient" />
        <div className="hero-content">
          <p className="kicker"><span className="red-dot" />{t.label}</p>
          <h1>{t.title.split('\n').map((line, i) => <span key={line}>{line}{i === 0 && <br />}</span>)}</h1>
          <p className="intro">{t.intro}</p>
          <div className="hero-actions"><a className="button button-primary" href="/assets/jasonyoge-resume.pdf" download><Icon name="download" />{t.resume}</a><a className="text-link" href="#journey">{t.explore}<Icon name="arrow" /></a></div>
          <div className="hero-meta"><span><strong>{t.role}</strong>{t.location}</span><span className="availability"><i />{t.available}</span></div>
        </div>
        <div className="scroll-cue"><span />SCROLL TO EXPLORE</div>
      </section>

      <section className="journey wrap" id="journey">
        <div className="section-lead"><p className="kicker"><span className="red-dot" />{t.selected}</p><h2>{t.journeyTitle.split('\n').map((line, i) => <span key={line}>{line}{i === 0 && <br />}</span>)}</h2><p>{t.journeyText}</p></div>
        <div className="timeline">{jobs.map((job) => <article className={`timeline-item${job.current ? ' current' : ''}`} key={job.company}><div className="timeline-year"><span>{job.years[0]}</span><span>{job.current ? t.present : job.years[1]}</span></div><div className="timeline-body"><div className="company-line"><h3>{en ? job.en : job.company}</h3>{job.current && <span className="current-tag">{t.now}</span>}</div><p>{en ? job.enRole : job.role}</p></div></article>)}</div>
      </section>

      <section className="details wrap"><div><p className="kicker">{t.education}</p><p className="detail-title">电子科技大学 <span>· 计算机应用技术</span></p><p className="detail-meta">2015.09 — 2018.06 · 硕士</p></div><div><p className="kicker">{t.skills}</p><div className="skills"><span>React</span><span>TypeScript</span><span>Node.js</span><span>Garfish</span><span>GraphQL</span><span>AWS</span></div></div></section>

      <section className="contact wrap" id="contact"><div><p className="kicker"><span className="red-dot" />{t.contact}</p><h2>{t.contactText}</h2></div><a className="button button-primary" href="mailto:jasonYoge@gmail.com"><Icon name="mail" />{t.mail}</a></section>
    </main>
    <footer className="footer wrap"><span className="wordmark"><span>J</span>JasonYoge</span><span>{t.footer}</span><a href="https://github.com/jasonYoge" target="_blank" rel="noreferrer">GitHub <Icon name="arrow" /></a></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
