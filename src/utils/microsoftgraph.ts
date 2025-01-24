// filepath: /C:/Users/alvin/Documents/Alvin/projects/pemirakmitb2024/src/utils/microsoftGraph.ts
export async function fetchMicrosoftGraphData(accessToken: string) {
  const response = await fetch("https://graph.microsoft.com/v1.0/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data from Microsoft Graph");
  }

  return response.json();
}