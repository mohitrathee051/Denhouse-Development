import type { Metadata } from "next";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAllInquiries } from "@/lib/data/inquiries";
import { formatDate, humanizeEnum } from "@/lib/utils/formatting";

export const metadata: Metadata = { title: "Inquiries" };

export default async function AdminInquiriesPage() {
  const inquiries = await getAllInquiries();

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-semibold text-ink">Inquiries</h1>
      <p className="max-w-2xl text-sm text-muted">
        Website contact form messages are delivered to your email through Formspree. This screen lists
        inquiries stored in the database, ready for future features such as lead tracking.
      </p>
      {inquiries.length === 0 ? (
        <EmptyState title="No stored inquiries." description="Check your email inbox for messages sent through the contact form." />
      ) : (
        <div className="overflow-x-auto rounded-card border border-navy-100 bg-white shadow-card">
          <table className="min-w-full divide-y divide-navy-100 text-sm">
            <thead className="bg-navy-50 text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th scope="col" className="px-4 py-3">From</th>
                <th scope="col" className="px-4 py-3">Service</th>
                <th scope="col" className="px-4 py-3">Message</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{inquiry.name}</p>
                    <p className="text-xs text-muted">{inquiry.email}{inquiry.phone ? ` · ${inquiry.phone}` : ""}</p>
                  </td>
                  <td className="px-4 py-3">{humanizeEnum(inquiry.service)}</td>
                  <td className="max-w-xs px-4 py-3 text-muted"><p className="line-clamp-2">{inquiry.message}</p></td>
                  <td className="px-4 py-3">{humanizeEnum(inquiry.status)}</td>
                  <td className="whitespace-nowrap px-4 py-3">{formatDate(inquiry.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
