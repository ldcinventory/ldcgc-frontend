const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          2: '#eef4ed',
          3: '#c5d9ed',
          4: '#8da9c4',
          6: '#134074',
          7: '#13315c',
          8: '#1c2633',
          9: '#0f151c'
        },
        error: {
          4: '#ef233c',
          6: '#d90429'
        },
        success: {
          2: '#c7f9cc',
          4: '#80ed99',
          6: '#57cc99'
        }
      }
    },
  },
  plugins: [require("daisyui")],
}

export default config
