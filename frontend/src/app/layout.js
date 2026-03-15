import "./globals.css";

export const metadata = {
  title: "Task Manager App",
  description: "Full Stack Task Management Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#0f0f0f",
          color: "white"
        }}
      >
        {children}
      </body>
    </html>
  );
}