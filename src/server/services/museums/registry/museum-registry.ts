import type { MuseumProvider } from "../providers/museum-provider.interface";

import { LouvreProvider } from "../providers/louvre.provider";
import { MetProvider } from "../providers/met.provider";

export const museumRegistry: Record<string, MuseumProvider> = {
  louvre: new LouvreProvider(),
  met: new MetProvider()
};
