import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const PROJECTS = {
  en: [
    {
      id: 'PRJ-081',
      title: 'Industrial Gateway',
      company: 'SIEMENS Digital Industries',
      image: '/images/projects/industrial-gateway.jpg',
      architecture: 'An industrial communication gateway bridging CANopen and PROFINET networks. On the CANopen side, the gateway communicates with distributed field devices, including sensors, actuators, and motor drives. On the PROFINET side, it interfaces with PLCs and supervisory control systems, providing seamless real-time data exchange between both network domains. Moreover secure boot including firmware authentication.',
      Security: 'Designed and implemented a secure boot architecture including firmware authentication through digital signature verification, firmware encryption, integrity validation, and hardware root-of-trust mechanisms using OTP fuses to protect against unauthorized firmware execution and tampering.',
      specs: [
        { label: 'HW', value: 'ARM MAP5 SoC' },
        { label: 'OS', value: 'custom RTOS' },
        { label: 'BOOTLOADER', value: 'Secure Bootloader · RSA Signature Validation · Data Integrity Checks' },
        { label: 'PROTOCOLS', value: 'PROFINET · CANopen' },
        { label: 'INTERFACES', value: 'SPI · UART · CAN · QSPI for NOR FLASH' },
        { label: 'LANGUAGE', value: 'C/C++ · Python · Modern C++14 · CMake · Make · Bash · Batch' },
        { label: 'TOOLCHAIN', value: 'Green Hills MULTI IDE · ARM GCC compiler' },
        { label: 'CI/CD', value: 'Azure DevOps — Firmware Release · Unit Tests · Static Analysis' },
        { label: 'HW/TOOLS', value: 'CAN bus analyzer · Logic Analyzer · Protocol Analyzer' },
      ],
    },
    {
      id: 'PRJ-094',
      title: 'Drive-Controller',
      company: 'Schneider Electric Automation GmbH',
      image: '/images/projects/drive-controller.jpg',
      architecture: 'High-performance real-time motion control firmware running on custom Linux. Configures and operates high-speed cyclic industrial communication with distributed clock sub-microsecond synchronization.',
      specs: [
        { label: 'HW', value: 'Xilinx Zynq SoC · ARM Cortex-A9 · EtherCAT IP Core for Xilinx FPGA' },
        { label: 'OS', value: 'Embedded Linux based on Yocto project (PetaLinux for hardware bring up)' },
        { label: 'BOOTLOADER', value: 'U-Boot · customized via BitBake layers' },
        { label: 'PROTOCOLS', value: 'EtherCAT (SubDevice) · OPC UA FX · TSN' },
        { label: 'LANGUAGE', value: 'C/C++ · Python · Modern C++17 · Bash' },
        { label: 'INTERFACES', value: 'SPI · UART · Ethernet · I2C' },
        { label: 'SW/TOOLS', value: 'Jira · Confluence · GitHub Pages · CONAN' },
        { label: 'HW/TOOLS', value: 'Oscilloscope · Logic Analyzer · Protocol Analyzer · Multimeter' },
        { label: 'SECURITY', value: 'Cybersecurity Linux Service · TPM (Trust Platform Module) · Device Birth Certificate · OPC UA FX authentication and authorization devices and applications' },
        { label: 'CI/CD', value: 'GitHub Actions · Embedded Linux builds · Automated testing · Firmware delivery' },
      ],
    },
    {
      id: 'PRJ-035',
      title: 'PLCC Metering Transceiver',
      company: 'Embedded FAB',
      image: '/images/projects/plcc-transceiver.jpg',
      architecture: 'Hardware-software co-design of a Power Line Communication (PLCC) transceiver for smart metering applications. Employs noise-resistant modulation algorithms directly on bare-metal.',
      specs: [
        { label: 'HW', value: 'STM32F407 — ARM Cortex-M4' },
        { label: 'OS', value: 'FreeRTOS' },
        { label: 'INTERFACES/PROTOCOLS', value: 'PLCC Grid Protocol · SPI · UART · ADC' },
        { label: 'ALGORITHMS', value: 'Noise-resistant PLCC modulation — power line signal DSP' },
        { label: 'LANGUAGE', value: 'Embedded C · Bash · CMake' },
        { label: 'BUILD', value: 'CMake + ARM GCC Toolchain' },
        { label: 'DIAGNOSTICS', value: 'Runtime logging · On-chip ring buffer · Fault analysis' },
      ],
    },
    {
      id: 'PRJ-019',
      title: 'SCADA · ADMS · EMS',
      company: 'South Cairo Electricity Distribution Company',
      image: '/images/projects/SCADA_ADMS_EcoStructure.jpg',
      architecture: 'Deployed and validated ADMS/SCADA systems for an Energy Management System on an MV power distribution network. Commissioned 65+ SCADA RMUs and RTUs across live substations, integrating field devices with the EMS dispatch center and DMS network modeling tools to maximise grid visibility and enable rapid fault isolation.',
      specs: [
        { label: 'DEPLOYMENT', value: 'Deployed and validated ADMS/SCADA systems for Energy Management System on MV power distribution network' },
        { label: 'COMMISSIONING', value: '65+ SCADA RMUs and RTUs — configuration, testing, and integration' },
        { label: 'INTEGRATION', value: 'SCADA integrated with network modeling tools and DMS systems to enhance grid visibility' },
        { label: 'COMMUNICATION', value: 'Data communication between field devices and the Energy Management System (EMS) at the dispatch center' },
        { label: 'FIELD OPS', value: 'Fault isolation and service restoration in MV — Ring Main Units, SubStations, Transformers' },
        { label: 'TRAINING', value: 'Certified trainer — SCADA/ADMS/EMS system usage and operation' },
        { label: 'TESTING', value: 'System testing, commissioning, and troubleshooting of RTUs and substations' },
        { label: 'SYSTEMS', value: 'SCADA · ADMS · EMS · RTU · RMU · DMS' },
        { label: 'PROTOCOLS', value: 'IEC 60870-5-101/104 · DNP3 · Modbus · IEC 61850 (basics)' },
        { label: 'PERIOD', value: '2019 – 2022' },
      ],
    },
  ],
  de: [
    {
      id: 'PRJ-081',
      title: 'Industrial Gateway',
      company: 'SIEMENS Digital Industries',
      image: '/images/projects/industrial-gateway.jpg',
      architecture: 'Ein industrielles Kommunikations-Gateway zur Überbrückung von CANopen- und PROFINET-Netzwerken. Auf der CANopen-Seite kommuniziert das Gateway mit verteilten Feldgeräten, darunter Sensoren, Aktoren und Motorantriebe. Auf der PROFINET-Seite kommuniziert es mit SPSen und übergeordneten Steuerungssystemen und ermöglicht so einen nahtlosen Echtzeit-Datenaustausch zwischen beiden Netzwerkdomänen. Zusätzlich umfasst das Gerät einen Secure Boot inklusive Firmware-Authentifizierung.',
      specs: [
        { label: 'HW', value: 'ARM MAP5 SoC' },
        { label: 'OS', value: 'Custom RTOS' },
        { label: 'BOOTLOADER', value: 'Secure Bootloader · RSA-Signaturprüfung · Datenintegritätsprüfung' },
        { label: 'PROTOKOLLE', value: 'PROFINET · CANopen' },
        { label: 'SCHNITTSTELLEN', value: 'SPI · UART · CAN · QSPI für NOR FLASH' },
        { label: 'SPRACHE', value: 'C/C++ · Python · Modern C++14 · CMake · Make · Bash · Batch' },
        { label: 'TOOLCHAIN', value: 'Green Hills MULTI IDE · ARM GCC Compiler' },
        { label: 'CI/CD', value: 'Azure DevOps — Firmware-Release · Unit-Tests · Statische Analyse' },
        { label: 'HW/TOOLS', value: 'CAN-Bus-Analysator · Logikanalysator · Protokollanalysator' },
      ],
    },
    {
      id: 'PRJ-094',
      title: 'Drive-Controller',
      company: 'Schneider Electric Automation GmbH',
      image: '/images/projects/drive-controller.jpg',
      architecture: 'Hochperformante Echtzeit-Bewegungssteuerungs-Firmware auf Basis eines kundenspezifischen Linux-Systems. Konfiguriert und betreibt hochgeschwindige zyklische Industriekommunikation mit verteilter Taktsynchronisation im Sub-Mikrosekundenbereich.',
      specs: [
        { label: 'HW', value: 'Xilinx Zynq SoC · ARM Cortex-A9 · EtherCAT IP Core für Xilinx FPGA' },
        { label: 'OS', value: 'Embedded Linux basierend auf Yocto (PetaLinux für Hardware-Inbetriebnahme)' },
        { label: 'BOOTLOADER', value: 'U-Boot · angepasst über BitBake-Layer' },
        { label: 'PROTOKOLLE', value: 'EtherCAT (SubDevice) · OPC UA FX · TSN' },
        { label: 'SPRACHE', value: 'C/C++ · Python · Modern C++17 · Bash' },
        { label: 'SCHNITTSTELLEN', value: 'SPI · UART · Ethernet · I2C' },
        { label: 'SW/TOOLS', value: 'Jira · Confluence · GitHub Pages · CONAN' },
        { label: 'HW/TOOLS', value: 'Oszilloskop · Logikanalysator · Protokollanalysator · Multimeter' },
        { label: 'SICHERHEIT', value: 'Cybersicherheits-Linux-Service · TPM (Trust Platform Module) · Geräteidentitätszertifikat · OPC UA FX Authentifizierung und Autorisierung' },
        { label: 'CI/CD', value: 'GitHub Actions · Embedded Linux Builds · Automatisierte Tests · Firmware-Auslieferung' },
      ],
    },
    {
      id: 'PRJ-035',
      title: 'PLCC-Metering-Transceiver',
      company: 'Embedded FAB',
      image: '/images/projects/plcc-transceiver.jpg',
      architecture: 'Hardware-Software-Kodesign eines Power-Line-Communication-(PLCC)-Transceivers für Smart-Metering-Anwendungen. Verwendet rauschresistente Modulationsalgorithmen direkt auf Bare-Metal.',
      specs: [
        { label: 'HW', value: 'STM32F407 — ARM Cortex-M4' },
        { label: 'OS', value: 'FreeRTOS' },
        { label: 'SCHNITTSTELLEN/PROTOKOLLE', value: 'PLCC Grid Protocol · SPI · UART · ADC' },
        { label: 'ALGORITHMEN', value: 'Rauschresistente PLCC-Modulation — Stromleitungs-Signal-DSP' },
        { label: 'SPRACHE', value: 'Embedded C · Bash · CMake' },
        { label: 'BUILD', value: 'CMake + ARM GCC Toolchain' },
        { label: 'DIAGNOSE', value: 'Laufzeit-Logging · On-Chip-Ringpuffer · Fehleranalyse' },
      ],
    },
    {
      id: 'PRJ-019',
      title: 'SCADA · ADMS · EMS',
      company: 'South Cairo Electricity Distribution Company',
      image: '/images/projects/SCADA_ADMS_EcoStructure.jpg',
      architecture: 'Deployment und Validierung von ADMS/SCADA-Systemen für ein Energiemanagementsystem in einem MS-Stromverteilungsnetz. Inbetriebnahme von über 65 SCADA-RMUs und RTUs in Live-Umspannwerken, Integration von Feldgeräten mit der EMS-Leitstelle und DMS-Netzmodellierungswerkzeugen zur Maximierung der Netztransparenz und schnellen Fehlerisolation.',
      specs: [
        { label: 'DEPLOYMENT', value: 'Deployment und Validierung von ADMS/SCADA-Systemen für das Energiemanagementsystem im MS-Stromnetz' },
        { label: 'INBETRIEBNAHME', value: 'Über 65 SCADA-RMUs und RTUs — Konfiguration, Test und Integration' },
        { label: 'INTEGRATION', value: 'SCADA-Integration mit Netzmodellierungstools und DMS-Systemen zur Verbesserung der Netztransparenz' },
        { label: 'KOMMUNIKATION', value: 'Datenkommunikation zwischen Feldgeräten und dem Energiemanagementsystem (EMS) in der Leitstelle' },
        { label: 'FELDBETRIEB', value: 'Fehlerisolation und Wiederherstellung im MS-Netz — Ringkabelverteilungen, Umspannwerke, Transformatoren' },
        { label: 'SCHULUNG', value: 'Zertifizierter Trainer — Schulungen zur Nutzung und zum Betrieb von SCADA/ADMS/EMS' },
        { label: 'TESTING', value: 'Systemtest, Inbetriebnahme und Fehlersuche an RTUs und Umspannwerken' },
        { label: 'SYSTEME', value: 'SCADA · ADMS · EMS · RTU · RMU · DMS' },
        { label: 'PROTOKOLLE', value: 'IEC 60870-5-101/104 · DNP3 · Modbus · IEC 61850 (Grundlagen)' },
        { label: 'ZEITRAUM', value: '2019 – 2022' },
      ],
    },
  ],
};

function ImagePlaceholder({ id }) {
  const colors = { 'PRJ-081': '#0d1f3c', 'PRJ-094': '#0d2a1f', 'PRJ-035': '#1f0d2a', 'PRJ-019': '#1a1400' };
  const bg = colors[id] || '#0d1a2e';
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: `linear-gradient(135deg, ${bg} 0%, #060e20 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'rgba(192,193,255,0.15)' }}>
        memory
      </span>
    </div>
  );
}

export default function ProjectShowcase() {
  const lang = useLanguage();
  const projects = PROJECTS[lang] || PROJECTS.en;
  const [activeProject, setActiveProject] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  const labels = {
    systemProject:  lang === 'de' ? '// SYSTEMPROJEKT'                : '// SYSTEM_PROJECT',
    viewSpecs:      lang === 'de' ? 'SYSTEMSPEZIFIKATIONEN_ANZEIGEN'  : 'VIEW_SYSTEM_SPECS',
    specsHeader:    lang === 'de' ? 'SYSTEMSPEZIFIKATIONEN //'         : 'SYSTEM_SPECS //',
    subtext:        lang === 'de' ? `Ein Schlüsselprojekt für`         : `A key project for`,
    subtextSuffix:  lang === 'de' ? ', sichere und harte Echtzeit-Firmware' : ', secure and hard real-time firmware',
    closeBtn:       lang === 'de' ? 'SCHEMAANSICHT_SCHLIESSEN'         : 'CLOSE_SCHEMATIC_VIEW',
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Grid of project cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '24px' }}>
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="bento-cell"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '12px',
              overflow: 'hidden',
              padding: 0,
            }}
          >
            {/* Hero image */}
            <div style={{ position: 'relative', height: '180px', flexShrink: 0 }}>
              {imgErrors[project.id] ? (
                <ImagePlaceholder id={project.id} />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  onError={() => setImgErrors(prev => ({ ...prev, [project.id]: true }))}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              )}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,14,32,0.3) 0%, rgba(6,14,32,0.7) 100%)' }} />
              <div style={{
                position: 'absolute', top: '12px', right: '12px',
                fontFamily: 'var(--font-mono)', fontSize: '10px',
                background: 'rgba(6,14,32,0.75)', color: 'var(--primary)',
                border: '1px solid rgba(192, 193, 255, 0.3)', padding: '2px 8px',
                borderRadius: '4px', backdropFilter: 'blur(4px)',
              }}>
                {project.id}
              </div>
            </div>

            {/* Card content */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '0' }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)',
                  textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px',
                }}>
                  {labels.systemProject}
                </div>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', color: 'var(--text-primary)', marginBottom: '4px', fontWeight: '700' }}>
                  {project.title}
                </h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--secondary)', marginBottom: '14px', fontWeight: '500' }}>
                  {project.company}
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  {project.architecture}
                </p>
              </div>

              <button
                onClick={() => setActiveProject(project)}
                className="btn btn-secondary text-mono"
                style={{ width: '100%', fontSize: '11px', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>schema</span>
                {labels.viewSpecs}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Spec modal */}
      {activeProject && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(6, 14, 32, 0.85)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: '20px',
          }}
          onClick={() => setActiveProject(null)}
        >
          <div
            style={{
              background: 'var(--card-bg-lowest)',
              border: '1px solid var(--primary)',
              boxShadow: '0 0 30px rgba(192, 193, 255, 0.15)',
              borderRadius: '12px', width: '100%', maxWidth: '640px',
              maxHeight: '90vh', overflow: 'auto', padding: '28px', position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProject(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', outline: 'none' }}
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <span className="text-mono" style={{ color: 'var(--primary)', fontSize: '11px', borderBottom: '1px solid var(--card-border)', display: 'block', paddingBottom: '8px', marginBottom: '16px' }}>
              {labels.specsHeader} {activeProject.id}
            </span>

            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', marginBottom: '8px', color: 'var(--text-primary)' }}>
              {activeProject.title}
            </h3>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px', fontFamily: 'var(--font-sans)', lineHeight: '1.5' }}>
              {labels.subtext} {activeProject.company}{labels.subtextSuffix}
            </p>

            <div style={{ border: '1px solid var(--card-border)', borderRadius: '8px', overflow: 'hidden', background: 'var(--card-bg)', fontFamily: 'var(--font-mono)', fontSize: '11px', marginBottom: '20px' }}>
              {activeProject.specs.map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex', flexWrap: 'wrap', padding: '12px 14px',
                    borderBottom: idx === activeProject.specs.length - 1 ? 'none' : '1px solid var(--card-border)',
                    gap: '8px', alignItems: 'start',
                  }}
                >
                  <span style={{ color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em', flexBasis: '140px', flexShrink: 0 }}>{row.label}</span>
                  <span style={{ color: 'var(--text-secondary)', lineHeight: '1.5', flex: '1 1 200px' }}>{row.value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveProject(null)}
              className="btn btn-primary text-mono"
              style={{ width: '100%', fontSize: '11px', padding: '10px' }}
            >
              {labels.closeBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
