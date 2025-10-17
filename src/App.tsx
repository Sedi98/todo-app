import "./App.css";
import { useState, useEffect } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Home from "./Home";

const supabase = createClient(
  "https://hdclkrphjeayavajthir.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkY2xrcnBoamVheWF2YWp0aGlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NTc5MDQsImV4cCI6MjA3NjEzMzkwNH0.eVbWVYVP4Y15qHFxY__pXt-SElFVeHvj4QbbWJZ7r6w"
);

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto h-screen p-2">
        <Auth
          supabaseClient={supabase}
          providers={[]}
          appearance={{ theme: ThemeSupa }}
          localization={{
            variables: {
              sign_in: {
                email_label: "E-poçt ",
                password_label: "Şifrə",
                email_input_placeholder: "E-poçt adresinizi daxil edin",
                password_input_placeholder: "Şifrənizi daxil edin",
                button_label: "Daxil ol",
              },
            },
          }}
        />
      </div>
    );
  } else {
    return <Home />;
  }
}
