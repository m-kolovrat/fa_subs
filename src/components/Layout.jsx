const NAV_ITEMS = [
  { label: 'Nyhetsbrev' },
  { label: 'Forum' },
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
      {/* Top header bar */}
      <header className="w-full flex-shrink-0" style={{ backgroundColor: '#024588', height: '90px' }} />

      <div className="flex flex-1">
        {/* Sidebar — 560px wide, content right-aligned */}
        <aside className="w-[560px] flex-shrink-0 bg-white border-r border-gray-border flex flex-col items-end">
          {/* Inner content pinned to the right at a readable width */}
          <div className="w-[220px] flex flex-col flex-1">
            {/* User profile */}
            <div className="px-6 pt-8 pb-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-blue-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-base">L</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[16px] font-bold text-gray-dark leading-6">Hei, Lucky!</p>
                  <p className="text-[12px] text-gray-medium leading-4 truncate">luckyg@gmail.com</p>
                </div>
              </div>
              <div className="h-px bg-gray-border" />
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className={`px-3 py-2 rounded-lg text-[13px] cursor-pointer leading-5 ${
                    item.active
                      ? 'bg-gray-sidebar font-medium text-gray-dark'
                      : 'text-gray-medium hover:bg-gray-page'
                  }`}
                >
                  {item.label}
                </div>
              ))}
            </nav>

            {/* Logout */}
            <div className="px-6 py-6 border-t border-gray-border">
              <button className="text-[13px] text-blue-primary hover:underline cursor-pointer bg-transparent border-0">
                Logg ut
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-gray-page px-12 py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
