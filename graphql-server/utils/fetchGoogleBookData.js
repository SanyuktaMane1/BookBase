import fetch from "node-fetch";

export async function fetchGoogleBookData(bookTitle) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
        bookTitle
      )}`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const volumeInfo = data.items[0].volumeInfo;

      return {
        thumbnail: volumeInfo.imageLinks?.thumbnail || "",
        description: volumeInfo.description || "",
        infoLink: volumeInfo.infoLink || "",
      };
    } else {
      return { thumbnail: "", description: "", infoLink: "" };
    }
  } catch (error) {
    console.error("Error fetching Google Book metadata:", error);
    return { thumbnail: "", description: "", infoLink: "" };
  }
}
