const NAV_ITEMS = [
  { label: 'Nyhetsbrev' },
  { label: 'eAvis' },
  { label: 'Innstillinger' },
  { label: 'Mitt abonnement', active: true },
  { label: 'Betaling' },
  { label: 'Betalingshistorikk' },
  { label: 'Brukervilkår og personvernserklæring' },
  { label: 'Kundeservice' },
  { label: 'Sanntidsdata Oslo Børs' },
];

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top header bar — 160px matching Figma */}
      <header className="w-full flex-shrink-0" style={{ backgroundColor: '#024588', height: '160px' }} />

      <div className="flex flex-1 gap-[68px]">
        {/* Sidebar — shadow, no border, content right-aligned via padding */}
        <aside
          className="flex-shrink-0 bg-white flex flex-col"
          style={{ boxShadow: '0px 0px 42px 0px rgba(63,65,81,0.06)', paddingLeft: '292px', paddingRight: '70px' }}
        >
          <div className="flex flex-col gap-[22px] w-[180px]">
            {/* User profile */}
            <div className="flex flex-col gap-[14px] px-[18px] pt-[40px]">
              <div className="flex flex-col gap-[14px]">
                {/* Avatar */}
                <div
                  className="w-[50px] h-[50px] rounded-full bg-blue-primary flex items-center justify-center flex-shrink-0"
                >
                  <span style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 700, fontSize: '24px', color: 'white', lineHeight: '32px' }}>
                    L
                  </span>
                </div>
                {/* Name + email */}
                <div className="flex flex-col gap-[4px]">
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '18px', lineHeight: '26px', color: '#191a20' }}>
                    Hei, Lucky!
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: '#989ab0' }}>
                    luckyg@gmail.com
                  </p>
                </div>
              </div>
              {/* Divider */}
              <div className="h-px bg-gray-border w-full" />
            </div>

            {/* Nav */}
            <nav className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  style={{
                    paddingLeft: '18px',
                    paddingRight: '18px',
                    paddingTop: '9px',
                    paddingBottom: '9px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    lineHeight: '22px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: item.active ? 400 : 400,
                    color: item.active ? '#191a20' : '#797b96',
                    backgroundColor: item.active ? '#f3f3f4' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </div>
              ))}
            </nav>

            {/* Divider + Logout */}
            <div className="flex flex-col">
              <div className="h-px bg-gray-border w-full" />
              <div style={{ paddingLeft: '18px', paddingRight: '18px', paddingTop: '12px', paddingBottom: '12px' }}>
                <button
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: '#0373e3', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Logg ut
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content — no left padding (gap handles spacing) */}
        <main className="flex-shrink-0 bg-gray-page pt-10 pb-10 pr-10" style={{ width: '636px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
