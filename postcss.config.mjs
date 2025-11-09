const config = {
  plugins: {
    "@tailwindcss/postcss": {
      config: {
        content: [
          './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
          './src/components/**/*.{js,ts,jsx,tsx,mdx}',
          './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        ],
        theme: {
          extend: {
            colors: {
              primary: 'var(--primary)',
              'primary-foreground': 'var(--primary-foreground)',
              secondary: 'var(--secondary)',
              'secondary-foreground': 'var(--secondary-foreground)',
              accent: 'var(--accent)',
              'accent-foreground': 'var(--accent-foreground)',
              muted: 'var(--muted)',
              'muted-foreground': 'var(--muted-foreground)',
              background: 'var(--background)',
              foreground: 'var(--foreground)',
              card: 'var(--card)',
              'card-foreground': 'var(--card-foreground)',
              popover: 'var(--popover)',
              'popover-foreground': 'var(--popover-foreground)',
              destructive: 'var(--destructive)',
              border: 'var(--border)',
              input: 'var(--input)',
              ring: 'var(--ring)',
            },
          },
        },
        plugins: [(await import('@tailwindcss/typography')).default],
      }
    },
  },
};

export default config;
