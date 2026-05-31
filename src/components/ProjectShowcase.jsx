import React, { useState } from 'react';

const PROJECTS = [
  {
    id: 'PRJ-081',
    title: 'Industrial Gateway System',
    company: 'SIEMENS Digital Industries',
    architecture: 'A secure, hard real-time translation bridge mapping field protocols (CANopen, PROFINET) into corporate network infrastructure. Featuring signature validation at boot and live stream logging.',
    mcu: 'ARM Cortex-M7 & i.MX8 Dual-Core',
    protocols: 'PROFINET, CANopen, CAN bus, TCP/IP, Secure Boot (RSA)',
    diagram: [
      { source: 'Sensors / Actuators', flow: 'Analog / Digital Signals', dest: 'STM32 MCU' },
      { source: 'STM32 MCU', flow: 'CANopen bus', dest: 'Industrial Gateway Core' },
      { source: 'Industrial Gateway Core', flow: 'PROFINET', dest: 'PLC / Master Node' },
      { source: 'Secure Bootloader', flow: 'Signature Validation', dest: 'Firmware Integrity Check' }
    ]
  },
  {
    id: 'PRJ-094',
    title: 'Drive-Controller Firmware',
    company: 'Schneider Electric Automation GmbH',
    architecture: 'High-performance real-time motion control firmware running on custom Linux. Configures and operates high-speed cyclic industrial communication with distributed clock sub-microsecond synchronization.',
    mcu: 'Xilinx Zynq-7000 SoC (ARM A9 + FPGA)',
    protocols: 'EtherCAT Slave, OPC UA FX, Custom FPGA Register Map, TPM 2.0',
    diagram: [
      { source: 'EtherCAT Master', flow: 'Cyclic Sync Commands (250µs)', dest: 'FPGA IP Core' },
      { source: 'FPGA IP Core', flow: 'FOC Motor Control register data', dest: 'Drive Gate Drivers' },
      { source: 'ARM Core (Linux)', flow: 'Yocto Custom OS Services', dest: 'TPM Security Module' },
      { source: 'OPC UA FX Service', flow: 'Birth Certificate Validation', dest: 'Identity Verification' }
    ]
  },
  {
    id: 'PRJ-035',
    title: 'PLCC Metering Transceiver',
    company: 'Embedded FAB',
    architecture: 'Hardware-software co-design of a Power Line Communication (PLCC) transceiver for smart metering applications. Employs noise-resistant modulation algorithms directly on bare-metal.',
    mcu: 'STM32F407 (ARM Cortex-M4)',
    protocols: 'SPI, UART, High-Speed ADC, PLCC Grid Protocol, Proprietary HAL',
    diagram: [
      { source: 'Power Grid line', flow: 'High-Voltage AC noise stream', dest: 'Analog Front-End' },
      { source: 'Analog Front-End', flow: 'Raw ADC digital samples (SPI)', dest: 'STM32F4 DSP Filter' },
      { source: 'STM32F4 DSP Filter', flow: 'Modulated bitstreams decoded', dest: 'UART output stream' },
      { source: 'Diagnostics Logger', flow: 'Fault tracking', dest: 'On-Chip Ring Buffer' }
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
              SYSTEM ARCHITECTURE BLOCK DIAGRAM // {activeProject.id}
            </span>

            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '22px', marginBottom: '8px', color: 'var(--text-primary)' }}>
              {activeProject.title}
            </h3>
            
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px', fontFamily: 'var(--font-sans)', lineHeight: '1.5' }}>
              Simulated schematic signals and bus routes for {activeProject.company}'s firmware deployment node.
            </p>

            {/* Technical Flow Table Diagrams */}
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
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1.2fr 1fr', 
                  background: 'var(--card-bg-high)', 
                  padding: '8px 12px', 
                  borderBottom: '1px solid var(--card-border)',
                  color: 'var(--primary)',
                  fontWeight: '700'
                }}
              >
                <span>SOURCE_NODE</span>
                <span>SIGNAL / BUS_DATA</span>
                <span>DESTINATION_NODE</span>
              </div>
              {activeProject.diagram.map((row, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1.2fr 1fr', 
                    padding: '10px 12px', 
                    borderBottom: idx === activeProject.diagram.length - 1 ? 'none' : '1px solid var(--card-border)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <span style={{ color: 'var(--text-primary)' }}>{row.source}</span>
                  <span style={{ color: 'var(--tertiary)', fontStyle: 'italic' }}>➜ {row.flow}</span>
                  <span>{row.dest}</span>
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
