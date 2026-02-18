import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Guard against missing Supabase environment variables
const requiredEnvVars = [
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_PUBLISHABLE_KEY",
] as const;

const missingVars = requiredEnvVars.filter(
  (key) => !import.meta.env[key]
);

if (missingVars.length > 0) {
  const root = document.getElementById("root")!;
  root.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:system-ui;padding:2rem;text-align:center;">
      <div>
        <h1 style="font-size:1.5rem;font-weight:700;margin-bottom:1rem;color:#1a1a2e;">Configuration Error</h1>
        <p style="color:#64748b;max-width:420px;line-height:1.6;">
          Missing required environment variables: <strong>${missingVars.join(", ")}</strong>. 
          Please check your project configuration.
        </p>
      </div>
    </div>
  `;
} else {
  createRoot(document.getElementById("root")!).render(<App />);
}
