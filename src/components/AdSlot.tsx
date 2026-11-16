// Reserved space for a Google AdSense unit. Fixed min-height prevents layout shift.
// The AdSense script and <ins> tag are added in Stage 5 once your publisher ID is set.
export default function AdSlot({ label, slot }: { label: string; slot: string }) {
  return (
    <aside className="ad" aria-label={label} data-ad-slot={slot}>
      <span className="ad-label">{label}</span>
    </aside>
  );
}
