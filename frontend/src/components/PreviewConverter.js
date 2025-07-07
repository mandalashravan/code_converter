import React, { useState, useEffect } from "react";

const languageOptions = [
  "Python", "JavaScript", "Java", "C", "C++",
  "C#", "Go", "Ruby", "PHP", "TypeScript", "Swift", "Kotlin"
];

const defaultCode = {
  Python: `print("Welcome to Code Converter")`,
  JavaScript: `console.log("Welcome to Code Converter");`,
  Java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Welcome to Code Converter");\n  }\n}`,
  C: `#include <stdio.h>\nint main() {\n  printf("Welcome to Code Converter");\n  return 0;\n}`,
  "C++": `#include <iostream>\nint main() {\n  std::cout << "Welcome to Code Converter";\n  return 0;\n}`,
  "C#": `using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine("Welcome to Code Converter");\n  }\n}`,
  Go: `package main\nimport "fmt"\nfunc main() {\n  fmt.Println("Welcome to Code Converter")\n}`,
  Ruby: `puts "Welcome to Code Converter"`,
  PHP: `<?php\necho "Welcome to Code Converter";\n?>`,
  TypeScript: `console.log("Welcome to Code Converter");`,
  Swift: `print("Welcome to Code Converter")`,
  Kotlin: `fun main() {\n  println("Welcome to Code Converter")\n}`
};

const PreviewConverter = () => {
  const [sourceLang, setSourceLang] = useState("Python");
  const [targetLang, setTargetLang] = useState("JavaScript");
  const [sourceCode, setSourceCode] = useState(defaultCode["Python"]);
  const [targetCode, setTargetCode] = useState("");
  const [converted, setConverted] = useState(false);

  const handleConvert = () => {
    setTargetCode(defaultCode[targetLang]);
    setConverted(true);
  };

  const handleSwap = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    setSourceCode(defaultCode[targetLang]);
    setTargetCode("");
    setConverted(false);
  };

  useEffect(() => {
    setSourceCode(defaultCode[sourceLang]);
    setTargetCode("");
    setConverted(false);
  }, [sourceLang, targetLang]);

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 text-white font-sans">
      <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex flex-col items-center md:flex-row md:items-center gap-4 w-full md:justify-center">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="bg-gray-700 p-3 rounded-lg text-white w-full md:w-64 focus:outline-none"
          >
            {languageOptions.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
          <button
            onClick={handleSwap}
            className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-full transition-transform hover:scale-110"
          >
            ⇄
          </button>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="bg-gray-700 p-3 rounded-lg text-white w-full md:w-64 focus:outline-none"
          >
            {languageOptions.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-6 md:mt-8">
        <div className="bg-gray-900 p-4 rounded-xl md:rounded-2xl border-2 border-transparent bg-clip-padding" style={{ borderRadius: "18px" }}>
          <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent font-heading">
            {sourceLang} Code
          </h3>
          <pre className="overflow-x-auto whitespace-pre-wrap monospace" style={{ fontSize: "13px" }}>{sourceCode}</pre>
        </div>
        <button
          onClick={handleConvert}
          className="my-2 bg-gradient-to-r from-brand-purple to-brand-pink hover:from-brand-pink hover:to-brand-purple text-white font-semibold py-2 px-6 rounded-lg transition hover:scale-105 self-center"
        >
          Convert
        </button>
        <div className="bg-gray-900 p-4 rounded-xl md:rounded-2xl border-2 border-transparent bg-clip-padding" style={{ borderRadius: "18px" }}>
          <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent font-heading">{targetLang} Code</h3>
          {converted ? (
            <pre className="overflow-x-auto whitespace-pre-wrap monospace" style={{ fontSize: "13px" }}>{targetCode}</pre>
          ) : (
            <pre className="overflow-x-auto whitespace-pre-wrap italic opacity-60 monospace" style={{ fontSize: "13px", color: "#9ca3af" }}>
              {/* Press Convert to see output */}
              Press Convert to see output
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewConverter;


