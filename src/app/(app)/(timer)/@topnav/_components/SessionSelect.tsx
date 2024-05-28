"use client";
import { Loader2 } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";

interface SessionSelectProps {
  currentSessionId: number | undefined;
}

const SessionSelect: React.FC<SessionSelectProps> = ({ currentSessionId }) => {
  const [currentSessionState, setCurrentSessionState] = React.useState<string>(
    currentSessionId + "",
  );
  const { isPending, data, isError, error } =
    api.cubeSessions.getUserSessions.useQuery();

  if (isPending) {
    return (
      <div className="w-min rounded border border-border px-10 py-2">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-min rounded border border-border px-10 py-2">
        Error: {error.message}
      </div>
    );
  }

  const cubingSessions = data;

  const currentSession = data?.find(
    (session) => session.id === currentSessionId,
  );

  return (
    <Select
      onValueChange={(value) => setCurrentSessionState(value)}
      defaultValue={currentSessionState}
    >
      <SelectTrigger className={"w-min gap-3"}>
        <SelectValue
          placeholder="No Session"
          defaultValue={currentSession?.id + "" ?? "No Session"}
        />
      </SelectTrigger>
      <SelectContent>
        {cubingSessions.map((session) => (
          <SelectItem key={session.id} value={session.id + ""}>
            {session.name}
          </SelectItem>
        ))}
        <Button variant="ghost" className="h-min w-full">
          New Session +
        </Button>
      </SelectContent>
    </Select>
  );
};

export default SessionSelect;
