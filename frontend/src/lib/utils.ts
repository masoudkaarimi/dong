import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function formatDate(input: Date | string | number, formatOptions?: Intl.DateTimeFormatOptions): string {
   const date = toDate(input);

   if (!isValidDate(date)) return "Invalid Date";

   const defaultOptions: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
   const options = { ...defaultOptions, ...formatOptions };

   return new Intl.DateTimeFormat("en-GB", options).format(date);
}

export function toDate(input: Date | string | number): Date {
   const parsedDate = new Date(input);

   if (isValidDate(parsedDate)) return parsedDate;

   throw new Error("Invalid date input");
}

export function isValidDate(date: Date): boolean {
   return !isNaN(date.getTime());
}
