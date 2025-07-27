import { useEffect, useRef, useState } from "react";

export function useCombatSSE(url, onMessage) {
  const eventSourceRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log("SSE connected successfully");
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("SSE message received:", data.type, data);

        onMessage(data);
      } catch (error) {
        console.error("Failed to parse SSE message:", error, event.data);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      setIsConnected(false);
    };

    return () => {
      console.log("Disconnecting SSE");
      eventSource.close();
      setIsConnected(false);
    };
  }, [url, onMessage]);

  return { isConnected };
}
