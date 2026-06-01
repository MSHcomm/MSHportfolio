import React, { useState } from 'react';

const PROJECTS = [
  {
    id: 'PRJ-081',
    title: 'Industrial Gateway',
    company: 'SIEMENS Digital Industries',
    image: '/images/projects/industrial-gateway.jpg',
    architecture: 'An industrial communication gateway bridging CANopen and PROFINET networks. On the CANopen side, the gateway communicates with distributed field devices, including sensors, actuators, and motor drives. On the PROFINET side, it interfaces with PLCs and supervisory control systems, providing seamless real-time data exchange between both network domains. Moreover secure boot including firmware',
    Security: 'Designed and implemented a secure boot architecture including firmware authentication through digital signature verification, firmware encryption, integrity validation, and hardware root-of-trust mechanisms using OTP (One-Time Programmable) fuses to protect against unauthorized firmware execution and tampering',
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
    ]
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
    ]
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
    ]
  }
];

function ImagePlaceholder({ id }) {
  const colors = { 'PRJ-081': '#0d1f3c', 'PRJ-094': '#0d2a1f', 'PRJ-035': '#1f0d2a' };
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
  const [activeProject, setActiveProject] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  return (
    <div style={{ position: 'relative' }}>
      {/* Grid Layout of Project Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}
      >
        {PROJECTS.map((project, idx) => (
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
              padding: 0
            }}
          >
            {/* Hero Image */}
            <div style={{ position: 'relative', height: '180px', flexShrink: 0 }}>
              {imgErrors[project.id] ? (
                <ImagePlaceholder id={project.id} />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  onError={() => setImgErrors(prev => ({ ...prev, [project.id]: true }))}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              )}
              {/* Dark gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(6,14,32,0.3) 0%, rgba(6,14,32,0.7) 100%)'
              }} />
              {/* ID badge overlaid on image */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                background: 'rgba(6,14,32,0.75)',
                color: 'var(--primary)',
                border: '1px solid rgba(192, 193, 255, 0.3)',
                padding: '2px 8px',
                borderRadius: '4px',
                backdropFilter: 'blur(4px)'
              }}>
                {project.id}
              </div>
            </div>

            {/* Card Content */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '0' }}>
              <div style={{ flexGrow: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '6px'
                }}>
                  // SYSTEM_PROJECT
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '18px',
                  color: 'var(--text-primary)',
                  marginBottom: '4px',
                  fontWeight: '700'
                }}>
                  {project.title}
                </h3>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--secondary)',
                  marginBottom: '14px',
                  fontWeight: '500'
                }}>
                  {project.company}
                </div>

                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)',
                  marginBottom: '20px'
                }}>
                  {project.architecture}
                </p>
              </div>

              <button
                onClick={() => setActiveProject(project)}
                className="btn btn-secondary text-mono"
                style={{
                  width: '100%',
                  fontSize: '11px',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>schema</span>
                VIEW_SYSTEM_SPECS
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Architectural Spec Diagram Drawer Popup */}
      {activeProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(6, 14, 32, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setActiveProject(null)}
        >
          <div
            style={{
              background: 'var(--card-bg-lowest)',
              border: '1px solid var(--primary)',
              boxShadow: '0 0 30px rgba(192, 193, 255, 0.15)',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '640px',
              maxHeight: '90vh',
              overflow: 'auto',
              padding: '28px',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <span
              className="text-mono"
              style={{
                color: 'var(--primary)',
                fontSize: '11px',
                borderBottom: '1px solid var(--card-border)',
                display: 'block',
                paddingBottom: '8px',
                marginBottom: '16px'
              }}
            >
              SYSTEM_SPECS // {activeProject.id}
            </span>

            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', marginBottom: '8px', color: 'var(--text-primary)' }}>
              {activeProject.title}
            </h3>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px', fontFamily: 'var(--font-sans)', lineHeight: '1.5' }}>
              A key project for {activeProject.company}, secure and hard real-time firmware
            </p>

            {/* Technical Spec Sheet */}
            <div
              style={{
                border: '1px solid var(--card-border)',
                borderRadius: '8px',
                overflow: 'hidden',
                background: 'var(--card-bg)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                marginBottom: '20px'
              }}
            >
              {activeProject.specs.map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr',
                    padding: '9px 14px',
                    borderBottom: idx === activeProject.specs.length - 1 ? 'none' : '1px solid var(--card-border)',
                    gap: '12px',
                    alignItems: 'start'
                  }}
                >
                  <span style={{ color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em' }}>{row.label}</span>
                  <span style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{row.value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveProject(null)}
              className="btn btn-primary text-mono"
              style={{ width: '100%', fontSize: '11px', padding: '10px' }}
            >
              CLOSE_SCHEMATIC_VIEW
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
