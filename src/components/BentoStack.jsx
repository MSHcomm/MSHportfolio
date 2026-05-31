import React from 'react';

const SKILLS_DATA = [
  {
    category: 'Programming',
    icon: 'code',
    skills: ['Embedded C (Strong)', 'C++ (11/14)', 'OOP', 'CMake', 'Make', 'Golang (basics)', 'Rust (basics)']
  },
  {
    category: 'Scripting',
    icon: 'terminal',
    skills: ['Python', 'Bash (Strong)', 'Batch']
  },
  {
    category: 'Embedded Systems',
    icon: 'developer_board',
    skills: ['ARM Cortex-M', 'RISC-V (toolchain)', 'Bare-metal development']
  },
  {
    category: 'Operating systems',
    icon: 'computer',
    skills: ['Embedded Linux', 'Yocto', 'BitBake', 'RTOS (FreeRTOS, Zephyr, TI-RTOS)']
  },
  {
    category: 'Interfaces',
    icon: 'settings_input_component',
    skills: ['SPI', 'UART', 'I2C', 'CAN', 'ADC']
  },
  {
    category: 'Industrial Communication',
    icon: 'lan',
    skills: ['EtherCAT', 'PROFINET', 'CANopen', 'OPC UA FX', 'IEC61850 (basics)', 'Modbus']
  },
  {
    category: 'Cybersecurity',
    icon: 'verified_user',
    skills: ['Secure Boot', 'TPM Integration', 'Certificate Lifecycle', 'OTA Updates', 'Threat Modeling']
  },
  {
    category: 'DevOps',
    icon: 'autoplay',
    skills: ['Git Flow', 'GitHub Actions', 'Azure DevOps', 'Docker Containers']
  },
  {
    category: 'Platformers',
    icon: 'layers',
    skills: ['Git', 'Jira', 'Confluence', 'MATLAB']
  },
  {
    category: 'Debugging',
    icon: 'bug_report',
    skills: ['GNU GDB', 'Serial Terminal', 'Wireshark', 'CAN Bus Analyzer', 'Green Hills MULTI', 'J-LINK']
  },
  {
    category: 'Testing',
    icon: 'rule',
    skills: ['Google Test (GTest)', 'Unit Testing', 'Function Coverage', 'Line Coverage']
  },
  {
    category: 'Edge AI',
    icon: 'psychology',
    skills: ['ollama', 'MCP (Model Context)', 'LLM Gemma 2B']
  },
  {
    category: 'Methodologies',
    icon: 'account_tree',
    skills: ['Agile / SAFe 6', 'Scrum / Kanban', 'SDLC Processes', 'Technical Docs', 'Cross-collaboration']
  }
];

export default function BentoStack() {
  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '20px',
        width: '100%'
      }}
    >
      {SKILLS_DATA.map((column, idx) => (
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
            transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Column Header */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderBottom: '1px solid var(--card-border)',
              paddingBottom: '12px'
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
                color: 'var(--primary)'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
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
                  letterSpacing: '0.05em'
                }}
              >
                {column.category}
              </div>
              <div 
                style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '9px', 
                  color: 'var(--text-muted)'
                }}
              >
                // MODULE_{String(idx + 1).padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Column Skills List */}
          <ul 
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
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
                  lineHeight: '1.4'
                }}
              >
                <span 
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--primary)',
                    fontSize: '12px',
                    fontWeight: '700',
                    userSelect: 'none'
                  }}
                >
                  ›
                </span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
