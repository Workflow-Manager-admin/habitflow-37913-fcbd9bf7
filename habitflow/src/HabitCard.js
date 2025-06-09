import React from "react";
import "./App.css";

/**
 * HabitCard
 * A card displaying a single habit, with name, frequency, current streak,
 * a "Done for Today" checkbox, and edit/delete icons.
 *
 * Props:
 * - habit: {id, name, frequency, streak, bestStreak, calendar}
 * - onToggleDone: (habitId) => void
 * - onEdit: (habitId) => void
 * - onDelete: (habitId) => void
 * - isDone: Boolean for today's completion
 */
 // PUBLIC_INTERFACE
function HabitCard({
  habit,
  onToggleDone,
  onEdit,
  onDelete,
  isDone,
}) {
  const todayISO = new Date().toISOString().slice(0, 10);

  return (
    <div className="habit-card">
      <div className="habit-card-row">
        <div className="habit-card-title">{habit.name}</div>
        <div className="habit-card-icons">
          <button
            className="habit-card-icon-btn"
            aria-label="Edit habit"
            title="Edit"
            onClick={() => onEdit(habit.id)}
            tabIndex={0}
          >
            <svg width="18" height="18" fill="none" stroke="#8793C9" strokeWidth="2"
              viewBox="0 0 20 20">
              <path d="M13.5 3.5l3 3L6.75 16.25 3.5 16.5l.25-3.25L13.5 3.5z"/>
            </svg>
          </button>
          <button
            className="habit-card-icon-btn"
            aria-label="Delete habit"
            title="Delete"
            onClick={() => onDelete(habit.id)}
            tabIndex={0}
          >
            <svg width="18" height="18" fill="none" stroke="#D65070" strokeWidth="2"
              viewBox="0 0 20 20">
              <path d="M6 6l8 8M6 14L14 6"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="habit-card-meta">
        <span className="habit-card-frequency">{habit.frequency}</span>
        <span className="habit-card-streak" title="Current streak">
          <span role="img" aria-label="fire">🔥</span> {habit.streak || 0}
        </span>
        <span className="habit-card-best">
          Best: <b>{habit.bestStreak || 0}</b>
        </span>
      </div>
      <div className="habit-card-footer">
        <label className="habit-card-checkbox-label">
          <input
            type="checkbox"
            checked={!!isDone}
            onChange={() => onToggleDone(habit.id)}
            disabled={!!isDone}
          />
          <span className="habit-card-checkbox-custom"/>
          Done for Today
        </label>
      </div>
    </div>
  );
}

export default HabitCard;
