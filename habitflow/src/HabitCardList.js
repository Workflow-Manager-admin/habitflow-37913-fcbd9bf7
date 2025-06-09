import React from "react";
import HabitCard from "./HabitCard";
import "./App.css";

/**
 * HabitCardList
 * Displays a responsive grid of habit cards below the AddNewHabitCard.
 *
 * Props:
 * - habits: array of habit objects
 * - onToggleDone: function(habitId)
 * - onEdit: function(habitId)
 * - onDelete: function(habitId)
 */
 // PUBLIC_INTERFACE
function HabitCardList({ habits, onToggleDone, onEdit, onDelete }) {
  const todayISO = new Date().toISOString().slice(0, 10);
  if (!habits.length) {
    return (
      <div className="habit-list-empty">
        No habits yet.<br />Add your first habit!
      </div>
    );
  }

  return (
    <div className="habit-list-grid">
      {habits.map((habit, idx) =>
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggleDone={onToggleDone}
          onEdit={onEdit}
          onDelete={onDelete}
          isDone={!!habit.calendar[todayISO]}
        />
      )}
    </div>
  );
}

export default HabitCardList;
