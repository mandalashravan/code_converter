import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";




const History = ({ history, onLoad, onClose, onDelete }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-5xl w-full mx-4 relative">
      <button
        className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-pink-400 font-bold"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>

      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent font-heading text-center">
        Conversion History
      </h2>

      {history.length === 0 ? (
        <div className="text-gray-400 italic text-center">No conversion history yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-gray-800 p-4 shadow max-h-[400px] overflow-y-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-gray-800 z-10">
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Source</th>
                <th className="py-2 px-3">Target</th>
                <th className="py-2 px-3">Input</th>
                <th className="py-2 px-3">Output</th>
                <th className="py-2 px-3 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-800 hover:bg-gray-700 transition cursor-pointer group"
                >
                  <td className="py-2 px-3 text-xs text-gray-400" onClick={() => onLoad(item)}>
                    {new Date(item.date).toLocaleString()}
                  </td>
                  <td className="py-2 px-3" onClick={() => onLoad(item)}>{item.sourceLang}</td>
                  <td className="py-2 px-3" onClick={() => onLoad(item)}>{item.targetLang}</td>
                  <td className="py-2 px-3 max-w-xs truncate" onClick={() => onLoad(item)} title={item.sourceCode}>
                    {item.sourceCode.slice(0, 40)}{item.sourceCode.length > 40 ? "..." : ""}
                  </td>
                  <td className="py-2 px-3 max-w-xs truncate" onClick={() => onLoad(item)} title={item.outputCode}>
                    {item.outputCode.slice(0, 40)}{item.outputCode.length > 40 ? "..." : ""}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <button onClick={() => onDelete(idx)} className="text-red-400 hover:text-red-600 transition">
                      <TrashIcon className="h-5 w-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);

export default History;
