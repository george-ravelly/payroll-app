// src/custom.d.ts

// Para CSS Modules (.module.css)
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Para CSS Global (.css)
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Se usar SCSS/SASS
declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}   