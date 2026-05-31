import React, { useState, useEffect, useRef } from 'react';

const BOOT_LOGS = [
  "[SYSTEM_BOOT_LOG_v1.0.8]",
  "0.000000: CPU: ARM Cortex-M7 at 480 MHz detected",
  "0.000004: Memory: 2MB On-Chip Flash, 1MB SRAM configured",
  "0.000009: RTOS: FreeRTOS Kernel V10.4.3 initializing...",
  "0.000014: RTOS: FreeRTOS Scheduler running operational",
  "0.000021: Hardware Sec: TPM 2.0 Secure Storage ready",
  "0.000028: Cryptography: Signature Validation engine [OK]",
  "0.000035: Network: Industrial Ethernet PHY detected [100Base-TX]",
  "0.000041: Peripheral: EtherCAT Slave controller initialized",
  "0.000049: Peripheral: CAN-FD Node 0 active on CANopen network",
  "0.000057: System birth certificate verified via OPC UA FX",
  "0.000065: Bootloader signature status: VERIFIED_TRUSTED",
  "0.000072: STATUS: CORE_OPERATIONAL_READY // 0x535953",
  "==================================================",
  "Welcome to MOHAMED_GEDAN OS v2026.05.31",
  "Type 'help' to list available system commands.",
  ""
];

export default function InteractiveTerminal() {
  const [history, setHistory] = useState([]);
  const [booting, setBooting] = useState(true);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Simulate Booting Sequence
  useEffect(() => {
    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < BOOT_LOGS.length) {
        setHistory(prev => [...prev, BOOT_LOGS[logIndex]]);
        logIndex++;
      } else {
        clearInterval(interval);
        setBooting(false);
      }
    }, 180);

    return () => clearInterval(interval);
  }, []);

  // Auto Scroll to Bottom when history updates
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cleanInput = inputVal.trim().toLowerCase();
      const outputHistory = [...history, `gedan-os$ ${inputVal}`];

      if (cleanInput) {
        switch (cleanInput) {
          case 'help':
            outputHistory.push(
              "Available Commands:",
              "  about     - Display Mohamed's professional profile summary.",
              "  skills    - Print out the visual technical core stack.",
              "  sysinfo   - Display system hardware specifications.",
              "  contact   - Print communication channels & social handles.",
              "  clear     - Wipe console buffer logs.",
              "  reboot    - Perform system reset boot sequence."
            );
            break;
          case 'about':
            outputHistory.push(
              "Mohamed Gedan | Senior Embedded Systems & Firmware Architect",
              "----------------------------------------------------------------",
              "7+ years of experience in low-level embedded software, microcontrollers",
              "and Industrial Linux. Recognized for delivering mission-critical applications",
              "like high-performance drive controllers and secure boot industrial gateways.",
              "Proven record unblocking HW/SW defects in FPGAs, hardening security via TPM,",
              "and building optimized Yocto filesystems in globally distributed teams."
            );
            break;
          case 'skills':
            outputHistory.push(
              "TECHNICAL CORE STACK:",
              "  [Languages] : Embedded C, C++ (11/14/17), Python, Assembly, Bash, Rust (basic)",
              "  [OS/Kernel] : Yocto Project, PetaLinux, FreeRTOS, Zephyr, Bare-Metal",
              "  [Protocols] : EtherCAT, PROFINET, CANopen, Modbus, OPC UA FX, SPI, I2C, UART",
              "  [Hardware]  : ARM Cortex-M, STM32, RISC-V, Xilinx Zynq FPGAs",
              "  [Tooling]   : CMake, Make, BitBake, Docker, GDB, J-Link, Google Test (GTest)"
            );
            break;
          case 'sysinfo':
            outputHistory.push(
              "System Info (Telemetry):",
              "  Firmware Version : v2.6.5-stable",
              "  Target Board     : Zynq-7020 ARM Dual-Cortex A9 & Cortex-M7 Node",
              "  Active Nodes     : EtherCAT Slave, PROFINET Gateway",
              "  Security Storage : Infeneon TPM 2.0 (Active)",
              "  Compiler         : arm-none-eabi-gcc 10.3",
              "  Uptime           : 314159 seconds"
            );
            break;
          case 'contact':
            outputHistory.push(
              "Open Comm Channels:",
              "  Email    : gedan.dev@outlook.com",
              "  Location : Marktheidenfeld, Germany",
              "  LinkedIn : linkedin.com/in/mohamed-gedan",
              "  GitHub   : github.com/mgedan"
            );
            break;
          case 'clear':
            setHistory([]);
            setInputVal('');
            return;
          case 'reboot':
            setBooting(true);
            setHistory([]);
            setInputVal('');
            let logIndex = 0;
            const interval = setInterval(() => {
              if (logIndex < BOOT_LOGS.length) {
                setHistory(prev => [...prev, BOOT_LOGS[logIndex]]);
                logIndex++;
              } else {
                clearInterval(interval);
                setBooting(false);
              }
            }, 100);
            return;
          default:
            outputHistory.push(`OS: command not found: ${cleanInput}. Type 'help' for support.`);
        }
      }

      setHistory(outputHistory);
      setInputVal('');
    }
  };

  return (
    <div 
      className="terminal-container-box"
      onClick={handleTerminalClick}
      style={{
        background: '#060e20',
        border: '1px solid #2d3449',
        borderRadius: '8px',
        padding: '16px',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        lineHeight: '1.5',
        color: '#adc6ff',
        height: '320px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        cursor: 'text',
        position: 'relative'
      }}
    >
      {/* Simulated Mac/Linux Window Header Bar */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid #1c263c',
          paddingBottom: '8px',
          marginBottom: '12px',
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: 0.6
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></span>
          <span style={{ width: '8px', height: '8px', background: '#eab308', borderRadius: '50%' }}></span>
          <span style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }}></span>
        </div>
        <div style={{ color: 'var(--text-muted)' }}>bash - FreeRTOS - mgedan@core-0x535953</div>
        <div style={{ width: '36px' }}></div>
      </div>

      {/* Log Content */}
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: '8px' }}>
        {history.map((line, idx) => (
          <div 
            key={idx} 
            style={{ 
              whiteSpace: 'pre-wrap', 
              color: line.startsWith('gedan-os$') ? '#ffb783' : line.startsWith('  [') ? '#dae2fd' : '#adc6ff' 
            }}
          >
            {line}
          </div>
        ))}
        {booting && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffb783' }}>
            <span>BOOTING SYSTEM CORE...</span>
            <span className="terminal-spinner" style={{
              width: '10px',
              height: '10px',
              border: '2px solid #ffb783',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></span>
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Prompt Input Line */}
      {!booting && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#ffb783', marginRight: '8px' }}>gedan-os$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#dae2fd',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              caretColor: '#c0c1ff'
            }}
          />
        </div>
      )}

      {/* CSS Spinner Animation injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .terminal-container-box::-webkit-scrollbar {
          width: 4px;
        }
        .terminal-container-box::-webkit-scrollbar-track {
          background: #060e20;
        }
        .terminal-container-box::-webkit-scrollbar-thumb {
          background: #2d3449;
          border-radius: 2px;
        }
      `}} />
    </div>
  );
}
