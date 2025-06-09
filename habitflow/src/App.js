// PUBLIC_INTERFACE
import React, { useState } from 'react';
import './App.css';
import AddNewHabitCard from './AddNewHabitCard';
import HabitCardList from './HabitCardList';

// PUBLIC_INTERFACE
function App() {
  // State for list of habits and selected calendar month/year
  const [habits, setHabits] = useState([]);
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

  // Get today's date ISO (yyyy-mm-dd)
  const todayISO = new Date().toISOString().slice(0, 10);

  // PUBLIC_INTERFACE
  // Add a new habit. Expects {name, frequency, startDate}
  function addHabit({ name, frequency, startDate }) {
    setHabits([
      ...habits,
      {
        id: Date.now(),
        name,
        frequency,
        startDate,
        streak: 0,
        bestStreak: 0,
        calendar: {}, // { yyyy-mm-dd: true }
      },
    ]);
  }

  // PUBLIC_INTERFACE
  function markHabitDone(habitId, dateStr) {
    setHabits(habits =>
      habits.map(h => {
        if (h.id !== habitId) return h;
        // Mark as done for this date
        const updatedCal = { ...h.calendar, [dateStr]: true };

        // Calculate current streak
        let streak = 0;
        let bestStreak = h.bestStreak || 0;
        // Walk backwards from today
        let d = new Date(dateStr);
        while (updatedCal[d.toISOString().slice(0, 10)]) {
          streak++;
          d.setDate(d.getDate() - 1);
        }
        // Update best streak if improved
        bestStreak = Math.max(bestStreak, streak);

        return {
          ...h,
          calendar: updatedCal,
          streak,
          bestStreak,
        };
      }),
    );
  }

  // PUBLIC_INTERFACE
  // Simple onToggleDone for "Done for Today" checkbox
  function handleToggleDone(habitId) {
    markHabitDone(habitId, todayISO);
  }

  // PUBLIC_INTERFACE
  function handleDeleteHabit(habitId) {
    setHabits(habits => habits.filter(h => h.id !== habitId));
  }
  // PUBLIC_INTERFACE
  function handleEditHabit(habitId) {
    // Placeholder for edit logic
    alert("Edit habit feature coming soon! (habitId: " + habitId + ")");
  }

  // Helper to get all days in a given month/year
  function daysInMonth(month, year) {
    const arr = [];
    const d = new Date(year, month, 1);
    while (d.getMonth() === month) {
      arr.push(d.toISOString().slice(0, 10));
      d.setDate(d.getDate() + 1);
    }
    return arr;
  }
  // Used for calendar rendering
  const allDays = daysInMonth(calendarMonth, calendarYear);

  // Helpers for UI
  const pastelPalette = [
    '#F8ECD7', // light cream
    '#D7FFC7', // mint green
    '#C7E6FF', // pale blue
    '#F7D7FF', // soft lavender
    '#FFF9C7', // butter yellow
    '#FFD7D9', // blush
    '#D7FFFA', // aqua
    '#E4D7FF', // lilac
    '#D7FFE7', // tea green
  ];

  function nextMonth() {
    setCalendarMonth(m =>
      m === 11 ? 0 : m + 1
    );
    setCalendarYear(y =>
      calendarMonth === 11 ? y + 1 : y
    );
  }
  function prevMonth() {
    setCalendarMonth(m =>
      m === 0 ? 11 : m - 1
    );
    setCalendarYear(y =>
      calendarMonth === 0 ? y - 1 : y
    );
  }

  // PUBLIC_INTERFACE
  function calendarCellStyle(isComplete, isToday, dayIdx) {
    const base = {
      borderRadius: '12px',
      padding: 0,
      width: 34,
      height: 34,
      textAlign: 'center',
      margin: 1,
      background: isComplete
        ? pastelPalette[(dayIdx + 3) % pastelPalette.length]
        : 'rgba(245,245,245,0.65)',
      color: isToday ? '#4CAF50' : '#444',
      border: isToday ? '2px solid #4CAF50' : '1px solid #eee',
      fontWeight: isToday ? 600 : 400,
      boxShadow: isToday ? '0 1px 8px #4CAF5040' : undefined,
      cursor: isComplete ? 'default' : 'pointer',
      fontSize: 14,
      outline: 'none',
      transition: 'background 0.2s, box-shadow 0.2s',
    };
    return base;
  }

  // --- Main UI ---
  return (
    <div className="app" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(120deg, #f6f8fc 0%, #e7f6ff 100%)' }}>
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="container navbar-content">
          <div className="navbar-left">
            <span className="navbar-title">📈 StreakFlow</span>
          </div>
          <div className="navbar-right">
            <span className="navbar-profile" title="Profile">👤</span>
          </div>
        </div>
      </nav>
      <main>
        <div
          className="container"
          style={{
            paddingTop: 90,
            paddingBottom: 48,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "60vh"
          }}
        >
          {/* Add Habit Card - always visible, centered */}
          <AddNewHabitCard onAdd={addHabit} />
          {/* Dashboard header */}
          <section style={{
            background: '#fff',
            borderRadius: 24,
            padding: '32px 26px 30px 26px',
            boxShadow: '0 6px 36px 0 #c2e2ff40',
            textAlign: 'center',
            marginBottom: 36,
            width: '100%',
            maxWidth: 510
          }}>
            <div className="subtitle" style={{ color: '#99B7FF', fontWeight: 600, fontSize: '1.14rem', marginBottom: 6 }}>Track your habits</div>
            <h1 className="title" style={{
              fontWeight: 700,
              fontSize: '2.55rem',
              margin: 0,
              color: '#4C6387',
              letterSpacing: '-2px'
            }}>
              Progress, Streaks, Done.
            </h1>
            <div className="description" style={{
              fontSize: '1rem',
              color: '#7A90A8',
              margin: '10px 0 0 0'
            }}>
              Stay consistent, build better habits—see your streaks grow!
            </div>
          </section>
          {/* Habits list */}
          <section style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
            <HabitCardList
              habits={habits}
              onToggleDone={handleToggleDone}
              onEdit={handleEditHabit}
              onDelete={handleDeleteHabit}
            />
          </section>
          {/* Month controls */}
          <section style={{
            margin: '42px auto 0 auto',
            width: '100%',
            maxWidth: 900,
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              gap: 18,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <button
                className="btn"
                style={{ background: '#E4D7FF', color: '#5587f3', borderRadius: 12, fontWeight: 600, padding: '7px 16px' }}
                onClick={prevMonth}
              >&#8592; Prev</button>
              <span style={{ fontSize: 18, fontWeight: 600, color: "#4C6387", letterSpacing: '1px' }}>
                {new Date(calendarYear, calendarMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <button
                className="btn"
                style={{ background: '#D7FFC7', color: '#436DDD', borderRadius: 12, fontWeight: 600, padding: '7px 16px' }}
                onClick={nextMonth}
              >Next &#8594;</button>
            </div>
          </section>
          <div style={{ height: 46 }} />
        </div>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
function MiniHabitCalendar({ habit, allDays, calendarMonth, calendarYear, onMarkDone, cellStyle, todayISO }) {
  // Render grid for the month
  const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // For layout
  const firstDate = new Date(allDays[0]);
  const startDay = firstDate.getDay(); // 0..6
  const cells = [];

  // Padding empty cells until first day
  for (let i = 0; i < startDay; ++i) cells.push(null);

  for (let i = 0; i < allDays.length; ++i) {
    cells.push(allDays[i]);
  }
  // Possibly pad at end for row completeness (up to 42 cells)
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div style={{ marginTop: 4 }}>
      <div style={{
        display: 'flex',
        gap: 3,
        justifyContent: "center",
        marginBottom: 4
      }}>
        {weekDayNames.map(d =>
          <div key={d} style={{
            width: 34,
            fontSize: 13,
            color: '#b1bacf',
            fontWeight: 500,
            textAlign: 'center'
          }}>{d}</div>
        )}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 3
      }}>
        {cells.map((dateStr, idx) => {
          if (!dateStr) return <div key={idx} />;
          const isComplete = !!habit.calendar[dateStr];
          const isToday = dateStr === todayISO;
          return (
            <button
              key={dateStr}
              style={cellStyle(isComplete, isToday, idx)}
              disabled={isComplete}
              aria-label={dateStr}
              onClick={() => onMarkDone(habit.id, dateStr)}
              tabIndex={0}
              title={!isComplete && !isToday ? "Mark as done!" : ""}
            >
              {new Date(dateStr).getDate().toString()}
              {isComplete ? <span style={{ fontSize: 15, marginLeft: 2 }}>✓</span> : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;