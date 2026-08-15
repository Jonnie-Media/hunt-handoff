'use client'

import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Command,
  Filter,
  LayoutDashboard,
  ListFilter,
  Menu,
  MessageSquareText,
  Moon,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react'

const members = [
  { name: 'Maya Chen', initials: 'MC', role: 'Product Lead', color: 'bg-sky-500' },
  { name: 'Jordan Lee', initials: 'JL', role: 'Engineering', color: 'bg-violet-500' },
  { name: 'Priya Shah', initials: 'PS', role: 'Research', color: 'bg-amber-500' },
  { name: 'Owen Wright', initials: 'OW', role: 'Design', color: 'bg-emerald-500' },
  { name: 'You', initials: 'YO', role: 'Project Lead', color: 'bg-rose-500' },
]

const seedTasks = [
  { id: 1, title: 'Map order status intents', description: 'Define the top order-status questions and the language customers use to ask them.', owner: 'Priya Shah', priority: 'High', hours: 2, status: 'Done', dod: 'Intent map reviewed and signed off by Product.', dependencies: 'Support ticket export', update: 'Clustered 86 tickets into five intents; ready for review.', time: 'Today, 9:42 AM' },
  { id: 2, title: 'Draft return policy answers', description: 'Create grounded answer patterns for return windows, eligibility, and refunds.', owner: 'Maya Chen', priority: 'High', hours: 3, status: 'In Progress', dod: 'Answers cover the top 10 return questions with source links.', dependencies: 'Policy source of truth', update: 'Drafted 7 of 10 answer patterns; checking edge cases next.', time: 'Today, 10:18 AM' },
  { id: 3, title: 'Build order lookup endpoint', description: 'Expose a small, authenticated endpoint for order status retrieval.', owner: 'Jordan Lee', priority: 'High', hours: 4, status: 'In Progress', dod: 'Endpoint returns status, ETA, and safe customer-facing errors.', dependencies: 'Order schema access', update: 'Happy path is working locally; error contract is next.', time: 'Today, 11:06 AM' },
  { id: 4, title: 'Design support chat entry', description: 'Design the entry point and empty state for the support deflection assistant.', owner: 'Owen Wright', priority: 'Medium', hours: 2, status: 'Review', dod: 'Figma flow includes desktop, mobile, and empty states.', dependencies: 'Intent map', update: 'Added mobile flow after sync; requesting Product sign-off.', time: 'Yesterday, 4:32 PM' },
  { id: 5, title: 'Define MVP success metrics', description: 'Agree on measurement events and target thresholds for the one-week MVP.', owner: 'Maya Chen', priority: 'Medium', hours: 2, status: 'Done', dod: 'Metrics document has owners, event names, and target thresholds.', dependencies: 'None', update: 'Baseline and target thresholds approved in team sync.', time: 'Yesterday, 3:10 PM' },
  { id: 6, title: 'Create stock availability intents', description: 'Identify stock questions and define when to route customers to a human.', owner: 'Priya Shah', priority: 'Medium', hours: 3, status: 'To Do', dod: 'Stock intent list includes route-to-human rules and examples.', dependencies: 'Support ticket export', update: 'Queued behind return intent analysis.', time: 'Yesterday, 2:04 PM' },
  { id: 7, title: 'Set up analytics events', description: 'Instrument assistant opened, answer shown, escalation, and resolution events.', owner: 'Jordan Lee', priority: 'Low', hours: 3, status: 'Backlog', dod: 'Events appear in staging with documented properties.', dependencies: 'Success metrics', update: 'Waiting for event names to be finalized.', time: 'Monday, 1:20 PM' },
  { id: 8, title: 'Write escalation copy', description: 'Create concise copy for handoff when the assistant cannot resolve a request.', owner: 'Owen Wright', priority: 'Medium', hours: 1, status: 'Review', dod: 'Escalation copy has approved tone and a clear next step.', dependencies: 'Support tone guide', update: 'Copy is ready; linked to the latest chat entry flow.', time: 'Today, 8:48 AM' },
  { id: 9, title: 'QA intent routing', description: 'Run representative queries through the routing rules and log mismatches.', owner: 'Jordan Lee', priority: 'High', hours: 4, status: 'To Do', dod: 'Test matrix covers 30 queries and has zero P0 routing issues.', dependencies: 'Order and return intents', update: 'Blocked until the intent map and endpoint are merged.', time: 'Monday, 11:05 AM' },
  { id: 10, title: 'Prepare demo walkthrough', description: 'Package the happy path and one escalation story for the stakeholder demo.', owner: 'Maya Chen', priority: 'Low', hours: 2, status: 'Backlog', dod: 'Demo script includes setup, two categories, and fallback path.', dependencies: 'QA intent routing', update: 'Will start once the QA pass has a green signal.', time: 'Monday, 9:15 AM' },
]

const columns = ['Backlog', 'To Do', 'In Progress', 'Review', 'Done']

function Avatar({ name, small = false }: { name: string; small?: boolean }) {
  const person = members.find((member) => member.name === name) ?? members[0]
  return <span className={`${small ? 'size-6 text-[9px]' : 'size-8 text-[10px]'} ${person.color} inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white ring-2 ring-background`} title={name}>{person.initials}</span>
}

function StatusPill({ status }: { status: string }) {
  const tone = status === 'Done' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : status === 'In Progress' ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400' : status === 'Review' ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400' : status === 'To Do' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-muted text-muted-foreground'
  return <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold ${tone}`}><span className="size-1.5 rounded-full bg-current" />{status}</span>
}

function Priority({ priority }: { priority: string }) {
  const tone = priority === 'High' ? 'text-rose-500' : priority === 'Medium' ? 'text-amber-500' : 'text-muted-foreground'
  return <span className={`text-[11px] font-semibold ${tone}`}>{priority}</span>
}

export default function Home() {
  const [tasks, setTasks] = useState(seedTasks)
  const [selectedTask, setSelectedTask] = useState(seedTasks[2])
  const [activeView, setActiveView] = useState('Dashboard')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All tasks')
  const [dark, setDark] = useState(true)
  const [showNewTask, setShowNewTask] = useState(false)
  const [toast, setToast] = useState('')

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesQuery = `${task.title} ${task.owner} ${task.description}`.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'All tasks' || task.priority === filter || task.status === filter
    return matchesQuery && matchesFilter
  }), [tasks, query, filter])

  const counts = columns.map((column) => ({ column, count: tasks.filter((task) => task.status === column).length }))
  const doneCount = tasks.filter((task) => task.status === 'Done').length
  const totalHours = tasks.reduce((sum, task) => sum + task.hours, 0)

  function updateStatus(status: string) {
    if (!selectedTask) return
    setTasks((current) => current.map((task) => task.id === selectedTask.id ? { ...task, status, time: 'Just now', update: `Status moved to ${status}.` } : task))
    setSelectedTask((task) => ({ ...task, status, time: 'Just now', update: `Status moved to ${status}.` }))
    setToast(`Task moved to ${status}`)
    setTimeout(() => setToast(''), 2400)
  }

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/70 bg-background/95 px-4 backdrop-blur md:px-7">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted md:hidden" aria-label="Open navigation"><Menu className="size-5" /></button>
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background"><Zap className="size-4 fill-current" /></div>
              <div><p className="text-sm font-bold tracking-tight">Hunt Handoff</p><p className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:block">Northstar Retail Co.</p></div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 md:gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground lg:flex"><Command className="size-3.5" /><span>Quick find</span><kbd className="ml-8 rounded border border-border px-1.5 py-0.5 text-[10px]">⌘ K</kbd></div>
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Toggle theme" onClick={() => setDark(!dark)}>{dark ? <Sun className="size-4" /> : <Moon className="size-4" />}</button>
            <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Notifications"><Bell className="size-4" /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-rose-500" /></button>
            <Avatar name="You" />
          </div>
        </header>

        <div className="flex">
          <aside className="hidden min-h-[calc(100vh-4rem)] w-60 shrink-0 border-r border-border/70 px-3 py-5 md:block">
            <div className="mb-6 px-3"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Workspace</p><div className="mt-3 flex items-center justify-between"><p className="text-sm font-semibold">Support Deflection</p><ChevronDown className="size-4 text-muted-foreground" /></div><p className="mt-1 text-xs text-muted-foreground">Assignment 1 · Week 1</p></div>
            <nav className="space-y-1" aria-label="Main navigation">
              {[['Dashboard', LayoutDashboard], ['Kanban Board', ListFilter], ['Team Charter', Users], ['Activity Log', Activity]].map(([label, Icon]) => <button key={label as string} onClick={() => setActiveView(label as string)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${activeView === label ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}`}><Icon className="size-4" /><span>{label as string}</span>{label === 'Activity Log' && <span className="ml-auto text-[10px] text-muted-foreground">12</span>}</button>)}
            </nav>
            <div className="mt-8 border-t border-border/70 pt-6"><p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Sprint health</p><div className="mt-4 rounded-xl border border-border bg-card p-3"><div className="mb-2 flex items-center justify-between"><span className="text-xs font-semibold">On track</span><span className="text-xs text-emerald-500">72%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full w-[72%] rounded-full bg-emerald-500" /></div><p className="mt-2 text-[11px] leading-4 text-muted-foreground">2 days left in this sprint</p></div></div>
            <div className="mt-auto space-y-1 pt-6"><button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted"><Settings2 className="size-4" />Settings</button><button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted"><CircleHelp className="size-4" />Help center</button></div>
          </aside>

          <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">
            <div className="mx-auto max-w-[1400px]">
              <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-semibold text-muted-foreground">Monday, October 14, 2024 <span className="mx-1.5">/</span> Sprint 01</p><h1 className="text-2xl font-bold tracking-tight md:text-3xl">Good morning, team.</h1><p className="mt-1 text-sm text-muted-foreground">Here&apos;s what&apos;s moving across Northstar Support Deflection.</p></div><button onClick={() => setShowNewTask(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"><Plus className="size-4" />New task</button></div>

              <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ['Sprint progress', `${doneCount} / ${tasks.length}`, `${Math.round((doneCount / tasks.length) * 100)}% complete`, Target, 'text-emerald-500'],
                  ['Active tasks', `${tasks.filter((task) => ['To Do', 'In Progress', 'Review'].includes(task.status)).length}`, '3 need attention', Zap, 'text-sky-500'],
                  ['Team capacity', `${totalHours}h`, 'of 64h planned', Clock3, 'text-violet-500'],
                  ['Handoff health', 'Good', 'No stale updates', ShieldCheck, 'text-amber-500'],
                ].map(([label, value, detail, Icon, color]) => <div key={label as string} className="rounded-xl border border-border bg-card p-4"><div className="mb-4 flex items-center justify-between"><p className="text-xs font-medium text-muted-foreground">{label as string}</p><Icon className={`size-4 ${color as string}`} /></div><div className="flex items-end justify-between"><p className="text-2xl font-bold tracking-tight">{value as string}</p><p className="text-[11px] text-muted-foreground">{detail as string}</p></div></div>)}
              </div>

              <div className="mb-6 flex flex-col justify-between gap-3 lg:flex-row lg:items-center"><div className="flex items-center gap-1 overflow-x-auto rounded-lg bg-muted/60 p-1">{['Dashboard', 'Kanban Board', 'Team Charter', 'Activity Log'].map((view) => <button key={view} onClick={() => setActiveView(view)} className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold ${activeView === view ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>{view}</button>)}</div><div className="flex items-center gap-2"><div className="relative flex-1 sm:flex-none"><Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks..." className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-xs outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring sm:w-52" /></div><button onClick={() => setFilter(filter === 'All tasks' ? 'High' : 'All tasks')} className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-xs font-semibold text-muted-foreground hover:text-foreground"><Filter className="size-3.5" />{filter}<ChevronDown className="size-3.5" /></button></div></div>

              {activeView === 'Team Charter' ? <Charter /> : activeView === 'Activity Log' ? <AuditLog /> : <>
                <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-5">{counts.map(({ column, count }) => <div key={column} className="rounded-xl border border-border/70 bg-card/50 px-3 py-3"><div className="flex items-center justify-between"><p className="text-[11px] font-semibold text-muted-foreground">{column}</p><span className="text-sm font-bold">{count}</span></div><div className="mt-3 h-1 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${column === 'Done' ? 'w-full bg-emerald-500' : column === 'In Progress' ? 'w-2/3 bg-sky-500' : column === 'Review' ? 'w-3/4 bg-violet-500' : 'w-1/3 bg-muted-foreground/40'}`} /></div></div>)}</div>
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                  <section className="min-w-0"><div className="mb-3 flex items-center justify-between"><div><h2 className="text-base font-bold">Project board</h2><p className="mt-0.5 text-xs text-muted-foreground">Make work visible. Make handoffs easy.</p></div><button className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Board options"><MoreHorizontal className="size-4" /></button></div><div className="grid gap-3 overflow-x-auto pb-2 md:grid-cols-2 xl:grid-cols-5">{columns.map((column) => <div key={column} className="min-w-[210px] rounded-xl bg-muted/40 p-2.5"><div className="mb-3 flex items-center justify-between px-1"><div className="flex items-center gap-2"><span className={`size-2 rounded-full ${column === 'Done' ? 'bg-emerald-500' : column === 'In Progress' ? 'bg-sky-500' : column === 'Review' ? 'bg-violet-500' : column === 'To Do' ? 'bg-amber-500' : 'bg-muted-foreground/50'}`} /><h3 className="text-xs font-bold">{column}</h3></div><span className="text-[11px] text-muted-foreground">{filteredTasks.filter((task) => task.status === column).length}</span></div><div className="space-y-2">{filteredTasks.filter((task) => task.status === column).map((task) => <button key={task.id} onClick={() => setSelectedTask(task)} className={`w-full rounded-lg border bg-card p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/30 ${selectedTask.id === task.id ? 'border-foreground/40 ring-1 ring-foreground/10' : 'border-border/80'}`}><div className="mb-2 flex items-start justify-between gap-2"><p className="text-xs font-semibold leading-4">{task.title}</p><MoreHorizontal className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" /></div><p className="mb-3 line-clamp-2 text-[11px] leading-4 text-muted-foreground">{task.description}</p><div className="mb-3 flex items-center justify-between"><Priority priority={task.priority} /><span className="text-[10px] text-muted-foreground">{task.hours}h</span></div><div className="flex items-center justify-between border-t border-border/70 pt-2"><div className="flex items-center gap-1.5"><Avatar name={task.owner} small /><span className="max-w-[92px] truncate text-[10px] text-muted-foreground">{task.owner}</span></div><span className="text-[10px] text-muted-foreground">#{task.id.toString().padStart(2, '0')}</span></div></button>)}</div><button onClick={() => setShowNewTask(true)} className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg py-2 text-[11px] font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"><Plus className="size-3.5" />Add task</button></div>)}</div></section>
                  <HandoffPanel task={selectedTask} onStatus={updateStatus} />
                </div>
                <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]"><div className="rounded-xl border border-border bg-card p-5"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-sm font-bold">Team working agreement</h2><p className="mt-1 text-xs text-muted-foreground">Shared rules for a focused one-week sprint.</p></div><button onClick={() => setActiveView('Team Charter')} className="text-xs font-semibold text-muted-foreground hover:text-foreground">View charter <ArrowRight className="ml-1 inline size-3.5" /></button></div><div className="grid gap-4 sm:grid-cols-2">{[['Communication', 'Async first. Decisions live in the project, not in DMs.'], ['Accountability', 'Every task has one owner and a checkable Definition of Done.'], ['Escalation', 'Flag blockers within 4 hours; Product Lead resolves priority conflicts.'], ['Sign-off', 'Maya Chen · Product Lead',]].map(([label, copy]) => <div key={label} className="flex gap-3"><div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-muted"><Check className="size-3.5 text-emerald-500" /></div><div><p className="text-xs font-semibold">{label}</p><p className="mt-1 text-[11px] leading-4 text-muted-foreground">{copy}</p></div></div>)}</div></div><div className="rounded-xl border border-border bg-card p-5"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-sm font-bold">Recent activity</h2><p className="mt-1 text-xs text-muted-foreground">Latest changes across the board.</p></div><Activity className="size-4 text-muted-foreground" /></div><div className="space-y-4">{tasks.slice(0, 3).map((task) => <div key={task.id} className="flex gap-3"><Avatar name={task.owner} small /><div className="min-w-0"><p className="text-xs leading-4"><span className="font-semibold">{task.owner}</span> updated <span className="font-semibold">{task.title}</span></p><p className="mt-1 text-[10px] text-muted-foreground">{task.time}</p></div></div>)}</div></div></div>
              </>}
            </div>
          </main>
        </div>
        {showNewTask && <NewTaskModal onClose={() => setShowNewTask(false)} onCreate={(task) => { setTasks((current) => [...current, { ...task, id: current.length + 1, time: 'Just now', update: 'Task created and added to the board.' }]); setShowNewTask(false); setToast('Task created successfully'); setTimeout(() => setToast(''), 2400) }} />}
        {toast && <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-foreground px-4 py-3 text-xs font-semibold text-background shadow-xl">{toast}</div>}
      </div>
    </div>
  )
}

function HandoffPanel({ task, onStatus }: { task: typeof seedTasks[number]; onStatus: (status: string) => void }) {
  return <aside className="h-fit rounded-xl border border-border bg-card p-5 xl:sticky xl:top-24"><div className="mb-5 flex items-start justify-between gap-3"><div><div className="mb-2 flex items-center gap-2"><span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">HUNT Handoff</span><span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold text-emerald-500">LIVE</span></div><h2 className="text-base font-bold leading-5">{task.title}</h2></div><button className="rounded-md p-1 text-muted-foreground hover:bg-muted" aria-label="More task options"><MoreHorizontal className="size-4" /></button></div><div className="mb-5 flex items-center justify-between"><StatusPill status={task.status} /><div className="flex items-center gap-2"><Avatar name={task.owner} small /><span className="text-xs font-semibold">{task.owner}</span></div></div><div className="space-y-5"><div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">What&apos;s done</p><div className="flex gap-2 text-xs leading-5"><Check className="mt-1 size-3.5 shrink-0 text-emerald-500" /><span>{task.status === 'Done' ? task.description : 'Happy path and initial scope are documented in the task brief.'}</span></div></div><div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">What&apos;s next</p><div className="flex gap-2 text-xs leading-5"><ArrowRight className="mt-1 size-3.5 shrink-0 text-sky-500" /><span>{task.status === 'Done' ? 'Confirm downstream consumers and close the handoff.' : task.update}</span></div></div><div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/60 p-3"><div><p className="text-[10px] text-muted-foreground">Dependency</p><p className="mt-1 text-[11px] font-semibold">{task.dependencies}</p></div><div><p className="text-[10px] text-muted-foreground">Updated</p><p className="mt-1 text-[11px] font-semibold">{task.time}</p></div></div><div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Definition of Done</p><p className="rounded-lg border border-border/70 bg-background p-3 text-xs leading-5">{task.dod}</p></div></div><div className="mt-6 border-t border-border/70 pt-4"><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">Move task</p><div className="flex flex-wrap gap-1.5">{columns.map((status) => <button key={status} onClick={() => onStatus(status)} className="rounded-md border border-border px-2 py-1 text-[10px] font-semibold text-muted-foreground hover:bg-muted hover:text-foreground">{status}</button>)}</div></div><button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2 text-xs font-semibold hover:bg-muted"><MessageSquareText className="size-3.5" />Add handoff note</button></aside>
}

function Charter() {
  return <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"><section className="rounded-xl border border-border bg-card p-6"><div className="mb-7 flex items-start justify-between"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Northstar Retail Co.</p><h2 className="text-xl font-bold">Team working agreement</h2><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">A shared operating system for the Support Deflection MVP. Every decision should leave the next teammate with enough context to continue.</p></div><Sparkles className="size-5 text-amber-500" /></div><div className="space-y-6">{[['Communication rules', 'Async first. Use the board for decisions and blockers. Keep meetings to 25 minutes and post a written recap.'], ['Deadlines', 'Sprint ends Friday at 5:00 PM. Daily check-in is 9:30 AM. Blockers are flagged within four hours.'], ['Conflict resolution', 'Name the tradeoff, propose two options, and let the Product Lead make the call when consensus stalls.'], ['Accountability', 'One owner per task, one checkable Definition of Done, and a latest update after every meaningful change.'], ['Escalation procedure', 'Tag the owner first, then the Product Lead. A blocked high-priority task is escalated the same day.']].map(([title, text]) => <div key={title} className="border-b border-border/70 pb-5 last:border-0 last:pb-0"><h3 className="text-sm font-bold">{title}</h3><p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div></section><div className="space-y-6"><section className="rounded-xl border border-border bg-card p-6"><div className="mb-4 flex items-center justify-between"><h2 className="text-sm font-bold">Team members</h2><Users className="size-4 text-muted-foreground" /></div><div className="space-y-4">{members.slice(0, 4).map((member) => <div key={member.name} className="flex items-center gap-3"><Avatar name={member.name} /><div><p className="text-sm font-semibold">{member.name}</p><p className="text-xs text-muted-foreground">{member.role}</p></div></div>)}</div></section><section className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6"><div className="mb-3 flex items-center gap-2"><ShieldCheck className="size-4 text-emerald-500" /><h2 className="text-sm font-bold">Team sign-off</h2></div><p className="text-sm leading-6 text-muted-foreground">Approved by <span className="font-semibold text-foreground">Maya Chen</span>, Product Lead, on October 14, 2024.</p><div className="mt-4 flex -space-x-2">{members.slice(0, 4).map((member) => <Avatar key={member.name} name={member.name} small />)}</div></section></div></div>
}

function AuditLog() {
  const events = [['Jordan Lee', 'moved Build order lookup endpoint to In Progress', 'Today, 11:06 AM', 'Status change'], ['Maya Chen', 'updated the Definition of Done for Draft return policy answers', 'Today, 10:18 AM', 'Task edit'], ['Priya Shah', 'completed Map order status intents', 'Today, 9:42 AM', 'Task edit'], ['Owen Wright', 'changed Design support chat entry to Review', 'Yesterday, 4:32 PM', 'Status change'], ['Maya Chen', 'created the MVP success metrics task', 'Yesterday, 3:10 PM', 'Task creation'], ['Jordan Lee', 'changed owner on QA intent routing', 'Monday, 11:05 AM', 'Owner change']]
  return <section className="rounded-xl border border-border bg-card"><div className="flex items-center justify-between border-b border-border/70 p-5"><div><h2 className="text-sm font-bold">Activity & audit log</h2><p className="mt-1 text-xs text-muted-foreground">Every board change has a visible owner and timestamp.</p></div><button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold"><CalendarDays className="size-3.5" />This sprint <ChevronDown className="size-3.5" /></button></div><div className="divide-y divide-border/70">{events.map(([person, action, time, type]) => <div key={`${person}-${action}`} className="flex items-center gap-4 p-5"><Avatar name={person} small /><div className="min-w-0 flex-1"><p className="text-sm"><span className="font-semibold">{person}</span> {action}</p><p className="mt-1 text-xs text-muted-foreground">{time}</p></div><span className="hidden rounded-md bg-muted px-2 py-1 text-[10px] font-semibold text-muted-foreground sm:inline-flex">{type}</span></div>)}</div></section>
}

function NewTaskModal({ onClose, onCreate }: { onClose: () => void; onCreate: (task: Omit<typeof seedTasks[number], 'id' | 'time' | 'update'>) => void }) {
  const [title, setTitle] = useState('')
  const [owner, setOwner] = useState('Maya Chen')
  const [hours, setHours] = useState('2')
  const [priority, setPriority] = useState('Medium')
  const [dod, setDod] = useState('')
  const valid = title.trim() && owner && priority && dod.trim() && Number(hours) > 0 && Number(hours) <= 4
  return <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl"><div className="mb-5 flex items-start justify-between"><div><h2 className="text-base font-bold">Create a task</h2><p className="mt-1 text-xs text-muted-foreground">Every task needs an owner and a checkable outcome.</p></div><button onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:bg-muted" aria-label="Close"><X className="size-4" /></button></div><div className="space-y-4"><label className="block"><span className="mb-1.5 block text-xs font-semibold">Task title</span><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Review intent examples" className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></label><div className="grid grid-cols-2 gap-3"><label className="block"><span className="mb-1.5 block text-xs font-semibold">Owner</span><select value={owner} onChange={(event) => setOwner(event.target.value)} className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none">{members.slice(0, 4).map((member) => <option key={member.name}>{member.name}</option>)}</select></label><label className="block"><span className="mb-1.5 block text-xs font-semibold">Priority</span><select value={priority} onChange={(event) => setPriority(event.target.value)} className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none"><option>High</option><option>Medium</option><option>Low</option></select></label></div><label className="block"><span className="mb-1.5 block text-xs font-semibold">Estimated hours <span className="font-normal text-muted-foreground">(max 4)</span></span><input type="number" min="1" max="4" value={hours} onChange={(event) => setHours(event.target.value)} className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></label><label className="block"><span className="mb-1.5 block text-xs font-semibold">Definition of Done</span><textarea value={dod} onChange={(event) => setDod(event.target.value)} placeholder="One checkable sentence..." rows={3} className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" /></label>{Number(hours) > 4 && <p className="text-xs font-semibold text-rose-500">Tasks must be 4 hours or less. Split larger work into smaller tasks.</p>}</div><div className="mt-6 flex justify-end gap-2"><button onClick={onClose} className="rounded-lg px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted">Cancel</button><button disabled={!valid} onClick={() => onCreate({ title, description: 'New task awaiting a detailed brief.', owner, priority, hours: Number(hours), status: 'Backlog', dod, dependencies: 'None' })} className="rounded-lg bg-foreground px-4 py-2 text-xs font-semibold text-background disabled:cursor-not-allowed disabled:opacity-40">Create task</button></div></div></div>
}
