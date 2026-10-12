export function MotherChildIllustration() {
  return (
    <svg
      className="mother-child-illustration"
      viewBox="0 0 360 390"
      role="img"
      aria-labelledby="mother-child-title mother-child-description"
    >
      <title id="mother-child-title">Ilustrasi ibu menggendong bayinya</title>
      <desc id="mother-child-description">
        Seorang ibu tersenyum lembut sambil memeluk bayi yang dibedong, dikelilingi daun dan suasana hangat.
      </desc>

      {/* ---- Latar hangat ---- */}
      <circle cx="180" cy="196" r="152" fill="#f7e6d5" opacity=".55" />

      {/* ---- Daun belakang ---- */}
      <g fill="#8f9a7d" opacity=".5">
        <ellipse cx="112" cy="150" rx="18" ry="9" transform="rotate(-35 112 150)" />
        <ellipse cx="250" cy="176" rx="16" ry="8" transform="rotate(38 250 176)" />
      </g>

      {/* ---- Matahari ---- */}
      <circle cx="292" cy="84" r="30" fill="#dfbd8c" opacity=".65" />
      <circle cx="292" cy="84" r="18" fill="#e9cf9f" opacity=".6" />

      {/* ---- Bayangan ---- */}
      <ellipse cx="180" cy="368" rx="118" ry="14" fill="#8f9a7d" opacity=".18" />

      {/* ---- Rambut belakang ---- */}
      <path
        d="M180 84C132 84 112 120 118 170c3 28 10 48 16 62h92c6-14 13-34 16-62 6-50-14-86-62-86Z"
        fill="#463b37"
      />

      {/* ---- Leher ---- */}
      <path
        d="M164 186h32v26c0 6-7 10-16 10s-16-4-16-10v-26Z"
        fill="#c9946f"
      />

      {/* ---- Gaun / badan ---- */}
      <path
        d="M180 212c-34 0-52 18-64 56-12 38-22 68-28 94h184c-6-26-16-56-28-94-12-38-30-56-64-56Z"
        fill="#9b665a"
      />
      <path
        d="M180 212c-20 0-34 6-45 20 12-6 27-9 45-9s33 3 45 9c-11-14-25-20-45-20Z"
        fill="#8a5a4f"
      />

      {/* ---- Wajah ibu ---- */}
      <ellipse cx="180" cy="150" rx="41" ry="49" fill="#d9a987" />

      {/* ---- Poni ---- */}
      <path
        d="M139 140c-3-33 15-54 41-54s44 21 41 54c-5-21-19-30-41-28-22 2-36 11-41 28Z"
        fill="#463b37"
      />

      {/* ---- Pipi ---- */}
      <ellipse cx="152" cy="164" rx="10" ry="7" fill="#e08d7e" opacity=".35" />
      <ellipse cx="208" cy="164" rx="10" ry="7" fill="#e08d7e" opacity=".35" />

      {/* ---- Mata ---- */}
      <path
        d="M158 150c4-6 10-6 14 0M188 150c4-6 10-6 14 0"
        fill="none"
        stroke="#67483e"
        strokeWidth="3.4"
        strokeLinecap="round"
      />

      {/* ---- Hidung ---- */}
      <path
        d="M180 158c2 3 2 5-1 6"
        fill="none"
        stroke="#b77e66"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* ---- Senyum ---- */}
      <path
        d="M168 174c7 8 17 8 24 0"
        fill="none"
        stroke="#a8665d"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* ---- Bayi: kepala ---- */}
      <circle cx="188" cy="246" r="29" fill="#f2d1b5" />
      <path
        d="M161 234c-2-13 10-23 27-23s29 10 27 23c-7-8-17-11-27-11s-20 3-27 11Z"
        fill="#6b4a3c"
      />

      {/* ---- Bayi: wajah ---- */}
      <ellipse cx="171" cy="252" rx="6" ry="4.5" fill="#e08d7e" opacity=".45" />
      <ellipse cx="205" cy="252" rx="6" ry="4.5" fill="#e08d7e" opacity=".45" />
      <path
        d="M176 242c3-4 8-4 11 0M193 242c3-4 8-4 11 0"
        fill="none"
        stroke="#a9715b"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M183 255c3 3 8 3 11 0"
        fill="none"
        stroke="#c07f6c"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* ---- Bedong ---- */}
      <path
        d="M188 262c-44 0-72 32-76 68-2 22 18 32 46 32h60c26-2 40-14 36-36-6-32-32-64-66-64Z"
        fill="#f3eee3"
      />

      {/* ---- Lipatan bedong ---- */}
      <path
        d="M124 314c26-14 84-16 122-2M136 340c24-12 74-13 108-1"
        fill="none"
        stroke="#ded3c1"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* ---- Lengan ibu ---- */}
      <g
        fill="none"
        stroke="#8a5a4f"
        strokeWidth="22"
        strokeLinecap="round"
      >
        <path d="M138 224c-24 24-34 62-20 92 8 18 26 28 46 28" />
        <path d="M222 224c24 24 34 62 20 92-8 18-26 28-46 28" />
      </g>

      {/* ---- Tangan ibu ---- */}
      <circle cx="164" cy="344" r="12" fill="#d9a987" />
      <circle cx="196" cy="344" r="12" fill="#d9a987" />

      {/* ---- Daun depan ---- */}
      <g fill="none" stroke="#7d8a70" strokeWidth="3" strokeLinecap="round">
        <path d="M92 302c-20-32-26-68-16-104" />
        <path d="M268 302c20-32 26-68 16-104" />
      </g>
      <g fill="#8f9a7d">
        <ellipse cx="66" cy="214" rx="17" ry="8.5" transform="rotate(-40 66 214)" />
        <ellipse cx="60" cy="252" rx="17" ry="8.5" transform="rotate(-60 60 252)" />
        <ellipse cx="76" cy="286" rx="16" ry="8" transform="rotate(-80 76 286)" />
        <ellipse cx="294" cy="214" rx="17" ry="8.5" transform="rotate(40 294 214)" />
        <ellipse cx="300" cy="252" rx="17" ry="8.5" transform="rotate(60 300 252)" />
        <ellipse cx="284" cy="286" rx="16" ry="8" transform="rotate(80 284 286)" />
      </g>
    </svg>
  );
}