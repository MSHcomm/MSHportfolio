import { useLanguage } from '../hooks/useLanguage';

const SKILLS_DATA = {
  en: [
    { category: 'Programming',                     icon: 'code',                      skills: ['Embedded C (Strong)', 'C++ (11/14)', 'OOP', 'CMake', 'Make', 'Golang (basics)', 'Rust (basics)'] },
    { category: 'Scripting',                        icon: 'terminal',                  skills: ['Python', 'Bash (Strong)', 'Batch'] },
    { category: 'Embedded',                         icon: 'developer_board',            skills: ['Embedded Linux', 'Yocto', 'BitBake', 'RTOS', 'Bare-metal development', 'ARM Cortex-M', 'RISC-V (toolchain)'] },
    { category: 'Interfaces',                       icon: 'settings_input_component',   skills: ['SPI', 'UART', 'I2C', 'CAN', 'ADC'] },
    { category: 'Industrial Communication Protocols', icon: 'lan',                      skills: ['EtherCAT', 'PROFINET', 'CANopen', 'OPC UA FX', 'IEC61850 (basics)'] },
    { category: 'Firmware Security',                icon: 'verified_user',              skills: ['Secure Boot', 'TPM', 'Certificate Lifecycle Management', 'OTA Firmware Updates', 'Threat Modeling'] },
    { category: 'DevOps / Platformers',             icon: 'autoplay',                  skills: ['Git', 'CI/CD Pipelines (GitHub Actions, Azure DevOps)', 'Docker', 'Jira', 'Confluence', 'MATLAB'] },
    { category: 'Debugging / Testing',              icon: 'bug_report',                skills: ['GNU GDB', 'Google Test (GTest)', 'Serial Terminal', 'Wireshark', 'CAN Bus Analyzer', 'Green Hills MULTI', 'J-LINK'] },
    { category: 'AI & ML',                          icon: 'psychology',                skills: ['ollama', 'MCP', 'LLM Gemma 2B'] },
    { category: 'Methodologies',                    icon: 'account_tree',              skills: ['Agile', 'SAFe', 'Scrum', 'Kanban', 'SDLC', 'Cross-functional collaboration', 'Technical documentation'] },
  ],
  de: [
    { category: 'Programmierung',                   icon: 'code',                      skills: ['Embedded C (Strong)', 'C++ (11/14)', 'OOP', 'CMake', 'Make', 'Golang (basics)', 'Rust (basics)'] },
    { category: 'Scripting',                        icon: 'terminal',                  skills: ['Python', 'Bash (Strong)', 'Batch'] },
    { category: 'Embedded Systems',                 icon: 'developer_board',            skills: ['Embedded Linux', 'Yocto', 'BitBake', 'RTOS', 'Bare-metal development', 'ARM Cortex-M', 'RISC-V (toolchain)'] },
    { category: 'Schnittstellen / Interfaces',      icon: 'settings_input_component',   skills: ['SPI', 'UART', 'I2C', 'CAN', 'ADC'] },
    { category: 'Industrielle Kommunikationsprotokolle', icon: 'lan',                  skills: ['EtherCAT', 'PROFINET', 'CANopen', 'OPC UA FX', 'IEC61850 (basics)'] },
    { category: 'Firmware-Sicherheit',              icon: 'verified_user',              skills: ['Secure Boot', 'TPM', 'Certificate Lifecycle Management', 'OTA Firmware Updates', 'Threat Modeling'] },
    { category: 'DevOps & Plattformen',             icon: 'autoplay',                  skills: ['Git', 'CI/CD Pipelines (GitHub Actions, Azure DevOps)', 'Docker', 'Jira', 'Confluence', 'MATLAB'] },
    { category: 'Debugging & Testing',              icon: 'bug_report',                skills: ['GNU GDB', 'Google Test (GTest)', 'Serial Terminal', 'Wireshark', 'CAN Bus Analyzer', 'Green Hills MULTI', 'J-LINK'] },
    { category: 'KI & ML',                          icon: 'psychology',                skills: ['ollama', 'MCP', 'LLM Gemma 2B'] },
    { category: 'Methoden & Prozesse',              icon: 'account_tree',              skills: ['Agile', 'SAFe', 'Scrum', 'Kanban', 'SDLC', 'Cross-functional Kollaboration', 'Technische Dokumentation'] },
  ],
};

export default function BentoStack() {
  const lang = useLanguage();
  const data = SKILLS_DATA[lang] || SKILLS_DATA.en;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
        gap: '20px',
        width: '100%',
      }}
    >
      {data.map((column, idx) => (
        <div
          key={idx}
          className="bento-cell"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '10px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Column Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderBottom: '1px solid var(--card-border)',
              paddingBottom: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                background: 'var(--card-bg-high)',
                border: '1px solid var(--border-muted)',
                borderRadius: '6px',
                color: 'var(--primary)',
              }}
            >
              <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '18px' }}>
                {column.icon}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: '700',
                  fontSize: '12px',
                  color: 'var(--primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {column.category}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>
                // MODULE_{String(idx + 1).padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Skills List */}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {column.skills.map((skill, sIdx) => (
              <li
                key={sIdx}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  lineHeight: '1.4',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontSize: '12px', fontWeight: '700', userSelect: 'none' }}>›</span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
