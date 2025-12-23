import html2canvas from "html2canvas";

/**
 * preprocessing element to convert modern CSS colors to html2canvas-compatible formats
 * html2canvas doesn't support oklab, oklch, lab, lch color functions
 */
const preprocessElement = (element: HTMLElement): HTMLElement => {
  const clone = element.cloneNode(true) as HTMLElement;

  // getting all elements including the clone itself
  const allElements = [
    clone,
    ...Array.from(clone.querySelectorAll("*")),
  ] as HTMLElement[];

  allElements.forEach((el) => {
    const computedStyle = window.getComputedStyle(el);

    // properties that might contain colors
    const colorProps = [
      "color",
      "backgroundColor",
      "borderColor",
      "borderTopColor",
      "borderRightColor",
      "borderBottomColor",
      "borderLeftColor",
      "outlineColor",
      "textDecorationColor",
      "fill",
      "stroke",
    ];

    colorProps.forEach((prop) => {
      const value = computedStyle.getPropertyValue(prop);

      // checking if the value contains unsupported color functions
      if (
        value &&
        (value.includes("oklab") ||
          value.includes("oklch") ||
          value.includes("lab(") ||
          value.includes("lch("))
      ) {
        // setting the computed RGB value directly
        const rgbValue = computedStyle.getPropertyValue(prop);
        // forcing the browser to compute the color and we'll get RGB back
        el.style.setProperty(prop, rgbValue, "important");
      }
    });
  });

  return clone;
};

/**
 * downloading a single card as an image
 * @param cardElement - the HTML element to capture
 * @param cardName - name for the downloaded file
 */
export const downloadCard = async (
  cardElement: HTMLElement,
  cardName: string
): Promise<void> => {
  let processedElement: HTMLElement | null = null;

  try {
    // preprocessing to handle unsupported color functions
    processedElement = preprocessElement(cardElement);

    // temporarily adding to DOM for html2canvas to process
    processedElement.style.position = "absolute";
    processedElement.style.left = "-9999px";
    document.body.appendChild(processedElement);

    // capturing the element as canvas
    const canvas = await html2canvas(processedElement, {
      backgroundColor: null,
      scale: 2, // higher quality
      logging: false,
      useCORS: true,
      onclone: (clonedDoc) => {
        // additional preprocessing in the cloned document
        const clonedElement = clonedDoc.querySelector(
          '[style*="-9999px"]'
        ) as HTMLElement;
        if (clonedElement) {
          clonedElement.style.position = "static";
          clonedElement.style.left = "auto";
        }
      },
    });

    // converting canvas to blob and downloading - wrapping in promise to handle async properly
    await new Promise<void>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Failed to create blob from canvas"));
          return;
        }

        try {
          // creating download link
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `github-wrapped-${new Date().getFullYear()}-${cardName}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          resolve();
        } catch (err) {
          reject(err);
        }
      }, "image/png");
    });
  } catch (error) {
    console.error("Error downloading card:", error);
    throw new Error(
      `Failed to download card: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  } finally {
    // removing temporary element from DOM
    if (processedElement && processedElement.parentNode) {
      document.body.removeChild(processedElement);
    }
  }
};

/**
 * downloading all cards as individual images
 * @param cardElements - array of card elements to capture
 */
export const downloadAllCards = async (
  cardElements: HTMLElement[]
): Promise<void> => {
  try {
    for (let i = 0; i < cardElements.length; i++) {
      const element = cardElements[i];
      const cardName = `card-${i + 1}`;

      // adding delay between downloads to avoid browser blocking
      if (i > 0) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      try {
        await downloadCard(element, cardName);
      } catch (cardError) {
        // more specific error message indicating which card failed
        const errorMsg =
          cardError instanceof Error ? cardError.message : "Unknown error";
        throw new Error(`Failed to download ${cardName}: ${errorMsg}`);
      }
    }
  } catch (error) {
    console.error("Error downloading cards:", error);
    throw error; // re-throwing the original error instead of wrapping it again
  }
};

/**
 * generating shareable image from card element
 * @param cardElement - the HTML element to capture
 * @returns Promise<Blob> - the card as an image blob
 */
export const generateShareableImage = async (
  cardElement: HTMLElement
): Promise<Blob> => {
  let processedElement: HTMLElement | null = null;

  try {
    // preprocessing to handle unsupported color functions
    processedElement = preprocessElement(cardElement);

    // temporarily adding to DOM for html2canvas to process
    processedElement.style.position = "absolute";
    processedElement.style.left = "-9999px";
    document.body.appendChild(processedElement);

    const canvas = await html2canvas(processedElement, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.querySelector(
          '[style*="-9999px"]'
        ) as HTMLElement;
        if (clonedElement) {
          clonedElement.style.position = "static";
          clonedElement.style.left = "auto";
        }
      },
    });

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to generate image"));
        }
      }, "image/png");
    });
  } catch (error) {
    console.error("Error generating shareable image:", error);
    throw new Error("Failed to generate shareable image");
  } finally {
    // removing temporary element from DOM
    if (processedElement && processedElement.parentNode) {
      document.body.removeChild(processedElement);
    }
  }
};
