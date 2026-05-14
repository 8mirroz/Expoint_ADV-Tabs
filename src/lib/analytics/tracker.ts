'use client';

interface TelemetryEvent {
  event: string;
  path: string;
  metadata?: Record<string, unknown>;
  timestamp: number;
}

class TelemetryTracker {
  private static instance: TelemetryTracker;
  private queue: TelemetryEvent[] = [];
  private flushInterval: number = 5000;

  private constructor() {
    if (typeof window !== 'undefined') {
      setInterval(() => this.flush(), this.flushInterval);
      window.addEventListener('beforeunload', () => this.flush());
    }
  }

  public static getInstance(): TelemetryTracker {
    if (!TelemetryTracker.instance) {
      TelemetryTracker.instance = new TelemetryTracker();
    }
    return TelemetryTracker.instance;
  }

  public track(event: string, metadata?: Record<string, unknown>) {
    const telemetryEvent: TelemetryEvent = {
      event,
      path: typeof window !== 'undefined' ? window.location.pathname : '',
      metadata,
      timestamp: Date.now(),
    };

    this.queue.push(telemetryEvent);
    
    // Immediate flush for important events
    if (event === 'lead_submit' || event === 'error') {
      this.flush();
    }
  }

  private async flush() {
    if (this.queue.length === 0) return;

    const eventsToFlush = [...this.queue];
    this.queue = [];

    try {
      await fetch('/api/telemetry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events: eventsToFlush }),
      });
    } catch (error) {
      console.error('Telemetry flush failed:', error);
      // Put back in queue if failed? For now, we just lose them to avoid infinite loops
    }
  }
}

export const tracker = TelemetryTracker.getInstance();
