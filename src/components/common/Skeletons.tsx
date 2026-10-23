import React from 'react'

interface SkeletonProps {
  className?: string
}

export const SkeletonBase: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div
    className={`skeleton-shimmer rounded-xl bg-slate-200/70 dark:bg-slate-800/60 ${className}`}
  />
)

/**
 * Skeleton for Step 1: Choose a Service
 */
export const SkeletonServicesList: React.FC = () => (
  <div className="space-y-3" role="status" aria-busy="true">
    <span className="sr-only">Loading services...</span>
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="p-4 sm:p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/70 flex items-center justify-between gap-4 bg-white/40 dark:bg-[#121927]/60"
      >
        <div className="flex items-center gap-4 flex-1">
          <SkeletonBase className="w-12 h-12 rounded-xl shrink-0" />
          <div className="space-y-2 flex-1">
            <SkeletonBase className="h-4 w-1/3" />
            <SkeletonBase className="h-3 w-1/4" />
            <SkeletonBase className="h-3 w-2/3" />
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <SkeletonBase className="h-6 w-12 rounded-md" />
          <SkeletonBase className="w-6 h-6 rounded-full" />
        </div>
      </div>
    ))}
  </div>
)

/**
 * Skeleton for Step 2: Select Staff Member
 */
export const SkeletonStaffList: React.FC = () => (
  <div className="grid sm:grid-cols-2 gap-4" role="status" aria-busy="true">
    <span className="sr-only">Loading staff members...</span>
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/70 flex flex-col justify-between gap-4 bg-white/40 dark:bg-[#121927]/60"
      >
        <div className="flex items-center gap-3">
          <SkeletonBase className="w-14 h-14 rounded-2xl shrink-0" />
          <div className="space-y-2 flex-1">
            <SkeletonBase className="h-4 w-1/2" />
            <SkeletonBase className="h-3 w-1/3" />
            <SkeletonBase className="h-3 w-1/4" />
          </div>
        </div>
        <div className="pt-3 border-t border-slate-200/40 dark:border-slate-800/60 flex items-center justify-between">
          <div className="flex gap-2">
            <SkeletonBase className="h-4 w-16 rounded-md" />
            <SkeletonBase className="h-4 w-16 rounded-md" />
          </div>
          <SkeletonBase className="w-5 h-5 rounded-full" />
        </div>
      </div>
    ))}
  </div>
)

/**
 * Skeleton for Step 3: Select Date & Time
 */
export const SkeletonCalendarSlots: React.FC = () => (
  <div className="grid md:grid-cols-12 gap-6 items-start" role="status" aria-busy="true">
    <span className="sr-only">Loading availability schedule...</span>
    {/* Calendar grid skeleton */}
    <div className="md:col-span-6 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/70 bg-white/40 dark:bg-[#0f1624]/60 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <SkeletonBase className="h-5 w-28" />
        <SkeletonBase className="h-4 w-20" />
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 28 }).map((_, idx) => (
          <SkeletonBase key={idx} className="h-8 rounded-lg" />
        ))}
      </div>
    </div>

    {/* Time slots skeleton */}
    <div className="md:col-span-6 space-y-3">
      <div className="flex justify-between items-center">
        <SkeletonBase className="h-4 w-28" />
        <SkeletonBase className="h-4 w-20 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 8 }).map((_, idx) => (
          <SkeletonBase key={idx} className="h-11 rounded-xl" />
        ))}
      </div>
    </div>
  </div>
)

/**
 * Skeleton for Booking Summary Sidebar Card
 */
export const SkeletonSummaryCard: React.FC = () => (
  <div
    className="rounded-3xl p-6 border border-slate-200/60 dark:border-slate-800/70 space-y-5 bg-white/40 dark:bg-[#121927]/60"
    role="status"
    aria-busy="true"
  >
    <span className="sr-only">Loading booking summary...</span>
    <SkeletonBase className="h-5 w-1/2" />
    <SkeletonBase className="h-36 w-full rounded-2xl" />
    <div className="space-y-3">
      <SkeletonBase className="h-4 w-full" />
      <SkeletonBase className="h-4 w-3/4" />
      <SkeletonBase className="h-4 w-2/3" />
    </div>
    <div className="pt-4 border-t border-slate-200/40 dark:border-slate-800/60 flex justify-between">
      <SkeletonBase className="h-6 w-16" />
      <SkeletonBase className="h-6 w-20" />
    </div>
  </div>
)

/**
 * Skeleton for Dashboard 4 KPI Overview Cards
 */
export const SkeletonKPIGrid: React.FC = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" role="status" aria-busy="true">
    <span className="sr-only">Loading metrics...</span>
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/70 space-y-3 bg-white/40 dark:bg-[#121927]/60"
      >
        <div className="flex justify-between items-center">
          <SkeletonBase className="h-4 w-20" />
          <SkeletonBase className="w-8 h-8 rounded-lg" />
        </div>
        <SkeletonBase className="h-8 w-24" />
        <SkeletonBase className="h-3 w-16" />
      </div>
    ))}
  </div>
)

/**
 * Skeleton for Dashboard Appointments Table / List
 */
export const SkeletonAppointmentsTable: React.FC = () => (
  <div className="space-y-3" role="status" aria-busy="true">
    <span className="sr-only">Loading appointments...</span>
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/70 flex items-center justify-between gap-4 bg-white/40 dark:bg-[#121927]/60"
      >
        <div className="flex items-center gap-3">
          <SkeletonBase className="w-10 h-10 rounded-full shrink-0" />
          <div className="space-y-1.5">
            <SkeletonBase className="h-4 w-32" />
            <SkeletonBase className="h-3 w-20" />
          </div>
        </div>
        <div className="hidden sm:flex flex-col space-y-1.5">
          <SkeletonBase className="h-3 w-24" />
          <SkeletonBase className="h-3 w-16" />
        </div>
        <SkeletonBase className="h-6 w-20 rounded-full" />
      </div>
    ))}
  </div>
)

/**
 * Skeleton for Dashboard Calendar Week Grid
 */
export const SkeletonCalendarView: React.FC = () => (
  <div
    className="p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/70 space-y-4 bg-white/40 dark:bg-[#121927]/60"
    role="status"
    aria-busy="true"
  >
    <span className="sr-only">Loading calendar...</span>
    <div className="flex justify-between items-center pb-4 border-b border-slate-200/40 dark:border-slate-800/60">
      <SkeletonBase className="h-6 w-40" />
      <div className="flex gap-2">
        <SkeletonBase className="h-8 w-16 rounded-xl" />
        <SkeletonBase className="h-8 w-16 rounded-xl" />
      </div>
    </div>
    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <SkeletonBase className="h-10 w-full rounded-xl" />
          <SkeletonBase className="h-24 w-full rounded-xl" />
          <SkeletonBase className="h-16 w-full rounded-xl" />
        </div>
      ))}
    </div>
  </div>
)

/**
 * Skeleton for Dashboard Analytics Charts
 */
export const SkeletonAnalyticsCharts: React.FC = () => (
  <div className="space-y-6" role="status" aria-busy="true">
    <span className="sr-only">Loading analytics charts...</span>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/70 space-y-2 bg-white/40 dark:bg-[#121927]/60"
        >
          <SkeletonBase className="h-3 w-16" />
          <SkeletonBase className="h-7 w-24" />
        </div>
      ))}
    </div>
    <div className="p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/70 bg-white/40 dark:bg-[#121927]/60 space-y-4">
      <div className="flex justify-between">
        <SkeletonBase className="h-5 w-36" />
        <SkeletonBase className="h-4 w-20" />
      </div>
      <div className="h-64 flex items-end justify-between gap-2 pt-8">
        {Array.from({ length: 14 }).map((_, i) => (
          <SkeletonBase
            key={i}
            className="w-full rounded-t-lg"
            // Use varying heights without layout shift
            {...({ style: { height: `${30 + (i % 5) * 15}%` } } as React.HTMLAttributes<HTMLDivElement>)}
          />
        ))}
      </div>
    </div>
  </div>
)

/**
 * Skeleton for Automation Feed & Activity
 */
export const SkeletonAutomationFeed: React.FC = () => (
  <div className="space-y-4" role="status" aria-busy="true">
    <span className="sr-only">Loading automation triggers...</span>
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/70 flex items-start gap-4 bg-white/40 dark:bg-[#121927]/60"
      >
        <SkeletonBase className="w-10 h-10 rounded-xl shrink-0" />
        <div className="space-y-2 flex-1">
          <SkeletonBase className="h-4 w-1/3" />
          <SkeletonBase className="h-3 w-3/4" />
        </div>
        <SkeletonBase className="h-5 w-16 rounded-full" />
      </div>
    ))}
  </div>
)
