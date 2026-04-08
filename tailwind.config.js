const config = {
        theme: {
          extend: {
            colors: {
              bg: "#080810",
              "bg-secondary": "#0D0D1A",
              surface: "#13131F",
              "surface-hover": "#1A1A2E",
              gold: "#C9A227",
              "gold-light": "#E8C84A",
              "gold-glow": "rgba(201,162,39,0.15)",
              violet: "#6C3FE8",
              "violet-glow": "#6C3FE826",
              text: "#F4F0E6",
              "text-secondary": "#A3A0B8",
              muted: "#6B6B80",
              border: "rgba(201,162,39,0.12)",
              "border-premium": "rgba(201,162,39,0.22)",
            },
            fontFamily: {
              sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
              display: ["Inter", "system-ui", "-apple-system", "sans-serif"],
            },
            maxWidth: {
              shell: "1280px",
            },
            boxShadow: {
              gold: "0 0 30px #C9A84C15",
              violet: "0 0 45px #6C3FE826",
              premium: "0 24px 80px rgba(0, 0, 0, 0.45)",
            },
            backgroundImage: {
              "gold-gradient": "linear-gradient(135deg, #C9A84C 0%, #E8C96B 100%)",
              "gold-text":
                "linear-gradient(90deg, #C9A84C 0%, #E8C96B 50%, #C9A84C 100%)",
            },
            keyframes: {
              shimmer: {
                "0%": { transform: "translateX(-140%)" },
                "100%": { transform: "translateX(160%)" },
              },
              pulseDot: {
                "0%, 100%": { opacity: "0.75", transform: "scale(1)" },
                "50%": { opacity: "1", transform: "scale(1.35)" },
              },
              floatGlow: {
                "0%, 100%": { transform: "translate3d(0, 0, 0)" },
                "50%": { transform: "translate3d(0, -14px, 0)" },
              },
              marqueeShimmer: {
                "0%": { backgroundPosition: "-200% center" },
                "100%": { backgroundPosition: "200% center" },
              },
            },
            animation: {
              shimmer: "shimmer 1.9s linear infinite",
              pulseDot: "pulseDot 1.8s ease-in-out infinite",
              floatGlow: "floatGlow 8s ease-in-out infinite",
              marqueeShimmer: "marqueeShimmer 6s linear infinite",
            },
          },
        },
      };

module.exports = {
  ...config,
  content: ["./index.html", "./app.jsx"],
};
