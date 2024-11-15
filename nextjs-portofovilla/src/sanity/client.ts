import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "0hw1h457",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});