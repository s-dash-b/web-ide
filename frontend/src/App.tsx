import './App.css'
import { useEffect, useRef, useState } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'

function App() {
  const [code, setCode] = useState('// Write your code here\n')
  const terminalRef = useRef<HTMLDivElement>(null)
  const xtermRef = useRef<Terminal | null>(null)

  useEffect(() => {
    if (terminalRef.current && !xtermRef.current) {
      const term = new Terminal({
        theme: { background: '#181818' },
        fontSize: 14,
        rows: 10,
      })
      term.open(terminalRef.current)
      term.writeln('Welcome to the Online IDE!')
      xtermRef.current = term
    }
  }, [])

  return (
    <div className="ide-layout">
      <aside className="file-tree">
        <h3>Files</h3>
        {/* TODO: Add file tree with React DnD */}
        <ul>
          <li>main.py</li>
          <li>hello.cpp</li>
          <li>App.java</li>
        </ul>
      </aside>
      <main className="editor-area">
        <MonacoEditor
          width="100%"
          height="100%"
          language="python"
          theme="vs-dark"
          value={code}
          onChange={value => setCode(value || '')}
          options={{ fontSize: 16, minimap: { enabled: false } }}
        />
      </main>
      <section className="terminal-area">
        <div ref={terminalRef} className="xterm-container" style={{ width: '100%', height: '100%' }} />
      </section>
    </div>
  )
}

export default App
