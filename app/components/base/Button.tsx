import { Button } from "@nextui-org/react";
import React from "react";

type ButtonColor =
  | "primary"
  | "secondary"
  | "default"
  | "success"
  | "warning"
  | "danger";

type Props = {
  title: string;
  color?: ButtonColor;
  text?: string;
  width?: string;
  height?: string;
  action: (...params: unknown[]) => void;
};

export default function ButtonComponent({
  color = "default",
  title,
  text = "md",
  width,
  height,
  action,
}: Props) {
  return (
    <Button
      color={color}
      className={`font-raleway dark ${width ?? "w-56"} ${height ?? ""} font-semibold text-${text}`}
      onPress={() => action()}
    >
      {title}
    </Button>
  );
}
