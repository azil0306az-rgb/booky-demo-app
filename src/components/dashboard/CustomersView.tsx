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
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name or email..."
            className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs font-bold border focus:outline-none focus:ring-2 focus:ring-lime-400 ${
              isDark ? 'bg-[#0e1420] border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
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
              className={`p-5 rounded-3xl space-y-4 transition-all flex flex-col justify-between ${
                isDark ? 'neu-raised' : 'neu-raised'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-950 border border-lime-400/30 text-lime-400 flex items-center justify-center font-bold text-sm shadow-sm">
                    {cust.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                      cust.status === 'vip'
                        ? 'bg-amber-500/15 text-amber-500 border-amber-400/30'
                        : cust.status === 'new'
                        ? 'bg-lime-500/15 text-lime-500 border-lime-400/30'
                        : 'bg-blue-500/15 text-blue-500 border-blue-400/30'
                    }`}
                  >
                    {cust.status}
                  </span>
                </div>

                <h3 className="font-bold text-sm">{cust.name}</h3>

                <div className="mt-2 space-y-1.5 text-xs opacity-70">
                  <p className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-lime-500 shrink-0" />
                    <span className="truncate">{cust.email}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-lime-500 shrink-0" />
                    <span>{cust.phone}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/40 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="opacity-50 block text-[10px]">Total Bookings</span>
                  <span className="font-extrabold text-lime-600 dark:text-lime-400">{cust.totalBookings} visits</span>
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
