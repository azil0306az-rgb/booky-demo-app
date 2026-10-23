import React from 'react'
import { Star, Clock, Calendar } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const StaffView: React.FC = () => {
  const { currentIndustry, appointments, theme } = useApp()
  const isDark = theme === 'dark'

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            {currentIndustry.staffTerm} Roster & Availability
          </h1>
          <p className="text-xs sm:text-sm opacity-60">
            Active professionals for <strong className="opacity-100">{currentIndustry.businessName}</strong>, working shifts, and assigned services.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentIndustry.staff.map((staff, idx) => {
          const staffApps = appointments.filter((a) => a.staffId === staff.id && a.status !== 'cancelled')
          const utilPct = [88, 76, 82, 69][idx % 4]

          return (
            <div
              key={staff.id}
              className={`rounded-3xl p-6 space-y-5 transition-all flex flex-col justify-between ${
                isDark ? 'neu-raised' : 'neu-raised'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={staff.avatar}
                      alt={staff.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-300 dark:border-slate-700 shadow-md"
                    />
                    <div>
                      <h3 className="font-bold text-base">{staff.name}</h3>
                      <p className="text-xs opacity-60">{staff.role}</p>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{staff.rating}</span>
                        <span className="opacity-50 font-normal">
                          ({staff.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 opacity-60">
                      <Clock className="w-3.5 h-3.5" />
                      Shift Hours
                    </span>
                    <span className="font-bold">
                      {staff.workingHours.start} – {staff.workingHours.end}
                    </span>
                  </div>

                  {staff.breaks && staff.breaks.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 opacity-60">
                        <Clock className="w-3.5 h-3.5" />
                        Break Schedule
                      </span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {staff.breaks[0].start} – {staff.breaks[0].end} ({staff.breaks[0].label || 'Lunch'})
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 opacity-60">
                      <Calendar className="w-3.5 h-3.5" />
                      Active Bookings
                    </span>
                    <span className="font-extrabold text-lime-600 dark:text-lime-400">
                      {staffApps.length} slots
                    </span>
                  </div>

                  {/* Scheduled Leave or Busy Period Alert */}
                  {staff.leaves && staff.leaves.length > 0 && (
                    <div className="pt-2">
                      <div className="p-2 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/25 text-[11px] text-rose-700 dark:text-rose-300 font-semibold flex items-center justify-between">
                        <span>Leave: {staff.leaves[0].date}</span>
                        <span className="opacity-80">({staff.leaves[0].reason})</span>
                      </div>
                    </div>
                  )}

                  {staff.busyPeriods && staff.busyPeriods.length > 0 && (
                    <div className="pt-1">
                      <div className="p-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/25 text-[11px] text-amber-800 dark:text-amber-300 font-semibold flex items-center justify-between">
                        <span>Reserved Block ({staff.busyPeriods[0].start} - {staff.busyPeriods[0].end})</span>
                        <span className="opacity-80">{staff.busyPeriods[0].date}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Specialties */}
                <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-slate-800">
                  <span className="text-[10px] font-bold opacity-50 block mb-1.5 uppercase tracking-wider">
                    Assigned Specialties
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {staff.specialties.map((sp) => (
                      <span
                        key={sp}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${
                          isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Utilization Bar */}
              <div className="pt-4 border-t border-slate-200/40 dark:border-slate-800 space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="opacity-60">Utilization Rate</span>
                  <span className="font-extrabold text-lime-600 dark:text-lime-400">{utilPct}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-lime-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${utilPct}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
