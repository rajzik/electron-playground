interface Window {
  ipc?: {
    invoke(channel: string, ...args: unknown[]): Promise<any>;
    on(channel: string, func: (...args: unknown[]) => void): () => void;
  };
}
