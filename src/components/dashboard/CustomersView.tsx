import React, { useState } from 'react'
import { Search, Mail, Phone } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const CustomersView: React.FC = () => {
  const { customers, appointments, theme } = useApp()
  const isDark = theme === 'dark'
  const [search, setSearch] = useState('')

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Customer Profiles</h1>
          <p className="text-xs sm:text-sm opacity-60">
            Client directory, booking frequency history, and automated communication channels.
          </p>
        </div>
      </div>

      <div
        className={`p-4 rounded-3xl transition-all ${
          isDark ? 'neu-raised' : 'neu-raised'
        }`}
      >
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name or email..."
            className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs font-bold border focus:outline-none focus:ring-2 focus:ring-[#c5a880] ${
              isDark ? 'bg-[#151210] border-stone-800 text-white' : 'bg-[#fbf9f5] border-stone-300 text-stone-900'
            }`}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((cust) => {
          const custAppointments = appointments.filter(
            (a) => a.customer.email.toLowerCase() === cust.email.toLowerCase()
          )

          return (
            <div
              key={cust.id}
              className={`p-5 rounded-3xl space-y-4 transition-all flex flex-col justify-between border ${
                isDark ? 'neu-raised border-[#c5a880]/20' : 'neu-raised border-[#c5a880]/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-stone-900 border border-[#c5a880]/40 text-[#dfc299] flex items-center justify-center font-bold text-sm shadow-sm">
                    {cust.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                      cust.status === 'vip'
                        ? 'bg-[#c5a880]/20 text-[#dfc299] border-[#c5a880]/40'
                        : cust.status === 'new'
                        ? 'bg-[#dfc299]/15 text-[#dfc299] border-[#dfc299]/30'
                        : 'bg-stone-500/15 text-stone-400 border-stone-400/30'
                    }`}
                  >
                    {cust.status}
                  </span>
                </div>

                <h3 className="font-bold text-sm">{cust.name}</h3>

                <div className="mt-2 space-y-1.5 text-xs opacity-70">
                  <p className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#dfc299] shrink-0" />
                    <span className="truncate">{cust.email}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#dfc299] shrink-0" />
                    <span>{cust.phone}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200/40 dark:border-stone-800 flex items-center justify-between text-xs">
                <div>
                  <span className="opacity-50 block text-[10px]">Total Bookings</span>
                  <span className="font-extrabold text-[#dfc299]">{cust.totalBookings} visits</span>
                </div>
                <div className="text-right">
                  <span className="opacity-50 block text-[10px]">Last Visit</span>
                  <span className="font-bold">{cust.lastVisit}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
