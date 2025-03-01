import { withAuth } from "~/utils/withAuth";
import { withAuthPlus } from "~/utils/withAuthPlus";

export function dynamicAuth(Component: React.ComponentType<any>) {
  const currentDate = new Date();
  const currentUTCDate = new Date(Date.UTC(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate(),
    currentDate.getUTCHours(),
    currentDate.getUTCMinutes(),
    currentDate.getUTCSeconds()
  ));
  const switchDate = new Date(Date.UTC(2025, 2, 3)); // March is month 2 in zero-based index

  if (currentUTCDate >= switchDate) {
    return withAuth(Component, ["/vote"]);
  } else {
    return withAuthPlus(Component, ["/vote"]);
  }
}