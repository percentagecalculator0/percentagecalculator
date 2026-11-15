import en from "@/messages/en.json";
import es from "@/messages/es.json";
import fr from "@/messages/fr.json";
import de from "@/messages/de.json";

export type Messages = typeof en;
// Add one import + one line here when you add a language.
const ALL: Record<string, Messages> = { en, es, fr, de } as unknown as Record<string, Messages>;

export function getMessages(code: string): Messages {
  return ALL[code] ?? en;
}
