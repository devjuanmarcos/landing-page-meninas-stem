export function formatEventMode(mode: "online" | "in_person" | "hybrid"): string {
  switch (mode) {
    case "online":
      return "Online";
    case "in_person":
      return "Presencial";
    case "hybrid":
      return "Híbrido";
    default:
      return "Modo desconhecido";
  }
}
