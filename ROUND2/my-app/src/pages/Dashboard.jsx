import { useState } from 'react'
import '../pages/Dashboard.css'

const TASKS = [
  { id: 1, title: 'Build Registration Module', status: 'done',        priority: 'high',   due: 'Jun 2' },
  { id: 2, title: 'Implement Login Flow',       status: 'done',        priority: 'high',   due: 'Jun 3' },
  { id: 3, title: 'Design Dashboard UI',        status: 'in-progress', priority: 'high',   due: 'Jun 4' },
  { id: 4, title: 'Write unit tests',           status: 'in-progress', priority: 'medium', due: 'Jun 6' },
  { id: 5, title: 'API integration layer',      status: 'todo',        priority: 'medium', due: 'Jun 8' },
  { id: 6, title: 'Performance optimization',   status: 'todo',        priority: 'low',    due: 'Jun 10' },
]

const ACTIVITY = [
  { label: 'Login module completed',       time: '2m ago',  color: '#43e97b' },
  { label: 'Dashboard layout in progress', time: '18m ago', color: '#6c63ff' },
  { label: 'Registration form validated',  time: '1h ago',  color: '#f59e0b' },
  { label: 'New branch: feature/auth',     time: '3h ago',  color: '#ff6584' },
  { label: 'Assessment Round 2 started',   time: '5h ago',  color: '#44445a' },
]

const NAV = [
  { icon: '⊞', label: 'Overview' },
  { icon: '◈', label: 'Tasks' },
  { icon: '◉', label: 'Analytics' },
  { icon: '⊙', label: 'Team' },
  { icon: '◎', label: 'Settings' },
]

function Dashboard({ onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [tasks, setTasks] = useState(TASKS)

  const done = tasks.filter(t => t.status === 'done').length
  const inProgress = tasks.filter(t => t.status === 'in-progress').length
  const todo = tasks.filter(t => t.status === 'todo').length
  const progress = Math.round((done / tasks.length) * 100)

  const stats = [
    { label: 'Tasks Done',  value: done,       total: tasks.length, icon: '✓', color: '#43e97b' },
    { label: 'In Progress', value: inProgress,  total: tasks.length, icon: '⟳', color: '#6c63ff' },
    { label: 'Pending',     value: todo,        total: tasks.length, icon: '◌', color: '#ff6584' },
    { label: 'Progress',    value: `${progress}%`, icon: '▲',        color: '#f59e0b' },
  ]

  const cycleStatus = (id) => {
    const cycle = { todo: 'in-progress', 'in-progress': 'done', done: 'todo' }
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: cycle[t.status] } : t))
  }

  return (
    <div className="dash-page">

      {/* Sidebar */}
      <aside className={`dash-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sb-inner">
          <div className="sb-brand">
            <div className="sb-mark">DA</div>
            {sidebarOpen && <span className="sb-name">DevAssess</span>}
          </div>

          <nav className="sb-nav">
            {NAV.map((item, i) => (
              <button key={i} className={`sb-item ${i === 0 ? 'active' : ''}`}>
                <span className="sb-icon">{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="sb-footer">
            <button className="sb-item" onClick={() => onNavigate && onNavigate('login')}>
              <span className="sb-icon">→</span>
              {sidebarOpen && <span>Logout</span>}
            </button>
            {sidebarOpen && (
              <div className="sb-user">
                <div className="sb-user-av">AJ</div>
                <div>
                  <div className="sb-user-name">Alex Johnson</div>
                  <div className="sb-user-role">Developer</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="dash-main">

        {/* Top bar */}
        <header className="dash-header">
          <div className="dash-header-left">
            <button className="dash-menu-btn" onClick={() => setSidebarOpen(p => !p)}>☰</button>
            <div>
              <div className="dash-greeting">Good morning, Alex 👋</div>
              <div className="dash-date">Thursday, June 4, 2026 · Round 2 Assessment</div>
            </div>
          </div>
          <div className="dash-header-right">
            <div className="dash-notif">🔔<span className="dash-notif-dot" /></div>
            <div className="dash-avatar">AJ</div>
          </div>
        </header>

        {/* Stats */}
        <div className="dash-stats">
          {stats.map((s, i) => {
            const pct = s.total ? Math.round((typeof s.value === 'number' ? s.value : parseInt(s.value)) / s.total * 100) : null
            return (
              <div className="stat-card" key={i}>
                <div className="stat-top">
                  <div className="stat-icon" style={{ color: s.color, background: `${s.color}18` }}>{s.icon}</div>
                  {pct !== null && <span className="stat-pct" style={{ color: s.color }}>{pct}%</span>}
                </div>
                <div className="stat-val" style={{ color: s.color }}>{s.value}</div>
                <div className="stat-lbl">{s.label}</div>
                {s.total && (
                  <div className="stat-bar-bg">
                    <div className="stat-bar-fill" style={{ width: `${pct}%`, background: s.color }} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="dash-tabs">
          {['overview', 'tasks', 'activity'].map(t => (
            <button key={t} className={`dash-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="dash-content">

          {/* Tasks Panel */}
          {(activeTab === 'overview' || activeTab === 'tasks') && (
            <div className="tasks-panel">
              <div className="panel-hdr">
                <span className="panel-ttl">Sprint Tasks</span>
                <span className="panel-cnt">{tasks.length} items</span>
              </div>
              {tasks.map((task, i) => (
                <div className="task-item" key={task.id} style={{ animationDelay: `${i * 0.05}s` }}>
                  <button
                    className={`task-cb ${task.status === 'done' ? 'done' : task.status === 'in-progress' ? 'in-progress' : ''}`}
                    onClick={() => cycleStatus(task.id)}
                    title="Click to cycle status"
                  >
                    {task.status === 'done' && '✓'}
                    {task.status === 'in-progress' && '⟳'}
                  </button>
                  <div className="task-info">
                    <span className={`task-title ${task.status === 'done' ? 'done' : ''}`}>{task.title}</span>
                    <span className="task-due">Due {task.due}</span>
                  </div>
                  <span className={`task-pri pri-${task.priority}`}>{task.priority}</span>
                  <span className={`task-badge badge-${task.status}`}>{task.status.replace('-', ' ')}</span>
                </div>
              ))}
            </div>
          )}

          {/* Activity Panel */}
          {(activeTab === 'overview' || activeTab === 'activity') && (
            <div className="activity-panel">
              <div className="panel-hdr">
                <span className="panel-ttl">Activity</span>
                <button className="activity-clear">Clear</button>
              </div>
              {ACTIVITY.map((a, i) => (
                <div className="activity-item" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="activity-dot" style={{ background: a.color, boxShadow: `0 0 8px ${a.color}55` }} />
                  <div>
                    <div className="activity-lbl">{a.label}</div>
                    <div className="activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
              <div className="ring-wrap">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="30" fill="none" stroke="var(--border)" strokeWidth="6" />
                  <circle cx="40" cy="40" r="30" fill="none" stroke="var(--accent)" strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 30}`}
                    strokeDashoffset={`${2 * Math.PI * 30 * (1 - progress / 100)}`}
                    transform="rotate(-90 40 40)"
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                  />
                  <text x="40" y="44" textAnchor="middle" fill="var(--accent)" fontSize="14" fontFamily="Syne" fontWeight="800">{progress}%</text>
                </svg>
                <span className="ring-lbl">Overall</span>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}

export default Dashboard
