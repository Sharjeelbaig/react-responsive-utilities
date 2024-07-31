import { useScreenWidth } from "../components/Responsive/Responsive";
export const getSize = ([min, current, max]: [number, number, number]) => {
  if (max < min) {
    throw new Error("Max must be greater than min");
  }
  const screenWidth = useScreenWidth();
  const vw = (current / screenWidth) * 100;
  return `clamp(${min}vw, ${vw}vw, ${max}vw)`;
};
