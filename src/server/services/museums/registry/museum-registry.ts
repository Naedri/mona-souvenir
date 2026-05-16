import type { MuseumProvider } from "../providers/museum-provider.interface";

import { LouvreProvider } from "../providers/louvre.provider";

export const museumRegistry: Record<string, MuseumProvider> = {
  louvre: new LouvreProvider()
};
