import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const TIMELINE_DATA = {
  en: [
    {
      id: 'role-schneider',
      title: 'Senior Software Design Engineer',
      company: 'Schneider Electric Automation GmbH',
      location: 'Marktheidenfeld, Germany',
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
        'Extended CI/CD pipelines on GitHub Actions to automate embedded Linux builds, automated unit tests, and secure firmware delivery.',
      ],
      tech: ['Yocto', 'PetaLinux', 'C++17', 'EtherCAT', 'Xilinx Zynq', 'BitBake', 'TPM 2.0', 'OPC UA FX', 'GitHub Actions'],
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
        'Migrated legacy Linux image compilation environments into a unified Docker-based workflow, optimizing image size by 30%.',
      ],
      tech: ['Embedded C/C++', 'PROFINET', 'CANopen', 'Secure Boot', 'RSA Signatures', 'Azure DevOps', 'Google Test', 'Docker', 'Bash'],
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
        'Implemented custom runtime diagnostics and fault-logging mechanisms in Embedded C to optimize field troubleshooting.',
      ],
      tech: ['Embedded C', 'STM32F4', 'Bare-Metal', 'SPI', 'UART', 'ADC', 'PLCC', 'CMake', 'ARM Toolchain'],
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
        'Applied Scrum and Agile methodologies to deliver iterative software updates on schedule.',
      ],
      tech: ['SCADA', 'RTU', 'ADMS', 'Industrial OT', 'Agile / Scrum', 'System Commissioning'],
    },
  ],
  de: [
    {
      id: 'role-schneider',
      title: 'Senior Software Design Engineer',
      company: 'Schneider Electric Automation GmbH',
      location: 'Marktheidenfeld, Deutschland',
      period: '04/2025 – 02/2026',
      summary: 'Leitete die Integration des industriellen EtherCAT-Stacks für hochpräzise Drive-Controller; behob Anlaufprobleme und stärkte die Firmware-Sicherheit über TPM-Module.',
      bullets: [
        'Leitung der Integration und Konfiguration von EtherCAT für einen Drive-Controller im Rahmen eines Schlüsselprojekts.',
        'Behebung eines kritischen HW/SW Defekts in einem Xilinx FPGA IP Core, der den EtherCAT-Start blockierte.',
        'Erstellte Yocto/PetaLinux für Xilinx Zynq und passte Kernel, U-Boot, Dateisystem und Anwendungen mit BitBake an.',
        'Implementierung eines Cybersicherheits-Linux-Service zur Verwaltung des Geräteidentitätszertifikats und von OPC UA FX auf Basis eines sicheren TPM-Speichers.',
        'Aktive Mitwirkung an Threat-Modeling-Workshops in Zusammenarbeit mit dem Cybersecurity-Team.',
        'Optimierung der Echtzeit-Kommunikationslatenz durch den Einsatz verteilter Taktsynchronisation (Distributed-Clock-Synchronisation).',
        'Erweiterung von CI/CD Pipelines in GitHub Actions zur Unterstützung von Embedded Linux, automatisierten Tests und Firmware-Auslieferung.',
      ],
      tech: ['Yocto', 'PetaLinux', 'C++17', 'EtherCAT', 'Xilinx Zynq', 'BitBake', 'TPM 2.0', 'OPC UA FX', 'GitHub Actions'],
    },
    {
      id: 'role-siemens',
      title: 'Senior Embedded Software Engineer',
      company: 'SIEMENS s.r.o.',
      location: 'Prag, Tschechien',
      period: '03/2023 – 01/2025',
      summary: 'Entwicklung hard-echtzeitfähiger Firmware in C/C++ für ein Industriekommunikations-Gateway; Entwicklung eines Secure Bootloaders und DevOps-Automatisierungspipelines.',
      bullets: [
        'Entwicklung hard-echtzeitfähiger Firmware in C/C++ für ein CANopen/PROFINET Automatisierungsgateway mit (Green Hills MULTI) in internationalen Projekten (USA, Deutschland) für Siemens Digital Industries.',
        'Implementierung eines Secure Bootloaders mit Signaturprüfung und Integritätskontrollen für sichere Firmware-Updates.',
        'Leitete die Entwicklung von CI/CD Pipelines in Azure DevOps (Releases, Unit-Tests, statische Analyse).',
        'Entwicklung eines CAN-Datenloggers zu Analyse und Fehlerbehebung bei CAN-Installationen und Sensorsignalen.',
        'Implementierung von Unit-Tests mit GTest-Framework (C++14) mit 100 % Funktionsabdeckung und 95 % Zeilenabdeckung.',
        'Migration von Linux-Image-Builds auf Docker und Bash basierte Prozesse zur Qualitäts- und Effizienzsteigerung.',
      ],
      tech: ['Embedded C/C++', 'PROFINET', 'CANopen', 'Secure Boot', 'RSA Signatures', 'Azure DevOps', 'Google Test', 'Docker', 'Bash'],
    },
    {
      id: 'role-fab',
      title: 'Embedded Software Engineer',
      company: 'Embedded FAB',
      location: 'AlJizah, Ägypten',
      period: '03/2019 – 02/2023',
      summary: 'Entwicklung von Power-Line-Kommunikationsalgorithmen, Low-Level-Treibern und Laufzeitdiagnosen für STM32F4-basierte Mikrocontroller.',
      bullets: [
        'Entwicklung von PLCC-Transceiver-Algorithmen zur Verbesserung der Kommunikationsstabilität über Stromleitungen.',
        'Entwicklung und Anpassung von Bare-Metal-Treibern (SPI, UART, ADC) sowie Applikationen für STM32F4-Mikrocontroller.',
        'Entwicklung eines CMake-basierten Build-Systems mit ARM-Toolchain zur Reduzierung der Build-Zeit.',
        'Implementierung von Laufzeit-Diagnose- und Logging-Mechanismen zur Fehleranalyse und Systemstabilität.',
      ],
      tech: ['Embedded C', 'STM32F4', 'Bare-Metal', 'SPI', 'UART', 'ADC', 'PLCC', 'CMake', 'ARM Toolchain'],
    },
    {
      id: 'role-scedco',
      title: 'SCADA System Engineer',
      company: 'SCEDco (South Cairo Electricity)',
      location: 'Kairo, Ägypten',
      period: '09/2012 – 02/2019',
      summary: 'Integration operativer Technologieumgebungen, SCADA-Netzwerke und RTUs in Hochspannungs-Stromverteilungsnetzen.',
      bullets: [
        'Arbeit in industriellen OT-Umgebungen (SCADA, ADMS, RTUs) als System- und Inbetriebnahmeingenieur.',
        'Integration und Inbetriebnahme von über 65 SCADA-Panels und RTUs in operativen Stromnetzen.',
        'Anwendung von Scrum/Agile-Methoden zur fristgerechten Lieferung iterativer Software-Inkremente.',
      ],
      tech: ['SCADA', 'RTU', 'ADMS', 'Industrial OT', 'Agile / Scrum', 'System Commissioning'],
    },
  ],
};

export default function InteractiveTimeline() {
  const lang = useLanguage();
  const data = TIMELINE_DATA[lang] || TIMELINE_DATA.en;
  const [expandedId, setExpandedId] = useState('role-schneider');

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="timeline-container">
      {data.map((item, idx) => {
        const isExpanded = expandedId === item.id;
        return (
          <div key={idx} className="timeline-item reveal">
            {/* Timeline marker dot */}
            <div
              className="timeline-marker"
              style={{
                background: isExpanded ? 'var(--tertiary)' : 'var(--primary)',
                boxShadow: isExpanded ? '0 0 14px var(--tertiary)' : '0 0 10px var(--primary)',
                cursor: 'pointer',
              }}
              onClick={() => toggleExpand(item.id)}
            />

            {/* Card container */}
            <div
              style={{
                background: 'var(--card-bg)',
                border: `1px solid ${isExpanded ? 'var(--primary)' : 'var(--card-border)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                boxShadow: isExpanded ? '0 0 20px var(--primary-glow)' : 'none',
                transition: 'border-color 200ms, box-shadow 200ms',
              }}
            >
              {/* Clickable header: title + company + period */}
              <div
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => toggleExpand(item.id)}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                  <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '17px', color: isExpanded ? 'var(--primary)' : 'var(--text-primary)', transition: 'color 200ms', margin: 0 }}>
                    {item.title}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', background: 'rgba(88,166,255,0.08)', color: 'var(--primary)', border: '1px solid rgba(88,166,255,0.2)', padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                    {item.period}
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: '700', color: 'var(--secondary)' }}>
                    {item.company}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                    // {item.location.toUpperCase()}
                  </span>
                </div>

                {/* Summary (always visible) */}
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: '1.65', color: 'var(--text-secondary)', margin: 0 }}>
                  {item.summary}
                </p>
              </div>

              {/* Collapsible bullet details */}
              <div
                style={{
                  maxHeight: isExpanded ? '1200px' : '0px',
                  opacity: isExpanded ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 500ms ease, opacity 400ms ease',
                }}
              >
                <div style={{ borderTop: '1px solid var(--card-border)', margin: '20px 0 16px' }} />

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {item.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.55', display: 'flex', gap: '10px' }}
                    >
                      <span style={{ flexShrink: 0, marginTop: '6px', width: '4px', height: '4px', background: 'var(--primary)', transform: 'rotate(45deg)', display: 'inline-block' }} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {item.tech.map((t, tIdx) => (
                    <span key={tIdx} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>

              {/* Expand / collapse toggle */}
              <button
                onClick={() => toggleExpand(item.id)}
                className="text-mono"
                style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '16px', padding: 0, outline: 'none', opacity: 0.7 }}
              >
                <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '14px' }}>
                  {isExpanded ? 'expand_less' : 'expand_more'}
                </span>
                {isExpanded
                  ? (lang === 'de' ? 'DETAILS_EINKLAPPEN' : 'COLLAPSE_DETAILS')
                  : (lang === 'de' ? 'VOLLSTÄNDIGES_LOG' : 'EXPAND_FULL_LOG')
                }
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
