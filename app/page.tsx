import { QRCodeSVG } from "qrcode.react";
import JoinForm from "@/components/JoinForm";

const DISCORD_INVITE = "https://discord.gg/wqFAJgvM";

const pillars = [
  {
    n: "01",
    bn: "বাক স্বাধীনতা",
    title: "Freedom of Speech",
    body:
      "The right to dissent — to write, perform, post and protest — without fear of arrest, doxxing, or laws weaponised against ordinary citizens. Dissent is not sedition. Criticism is not crime.",
  },
  {
    n: "02",
    bn: "পরিচ্ছন্ন শহর",
    title: "A Clean City",
    body:
      "Citizen-led cleanliness, accountable sanitation workers paid on time, ward-wise transparency on garbage, drainage and public toilets. Pride in our para starts with the street outside.",
  },
  {
    n: "03",
    bn: "ভোটাধিকার",
    title: "Right to Vote",
    body:
      "Every legitimate voter on the rolls. Every vote counted. Transparent processes, time-bound grievance redressal, and a hard stop on quiet deletions of names from electoral lists.",
  },
  {
    n: "04",
    bn: "নাগরিক মর্যাদা",
    title: "Anti-Alienization",
    body:
      "No citizen should be treated as outsider, infiltrator or “suspect” because of their language, religion, surname or paperwork. Citizenship is dignity — not a perpetual interrogation.",
  },
  {
    n: "05",
    bn: "নাগরিক সাংবাদিকতা",
    title: "Citizen Journalism",
    body:
      "Every neighbour with a phone is a reporter. We support local fact-finders, ward-level newsletters, video documentation of civic failures, and protection for anyone telling the truth about their para — no press card required.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="sari-stripes h-3 w-full" />

      {/* ===== Nav ===== */}
      <header className="mx-auto flex max-w-6xl items-center justify-between border-b border-ink px-6 py-5">
        <a href="#" className="flex items-center gap-4">
          <img
            src="/logo-transparent.png"
            alt="Arshola Janata Party logo"
            className="h-16 w-16 object-contain md:h-20 md:w-20"
          />
          <div className="leading-tight">
            <p className="font-display text-lg font-bold text-ink">
              Arshola Janata Party
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-alta">
              আরশোলা জনতা পার্টি · est. 2026
            </p>
          </div>
        </a>
        <nav className="hidden gap-7 text-sm font-medium text-ink/80 md:flex">
          <a href="#about" className="hover:text-sindoor">
            About
          </a>
          <a href="#pillars" className="hover:text-sindoor">
            Our Pillars
          </a>
          <a href="#drives" className="hover:text-sindoor">
            Cleaning Drives
          </a>
          <a href="#join" className="hover:text-sindoor">
            Membership
          </a>
        </nav>
        <a href="#join" className="hidden md:inline-flex btn-block btn-block--sm">
          <span>Become a member</span>
        </a>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        {/* Faded banner image, anchored to the right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-20 md:w-1/2 md:opacity-40"
          style={{
            backgroundImage: "url(/cockroach-banner.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% top",
            backgroundSize: "cover",
            maskImage:
              "linear-gradient(to left, black 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 55%, transparent 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-28 md:pt-16 md:pb-28">
          <span className="stamp">A citizens’ platform · Bengal</span>
          <h1 className="mt-6 font-display text-5xl font-black leading-[1.05] text-ink md:text-7xl">
            Voice of the
            <span className="text-sindoor"> Arsholas</span>,
            <br />
            and <span className="font-bengali text-terracotta">“বেকার”</span>{" "}
            bengalis.
          </h1>
          <div className="mt-8 space-y-1 font-display text-2xl font-semibold leading-snug text-ink/85 md:text-3xl">
            <p>
              Free speech
              <span className="mx-2 text-ink/30">·</span>
              Clean streets
              <span className="mx-2 text-ink/30">·</span>
              Honest votes
            </p>
            <p>
              Equal citizens
              <span className="mx-2 text-ink/30">·</span>
              Citizen journalism
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#join" className="btn-block">
              <span>Become a member</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#pillars"
              className="font-semibold text-alta underline-offset-4 hover:underline"
            >
              Read the five pillars
            </a>
          </div>
        </div>
      </section>

      <div className="sari-stripes h-3 w-full" />

      {/* ===== About ===== */}
      <section id="about" className="bg-white/50">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-5">
          <div className="md:col-span-2">
            <span className="stamp">কে আমরা · About us</span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight">
              A people’s platform, not a personality cult.
            </h2>
          </div>
          <div className="md:col-span-3 space-y-5 text-ink/80 leading-relaxed">
            <p>
              We are students, workers, teachers, shopkeepers, homemakers and
              retirees from across Bengal who refuse to accept that
              cynicism is the only honest response to public life.
            </p>
            <p>
              They called us <em>arshola</em> — pests, expendable, easy to
              crush. We took the word, kept it, and made it our reminder:
              ordinary people are not disposable. We organise, we show up, we
              do not go away.
            </p>
            <p>
              Our work is local and unglamorous: clean a lane, restore a
              deleted voter’s name, defend a journalist, sit beside a neighbour
              when papers are demanded of them. Small acts, done together,
              repeated.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Pillars ===== */}
      <section id="pillars" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="stamp">পাঁচ স্তম্ভ · The Five Pillars</span>
            <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
              What we stand for.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-ink/60 md:block">
            Five commitments. No personality. No dynasty. Just work.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-2">
          {pillars.map((p) => (
            <li
              key={p.n}
              className="group relative overflow-hidden rounded-xl border border-ink/10 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute -right-6 -top-6 font-display text-[8rem] font-black leading-none text-sindoor/10 transition group-hover:text-sindoor/20">
                {p.n}
              </div>
              <p className="font-bengali text-sm font-semibold uppercase tracking-widest text-alta">
                {p.bn}
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-ink">
                {p.title}
              </p>
              <p className="mt-3 text-ink/75 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ===== Cleaning drives callout ===== */}
      <section id="drives" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid items-center gap-8 rounded-2xl border-2 border-ink bg-white p-8 shadow-[8px_8px_0_theme(colors.sindoor)] md:grid-cols-[1.5fr_1fr] md:p-10">
          <div>
            <span className="stamp">পরিচ্ছন্নতা অভিযান · Cleaning drives</span>
            <h3 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
              We are organising ward-level
              <span className="text-sindoor"> cleaning drives</span> across
              Kolkata.
            </h3>
            <p className="mt-4 max-w-xl text-ink/75 leading-relaxed">
              Brooms, gloves, garbage bags, and a few hours of our Sunday — that
              is all it takes. We start with the lanes we live on. If you are
              from Kolkata and want to host or join the next drive in your
              para, tick the box when you become a member.
            </p>
          </div>
          <div className="rounded-xl bg-bone p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-alta">
              Next drive
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-ink">
              Coming soon
            </p>
            <p className="mt-1 text-sm text-ink/70">
              Date and location announced on Discord and to members by SMS.
            </p>
            <a
              href="#join"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sindoor underline-offset-4 hover:underline"
            >
              Sign up to be notified →
            </a>
          </div>
        </div>
      </section>

      {/* ===== Membership ===== */}
      <section id="join" className="bg-ink text-bone">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <span className="stamp !border-gold !text-gold">
              সদস্য হন · Become a member
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              Add your name.
              <br />
              Be counted.
            </h2>
            <p className="mt-6 max-w-md text-bone/80">
              Membership is free and takes thirty seconds. We will contact you
              about local meetings, voter-roll drives, and clean-up days in
              your ward. Your details are stored privately and never sold or
              shared.
            </p>
            <div className="mt-10 space-y-3 text-bone/70">
              <p>
                <strong className="text-bone">What we do with your number:</strong>{" "}
                send you meeting notices and action alerts. Nothing else.
              </p>
              <p>
                <strong className="text-bone">Opt out anytime</strong> — reply
                STOP to any message and we remove you the same day.
              </p>
            </div>

            {/* Discord */}
            <div className="mt-10 flex flex-col gap-5 rounded-xl border border-bone/15 bg-bone/5 p-5 sm:flex-row sm:items-center">
              <div className="rounded-md bg-bone p-3 shadow-md">
                <QRCodeSVG
                  value={DISCORD_INVITE}
                  size={112}
                  bgColor="#f6efe4"
                  fgColor="#1b1814"
                  level="M"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                  Join the conversation
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-bone">
                  Discord — organise drives, share work, plan meetups.
                </p>
                <a
                  href={DISCORD_INVITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gold underline-offset-4 hover:underline break-all"
                >
                  discord.gg/wqFAJgvM →
                </a>
                <p className="mt-2 text-xs text-bone/60">
                  Or scan the QR with the Discord mobile app.
                </p>
              </div>
            </div>
          </div>
          <JoinForm />
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-bone">
        <div className="sari-stripes h-3 w-full" />
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center">
          <div>
            <p className="font-display text-xl font-bold">
              আরশোলা জনতা পার্টি
            </p>
            <p className="mt-1 text-sm text-ink/60">
              A citizens’ platform from Bengal. Established 2026.
            </p>
          </div>
          <div className="text-sm text-ink/60">
            <p>
              Free speech. Clean cities. Honest votes. Equal citizens. Citizen
              journalism.
            </p>
            <p className="mt-2">
              © 2026 Arshola Janata Party · Built by volunteers.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
