const  { loadLanguage, langNames, langs }= require( '@uiw/codemirror-extensions-langs');

loadLanguage('tsx');
langs.tsx();

console.log('langNames:', langNames); // => "jsx" | "typescript" | "javascript" | "tsx"
