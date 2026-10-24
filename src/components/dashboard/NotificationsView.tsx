import React, { useState } from 'react'
import {
  Smartphone,
  Mail,
  CheckCheck,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { NotificationItem } from '../../types'

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, theme } = useApp()
  const isDark = theme === 'dark'
  const [selectedChannel, setSelectedChannel] = useState<string>('all')
  const [activePreview, setActivePreview] = useState<NotificationItem | null>(notifications[0] || null)

  const filtered = notifications.filter((n) => {
    if (selectedChannel !== 'all' && n.channel !== selectedChannel) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Notification Centre</h1>
          <p className="text-xs sm:text-sm opacity-60">
            Inspect simulated multi-channel messaging: 24h & 1h SMS reminders and calendar sync emails.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className={`px-4 py-2 rounded-full text-xs font-bold border shadow-sm flex items-center gap-1.5 self-start sm:self-auto ${
            isDark
              ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
              : 'bg-white border-stone-300 text-stone-800 hover:bg-stone-50'
          }`}
        >
          <CheckCheck className="w-3.5 h-3.5 text-[#dfc299]" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Main Grid: Notification list and Interactive Device Preview */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List */}
        <div
          className={`lg:col-span-7 rounded-3xl p-6 space-y-4 transition-all border ${
            isDark ? 'neu-raised border-[#c5a880]/20' : 'neu-raised border-[#c5a880]/30'
          }`}
        >
          {/* Channel Filter Chips */}
          <div className="flex items-center gap-2 pb-3 border-b border-stone-200/40 dark:border-stone-800">
            {['all', 'sms', 'email', 'system'].map((ch) => (
              <button
                key={ch}
                onClick={() => setSelectedChannel(ch)}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${
                  selectedChannel === ch
                    ? 'neu-gold-btn shadow-sm'
                    : isDark
                    ? 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filtered.map((item) => {
              const isSelected = activePreview?.id === item.id
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActivePreview(item)
                    if (!item.read) markNotificationRead(item.id)
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#c5a880] bg-[#c5a880]/10 ring-2 ring-[#c5a880]/30'
                      : item.read
                      ? isDark
                        ? 'bg-[#151210] border-stone-800/80 opacity-70'
                        : 'bg-stone-50 border-stone-200/70 opacity-75'
                      : isDark
                      ? 'bg-[#191512] border-stone-700 shadow-md'
                      : 'bg-white border-stone-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                          item.channel === 'sms'
                            ? 'bg-emerald-500/20 text-emerald-500'
                            : item.channel === 'email'
                            ? 'bg-blue-500/20 text-blue-500'
                            : 'bg-purple-500/20 text-purple-500'
                        }`}
                      >
                        {item.channel === 'sms' ? (
                          <Smartphone className="w-3.5 h-3.5" />
                        ) : (
                          <Mail className="w-3.5 h-3.5" />
                        )}
                      </span>
                      <span className="text-xs font-bold">{item.title}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] opacity-50 font-medium">
                        {item.timestamp}
                      </span>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-[#dfc299] animate-pulse" />
                      )}
                    </div>
                  </div>

                  <p className="text-xs opacity-70 line-clamp-2 pl-9">{item.message}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Simulated Mobile SMS or Email Device Preview */}
        <div
          className={`lg:col-span-5 rounded-3xl p-6 space-y-4 transition-all border ${
            isDark ? 'neu-raised border-[#c5a880]/20' : 'neu-raised border-[#c5a880]/30'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/40 dark:border-stone-800">
            <h3 className="text-sm font-bold">Live Delivery Simulation</h3>
            <span className="text-[10px] font-bold uppercase bg-[#c5a880]/20 text-[#dfc299] px-2.5 py-0.5 rounded-full border border-[#c5a880]/30">
              {activePreview?.channel === 'sms' ? 'SMS Message' : 'HTML Email'}
            </span>
          </div>

          {activePreview ? (
            <div
              className={`rounded-3xl p-5 shadow-2xl space-y-4 border ${
                isDark ? 'bg-[#151210] text-white border-stone-800' : 'bg-stone-900 text-white border-stone-800'
              }`}
            >
              {/* Simulated Phone Top Header */}
              <div className="flex items-center justify-between border-b border-stone-800 pb-3 text-xs opacity-70">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#dfc299]" />
                  <span className="font-bold text-stone-200">
                    {activePreview.channel === 'sms' ? 'Dawnexus Bookly (SMS)' : 'Bookly Notifications'}
                  </span>
                </div>
                <span>9:41 AM</span>
              </div>

              {/* Message Bubble Body */}
              {activePreview.channel === 'sms' ? (
                <div className="space-y-3 py-4">
                  <div className="bg-gradient-to-br from-[#dfc299] to-[#c5a880] text-[#0c0a09] p-4 rounded-2xl rounded-tl-sm text-xs shadow-md font-semibold leading-relaxed">
                    <p className="font-black mb-1">Bookly Automated Alert</p>
                    <p>{activePreview.message}</p>
                    <p className="text-[10px] text-[#0c0a09] mt-2 font-mono">
                      Reply RESCHEDULE to move or CANCEL to decline.
                    </p>
                  </div>
                  <span className="text-[10px] opacity-50 block text-right">
                    Delivered via simulated carrier
                  </span>
                </div>
              ) : (
                <div className="bg-white text-stone-900 p-5 rounded-2xl text-xs space-y-3 shadow-lg">
                  <div className="border-b border-stone-100 pb-2">
                    <span className="text-[10px] font-bold text-[#8c6d42] uppercase tracking-wider block">
                      Automated Confirmation & Calendar Invite
                    </span>
                    <h4 className="text-sm font-bold text-stone-900 mt-0.5">
                      {activePreview.title}
                    </h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{activePreview.message}</p>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                    <p>• ics_calendar_invite.ics attached</p>
                    <p>• Automated 24h & 1h alert triggers active</p>
                  </div>
                  <div className="pt-2 text-[10px] text-slate-400 text-center">
                    Simulated email output • Built by Dawnexus
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs opacity-50 text-center py-8">
              Select a notification on the left to preview simulated customer delivery.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
