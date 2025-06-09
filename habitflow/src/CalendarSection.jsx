import React from "react";
import "./App.css";

/**
 * CalendarSection
 * Displays a minimalist/pastel monthly calendar for a single habit,
 * shows day completion (checkmark), streak highlighting (green=current, red=missed, accent for finished streaks).
 * All design as soft/rounded/neutral with accent/minimalist pastel effects.
 *
 * Props:
 * - habits: Array of habit objects with { id, name, calendar, startDate }.
 * - calendarMonth: 0-based integer (0=Jan).
 * - calendarYear: full 4-digit year.
 * - todayISO: ISO date string (YYYY-MM-DD).
 */
 // PUBLIC_INTERFACE
function CalendarSection({ habits, calendarMonth, calendarYear, todayISO }) {
  // If no habits, show friendly message
  if (!habits.length) return (
    <div className="calendar-section-empty">
      No habits to display. Start by adding a habit!
    </div>
  );

  // Helper to get all days (with date-object, iso,string) for month/year
  function getMonthDays(month, year) {
    const arr = [];
    const d = new Date(year, month, 1);
    while (d.getMonth() === month) {
      arr.push({
        date: new Date(d),
        iso: d.toISOString().slice(0, 10),
        day: d.getDate(),
        weekDay: d.getDay()
      });
      d.setDate(d.getDate() + 1);
    }
    return arr;
  }
  const allDays = getMonthDays(calendarMonth, calendarYear);

  // For Streak/Completion Coloring: returns className for a given day depending on completion/streak/miss status.
  function getDayStatus(habit, iso, idx) {
    // Day completed for habit
    const complete = habit.calendar[iso];
    // If all previous contiguous days (until today or that day) are marked, it's a streak.
    let prev = new Date(iso);
    prev.setDate(prev.getDate() - 1);
    const yesterday = prev.toISOString().slice(0, 10);
    let isStreak = false;
    let missed = false;

    // Only show streak highlight if this and previous day are both checked
    if (complete && habit.calendar[yesterday]) {
      isStreak = true;
    }
    // Missed = Not complete and before today
    if (!complete && iso < todayISO) {
      missed = true;
    }

    // Today
    const isToday = iso === todayISO;
    // Was completed and is end of streak (next day is not completed, or last day)
    let endedStreak = false;
    if (complete && (idx === allDays.length-1 || !habit.calendar[allDays[idx+1]?.iso])) {
      // streak ends here!
      endedStreak = true;
    }

    return {
      complete,
      isStreak,
      missed,
      isToday,
      endedStreak
    };
  }

  // Minimal habit color palette
  const streakGreen = "#A4D9BA";
  const missedRed = "#FFD7D9";
  const accent = "#AFB4FF";
  const pastelNeutral = "rgba(230,236,245,0.45)";
  const dayText = "#49638c";

  // Render
  return (
    <div className="calendar-section-container">
      <h2 className="calendar-section-title">
        Calendar
      </h2>
      {/* Show for each habit (vertical stack) */}
      <div className="calendar-section-habits">
        {habits.map((habit) => (
          <div className="calendar-habit-block" key={habit.id}>
            <div className="calendar-habit-header">
              <div className="calendar-habit-dot" />
              <div className="calendar-habit-name">
                {habit.name}
              </div>
            </div>
            {/* Calendar table for this habit */}
            <div className="calendar-grid-outer">
              <div className="calendar-weekdays-row">
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
                  <div key={d} className="calendar-weekday">{d}</div>
                ))}
              </div>
              <div className="calendar-days-grid">
                {/* Pad initial empty days (first day of month offset) */}
                {[...Array(allDays[0].weekDay)].map((_, i) =>
                  <div key={"pad-"+i} className="calendar-day-cell calendar-day-empty"></div>
                )}
                {/* Actual days */}
                {allDays.map((day, idx) => {
                  const status = getDayStatus(habit, day.iso, idx);
                  let classNames = "calendar-day-cell";
                  let extraStyle = {};
                  if (status.isToday) {
                    classNames += " calendar-day-today";
                    extraStyle.border = `2px solid ${streakGreen}`;
                    extraStyle.boxShadow = "0 1px 10px 1px #A4D9BA3A";
                  }
                  if (status.complete) {
                    classNames += " calendar-day-complete";
                    extraStyle.background = streakGreen;
                  }
                  if (status.isStreak) {
                    classNames += " calendar-day-streak";
                    extraStyle.background = streakGreen;
                  }
                  if (status.endedStreak) {
                    classNames += " calendar-day-endedstreak";
                    extraStyle.background = accent;
                    extraStyle.color = "#fff";
                  }
                  if (status.missed) {
                    classNames += " calendar-day-missed";
                    extraStyle.background = missedRed;
                    extraStyle.color = "#D65070";
                  }
                  return (
                    <div
                      key={day.iso}
                      className={classNames}
                      style={{
                        ...extraStyle,
                        borderRadius: 14,
                        transition: "background 0.15s, color 0.15s, box-shadow 0.21s",
                        background: extraStyle.background || pastelNeutral,
                        color: extraStyle.color || dayText,
                        fontVariantNumeric: "tabular-nums"
                      }}
                    >
                      <span>
                        {day.day}
                        {status.complete && (
                          <span
                            className="calendar-day-checkmark"
                            title="Completed"
                            style={{
                              marginLeft: 2,
                              color: "#278033",
                              fontWeight: "bold",
                              fontSize: "1rem",
                              verticalAlign: "middle"
                            }}
                          >
                            ✓
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
                {/* No need to pad end as CSS grid will wrap correctly */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarSection;
