module.exports = {
      content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
      ],
      theme: {
        extend: {
          colors: {
            primary: '#2563eb',
            secondary: '#1e40af',
            premium: '#f59e0b'
          },
          animation: {
            'bounce-slow': 'bounce 3s infinite',
          }
        },
      },
      plugins: [],
    }
