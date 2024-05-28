import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("copied");
    })
    .catch(() => {
      throw new Error("Something went wrong");
    });
}

export function convertToTimeString(miliseconds: number) {
  const hours = Math.floor(miliseconds / 360000);
  const minutes = Math.floor((miliseconds / 6000) % 60);
  const seconds = Math.floor((miliseconds / 100) % 60);
  const milisecondsLeft = miliseconds % 100;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes =
    hours > 0 ? minutes.toString().padStart(2, "0") : minutes.toString();
  const formattedSeconds =
    minutes > 0 ? seconds.toString().padStart(2, "0") : seconds.toString();
  const formattedMiliseconds = milisecondsLeft
    .toString()
    .padStart(2, "0")
    .slice(0, 2);
  const formatedTime = `${hours > 0 ? `${formattedHours}:` : ""}${hours > 0 ? `${formattedMinutes}:` : ""}${formattedSeconds}.${formattedMiliseconds}`;

  return formatedTime;
}
