import "./globals.css";

export const metadata = {
  title: "Messih Match Analytics",
  description: "AI-powered football match analysis and prediction platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
