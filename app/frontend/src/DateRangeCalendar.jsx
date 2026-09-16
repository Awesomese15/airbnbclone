import { useMemo } from 'react';
import {
  addMonths,
  dayKey,
  formatDisplayDate,
  getMonthGrid,
  isBeforeDay,
  isBetweenDays,
  monthLabel,
  nightsBetween,
  sameDay,
  startOfDay,
} from './dateUtils';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function MonthPanel({ monthDate, checkIn, checkOut, blockedSet, onSelectDay }) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const cells = useMemo(() => getMonthGrid(year, month), [year, month]);

  return (
    <div className="cal-month">
      <h3 className="cal-month-title">{monthLabel(monthDate)}</h3>
      <div className="cal-weekdays" aria-hidden="true">
        {WEEKDAYS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="cal-grid" role="grid" aria-label={monthLabel(monthDate)}>
        {cells.map((date, index) => {
          if (!date) {
            return <span key={`empty-${index}`} className="cal-cell cal-cell-empty" />;
          }

          const key = dayKey(date);
          const disabled = blockedSet.has(key);
          const isStart = sameDay(date, checkIn);
          const isEnd = sameDay(date, checkOut);
          const inRange = checkIn && checkOut && isBetweenDays(date, checkIn, checkOut);
          const className = [
            'cal-cell',
            disabled && 'is-disabled',
            inRange && 'in-range',
            isStart && 'range-start',
            isEnd && 'range-end',
            isStart && isEnd && 'range-single',
          ].filter(Boolean).join(' ');

          return (
            <div key={key} className={className} role="presentation">
              <button
                type="button"
                className="cal-day"
                disabled={disabled}
                aria-label={formatDisplayDate(date)}
                aria-pressed={isStart || isEnd}
                onClick={() => onSelectDay(date)}
              >
                <span className="cal-day-inner">{date.getDate()}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DateRangeCalendar({
  id,
  locationLabel,
  checkIn,
  checkOut,
  onChangeRange,
  viewMonth,
  onViewMonthChange,
  blockedDates = [],
}) {
  const blockedSet = useMemo(() => new Set(blockedDates), [blockedDates]);
  const nights = nightsBetween(checkIn, checkOut);
  const rightMonth = addMonths(viewMonth, 1);

  const onSelectDay = (day) => {
    const key = dayKey(day);
    if (blockedSet.has(key)) return;

    if (!checkIn || (checkIn && checkOut)) {
      onChangeRange(day, null);
      return;
    }
    if (isBeforeDay(day, checkIn)) {
      onChangeRange(day, null);
      return;
    }
    if (sameDay(day, checkIn)) return;
    onChangeRange(checkIn, day);
  };

  const clearDates = () => onChangeRange(null, null);

  const title = checkIn && checkOut && nights > 0
    ? `${nights} night${nights === 1 ? '' : 's'} in ${locationLabel}`
    : `Select dates in ${locationLabel}`;

  const subtitle = checkIn && checkOut
    ? `${formatDisplayDate(checkIn)} - ${formatDisplayDate(checkOut)}`
    : checkIn
      ? `${formatDisplayDate(checkIn)} - Add checkout`
      : 'Add your travel dates for exact pricing';

  const canGoPrev = viewMonth.getFullYear() > 2026 || (viewMonth.getFullYear() === 2026 && viewMonth.getMonth() > 0);
  const canGoNext = viewMonth.getFullYear() < 2027 || (viewMonth.getFullYear() === 2027 && viewMonth.getMonth() < 10);

  return (
    <section id={id} className="content-section calendar-section" aria-label="Choose dates">
      <div className="calendar-head">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="calendar-shell">
        <button
          type="button"
          className="cal-nav cal-nav-prev"
          aria-label="Previous month"
          disabled={!canGoPrev}
          onClick={() => onViewMonthChange(addMonths(viewMonth, -1))}
        >
          ‹
        </button>

        <div className="cal-months">
          <MonthPanel
            monthDate={viewMonth}
            checkIn={checkIn}
            checkOut={checkOut}
            blockedSet={blockedSet}
            onSelectDay={onSelectDay}
          />
          <MonthPanel
            monthDate={rightMonth}
            checkIn={checkIn}
            checkOut={checkOut}
            blockedSet={blockedSet}
            onSelectDay={onSelectDay}
          />
        </div>

        <button
          type="button"
          className="cal-nav cal-nav-next"
          aria-label="Next month"
          disabled={!canGoNext}
          onClick={() => onViewMonthChange(addMonths(viewMonth, 1))}
        >
          ›
        </button>
      </div>

      <div className="calendar-foot">
        <button type="button" className="cal-keyboard-hint" aria-label="Open keyboard shortcuts">
          <span className="cal-keyboard-icon" aria-hidden="true">⌨</span>
        </button>
        <button type="button" className="underlined cal-clear" onClick={clearDates}>
          Clear dates
        </button>
      </div>
    </section>
  );
}

export { nightsBetween } from './dateUtils';
export { formatShortBookingDate } from './dateUtils';
