// Array that maps the programming languages IDs from the backend to the Ace editor mode names
const programmingLanguages = [
  { id: 45, name: 'Assembly (NASM 2.14.02)', aceMode: 'assembly_x86' },
  { id: 46, name: 'Bash (5.0.0)', aceMode: 'sh' },
  { id: 47, name: 'Basic (FBC 1.07.1)', aceMode: 'plain_text' }, // Basic is not available in Ace by default
  { id: 75, name: 'C (Clang 7.0.1)', aceMode: 'c_cpp' },
  { id: 76, name: 'C++ (Clang 7.0.1)', aceMode: 'c_cpp' },
  { id: 48, name: 'C (GCC 7.4.0)', aceMode: 'c_cpp' },
  { id: 52, name: 'C++ (GCC 7.4.0)', aceMode: 'c_cpp' },
  { id: 49, name: 'C (GCC 8.3.0)', aceMode: 'c_cpp' },
  { id: 53, name: 'C++ (GCC 8.3.0)', aceMode: 'c_cpp' },
  { id: 50, name: 'C (GCC 9.2.0)', aceMode: 'c_cpp' },
  { id: 54, name: 'C++ (GCC 9.2.0)', aceMode: 'c_cpp' },
  { id: 86, name: 'Clojure (1.10.1)', aceMode: 'clojure' },
  { id: 51, name: 'C# (Mono 6.6.0.161)', aceMode: 'csharp' },
  { id: 77, name: 'COBOL (GnuCOBOL 2.2)', aceMode: 'cobol' },
  { id: 55, name: 'Common Lisp (SBCL 2.0.0)', aceMode: 'lisp' },
  { id: 56, name: 'D (DMD 2.089.1)', aceMode: 'd' },
  { id: 57, name: 'Elixir (1.9.4)', aceMode: 'elixir' },
  { id: 58, name: 'Erlang (OTP 22.2)', aceMode: 'erlang' },
  { id: 87, name: 'F# (.NET Core SDK 3.1.202)', aceMode: 'fsharp' },
  { id: 59, name: 'Fortran (GFortran 9.2.0)', aceMode: 'fortran' },
  { id: 60, name: 'Go (1.13.5)', aceMode: 'golang' },
  { id: 88, name: 'Groovy (3.0.3)', aceMode: 'groovy' },
  { id: 61, name: 'Haskell (GHC 8.8.1)', aceMode: 'haskell' },
  { id: 62, name: 'Java (OpenJDK 13.0.1)', aceMode: 'java' },
  { id: 63, name: 'JavaScript (Node.js 12.14.0)', aceMode: 'javascript' },
  { id: 78, name: 'Kotlin (1.3.70)', aceMode: 'kotlin' },
  { id: 64, name: 'Lua (5.3.5)', aceMode: 'lua' },
  { id: 79, name: 'Objective-C (Clang 7.0.1)', aceMode: 'objectivec' },
  { id: 65, name: 'OCaml (4.09.0)', aceMode: 'ocaml' },
  { id: 66, name: 'Octave (5.1.0)', aceMode: 'plain_text' }, // Octave is not available in Ace by default
  { id: 67, name: 'Pascal (FPC 3.0.4)', aceMode: 'pascal' },
  { id: 85, name: 'Perl (5.28.1)', aceMode: 'perl' },
  { id: 68, name: 'PHP (7.4.1)', aceMode: 'php' },
  { id: 43, name: 'Plain Text', aceMode: 'plain_text' },
  { id: 69, name: 'Prolog (GNU Prolog 1.4.5)', aceMode: 'prolog' },
  { id: 70, name: 'Python (2.7.17)', aceMode: 'python' },
  { id: 71, name: 'Python (3.8.1)', aceMode: 'python' },
  { id: 80, name: 'R (4.0.0)', aceMode: 'r' },
  { id: 72, name: 'Ruby (2.7.0)', aceMode: 'ruby' },
  { id: 73, name: 'Rust (1.40.0)', aceMode: 'rust' },
  { id: 81, name: 'Scala (2.13.2)', aceMode: 'scala' },
  { id: 82, name: 'SQL (SQLite 3.27.2)', aceMode: 'sql' },
  { id: 83, name: 'Swift (5.2.3)', aceMode: 'swift' },
  { id: 74, name: 'TypeScript (3.7.4)', aceMode: 'typescript' },
  { id: 84, name: 'Visual Basic.Net (vbnc 0.0.0.5943)', aceMode: 'vbscript' },
];

const globalConstants = {
  programmingLanguages,
};

export default globalConstants;
