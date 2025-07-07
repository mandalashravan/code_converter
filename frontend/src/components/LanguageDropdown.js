import Select from "react-select";

const languages = [
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
  { value: "C++", label: "C++" },
  { value: "JavaScript", label: "JavaScript" },
  // Add more as needed
];

const LanguageDropdown = ({ selected, setSelected }) => (
  <Select
    options={languages}
    value={languages.find((lang) => lang.value === selected)}
    onChange={(e) => setSelected(e.value)}
    className="w-full font-sans"
    styles={{
      control: (base) => ({
        ...base,
        background: "#23272a",
        color: "#fff",
        border: "2px solid",
        borderImage: "linear-gradient(90deg, #a259ff, #ff5cdb) 1",
        fontFamily: "'Poppins', 'Clash Grotesk', 'Inter', 'Segoe UI', Arial, sans-serif",
      }),
      menu: (base) => ({
        ...base,
        backgroundColor: "#23272a",
        color: "#fff",
        fontFamily: "'Poppins', 'Clash Grotesk', 'Inter', 'Segoe UI', Arial, sans-serif",
      }),
      singleValue: (base) => ({
        ...base,
        color: "#fff",
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? "#a259ff" : "#23272a",
        color: "#fff",
        fontFamily: "'Poppins', 'Clash Grotesk', 'Inter', 'Segoe UI', Arial, sans-serif",
      }),
    }}
    isSearchable
  />
);

export default LanguageDropdown;
