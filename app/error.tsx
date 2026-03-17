"use client";

import { useEffect } from "react";
import { Button } from "@heroui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6">
      <h2 className="font-serif text-2xl font-bold text-foreground">
        Something went wrong
      </h2>
      <p className="text-foreground/60">
        We hit an unexpected error. Please try again.
      </p>
      <Button color="primary" radius="full" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
