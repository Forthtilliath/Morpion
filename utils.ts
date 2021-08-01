export const createArrayOfValues = (nbElements: Number, defaultValue: Number): Number[] => Array.from(Array(nbElements), () => defaultValue);

export const createArrayOfKeys = (nbElements: Number): Number[] => Array.from(Array(nbElements), (_, x) => x);

export const setVisible = (element: HTMLElement, visible: Boolean) => {
  visible ? element.classList.remove('hidden') : element.classList.add('hidden');
}