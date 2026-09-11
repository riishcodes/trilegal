"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight,
  FolderKanban
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function TasksPage() {
  const { tasks, updateTaskStatus, addTask, cases, lawyers } = useApp();
  const [view, setView] = useState<"My Tasks" | "Team Tasks" | "All Tasks">("My Tasks");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New task form state
  const [title, setTitle] = useState("");
  const [caseId, setCaseId] = useState(cases[0]?.id || "case-1");
  const [assigneeId, setAssigneeId] = useState("lawyer-1");
  const [priority, setPriority] = useState<"URGENT" | "HIGH" | "MEDIUM" | "LOW">("HIGH");
  const [dueDate, setDueDate] = useState("25 Mar 2026");

  const filteredTasks = tasks.filter((t) => {
    if (view === "My Tasks" && t.assignedToLawyerId !== "lawyer-1") return false;
    if (priorityFilter !== "ALL" && t.priority !== priorityFilter) return false;
    return true;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const selCase = cases.find(c => c.id === caseId);
    const selLaw = lawyers.find(l => l.id === assigneeId);

    addTask({
      title,
      caseId,
      caseTitle: selCase?.title || "Active Case",
      assignedToLawyerId: assigneeId,
      assignedToName: selLaw?.name || "Arjun Mehra",
      priority,
      dueDate,
      status: "IN_PROGRESS",
      practiceArea: selCase?.practiceArea || "Dispute Resolution"
    });

    setTitle("");
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <span>TASK ASSIGNMENTS &amp; WORKLOAD</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {tasks.length} Active Tasks
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Coordinate research memos, drafting deadlines, and senior partner reviews.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs shadow-sm flex items-center space-x-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>CREATE TASK</span>
        </button>
      </div>

      {/* Filter Views Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        {/* Tabs */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg">
          {(["My Tasks", "Team Tasks", "All Tasks"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 font-semibold rounded-md transition-all ${
                view === v ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Priority Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-slate-500">Filter Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded font-semibold text-slate-700"
          >
            <option value="ALL">All Priorities</option>
            <option value="URGENT">Urgent</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Task Description</th>
                <th className="py-3 px-3">Case Matter</th>
                <th className="py-3 px-3">Assigned To</th>
                <th className="py-3 px-3">Priority</th>
                <th className="py-3 px-3">Due Date</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.map((t) => {
                const isCompleted = t.status === "COMPLETED";
                return (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div className="flex items-center space-x-2.5">
                        <button
                          onClick={() => updateTaskStatus(t.id, isCompleted ? "IN_PROGRESS" : "COMPLETED")}
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            isCompleted ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 hover:border-slate-400"
                          }`}
                        >
                          {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                        <span className={isCompleted ? "line-through text-slate-400" : ""}>{t.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <Link href={`/app/cases/${t.caseId}`} className="text-blue-600 hover:underline line-clamp-1">
                        {t.caseTitle}
                      </Link>
                    </td>
                    <td className="py-3.5 px-3 font-medium text-slate-800">{t.assignedToName}</td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        t.priority === "URGENT"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : t.priority === "HIGH"
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-medium text-slate-700">{t.dueDate}</td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        isCompleted ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-700"
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => updateTaskStatus(t.id, isCompleted ? "IN_PROGRESS" : "COMPLETED")}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        {isCompleted ? "Reopen" : "Mark Done"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE TASK MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateTask} className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 p-6 space-y-4 text-xs">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Create New Task
            </h2>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Task Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Draft rejoinder affidavit on Article 14..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Associate with Case *</label>
              <select
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {cases.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Assignee</label>
                <select
                  value={assigneeId}
                  onChange={(e) => setAssigneeId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                >
                  {lawyers.slice(0, 6).map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                >
                  <option value="URGENT">Urgent</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Due Date</label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-sm"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
