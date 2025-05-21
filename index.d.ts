export type Name = string;
export type Value = string | number | null | undefined;
export type Func = () => Value;

export default function varNames(vars: Record<Name, Value | Func>): string;
