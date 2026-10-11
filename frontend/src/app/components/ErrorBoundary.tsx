import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an unhandled error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = "/";
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            background: "#0C0C0C",
            color: "#D7E2EA",
            fontFamily: "'Kanit', sans-serif",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              maxWidth: "540px",
              width: "100%",
              background: "rgba(215, 226, 234, 0.03)",
              border: "1px solid rgba(215, 226, 234, 0.15)",
              borderRadius: "24px",
              padding: "clamp(1.5rem, 4vw, 2.5rem)",
              textAlign: "center",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
            }}
          >
            {/* Warning Icon with Accent Glow */}
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(244, 63, 94, 0.1)",
                border: "1px solid rgba(244, 63, 94, 0.3)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
                color: "#fb7185",
              }}
            >
              <AlertTriangle size={32} />
            </div>

            <h1
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "0.75rem",
                lineHeight: 1.2,
              }}
            >
              Une erreur inattendue est survenue
            </h1>

            <p
              style={{
                color: "rgba(215, 226, 234, 0.75)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                fontWeight: 300,
                marginBottom: "2rem",
              }}
            >
              L&apos;application a rencontré un problème imprévu. Vous pouvez
              recharger la page ou revenir à l&apos;accueil.
            </p>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  background:
                    "linear-gradient(123deg, #023e8a 7%, #0077b6 37%, #00b4d8 72%, #90e0ef 100%)",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "0.75rem 1.5rem",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "opacity 0.2s",
                }}
              >
                <RotateCcw size={16} />
                Recharger
              </button>

              <button
                type="button"
                onClick={this.handleReset}
                style={{
                  background: "rgba(215, 226, 234, 0.08)",
                  color: "#D7E2EA",
                  border: "1px solid rgba(215, 226, 234, 0.25)",
                  borderRadius: "9999px",
                  padding: "0.75rem 1.5rem",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "background 0.2s",
                }}
              >
                <Home size={16} />
                Accueil
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
