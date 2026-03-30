'use client';

import { memo, useMemo } from 'react';
import { TimeData, Theme, THEMES } from '@/lib/types';
import { formatTime } from '@/lib/hooks';

interface DigitalClockProps {
  time: TimeData;
  format: '12h' | '24h';
  showSeconds: boolean;
  theme: Theme;
}

function DigitalClockComponent({ time, format, showSeconds, theme }: DigitalClockProps) {
  const displayTime = useMemo(() => {
    return formatTime(time, format, showSeconds);
  }, [time.hours, time.minutes, time.seconds, format, showSeconds]);

  const period = format === '12h' ? time.period : null;

  return (
    <div 
      className="flex flex-col items-center justify-center animate-fade-in"
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Heure actuelle : ${displayTime}${period ? ` ${period}` : ''}`}
    >
      <div className="flex items-baseline gap-2 md:gap-4">
        <time 
          dateTime={time.date.toISOString()}
          className="font-mono font-bold tracking-tight theme-transition"
          style={{ 
            color: theme.foreground,
            fontSize: 'clamp(3rem, 15vw, 12rem)',
            textShadow: `0 0 40px ${theme.primary}40`,
            letterSpacing: '-0.02em',
          }}
        >
          {displayTime}
        </time>
        {period && (
          <span 
            className="font-mono font-medium theme-transition"
            style={{ 
              color: theme.secondary,
              fontSize: 'clamp(1rem, 4vw, 3rem)',
            }}
            aria-hidden="true"
          >
            {period}
          </span>
        )}
      </div>
      
      {/* Indicateur de secondes animé */}
      {showSeconds && (
        <div 
          className="mt-4 h-1 rounded-full overflow-hidden theme-transition"
          style={{ 
            width: 'clamp(100px, 30vw, 300px)',
            backgroundColor: `${theme.secondary}30`,
          }}
          aria-hidden="true"
        >
          <div 
            className="h-full rounded-full transition-all duration-100 ease-linear"
            style={{ 
              width: `${(time.milliseconds / 1000) * 100}%`,
              backgroundColor: theme.primary,
            }}
          />
        </div>
      )}
    </div>
  );
}

export const DigitalClock = memo(DigitalClockComponent);

interface AnalogClockProps {
  time: TimeData;
  showSeconds: boolean;
  theme: Theme;
}

function AnalogClockComponent({ time, showSeconds, theme }: AnalogClockProps) {
  // Calculer les angles des aiguilles
  const secondAngle = (time.seconds + time.milliseconds / 1000) * 6;
  const minuteAngle = (time.minutes + time.seconds / 60) * 6;
  const hourAngle = ((time.hours % 12) + time.minutes / 60) * 30;

  // Générer les 60 marqueurs de secondes/minutes
  const secondMarkers = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      index: i,
      isHourMark: i % 5 === 0,
    }));
  }, []);

  // Générer les 12 chiffres d'heures
  const hourNumbers = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      index: i + 1,
      hour: i + 1,
    }));
  }, []);

  return (
    <div 
      className="relative animate-fade-in flex justify-center items-center"
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Heure actuelle : ${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`}
      style={{
        width: 'clamp(250px, 60vmin, 500px)',
        height: 'clamp(250px, 60vmin, 500px)',
      }}
    >
      {/* Cadran */}
      <div 
        className="clock-face w-full h-full theme-transition"
        style={{
          border: `4px solid ${theme.primary}`,
          background: `radial-gradient(circle at 30% 30%, ${theme.background}dd, ${theme.background})`,
        }}
      >
        {/* Marqueurs des secondes/minutes (60 graduations) */}
        <div className="absolute inset-0 rounded-full">
          {secondMarkers.map(({ index, isHourMark }) => (
            <span
              key={`second-marker-${index}`}
              className="absolute inset-[-20px] text-center"
              style={{
                transform: `rotate(${index * 6}deg)`,
              }}
              aria-hidden="true"
            >
              <p
                className="inline-block rounded-sm"
                style={{
                  width: isHourMark ? '6px' : '2px',
                  height: isHourMark ? '18px' : '12px',
                  backgroundColor: theme.primary,
                  boxShadow: `0 0 10px ${theme.primary}`,
                  transform: isHourMark ? 'translateY(1px)' : undefined,
                }}
              />
            </span>
          ))}
        </div>

        {/* Chiffres des heures */}
        <div className="absolute inset-0 rounded-full">
          {hourNumbers.map(({ index, hour }) => (
            <span
              key={`hour-${hour}`}
              className="absolute inset-[6px] text-center"
              style={{
                transform: `rotate(${index * 30}deg)`,
              }}
              aria-hidden="true"
            >
              <p
                className="font-bold theme-transition"
                style={{
                  fontSize: 'clamp(1.2rem, 4vmin, 2.5rem)',
                  color: theme.primary,
                  textShadow: `0 0 10px ${theme.primary}`,
                  transform: `rotate(${-index * 30}deg)`,
                  display: 'inline-block',
                }}
              >
                {hour}
              </p>
            </span>
          ))}
        </div>

        {/* Aiguille des heures */}
        <div
          className="clock-hand theme-transition"
          style={{
            width: '8px',
            height: '25%',
            backgroundColor: theme.foreground,
            transform: `translateX(-50%) rotate(${hourAngle}deg)`,
            boxShadow: `0 0 10px ${theme.primary}60`,
          }}
          aria-hidden="true"
        />

        {/* Aiguille des minutes */}
        <div
          className="clock-hand theme-transition"
          style={{
            width: '4px',
            height: '35%',
            backgroundColor: theme.foreground,
            transform: `translateX(-50%) rotate(${minuteAngle}deg)`,
            boxShadow: `0 0 10px ${theme.primary}60`,
          }}
          aria-hidden="true"
        />

        {/* Aiguille des secondes */}
        {showSeconds && (
          <div
            className="clock-hand"
            style={{
              width: '2px',
              height: '40%',
              backgroundColor: theme.primary,
              transform: `translateX(-50%) rotate(${secondAngle}deg)`,
              transition: 'transform 0.1s linear',
            }}
            aria-hidden="true"
          />
        )}

        {/* Centre */}
        <div
          className="clock-center theme-transition"
          style={{
            width: '16px',
            height: '16px',
            backgroundColor: theme.primary,
            boxShadow: `0 0 15px ${theme.primary}`,
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export const AnalogClock = memo(AnalogClockComponent);

// Composant Flip Clock (horloge à bascule)
interface FlipClockProps {
  time: TimeData;
  format: '12h' | '24h';
  showSeconds: boolean;
  theme: Theme;
}

interface FlipCardProps {
  value: string;
  theme: Theme;
}

function FlipCard({ value, theme }: FlipCardProps) {
  return (
    <div 
      className="flip-card relative"
      style={{
        width: 'clamp(60px, 12vw, 120px)',
        height: 'clamp(80px, 16vw, 160px)',
        perspective: '300px',
      }}
    >
      {/* Carte supérieure */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-lg"
        style={{
          backgroundColor: `${theme.background}`,
          borderBottom: `1px solid ${theme.secondary}40`,
        }}
      >
        <div
          className="absolute inset-x-0 top-0 flex items-center justify-center"
          style={{
            height: '200%',
            background: `linear-gradient(180deg, ${theme.secondary}20 0%, transparent 50%)`,
          }}
        >
          <span
            className="font-mono font-bold"
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              color: theme.primary,
              textShadow: `0 0 20px ${theme.primary}60`,
            }}
          >
            {value}
          </span>
        </div>
      </div>

      {/* Carte inférieure */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden rounded-b-lg"
        style={{
          backgroundColor: `${theme.background}`,
        }}
      >
        <div
          className="absolute inset-x-0 bottom-0 flex items-center justify-center"
          style={{
            height: '200%',
            background: `linear-gradient(0deg, ${theme.secondary}20 0%, transparent 50%)`,
          }}
        >
          <span
            className="font-mono font-bold"
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              color: theme.primary,
              textShadow: `0 0 20px ${theme.primary}60`,
            }}
          >
            {value}
          </span>
        </div>
      </div>

      {/* Ligne de séparation centrale */}
      <div
        className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 z-10"
        style={{
          backgroundColor: theme.secondary,
          boxShadow: `0 0 10px ${theme.background}`,
        }}
      />

      {/* Bordure */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          border: `3px solid ${theme.primary}40`,
          boxShadow: `0 10px 30px ${theme.background}80, inset 0 0 20px ${theme.primary}10`,
        }}
      />
    </div>
  );
}

function FlipClockComponent({ time, format, showSeconds, theme }: FlipClockProps) {
  const hours = format === '12h'
    ? (time.hours % 12 || 12).toString().padStart(2, '0')
    : time.hours.toString().padStart(2, '0');
  const minutes = time.minutes.toString().padStart(2, '0');
  const seconds = time.seconds.toString().padStart(2, '0');
  const period = format === '12h' ? time.period : null;

  return (
    <div
      className="flex flex-col items-center justify-center animate-fade-in"
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Heure actuelle : ${hours}:${minutes}${showSeconds ? ':' + seconds : ''}${period ? ' ' + period : ''}`}
    >
      <div className="flex items-center gap-2 md:gap-4">
        {/* Heures */}
        <div className="flex gap-1 md:gap-2">
          <FlipCard value={hours[0]} theme={theme} />
          <FlipCard value={hours[1]} theme={theme} />
        </div>

        {/* Séparateur */}
        <div className="flex flex-col gap-3" aria-hidden="true">
          <div
            className="w-3 h-3 md:w-4 md:h-4 rounded-full"
            style={{
              backgroundColor: theme.primary,
              boxShadow: `0 0 10px ${theme.primary}`,
            }}
          />
          <div
            className="w-3 h-3 md:w-4 md:h-4 rounded-full"
            style={{
              backgroundColor: theme.primary,
              boxShadow: `0 0 10px ${theme.primary}`,
            }}
          />
        </div>

        {/* Minutes */}
        <div className="flex gap-1 md:gap-2">
          <FlipCard value={minutes[0]} theme={theme} />
          <FlipCard value={minutes[1]} theme={theme} />
        </div>

        {/* Secondes */}
        {showSeconds && (
          <>
            <div className="flex flex-col gap-3" aria-hidden="true">
              <div
                className="w-3 h-3 md:w-4 md:h-4 rounded-full"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 0 10px ${theme.primary}`,
                }}
              />
              <div
                className="w-3 h-3 md:w-4 md:h-4 rounded-full"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 0 10px ${theme.primary}`,
                }}
              />
            </div>
            <div className="flex gap-1 md:gap-2">
              <FlipCard value={seconds[0]} theme={theme} />
              <FlipCard value={seconds[1]} theme={theme} />
            </div>
          </>
        )}

        {/* AM/PM */}
        {period && (
          <div
            className="ml-2 md:ml-4 font-mono font-bold self-end mb-2"
            style={{
              fontSize: 'clamp(1rem, 3vw, 2rem)',
              color: theme.secondary,
            }}
          >
            {period}
          </div>
        )}
      </div>
    </div>
  );
}

export const FlipClock = memo(FlipClockComponent);

// Composant wrapper pour afficher le bon type d'horloge
interface ClockDisplayProps {
  time: TimeData;
  clockType: 'digital' | 'analog' | 'flip';
  format: '12h' | '24h';
  showSeconds: boolean;
  themeId: string;
}

export function ClockDisplay({ time, clockType, format, showSeconds, themeId }: ClockDisplayProps) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];

  if (clockType === 'analog') {
    return <AnalogClock time={time} showSeconds={showSeconds} theme={theme} />;
  }

  if (clockType === 'flip') {
    return <FlipClock time={time} format={format} showSeconds={showSeconds} theme={theme} />;
  }

  return <DigitalClock time={time} format={format} showSeconds={showSeconds} theme={theme} />;
}
