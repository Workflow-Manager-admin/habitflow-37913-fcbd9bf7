import React, { useState } from "react";
import "./App.css";

/**
 * AddNewHabitCard
 * A visually-centered card for adding a new habit, with minimalist pastel styling.
 *
 * Props:
 * - onAdd(habit): function called with new habit object ({name, frequency, startDate}) when Add Habit pressed
 */
 // PUBLIC_INTERFACE
function AddNewHabitCard({ onAdd }) {
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  const [showError, setShowError] = useState(false);

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    if (!habitName.trim()) {
      setShowError(true);
      return;
    }
    onAdd({
      name: habitName.trim(),
      frequency,
      startDate,
    });
    setHabitName("");
    setFrequency("Daily");
    setStartDate(new Date().toISOString().slice(0, 10));
    setShowError(false);
  }

  return (
    <div className="add-habit-card-container">
      <form
        className="add-habit-card"
        onSubmit={handleSubmit}
        autoComplete="off"
        tabIndex={0}
      >
        <div className="add-habit-title">Add New Habit</div>
        <label className="add-habit-label" htmlFor="habit-name-input">
          Habit Name
        </label>
        <input
          id="habit-name-input"
          className="add-habit-input"
          type="text"
          placeholder="e.g. Read 10 pages"
          value={habitName}
          maxLength={32}
          onChange={e => {
            setShowError(false);
            setHabitName(e.target.value);
          }}
        />
        <label className="add-habit-label" htmlFor="habit-frequency-input">
          Frequency
        </label>
        <select
          id="habit-frequency-input"
          className="add-habit-select"
          value={frequency}
          onChange={e => setFrequency(e.target.value)}
        >
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
        <label className="add-habit-label" htmlFor="habit-startdate-input">
          Start Date
        </label>
        <input
          id="habit-startdate-input"
          className="add-habit-input"
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />

        {showError && (
          <div className="add-habit-error">
            Please enter a habit name.
          </div>
        )}

        <button
          className="add-habit-btn"
          type="submit"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
}
export default AddNewHabitCard;
