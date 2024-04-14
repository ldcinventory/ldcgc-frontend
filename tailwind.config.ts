const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#eef4ed',
          2: '#dde9f0',
          3: '#c5d9ed',
          4: '#8da9c4',
          5: '#6d89a3',
          6: '#496382',
          7: '#303e52',
          8: '#1c2633',
          9: '#0f151c'
        },
        error: {
          1: '#f7c1c8',
          2: '#f57f8e',
          3: '#f54c61',
          4: '#ef233c',
          5: '#d40f31',
          6: '#d90429',
          7: '#8f2230',
          8: '#691a24',
          9: '#3b080e'
        },
        success: {
          2: '#c7f9cc',
          3: '#80ed99',
          4: '#57cc99',
          5: '#3f9972',
          6: '#2a6e4d',
          7: '#1b593b',
          8: '#0d4027',
          9: '#042113',
        }
      }
    },
  },
  plugins: [require("daisyui")],
}

export default config
