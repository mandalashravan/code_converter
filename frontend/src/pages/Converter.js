// Converter.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import Editor from "@monaco-editor/react";
import PopupMessage from "../components/PopupMessage";
import monacoLoader from "@monaco-editor/loader";
import { ArrowPathIcon, ClockIcon } from '@heroicons/react/24/outline';
import History from "../components/History";

const languages = [
  "Python", "JavaScript", "Java", "C", "C++", "C#", "Go", "Ruby", "PHP", "TypeScript", "Swift", "Kotlin"
];

const getExtension = (lang) => {
  const extMap = {
    python: "py", javascript: "js", java: "java", c: "c", "c++": "cpp", "c#": "cs",
    go: "go", ruby: "rb", php: "php", typescript: "ts", swift: "swift", kotlin: "kt"
  };
  return extMap[lang.toLowerCase()] || "txt";
};

const saveHistory = (entry) => {
  const prev = JSON.parse(localStorage.getItem("conversionHistory") || "[]");
  prev.unshift(entry);
  localStorage.setItem("conversionHistory", JSON.stringify(prev.slice(0, 20)));
};

const getHistory = () => {
  return JSON.parse(localStorage.getItem("conversionHistory") || "[]");
};

const Converter = () => {
  const [sourceLang, setSourceLang] = useState("Python");
  const [targetLang, setTargetLang] = useState("JavaScript");
  const [sourceCode, setSourceCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ message: "", type: "info", actions: null, hideClose: false });
  const [conversionHistory, setConversionHistory] = useState(getHistory());
  const [showHistory, setShowHistory] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const navigate = useNavigate();

  const baseEditorOptions = {
    fontSize: 14,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    padding: { top: 16 },
    fontLigatures: true,
    automaticLayout: true,
    autoIndent: "full",
    formatOnType: true,
    formatOnPaste: true,
    mouseWheelZoom: true,
    lineNumbers: "on",
    wordWrap: "on",
    bracketPairColorization: { enabled: true },
    tabSize: 2,
    theme: "my-dark",
  };

  // 🚫 Block access to admins
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        if (decoded?.admin === true) {
          window.location.href = "http://localhost:3000/admin/dashboard";
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  // 🚧 Trial restriction for non-logged users
  useEffect(() => {
    const token = localStorage.getItem("token");
    const trialCount = Number(localStorage.getItem("trialCount") || 0);
    if (!token && trialCount >= 3) {
      setPopup({
        message: "Free trial limit reached. Please log in to continue.",
        type: "warning",
        hideClose: true,
        actions: [
          { label: "Go to Home", onClick: () => navigate("/") },
          { label: "Go to Login", onClick: () => navigate("/login") },
          { label: "Go to Register", onClick: () => navigate("/register") }
        ]
      });
    }
  }, [navigate]);

  const handleConvert = async () => {
    if (!sourceCode.trim()) {
      setPopup({ message: "Please enter some code.", type: "warning" });
      return;
    }

    const token = localStorage.getItem("token");
    const trialCount = Number(localStorage.getItem("trialCount") || 0);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/convert/",
        {
          source_lang: sourceLang,
          target_lang: targetLang,
          source_code: sourceCode,
          prompt: customPrompt,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      setOutputCode(res.data.output_code);
      const entry = {
        sourceLang,
        targetLang,
        sourceCode,
        outputCode: res.data.output_code,
        date: new Date().toISOString(),
        prompt: customPrompt,
      };
      saveHistory(entry);
      setConversionHistory(getHistory());
      if (!token) localStorage.setItem("trialCount", trialCount + 1);
    } catch (err) {
      if (err.response?.status === 401 && token) {
        setPopup({
          message: "Session expired. Please log in again.",
          type: "error",
        });
        localStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 1500);
      } else if (err.response?.status === 401) {
        setPopup({
          message: "Trial limit reached. Please log in.",
          type: "warning",
        });
      } else {
        setPopup({
          message: "Conversion failed.",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    readFileContent(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    readFileContent(file);
  };

  const readFileContent = (file) => {
    if (!file) return;
    const ext = file.name.split(".").pop();
    const expected = getExtension(sourceLang);
    if (ext.toLowerCase() !== expected) {
      setPopup({ message: `Only .${expected} files allowed for ${sourceLang}.`, type: "warning" });
      return;
    }
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
    setUploadedFileName(nameWithoutExt);
    const reader = new FileReader();
    reader.onload = (e) => setSourceCode(e.target.result);
    reader.readAsText(file);
  };

  const handleDownload = () => {
    const fileName = uploadedFileName || "converted";
    const blob = new Blob([outputCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.${getExtension(targetLang)}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteHistory = (indexToDelete) => {
    const newHistory = conversionHistory.filter((_, index) => index !== indexToDelete);
    localStorage.setItem("conversionHistory", JSON.stringify(newHistory));
    setConversionHistory(newHistory);
  };

  const handleLoadHistory = (item) => {
    setSourceLang(item.sourceLang);
    setTargetLang(item.targetLang);
    setSourceCode(item.sourceCode);
    setOutputCode(item.outputCode);
    setCustomPrompt(item.prompt || "");
    setShowHistory(false);
  };

  useEffect(() => {
    monacoLoader.init().then((monaco) => {
      monaco.editor.defineTheme("my-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#0f172a",
        },
      });
      monaco.editor.setTheme("my-dark");
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white px-4 py-12 md:px-12 font-sans">
      <PopupMessage {...popup} onClose={() => setPopup({ ...popup, message: "" })} actions={popup.actions} hideClose={popup.hideClose} />

      <h2 className="text-xl text-center text-gray-300 mb-6">
        Select the languages, then enter code or choose a file, or drag and drop it.
      </h2>

      {/* Optional Prompt Input */}
      <div className="max-w-2xl mx-auto mb-8">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Custom Prompt <span className="text-gray-500">(optional)</span>
        </label>
        <input
          type="text"
          value={customPrompt}
          onChange={e => setCustomPrompt(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gradient transition focus:border-transparent text-sm"
          placeholder="E.g. Add comments, optimize code, explain logic, etc."
        />
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowHistory(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-brand-purple to-brand-pink text-white px-5 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
        >
          <ClockIcon className="w-5 h-5" />
          Conversion History
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-6 mb-10">
        <div className="w-full md:w-1/3">
          <label className="block mb-2 text-lg font-semibold text-gray-300">Source Language</label>
          <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className="w-full px-4 py-3 bg-gray-800 rounded-xl border border-gray-700 text-white">
            {languages.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <button onClick={handleSwap} className="w-12 h-12 flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white rounded-xl">
          <ArrowPathIcon className="w-6 h-6" />
        </button>

        <div className="w-full md:w-1/3">
          <label className="block mb-2 text-lg font-semibold text-gray-300">Target Language</label>
          <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className="w-full px-4 py-3 bg-gray-800 rounded-xl border border-gray-700 text-white">
            {languages.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="border-2 border-dashed border-purple-500 p-2 rounded-2xl shadow relative">
          <div className="flex justify-between items-center mb-2 px-1">
            <h3 className="text-lg font-semibold">
              Source Code <span className="text-xs text-purple-400">(Drag & Drop supported)</span>
            </h3>
            <div className="flex items-center gap-2">
              {uploadedFileName && (
                <span className="text-sm text-gray-400 italic">{uploadedFileName}.{getExtension(sourceLang)}</span>
              )}
              <button className="text-xs px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded" onClick={() => navigator.clipboard.writeText(sourceCode)}>Copy</button>
              <label className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded cursor-pointer">
                Select File
                <input type="file" onChange={handleFileSelect} className="hidden" />
              </label>
            </div>
          </div>
          <Editor
            height="380px"
            language={sourceLang.toLowerCase().replace("#", "sharp").replace("++", "pp")}
            value={sourceCode}
            onChange={(value) => setSourceCode(value)}
            theme="my-dark"
            beforeMount={(monaco) => {
              monaco.editor.defineTheme("my-dark", {
                base: "vs-dark",
                inherit: true,
                rules: [],
                colors: {
                  "editor.background": "#0f172a",
                },
              });
            }}
            options={baseEditorOptions}
          />

          {/* Mobile-only Convert Button */}
          <div className="mt-4 md:hidden text-center">
            <button
              onClick={handleConvert}
              className="bg-gradient-to-r from-brand-purple to-brand-pink px-6 py-2 text-base font-bold rounded-full text-white shadow-lg transition hover:scale-105"
            >
              {loading ? "Converting..." : "Convert Code"}
            </button>
          </div>
        </div>

        <div className="border-2 border-solid border-pink-500 p-2 rounded-2xl shadow relative">
          <div className="flex justify-between items-center mb-2 px-1">
            <h3 className="text-lg font-semibold">Converted Code</h3>
            <div>
              <button className="text-xs px-3 py-1 bg-pink-600 hover:bg-pink-700 rounded mr-2" onClick={() => navigator.clipboard.writeText(outputCode)}>Copy</button>
              <button className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded" onClick={handleDownload}>Download</button>
            </div>
          </div>
          <Editor
            height="380px"
            language={targetLang.toLowerCase().replace("#", "sharp").replace("++", "pp")}
            value={outputCode}
            theme="my-dark"
            beforeMount={(monaco) => {
              monaco.editor.defineTheme("my-dark", {
                base: "vs-dark",
                inherit: true,
                rules: [],
                colors: {
                  "editor.background": "#0f172a",
                },
              });
            }}
            options={{ ...baseEditorOptions, readOnly: true, renderLineHighlight: "all" }}
          />
        </div>
      </div>

      {/* Desktop Convert Button */}
      <div className="text-center mt-10 hidden md:block">
        <button
          onClick={handleConvert}
          className="bg-gradient-to-r from-brand-purple to-brand-pink px-10 py-3 text-lg font-bold rounded-full text-white shadow-lg transition hover:scale-105"
        >
          {loading ? "Converting..." : "Convert Code"}
        </button>
      </div>

      {showHistory && (
        <History
          history={conversionHistory}
          onLoad={handleLoadHistory}
          onClose={() => setShowHistory(false)}
          onDelete={handleDeleteHistory}
        />
      )}
    </div>
  );
};

export default Converter;
