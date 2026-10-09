import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { RiCodeSSlashFill } from "react-icons/ri";
import { IoIosCopy } from "react-icons/io";
import { TbDatabaseExport } from "react-icons/tb";
import { ImNewTab } from "react-icons/im";
import { FiRefreshCw } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import Editor from "@monaco-editor/react";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];
const [outputScreen, setOutputScreen] = useState(false);
const [tab, setTab] = useState(1);
const [prompt, setPrompt] = useState("");
const [frameWork, setFrameWork] = useState(options[0]);
const [code, setCode] = useState("");
const [loading, setLoading] = useState(false);
const ai = new GoogleGenAI({
apiKey: "AIzaSyAn6BTfKPp5Kx0Hh3K5GF5ysZyuDlBnazM",
  });
const getResponse = async () => {
if (!prompt.trim()) return;
setLoading(true);
setCode("");
setOutputScreen(true);
setTab(1);
try {
const result = await ai.models.generateContent({
model: "gemini-2.5-flash",
contents: [
          {
role: "user",
parts: [
              {
text: `You are an experienced programmer with expertise in web development and UI/UX design.
Generate a modern, animated, and fully responsive UI component for: "${prompt}"
Framework: ${frameWork?.label || "HTML + Tailwind CSS"}
Requirements:
- Clean, well-structured, and production-ready code
- Modern design with smooth animations and hover effects
- Fully responsive
- Good colors, shadows, and typography
- Return ONLY the code inside a markdown code block (use \`\`\`html)
- Do NOT include any explanations or extra text.`,
              },
            ],
          },
        ],
      });
const generatedText = result.response?.text() || result.text || "";
const codeMatch = generatedText.match(/```(?:html|jsx|javascript)?\s*([\s\S]*?)```/i);
const extractedCode = codeMatch ? codeMatch[1].trim() : generatedText.trim();
setCode(extractedCode || "// No code generated. Please try again.");
    } catch (error) {
      console.error("Error:", error);
setCode(`// Error generating code\n// ${error.message || "Unknown error"}`);
    } finally {
setLoading(false);
    }
  };
const copyCode = async () => {
if (!code) return;
try {
await navigator.clipboard.writeText(code);
      toast.success("✅ Code copied to clipboard!", {
position: "top-right",
autoClose: 2000,
      });
    } catch (err) {
      toast.error("Failed to copy code", { position: "top-right" });
    }
  };
const exportCode = () => {
if (!code) {
      toast.warning("No code to export!", { position: "top-right" });
return;
    }
const blob = new Blob([code], { type: "text/html" });
const url = URL.createObjectURL(blob);
const link = document.createElement("a");
    link.href = url;
    link.download = "ai-generated-component.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
URL.revokeObjectURL(url);
    toast.success("✅ Component exported as HTML!", {
position: "top-right",
autoClose: 2000,
    });
  };
// Open in New Tab with Preview Navbar at the very top (Header)
const openInNewTab = () => {
if (!code) {
      toast.warning("No code to preview!", { position: "top-right" });
return;
    }
const previewHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Generated Component Preview</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: system-ui, -apple-system, sans-serif;
            background: #0a0a0a;
            color: white;
          }
          .preview-navbar {
            background: #1f2937;
            padding: 14px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #374151;
            position: sticky;
            top: 0;
            z-index: 1000;
            width: 100%;
          }
          .navbar-title {
            font-size: 17px;
            font-weight: 600;
            color: #c084fc;
          }
          .close-btn {
            background: transparent;
            border: none;
            color: #60a5fa;
            font-size: 28px;
            cursor: pointer;
            padding: 6px;
            border-radius: 8px;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .close-btn:hover {
            background: rgba(96, 165, 250, 0.2);
            opacity: 0.5;
          }
          .preview-content {
            padding: 20px;
            min-height: calc(100vh - 60px);
            overflow: auto;
          }
        </style>
      </head>
      <body>
        <!-- Navbar at the very top/header -->
        <div class="preview-navbar">
          <div class="navbar-title">AI Generated Component Preview</div>
          <button class="close-btn" onclick="window.close()" title="Close Preview">
            <AiFillCloseCircle style="font-size: 28px;" />
          </button>
        </div>
        <div class="preview-content">
${code}
        </div>
      </body>
      </html>
    `;
const newWindow = window.open("", "_blank");
if (newWindow) {
      newWindow.document.write(previewHTML);
      newWindow.document.close();
    } else {
      toast.error("Popup blocked! Please allow popups for this site.", {
position: "top-right",
      });
    }
  };
const refreshPreview = () => {
if (tab === 2 && code) {
setTab(1);
setTimeout(() => setTab(2), 10);
      toast.info("Preview refreshed", { position: "top-right", autoClose: 1500 });
    }
  };
const customStyles = {
control: (provided, state) => ({
...provided,
backgroundColor: "#1f2937",
borderColor: state.isFocused ? "#a855f7" : "#27272a",
boxShadow: state.isFocused ? "0 0 0 1px #a855f7" : "none",
color: "white",
"&:hover": { borderColor: "#a855f7" },
    }),
singleValue: (provided) => ({ ...provided, color: "white" }),
menu: (provided) => ({ ...provided, backgroundColor: "#1f2937" }),
option: (provided, state) => ({
...provided,
backgroundColor: state.isFocused ? "#27272a" : "#1f2937",
color: "white",
cursor: "pointer",
    }),
dropdownIndicator: (provided) => ({ ...provided, color: "#a855f7" }),
indicatorSeparator: (provided) => ({
...provided,
backgroundColor: "#27272a",
    }),
  };
const btnStyle = {
width: "40px",
height: "40px",
borderRadius: "10px",
border: "1px solid #27272a",
display: "flex",
alignItems: "center",
justifyContent: "center",
background: "transparent",
color: "white",
cursor: "pointer",
transition: "all 0.2s",
  };
return (
<div style={{ backgroundColor: "black", minHeight: "100vh" }}>
<Navbar />
<div style={{ paddingTop: "80px", paddingLeft: "100px", paddingRight: "100px" }}>
<div style={{ display: "flex", gap: "20px" }}>
{/* LEFT SECTION */}
<div
style={{
width: "45%",
minHeight: "80vh",
backgroundColor: "#27272a",
marginTop: "20px",
borderRadius: "10px",
padding: "20px",
display: "flex",
flexDirection: "column",
gap: "16px",
            }}
>
<h3 style={{ fontSize: "20px", fontWeight: "600", color: "#a855f7" }}>
              AI Component Generator
</h3>
<p style={{ color: "gray", fontSize: "16px" }}>
              Describe your component and let AI code for you
</p>
<p style={{ fontSize: "15px", fontWeight: 700, color: "white" }}>Framework</p>
<Select
options={options}
value={frameWork}
styles={customStyles}
onChange={(selected) => setFrameWork(selected || options[0])}
/>
<p style={{ fontSize: "15px", fontWeight: 700, color: "white" }}>
              Describe your component
</p>
<textarea
style={{
width: "100%",
minHeight: "200px",
borderRadius: "10px",
backgroundColor: "#09090B",
color: "white",
padding: "12px",
border: "1px solid #27272a",
resize: "vertical",
fontSize: "15px",
              }}
value={prompt}
onChange={(e) => setPrompt(e.target.value)}
placeholder="e.g., Modern login form with glassmorphism effect and animated button"
/>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
<p style={{ color: "gray", fontSize: "14px" }}>
                Click on Generate button to generate your code
</p>
<button
style={{
display: "flex",
alignItems: "center",
gap: "8px",
padding: "12px 24px",
borderRadius: "10px",
border: "none",
background: "linear-gradient(to right, #c084fc, #a855f7)",
color: "white",
fontWeight: 600,
cursor: "pointer",
transition: "opacity 0.2s ease",
opacity: loading || !prompt.trim() ? 0.7 : 1,
                }}
onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
onClick={getResponse}
disabled={loading || !prompt.trim()}
>
{loading ? <ClipLoader size={18} color="white" /> : <BsStars />}
{loading ? "Generating..." : "Generate"}
</button>
</div>
</div>
{/* RIGHT SECTION */}
<div
style={{
flex: 1,
marginTop: "20px",
borderRadius: "10px",
backgroundColor: "#1f2937",
padding: "20px",
display: "flex",
flexDirection: "column",
gap: "16px",
minHeight: "80vh",
position: "relative",
            }}
>
{/* Tabs */}
<div style={{ display: "flex", gap: "12px" }}>
<button
style={{
flex: 1,
padding: "12px",
borderRadius: "10px",
backgroundColor: tab === 1 ? "#333" : "#111",
color: "white",
border: "none",
cursor: "pointer",
fontWeight: tab === 1 ? 600 : 400,
                }}
onClick={() => setTab(1)}
>
                Code
</button>
<button
style={{
flex: 1,
padding: "12px",
borderRadius: "10px",
backgroundColor: tab === 2 ? "#333" : "#111",
color: "white",
border: "none",
cursor: "pointer",
fontWeight: tab === 2 ? 600 : 400,
                }}
onClick={() => setTab(2)}
>
                Preview
</button>
</div>
{/* Header */}
<div
style={{
width: "100%",
height: "60px",
backgroundColor: "#17171C",
display: "flex",
alignItems: "center",
justifyContent: "space-between",
padding: "0 20px",
borderRadius: "8px",
              }}
>
<p style={{ fontWeight: "bold", color: "white" }}>
{tab === 1 ? "Code Editor" : "Live Preview"}
</p>
{tab === 1 ? (
<div style={{ display: "flex", gap: "12px" }}>
<button
style={btnStyle}
onClick={copyCode}
onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
title="Copy Code"
>
<IoIosCopy />
</button>
<button
style={btnStyle}
onClick={exportCode}
onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
title="Export as HTML"
>
<TbDatabaseExport />
</button>
</div>
              ) : (
<div style={{ display: "flex", gap: "12px" }}>
<button
style={btnStyle}
onClick={openInNewTab}
onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
title="Open in New Tab"
>
<ImNewTab />
</button>
<button
style={btnStyle}
onClick={refreshPreview}
onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
title="Refresh Preview"
>
<FiRefreshCw />
</button>
</div>
              )}
</div>
{/* Content Area */}
<div style={{ flex: 1, position: "relative" }}>
{outputScreen ? (
loading ? (
<div
style={{
position: "absolute",
top: 0,
left: 0,
width: "100%",
height: "100%",
backgroundColor: "#17171C",
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
zIndex: 10,
                    }}
>
<div
style={{
width: "70px",
height: "70px",
borderRadius: "50%",
background: "linear-gradient(to top right, #a855f7, #6366f1)",
display: "flex",
alignItems: "center",
justifyContent: "center",
marginBottom: "20px",
                      }}
>
<ClipLoader size={35} color="white" />
</div>
<p style={{ fontSize: "18px", color: "#a855f7", marginBottom: "8px" }}>
                      Generating your component...
</p>
<p style={{ color: "#888", fontSize: "14px" }}>
                      Please wait while AI creates beautiful code
</p>
</div>
                ) : tab === 1 ? (
<Editor
height="100%"
theme="vs-dark"
language="html"
value={code}
options={{
minimap: { enabled: false },
fontSize: 14,
wordWrap: "on",
                    }}
/>
                ) : (
<div
style={{
width: "100%",
height: "100%",
backgroundColor: "#ffffff",
borderRadius: "8px",
overflow: "hidden",
                    }}
>
<iframe
title="preview"
srcDoc={code}
style={{ width: "100%", height: "100%", border: "none" }}
key={Date.now()}
/>
</div>
                )
              ) : (
// Circular Button when outputScreen is false
<div
style={{
height: "100%",
display: "flex",
alignItems: "center",
justifyContent: "center",
                  }}
>
<div
style={{
width: "70px",
height: "70px",
borderRadius: "50%",
background: "linear-gradient(to top right, #a855f7, #6366f1)",
display: "flex",
alignItems: "center",
justifyContent: "center",
cursor: "pointer",
boxShadow: "0 0 20px rgba(168, 85, 247, 0.6)",
transition: "transform 0.3s ease",
                    }}
onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
onClick={getResponse}
>
<RiCodeSSlashFill style={{ color: "white", fontSize: "28px" }} />
</div>
</div>
              )}
</div>
</div>
</div>
</div>
<ToastContainer />
</div>
  );
};
export default Home;