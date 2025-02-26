export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export function formatDateWithHours(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const month = date.toLocaleString("pt-BR", { month: "long" });
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `Dia ${day} de ${month} de ${year} às ${hours}:${minutes}`;
}
