/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",

    "./src/**/*.{ts,tsx}",
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // "./packages/ui/**/*.{js,ts,jsx,tsx,mdx}",

    // "./**/*.{js,ts,jsx,tsx,mdx}",

    // "./src/**/*.tsx",
    // "./components/**/*.{js,ts,jsx,tsx}",
    // "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",

    // below are for applying tailwind styles, the paths are w.r.t. subfolders of apps/ directory
    "../../packages/ui/src/**/*.tsx",
    "../../packages/ui/components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/node_modules/@tremor/**/*.{js,ts,jsx,tsx,cjs}", // Tremor module
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      theme: {
        mixBlendMode: {
          multiply: "multiply",
          // Add more blend modes as needed
        },
      },
      colors: {
        border: "hsl(var(--border))",
        borderhover: "hsl(var(--border-hover))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        backgroundalt: "hsl(var(--background-alt))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          25: "#FFFAF8",
          50: "#FEF2EC",
          100: "#FDE5D8",
          200: "#FCD8C5",
          300: "#FABE9E",
          400: "#F8A477",
          500: "#F68A51",
          600: "#F3681B",
          700: "#EA5C45",
          800: "#C24A0A",
          900: "#E9590C",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          600: "#1F2747",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          50: "#ECFDF3",
          500: "#12B76A",
          600: "#039855",
          700: "#027A48",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "gray-blue": {
          700: "#363F72",
          800: "#293056",
          900: "#101323",
        },
        settings: {
          DEFAULT: "#FEF2EC",
          hover: "#E9590C",
          gray: "#667085",
        },
        textBox: {
          DEFAULT: "#EAECF0",
          orange: "#F8A477",
        },
        tint: {
          DEFAULT: "hsl(var(--tint))",
          foreground: "hsl(var(--tint-foreground))",
        },
        // tremor overrides
        // light mode
        tremor: {
          brand: {
            faint: "#FDE5D8", // primary-100
            muted: "#FABE9E", // primary-300
            subtle: "#F8A477", // primary-400
            DEFAULT: "#F3681B", // primary-500
            emphasis: "#EA5C45", // primary-700
            inverted: "#ffffff", // white
          },
          background: {
            muted: "#f9fafb", // gray-50
            subtle: "#f3f4f6", // gray-100
            DEFAULT: "#ffffff", // white
            emphasis: "#374151", // gray-700
          },
          border: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          ring: {
            DEFAULT: "#e5e7eb", // gray-200
          },
          content: {
            subtle: "#9ca3af", // gray-400
            DEFAULT: "#6b7280", // gray-500
            emphasis: "#374151", // gray-700
            strong: "#111827", // gray-900
            inverted: "#ffffff", // white
          },
        },
      },
      backgroundImage: {
        "saasmonk-unknown-avatar":
          "linear-gradient(180deg,#F7931E -6.42%,#F6911D 18.92%,#F68A1D 28.42%, #F57E1C 34.75%, #F36C1B 41.08%, #F3681B 42.67%, #2D2DA0 117.08%)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "spin-clockwise": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
      },
      boxShadow: {
        box: "0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08);",
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-clockwise": "spin-clockwise 1s linear infinite",
      },
      spacing: {
        4.5: "18px",
      },
      transitionProperty: {
        height: "height",
      },
      zIndex: {
        100: "100",
      },
      width: {
        "chat-panel": "24%",
        "flow-node": "221px",
      },
      maxWidth: {
        "chat-message": "265px",
      },
      fontSize: {
        "tremor-label": ["0.75rem"],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.gray[900]"),
            "--tw-prose-headings": theme("colors.gray[900]"),
            "--tw-prose-lead": theme("colors.gray[900]"),
            "--tw-prose-links": theme("colors.gray[900]"),
            "--tw-prose-bold": theme("colors.gray[900]"),
            "--tw-prose-counters": theme("colors.gray[900]"),
            "--tw-prose-bullets": theme("colors.gray[900]"),
            "--tw-prose-hr": theme("colors.gray[900]"),
            "--tw-prose-quotes": theme("colors.gray[900]"),
            "--tw-prose-quote-borders": theme("colors.gray[900]"),
            "--tw-prose-captions": theme("colors.gray[900]"),
            "--tw-prose-code": theme("colors.gray[900]"),
            "--tw-prose-pre-code": theme("colors.gray[200]"),
            "--tw-prose-pre-bg": theme("colors.gray[800]"),
            "--tw-prose-th-borders": theme("colors.gray[900]"),
            "--tw-prose-td-borders": theme("colors.gray[900]"),
            "--tw-prose-invert-body": theme("colors.gray[900]"),
            code: {
              color: theme("colors.gray[900]"),
              backgroundColor: theme("colors.slate.200"),
              borderRadius: theme("borderRadius.sm"),
              paddingTop: theme("padding[1]"),
              paddingRight: theme("padding[1.5]"),
              paddingBottom: theme("padding[1]"),
              paddingLeft: theme("padding[1.5]"),
            },
            "code::before": {
              content: "normal",
            },
            "code::after": {
              content: "normal",
            },
          },
        },
        bot: {
          css: {
            "--tw-prose-body": theme("colors.white"),
            "--tw-prose-headings": theme("colors.white"),
            "--tw-prose-lead": theme("colors.white"),
            "--tw-prose-links": theme("colors.white"),
            "--tw-prose-bold": theme("colors.white"),
            "--tw-prose-counters": theme("colors.white"),
            "--tw-prose-bullets": theme("colors.white"),
            "--tw-prose-hr": theme("colors.white"),
            "--tw-prose-quotes": theme("colors.white"),
            "--tw-prose-quote-borders": theme("colors.white"),
            "--tw-prose-captions": theme("colors.white"),
            "--tw-prose-code": theme("colors.gray[900]"),
            "--tw-prose-pre-code": theme("colors.gray[200]"),
            "--tw-prose-pre-bg": theme("colors.gray[800]"),
            "--tw-prose-th-borders": theme("colors.white"),
            "--tw-prose-td-borders": theme("colors.white"),
            "--tw-prose-invert-body": theme("colors.white"),
            code: {
              color: theme("colors.white"),
              backgroundColor: theme("colors.primary.500"),
              borderRadius: theme("borderRadius.sm"),
              paddingTop: theme("padding[1]"),
              paddingRight: theme("padding[1.5]"),
              paddingBottom: theme("padding[1]"),
              paddingLeft: theme("padding[1.5]"),
            },
            "code::before": {
              content: "normal",
            },
            "code::after": {
              content: "normal",
            },
            "pre code": {
              backgroundColor: "transparent",
            },
          },
        },
        sm: {
          css: {
            "line-height": "1.25rem",
            img: {
              marginTop: theme("margin[3]"),
              marginBottom: theme("margin[3]"),
              width: "100%",
            },
            p: {
              marginTop: theme("margin[3]"),
              marginBottom: theme("margin[3]"),
            },
          },
        },
      }),
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    // require("@headlessui/tailwindcss"),
    require("tailwindcss-animate"),
    // require("tailwind-scrollbar-hide"),
    // require("@tailwindcss/typography"),
  ],
};
