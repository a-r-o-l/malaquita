declare global {
  const mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<unknown> | null;
  };
}

export {};
