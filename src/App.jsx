import { useEffect, useRef, useState } from 'react'

// Telefone não informado no material: preencher (somente dígitos, com DDI) para ativar o botão de WhatsApp.
const WHATSAPP = '5538991055071'
const TELEFONE = '(38) 99105-5071'
const INSTAGRAM = '_erclinic'
const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá! Quero saber mais sobre o protocolo ÉV White.')}`

function Progress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const f = () => {
      const h = document.documentElement.scrollHeight - innerHeight
      setP(h > 0 ? scrollY / h : 0)
    }
    f()
    addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  return (
    <div className="fixed inset-x-0 top-0 z-40 h-[3px]">
      <div className="h-full origin-left bg-bronze" style={{ transform: `scaleX(${p})` }} />
    </div>
  )
}

function WhatsFloat() {
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="pulse-ring fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-bronze text-white shadow-xl transition-transform hover:scale-110"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.5 3.5A11 11 0 0 0 3.2 17L2 22l5.2-1.4A11 11 0 1 0 20.5 3.5zM12 20a9 9 0 0 1-4.6-1.3l-.3-.2-3 .8.8-2.9-.2-.3A9 9 0 1 1 12 20zm5-6.7c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.9 1.1-.3.2-.6.1a7.400 7.400 0 0 1-3.700-3.200c-.3-.5.3-.5.8-1.500.1-.2 0-.3 0-.5l-.8-1.900c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.200 5.200 5.200 0 0 0 1.100 2.800 11.900 11.900 0 0 0 4.600 4.100c1.700.7 2.400.8 3.200.7a2.700 2.700 0 0 0 1.800-1.300 2.200 2.200 0 0 0 .2-1.300c-.1-.1-.3-.2-.6-.3z" />
      </svg>
    </a>
  )
}

function Reveal({ children, className = '', as: Tag = 'div', delay = 0, img = false }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} style={{ '--d': `${delay}s` }} className={`${img ? 'img-reveal' : 'reveal'} ${className}`}>
      {children}
    </Tag>
  )
}

function Logo({ light = false }) {
  const c = light ? 'text-creme' : 'text-grafite'
  return (
    <div className={`leading-none ${c}`} aria-label="ÉV White, clareamento dental">
      <span className="block font-serif text-2xl font-semibold tracking-[0.12em]">ÉV WHITE</span>
      <span className="block font-script text-lg -mt-0.5 text-bronze">clareamento dental</span>
    </div>
  )
}

function Button({ children, href, onClick, variant = 'solid' }) {
  const base =
    'btn-sheen inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium tracking-[0.14em] uppercase transition-all hover:-translate-y-0.5 hover:shadow-lg'
  const styles =
    variant === 'solid'
      ? 'bg-bronze text-white hover:bg-[#93725a]'
      : 'border border-creme/60 text-creme hover:bg-creme hover:text-grafite'
  return (
    <a href={href} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </a>
  )
}

function Header() {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        solid ? 'bg-creme/95 backdrop-blur shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Logo light={!solid} />
        <a
          href={waLink || '#avaliacao'}
          className={`rounded-full border px-4 py-2 text-xs font-medium tracking-[0.14em] uppercase ${
            solid ? 'border-grafite text-grafite' : 'border-creme/70 text-creme'
          }`}
        >
          Avaliação
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-carvao">
      <img
        src="/img/duo-1-sm.webp"
        srcSet="/img/duo-1-sm.webp 600w, /img/duo-1.webp 1000w"
        sizes="(min-width:768px) 60vw, 100vw"
        alt="Dra. Gizelly Viana e Dra. Érika Rayrine"
        className="hero-fade kenburns absolute right-0 top-0 -z-10 h-[68%] w-full object-cover object-[50%_15%] md:h-full md:w-[60%] md:object-[50%_25%]"
        fetchPriority="high"
      />
      <div className="absolute -z-10 h-72 w-72 rounded-full bg-bronze/20 blur-3xl md:left-[8%] md:top-[20%]" aria-hidden />
      <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-32 text-creme md:pb-24">
        <p style={{ '--d': '.2s' }} className="rise mb-3 text-xs tracking-[0.3em] uppercase text-areia">Protocolo de clareamento dental</p>
        <h1 style={{ '--d': '.4s' }} className="rise font-serif text-6xl font-semibold leading-[0.95] md:text-8xl">
          <span className="shine">ÉV WHITE</span>
        </h1>
        <p style={{ '--d': '.65s' }} className="rise mt-1 font-script text-3xl text-bronze md:text-5xl">clareamento dental</p>
        <p style={{ '--d': '.9s' }} className="rise mt-6 max-w-md text-lg font-light leading-relaxed">
          O máximo do branco natural do seu sorriso, com protocolo exclusivo e acompanhamento do início ao fim.
        </p>
        <div style={{ '--d': '1.15s' }} className="rise mt-8 flex flex-wrap items-center gap-4">
          <Button href={waLink}>Quero meu sorriso mais branco</Button>
          <span className="text-xs tracking-[0.2em] uppercase text-areia">Vagas limitadas</span>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const t = ['Clareamento de consultório', 'Clareamento caseiro', 'Protocolo exclusivo', 'Resultado natural', 'Vagas limitadas']
  const row = [...t, ...t]
  return (
    <div className="overflow-hidden border-y border-grafite/15 bg-creme py-4" aria-hidden>
      <div className="marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {row.map((x, i) => (
              <span key={i} className="flex items-center font-serif text-xl italic text-grafite md:text-2xl">
                <span className="px-6">{x}</span>
                <span className="text-bronze">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Sobre() {
  return (
    <section className="px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="mb-3 text-xs tracking-[0.3em] uppercase text-bronze">01 · O protocolo</p>
          <h2 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
            O que é o protocolo ÉV White?
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed">
            Um protocolo <strong className="font-semibold">exclusivo</strong> e{' '}
            <strong className="font-semibold">individualizado</strong> de clareamento dental, desenvolvido para
            proporcionar o <strong className="font-semibold">máximo do branco natural</strong> de cada paciente.
          </p>
        </Reveal>
        <Reveal img delay={0.15}>
          <img
            src="/img/sorriso.webp"
            alt="Close de sorriso com dentes claros e naturais"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl"
          />
        </Reveal>
      </div>
    </section>
  )
}

function Opcoes() {
  const itens = [
    {
      t: 'Clareamento de consultório',
      s: 'Resultado rápido, confortável e supervisionado',
      p: 'Ideal para quem deseja um resultado mais imediato, com acompanhamento profissional durante todo o processo. Técnicas modernas e seguras, para um clareamento eficaz, confortável e personalizado.',
    },
    {
      t: 'Clareamento caseiro',
      s: 'Praticidade com acompanhamento profissional',
      p: 'Para quem prefere fazer o tratamento em casa: moldeiras personalizadas e orientação em todo o processo, para um clareamento seguro e eficiente.',
    },
  ]
  return (
    <section className="bg-grafite px-5 py-20 text-creme md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-xs tracking-[0.3em] uppercase text-bronze">02 · Como funciona</p>
          <h2 className="max-w-xl font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Duas formas de chegar ao seu melhor sorriso
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {itens.map((i, n) => (
            <Reveal key={i.t} delay={n * 0.15}>
              <article className="card-hover h-full rounded-2xl border border-creme/15 bg-carvao/60 p-7 md:p-9">
                <span className="font-serif text-5xl text-bronze">0{n + 1}</span>
                <h3 className="mt-4 font-serif text-3xl font-semibold">{i.t}</h3>
                <p className="mt-1 text-sm tracking-[0.12em] uppercase text-areia">{i.s}</p>
                <p className="mt-5 font-light leading-relaxed text-creme/90">{i.p}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Diferencial() {
  const lista = [
    'Protocolo exclusivo e personalizado para cada paciente',
    'Tratamento supervisionado do início ao fim',
    'Resultados naturais, seguros e duradouros',
    'Acompanhamento profissional durante todo o processo',
  ]
  return (
    <section className="px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal img className="order-2 md:order-1">
          <img
            src="/img/duo-2-sm.webp"
            srcSet="/img/duo-2-sm.webp 600w, /img/duo-2.webp 1000w"
            sizes="(min-width:768px) 50vw, 100vw"
            alt="Dra. Gizelly Viana e Dra. Érika Rayrine na ERCLINIC"
            loading="lazy"
            className="mx-auto aspect-[4/5] w-full max-w-md rounded-2xl object-cover object-top shadow-xl md:mx-0 md:max-w-none"
          />
        </Reveal>
        <Reveal className="order-1 md:order-2">
          <p className="mb-3 text-xs tracking-[0.3em] uppercase text-bronze">03 · Nosso diferencial</p>
          <h2 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Cuidado em cada etapa
          </h2>
          <ul className="mt-8 space-y-5">
            {lista.map((l, n) => (
              <Reveal as="li" key={l} delay={0.15 * n} className="flex gap-4 text-lg font-light leading-snug">
                <span aria-hidden className="floaty mt-1 text-bronze" style={{ animationDelay: `${n * 0.4}s` }}>✦</span>
                {l}
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function Avaliacao() {
  const passos = ['Avaliação', 'Escuta', 'Indicação']
  return (
    <section id="avaliacao" className="bg-areia/50 px-5 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="mb-3 text-xs tracking-[0.3em] uppercase text-bronze">04 · Antes de começar</p>
          <h2 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Avaliação individualizada
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed">
            Antes de iniciar qualquer protocolo, fazemos uma avaliação clínica completa para indicar a melhor opção
            para o seu sorriso.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3 md:gap-6">
            {passos.map((p, n) => (
              <div key={p} className="card-hover rounded-xl bg-creme px-2 py-6 shadow-sm hover:!bg-white">
                <span className="font-serif text-4xl italic text-bronze">{n + 1}</span>
                <p className="mt-1 text-xs font-medium tracking-[0.14em] uppercase md:text-sm">{p}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 font-serif text-2xl italic md:text-3xl">
            Porque um resultado bonito começa com planejamento, cuidado e segurança. 🤍
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Video() {
  const [play, setPlay] = useState(false)
  return (
    <section className="bg-carvao px-5 py-20 text-creme md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="mb-3 text-xs tracking-[0.3em] uppercase text-bronze">Conheça o protocolo</p>
          <h2 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Respeitando o seu sorriso
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-creme/90">
            Já deixou de sorrir em alguma foto? Com o ÉV White, você cuida do seu sorriso com um tratamento pensado
            de forma individual, profissional e respeitando as características de cada paciente.
          </p>
        </Reveal>
        <Reveal>
          <div className="relative mx-auto aspect-[9/16] w-full max-w-xs overflow-hidden rounded-2xl bg-black shadow-2xl">
            {play ? (
              <video src="/reel.mp4" poster="/img/reel-poster.webp" controls autoPlay playsInline className="h-full w-full object-cover" />
            ) : (
              <button
                onClick={() => setPlay(true)}
                aria-label="Assistir ao vídeo do protocolo ÉV White"
                className="group relative h-full w-full"
              >
                <img src="/img/reel-poster.webp" alt="" loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/10">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-creme/90 text-grafite">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
                  </span>
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Equipe() {
  return (
    <section className="px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="overflow-hidden rounded-3xl bg-grafite text-creme">
          <div className="grid md:grid-cols-2">
            <img
              src="/img/capa-sm.webp"
              srcSet="/img/capa-sm.webp 720w, /img/capa.webp 1400w"
              sizes="(min-width:768px) 50vw, 100vw"
              alt="Dra. Gizelly Viana e Dra. Érika Rayrine, criadoras do protocolo ÉV White"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="flex flex-col justify-center p-8 md:p-14">
              <p className="mb-3 text-xs tracking-[0.3em] uppercase text-bronze">Quem desenvolveu</p>
              <h2 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
                Dra. Gizelly Viana e Dra. Érika Rayrine
              </h2>
              <p className="mt-6 font-light leading-relaxed text-creme/90">
                Criadoras do protocolo ÉV White, da ERCLINIC Odontologia. Um tratamento pensado de forma individual
                para cada sorriso.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  ['Dra. Gizelly Viana', 'CROMG 61223'],
                  ['Dra. Érika Rayrine', 'CROMG 47706'],
                ].map(([n, c]) => (
                  <li key={n} className="card-hover rounded-xl border border-creme/20 px-5 py-4">
                    <p className="font-serif text-xl font-semibold">{n}</p>
                    <p className="text-xs tracking-[0.2em] uppercase text-bronze">{c}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="relative isolate overflow-hidden bg-carvao px-5 py-24 text-center text-creme md:py-32">
      <img
        src="/img/duo-2-sm.webp"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-top opacity-25"
      />
      <Reveal className="mx-auto max-w-2xl">
        <p className="font-script text-3xl text-bronze md:text-4xl">protocolo ÉV White</p>
        <h2 className="mt-2 font-serif text-4xl font-semibold leading-tight md:text-6xl">
          Garanta já seu sorriso mais branco e saudável
        </h2>
        <p className="mt-5 text-xs tracking-[0.3em] uppercase text-areia">Vagas limitadas</p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href={waLink}>Falar no WhatsApp</Button>
          <Button href={`https://instagram.com/${INSTAGRAM}`} variant="outline">@{INSTAGRAM}</Button>
        </div>
        <p className="mt-6 text-sm tracking-[0.15em] text-areia">{TELEFONE}</p>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-carvao px-5 pb-10 pt-8 text-center text-creme/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 border-t border-creme/15 pt-8">
        <Logo light />
        <p className="text-sm">ERCLINIC Odontologia</p>
        <p className="text-sm">Dra. Gizelly Viana · CROMG 61223 &nbsp;|&nbsp; Dra. Érika Rayrine · CROMG 47706</p>
        <p className="text-sm">
          <a href={waLink} className="underline-offset-4 hover:underline">{TELEFONE}</a> ·{' '}
          <a href={`https://instagram.com/${INSTAGRAM}`} className="underline-offset-4 hover:underline">@{INSTAGRAM}</a>
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Progress />
      <WhatsFloat />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Sobre />
        <Opcoes />
        <Diferencial />
        <Avaliacao />
        <Video />
        <Equipe />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
