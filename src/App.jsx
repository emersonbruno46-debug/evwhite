import { useEffect, useRef, useState } from 'react'

// Telefone não informado no material: preencher (somente dígitos, com DDI) para ativar o botão de WhatsApp.
const WHATSAPP = ''
const waLink = WHATSAPP
  ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá! Quero saber mais sobre o protocolo ÉV White.')}`
  : null

function Reveal({ children, className = '', as: Tag = 'div' }) {
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
    <Tag ref={ref} className={`reveal ${className}`}>
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
    'inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium tracking-[0.14em] uppercase transition-colors'
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
        sizes="100vw"
        alt="Dra. Gizelly Viana e Dra. Érika Rayrine"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_20%]"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-carvao via-carvao/55 to-carvao/10" />
      <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-32 text-creme md:pb-24">
        <p className="mb-3 text-xs tracking-[0.3em] uppercase text-areia">Protocolo de clareamento dental</p>
        <h1 className="font-serif text-6xl font-semibold leading-[0.95] md:text-8xl">
          ÉV WHITE
        </h1>
        <p className="mt-1 font-script text-3xl text-bronze md:text-5xl">clareamento dental</p>
        <p className="mt-6 max-w-md text-lg font-light leading-relaxed">
          O máximo do branco natural do seu sorriso, com protocolo exclusivo e acompanhamento do início ao fim.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href={waLink || '#avaliacao'}>Quero meu sorriso mais branco</Button>
          <span className="text-xs tracking-[0.2em] uppercase text-areia">Vagas limitadas</span>
        </div>
      </div>
    </section>
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
        <Reveal>
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
            <Reveal key={i.t}>
              <article className="h-full rounded-2xl border border-creme/15 bg-carvao/60 p-7 md:p-9">
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
        <Reveal className="order-2 md:order-1">
          <img
            src="/img/duo-2-sm.webp"
            srcSet="/img/duo-2-sm.webp 600w, /img/duo-2.webp 1000w"
            sizes="(min-width:768px) 50vw, 100vw"
            alt="Dra. Gizelly Viana e Dra. Érika Rayrine na ERCLINIC"
            loading="lazy"
            className="mx-auto aspect-[3/4] w-full max-w-md rounded-2xl object-cover shadow-xl"
          />
        </Reveal>
        <Reveal className="order-1 md:order-2">
          <p className="mb-3 text-xs tracking-[0.3em] uppercase text-bronze">03 · Nosso diferencial</p>
          <h2 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Cuidado em cada etapa
          </h2>
          <ul className="mt-8 space-y-5">
            {lista.map((l) => (
              <li key={l} className="flex gap-4 text-lg font-light leading-snug">
                <span aria-hidden className="mt-1 text-bronze">✦</span>
                {l}
              </li>
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
              <div key={p} className="rounded-xl bg-creme px-2 py-6 shadow-sm">
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
        {waLink && (
          <div className="mt-10">
            <Button href={waLink}>Falar no WhatsApp</Button>
          </div>
        )}
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-carvao px-5 pb-10 pt-8 text-center text-creme/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 border-t border-creme/15 pt-8">
        <Logo light />
        <p className="text-sm">ERCLINIC Odontologia · Dra. Gizelly Viana e Dra. Érika Rayrine</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
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
