import React, { useState } from 'react';

const TIMELINE_DATA = [
  {
    id: 'role-schneider',
    title: 'Senior Software Design Engineer',
    company: 'Schneider Electric Automation GmbH',
    location: 'Marktheidenfeld, Germany (Hybrid)',
    period: '04/2025 – 02/2026',
    summary: 'Led the integration of the industrial EtherCAT stack for high-precision Drive-Controllers, unblocking bring-up issues and hardening firmware security via TPM modules.',
    bullets: [
      'Led the integration and configuration of EtherCAT for Drive-Controller, a key product for Schneider Electric Automation.',
      'Unblocked EtherCAT bring-up by identifying and fixing a critical HW/SW defect in a Xilinx FPGA IP core.',
      'Authored the complete EtherCAT Slave Information (ESI) device profile for the drive SubDevice.',
      'Built custom Yocto/PetaLinux images for Xilinx Zynq platforms, customizing kernel, U-Boot, filesystems, and custom applications via BitBake recipes.',
      'Implemented an industrial cybersecurity Linux daemon managing device birth certificates and OPC UA FX using secure TPM hardware storage.',
      'Contributed as a primary engineering voice to the corporate threat modeling reviews with the cybersecurity panel.',
      'Optimized the system latency of real-time communication using distributed clock (DC) synchronization.',
      'Extended CI/CD pipelines on GitHub Actions to automate embedded Linux builds, automated unit tests, and secure firmware delivery.'
    ],
    tech: ['Yocto', 'PetaLinux', 'C++17', 'EtherCAT', 'Xilinx Zynq', 'BitBake', 'TPM 2.0', 'OPC UA FX', 'GitHub Actions']
  },
  {
    id: 'role-siemens',
    title: 'Senior Embedded Software Engineer',
    company: 'SIEMENS s.r.o.',
    location: 'Prague, Czechia',
    period: '03/2023 – 01/2025',
    summary: 'Architected hard real-time firmware in C/C++ for an Industrial Communication Gateway, building a custom secure bootloader and DevOps automation pipelines.',
    bullets: [
      'Developed hard real-time firmware in C/C++ for industrial communication gateway (CANopen/PROFINET), collaborating with teams across the USA and Germany to deliver a key Siemens Digital Industries project.',
      'Developed a secure bootloader (C) with RSA signature validation and cryptographic data integrity checks to enable safe firmware updates (OTA).',
      'Led the development of CI/CD pipelines in Azure DevOps to automate firmware compilation, static code analysis, and release packaging.',
      'Resolved complex customer issues regarding CAN bus installation and defective field sensors by designing and developing a custom CAN data-logger feature.',
      'Implemented comprehensive unit tests using Google Test (GTest) and achieved 100% function coverage and 95% line coverage.',
      'Migrated legacy Linux image compilation environments into a unified Docker-based workflow, optimizing image size by 30%.'
    ],
    tech: ['Embedded C/C++', 'PROFINET', 'CANopen', 'Secure Boot', 'RSA Signatures', 'Azure DevOps', 'Google Test', 'Docker', 'Bash']
  },
  {
    id: 'role-fab',
    title: 'Embedded Software Engineer',
    company: 'Embedded FAB',
    location: 'AlJizah, Egypt',
    period: '03/2019 – 02/2023',
    summary: 'Engineered Power Line Communication algorithms, low-level drivers, and runtime diagnostics for STM32F4-based microcontrollers.',
    bullets: [
      'Engineered PLCC transceiver algorithms, improving communication stability over standard power lines by 15%.',
      'Tailored high-performance bare-metal drivers (SPI, UART, ADC) and hardware applications for STM32F4 microcontrollers.',
      'Built modular CMake-based build systems for the ARM toolchain, improving build predictability and reducing build times.',
      'Implemented custom runtime diagnostics and fault-logging mechanisms in Embedded C to optimize field troubleshooting.'
    ],
    tech: ['Embedded C', 'STM32F4', 'Bare-Metal', 'SPI', 'UART', 'ADC', 'PLCC', 'CMake', 'ARM Toolchain']
  },
  {
    id: 'role-scedco',
    title: 'System Engineer',
    company: 'SCEDco (South Cairo Electricity)',
    location: 'Cairo, Egypt',
    period: '09/2012 – 02/2019',
    summary: 'Integrated operational technology environments, SCADA networks, and RTUs in major operational power distribution grids.',
    bullets: [
      'Worked in mission-critical industrial OT environments (SCADA, ADMS, RTUs) as a system and commissioning engineer.',
      'Successfully integrated and commissioned 65+ SCADA control panels and Remote Terminal Units (RTUs) in operational electrical power networks.',
      'Applied Scrum and Agile methodologies to deliver iterative software updates on schedule.'
    ],
    tech: ['SCADA', 'RTU', 'ADMS', 'Industrial OT', 'Agile / Scrum', 'System Commissioning']
  }
];

export default function InteractiveTimeline() {
  const [expandedId, setExpandedId] = useState('role-schneider');

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="timeline-container">
      {TIMELINE_DATA.map((item, idx) => {
        const isExpanded = expandedId === item.id;
        return (
          <div key={idx} className="timeline-item reveal">
            {/* Precise Squared technical marker node */}
            <div 
              className="timeline-marker"
              style={{
                background: isExpanded ? 'var(--tertiary)' : 'var(--primary)',
                boxShadow: isExpanded ? '0 0 14px var(--tertiary)' : '0 0 10px var(--primary)',
                cursor: 'pointer'
              }}
              onClick={() => toggleExpand(item.id)}
            />
            
            <div 
              style={{
                cursor: 'pointer',
                userSelect: 'none'
              }}
              onClick={() => toggleExpand(item.id)}
            >
              {/* Role Header Panel */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  marginBottom: '12px'
                }}
              >
                <div 
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '12px'
                  }}
                >
                  <h3 
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '18px',
                      color: isExpanded ? 'var(--primary)' : 'var(--text-primary)',
                      transition: 'var(--transition-snappy)'
                    }}
                  >
                    {item.title}
                  </h3>
                  <span 
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {item.period} // {item.location.toUpperCase()}
                  </span>
                </div>
                
                <div 
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: 'var(--secondary)'
                  }}
                >
                  {item.company}
                </div>
              </div>

              {/* Brief summary of role (always visible) */}
              <p 
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)',
                  marginBottom: '16px',
                  opacity: 0.85
                }}
              >
                {item.summary}
              </p>
            </div>

            {/* Detailed Collapsible Bullet achievements list */}
            <div 
              style={{
                maxHeight: isExpanded ? '1000px' : '0px',
                opacity: isExpanded ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 500ms ease, opacity 500ms ease',
                borderLeft: isExpanded ? '2px solid rgba(88, 166, 255, 0.2)' : '2px solid transparent',
                paddingLeft: isExpanded ? '16px' : '0px',
                marginTop: '8px'
              }}
            >
              <ul 
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 20px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                {item.bullets.map((bullet, bulletIdx) => (
                  <li 
                    key={bulletIdx}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5',
                      position: 'relative',
                      paddingLeft: '16px'
                    }}
                  >
                    <span 
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '6px',
                        width: '4px',
                        height: '4px',
                        background: 'var(--primary)',
                        transform: 'rotate(45deg)'
                      }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Technology Badges used in the position */}
              <div 
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}
              >
                {item.tech.map((t, tIdx) => (
                  <span key={tIdx} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Expand / Collapse text action button */}
            <button
              onClick={() => toggleExpand(item.id)}
              className="text-mono"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '12px',
                padding: '4px 0',
                outline: 'none',
                opacity: 0.7
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                {isExpanded ? 'expand_less' : 'expand_more'}
              </span>
              {isExpanded ? 'COLLAPSE_DETAILS' : 'EXPAND_FULL_LOG'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
