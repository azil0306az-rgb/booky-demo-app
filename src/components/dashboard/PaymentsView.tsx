import React, { useState } from 'react'
import {
  CreditCard,
  ShieldCheck,
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { PaymentRecord } from '../../types'

export const PaymentsView: React.FC = () => {
  const { payments, simulatePaymentAction, currentIndustry, theme } = useApp()
  const isDark = theme === 'dark'
  const [selectedInvoice, setSelectedInvoice] = useState<PaymentRecord | null>(null)

  const totalCollected = payments
    .filter((p) => p.status === 'successful')
    .reduce((acc, curr) => acc + curr.amount, 0)

  const totalPendingOrFailed = payments
    .filter((p) => p.status === 'failed')
    .reduce((acc, curr) => acc + curr.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Payments & Invoicing</h1>
          <p className="text-xs sm:text-sm opacity-60">
            Simulated invoice ledger, deposit allocations, and automated payment gateway state tests.
          </p>
        </div>
      </div>

      {/* Sandbox Notice Banner */}
      <div
        className={`p-4 rounded-3xl flex items-center gap-3 text-xs border ${
          isDark
            ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}
      >
        <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
        <div>
          <span className="font-bold">Prototype Sandbox Mode:</span> No real monetary transactions are processed. You can simulate successful or failed payments to test automated retry notifications.
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div
          className={`p-5 rounded-3xl space-y-2 transition-all ${
            isDark ? 'neu-raised' : 'neu-raised'
          }`}
        >
          <span className="text-xs font-semibold opacity-60">Total Collected</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-lime-600 dark:text-lime-400">
              ${totalCollected}.00
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded">
              Settled
            </span>
          </div>
          <p className="text-[11px] opacity-50">Cards & digital wallets</p>
        </div>

        <div
          className={`p-5 rounded-3xl space-y-2 transition-all ${
            isDark ? 'neu-raised' : 'neu-raised'
          }`}
        >
          <span className="text-xs font-semibold opacity-60">Failed / Retrying</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-rose-500">
              ${totalPendingOrFailed}.00
            </span>
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded">
              Action Needed
            </span>
          </div>
          <p className="text-[11px] opacity-50">Dunning automation active</p>
        </div>

        <div
          className={`p-5 rounded-3xl space-y-2 transition-all ${
            isDark ? 'neu-raised' : 'neu-raised'
          }`}
        >
          <span className="text-xs font-semibold opacity-60">Invoices Generated</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold">{payments.length}</span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/15 px-2 py-0.5 rounded">
              Total Invoices
            </span>
          </div>
          <p className="text-[11px] opacity-50">Linked to booking refs</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div
        className={`rounded-3xl border overflow-hidden transition-all ${
          isDark ? 'neu-raised' : 'neu-raised'
        }`}
      >
        <div className="p-5 border-b border-slate-200/40 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-base">Simulated Invoice Records</h3>
          <span className="text-xs opacity-60">Click an invoice to inspect</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr
                className={`border-b opacity-60 font-bold uppercase tracking-wider text-[10px] ${
                  isDark ? 'border-slate-800 bg-[#0e1420]' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Simulation Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/30 dark:divide-slate-800/60">
              {payments.map((pay) => (
                <tr
                  key={pay.id}
                  className={`transition-colors ${
                    isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3.5 px-4 font-mono font-bold">{pay.invoiceNumber}</td>
                  <td className="py-3.5 px-4 font-mono text-lime-600 dark:text-lime-400">
                    {pay.appointmentReference}
                  </td>
                  <td className="py-3.5 px-4 font-bold">{pay.customerName}</td>
                  <td className="py-3.5 px-4 font-extrabold">${pay.amount}.00</td>
                  <td className="py-3.5 px-4 uppercase font-bold text-[10px] opacity-60">
                    {pay.type}
                  </td>
                  <td className="py-3.5 px-4 opacity-80">{pay.method}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        pay.status === 'successful'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-400/30'
                          : pay.status === 'failed'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-400/30'
                          : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {pay.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    {pay.status === 'successful' ? (
                      <button
                        onClick={() => simulatePaymentAction(pay.id, 'failed')}
                        className="px-2.5 py-1 rounded-lg border border-rose-500/40 text-rose-500 hover:bg-rose-500/10 text-[10px] font-bold transition-all"
                        title="Simulate card decline to test automated retry"
                      >
                        Simulate Failure
                      </button>
                    ) : (
                      <button
                        onClick={() => simulatePaymentAction(pay.id, 'successful')}
                        className="px-2.5 py-1 rounded-lg bg-lime-400 hover:bg-lime-300 text-slate-950 text-[10px] font-bold shadow-sm transition-all"
                        title="Retry simulated payment"
                      >
                        Simulate Retry Success
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedInvoice(pay)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                        isDark ? 'border-slate-700 bg-slate-800 text-slate-200' : 'border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      View Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div
            className={`rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border space-y-5 ${
              isDark ? 'bg-[#151d2a] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold">
                  Invoice {selectedInvoice.invoiceNumber}
                </h3>
                <p className="text-xs opacity-60">Issued by {currentIndustry.businessName}</p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="opacity-50 hover:opacity-100 font-bold"
              >
                ✕
              </button>
            </div>

            <div
              className={`rounded-2xl p-4 border text-xs space-y-2 ${
                isDark ? 'bg-[#0e1420] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex justify-between">
                <span className="opacity-60">Billed To:</span>
                <strong>{selectedInvoice.customerName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Booking Reference:</span>
                <strong className="font-mono text-lime-600 dark:text-lime-400">
                  {selectedInvoice.appointmentReference}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Timestamp:</span>
                <strong>{selectedInvoice.timestamp}</strong>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Payment Channel:</span>
                <strong>{selectedInvoice.method}</strong>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200/40 dark:border-slate-800 text-sm">
                <span className="font-bold">Total Settled:</span>
                <span className="font-black text-lime-600 dark:text-lime-400">${selectedInvoice.amount}.00</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="w-full py-2.5 rounded-xl bg-lime-400 text-slate-950 font-bold text-xs shadow-md shadow-lime-500/20"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
