import { H2, P } from "@/components/ui/typography";
interface HeaderText {
  title: string;
  subtitle?: string;
}
export function HeaderText({ title, subtitle }: HeaderText) {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <H2>{title}</H2>
      <P>{subtitle}</P>
    </div>
  );
}
