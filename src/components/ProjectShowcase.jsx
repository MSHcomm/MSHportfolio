import React, { useState } from 'react';

const PROJECTS = [
  {
    id: 'PRJ-081',
    title: 'Industrial Gateway',
    company: 'SIEMENS Digital Industries',
    architecture: 'An industrial communication gateway bridging CANopen and PROFINET networks. On the CANopen side, the gateway communicates with distributed field devices, including sensors, actuators, and motor drives. On the PROFINET side, it interfaces with PLCs and supervisory control systems, providing seamless real-time data exchange between both network domains. Moreover secure boot including firmware',
    Security: 'Designed and implemented a secure boot architecture including firmware authentication through digital signature verification, firmware encryption, integrity validation, and hardware root-of-trust mechanisms using OTP (One-Time Programmable) fuses to protect against unauthorized firmware execution and tampering',
    specs: [
      { label: 'HW', value: 'ARM MAP5 SoC' },
      { label: 'OS', value: 'custom RTOS' },
      { label: 'BOOTLOADER', value: 'Secure Bootloader · RSA Signature Validation · Data Integrity Checks' },
      { label: 'PROTOCOLS', value: 'PROFINET · CANopen · CAN bus' },
      { label: 'LANGUAGE', value: 'C/C++ · Python · Modern C++14 · Bash · Batch' },
      { label: 'TOOLCHAIN', value: 'Green Hills MULTI IDE · ARM GCC compiler' },
      { label: 'CI/CD', value: 'Azure DevOps — Firmware Release · Unit Tests · Static Analysis' },
    ]
  },
  {
    id: 'PRJ-094',
    title: 'Drive-Controller Firmware',
    company: 'Schneider Electric Automation GmbH',
    architecture: 'High-performance real-time motion control firmware running on custom Linux. Configures and operates high-speed cyclic industrial communication with distributed clock sub-microsecond synchronization.',
    mcu: 'Xilinx Zynq-7000 SoC (ARM A9 + FPGA)',
    protocols: 'EtherCAT Slave, OPC UA FX, Custom FPGA Register Map, TPM 2.0',
    specs: [
      { label: 'HW', value: 'Xilinx Zynq-7000 SoC — ARM Cortex-A9 + FPGA Fabric' },
      { label: 'OS', value: 'Custom Yocto / PetaLinux (Embedded Linux)' },
      { label: 'BOOTLOADER', value: 'U-Boot — customized via BitBake layers' },
      { label: 'PROTOCOLS', value: 'EtherCAT Slave (Distributed Clock) · OPC UA FX · TPM 2.0' },
      { label: 'SECURITY', value: 'TPM-backed Device Birth Certificate · Cybersecurity Linux Service · OPC UA FX' },
      { label: 'FPGA', value: 'Xilinx IP Core — HW/SW defect isolation and fix on FPGA EtherCAT core' },
      { label: 'CI/CD', value: 'GitHub Actions — Embedded Linux builds · Automated testing · Firmware delivery' },
      { label: 'TOOLCHAIN', value: 'BitBake · Yocto SDK · PetaLinux · ARM GCC' },
    ]
  },
  {
    id: 'PRJ-035',
    title: 'PLCC Metering Transceiver',
    company: 'Embedded FAB',
    architecture: 'Hardware-software co-design of a Power Line Communication (PLCC) transceiver for smart metering applications. Employs noise-resistant modulation algorithms directly on bare-metal.',
    mcu: 'STM32F407 (ARM Cortex-M4)',
    protocols: 'SPI, UART, High-Speed ADC, PLCC Grid Protocol, Proprietary HAL',
    specs: [
      { label: 'HW', value: 'STM32F407 — ARM Cortex-M4 @ 168 MHz' },
      { label: 'OS / RTOS', value: 'Bare-Metal (No RTOS)' },
      { label: 'BOOTLOADER', value: 'Minimal custom bootloader' },
      { label: 'PROTOCOLS', value: 'PLCC Grid Protocol · SPI · UART · High-Speed ADC' },
      { label: 'DRIVERS', value: 'Custom bare-metal HAL — SPI · UART · ADC (STM32F4)' },
      { label: 'ALGORITHMS', value: 'Noise-resistant PLCC modulation — power line signal DSP' },
      { label: 'BUILD', value: 'CMake + ARM GCC Toolchain' },
      { label: 'DIAGNOSTICS', value: 'Runtime logging · On-chip ring buffer · Fault analysis' },
    ]
  }
];

export default function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState(null);

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
              padding: '28px',
              position: 'relative'
            }}
          >
            {/* technical ID stamp in top right corner */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                background: 'rgba(192, 193, 255, 0.1)',
                color: 'var(--primary)',
                border: '1px solid rgba(192, 193, 255, 0.2)',
                padding: '2px 8px',
                borderRadius: '4px'
              }}
            >
              {project.id}
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '6px'
                }}
              >
                // SYSTEM_PROJECT
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '20px',
                  color: 'var(--text-primary)',
                  marginBottom: '4px',
                  fontWeight: '700'
                }}
              >
                {project.title}
              </h3>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--secondary)',
                  marginBottom: '20px',
                  fontWeight: '500'
                }}
              >
                {project.company}
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)',
                  marginBottom: '24px'
                }}
              >
                {project.architecture}
              </p>
            </div>

            <div>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '8px', fontSize: '12px', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>HW_CORE:</span>
                  <span style={{ color: 'var(--text-primary)' }}>{project.mcu}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>PROTOCOLS:</span>
                  <span style={{ color: 'var(--primary)' }}>{project.protocols}</span>
                </div>
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
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  schema
                </span>
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
